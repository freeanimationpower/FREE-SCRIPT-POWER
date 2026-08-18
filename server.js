// ============================================================
//  SCRIPT AI - Servidor unificado (estaticos + proxy de texto)
//  By FAP / fierroduque.com
//
//  SEGURIDAD (SSRF - Problema 1):
//   - Whitelist estricta de dominios para el proxy /api/chat
//   - Prohibido: protocolos no http(s), credenciales en URL,
//     puertos no estandar, hosts no listados, redirecciones.
//   - localhost solo si ALLOW_LOCALHOST=1 (para Ollama / LM Studio)
//   - Hosts extra permitidos via SSRF_EXTRA_HOSTS (separados por coma)
//
//  FIABILIDAD (Heartbeat - Problema 4):
//   - El proxy responde 200 de inmediato (Transfer-Encoding: chunked)
//     y emite un byte en blanco cada HEARTBEAT_MS mientras el
//     proveedor no responde. Asi los balanceadores de hostings
//     (Render, Railway, Heroku...) no cortan la conexion inactiva
//     antes de que llegue el payload final.
//   - Los bytes de latido son espacios en blanco ANTES del JSON.
//     JSON.parse() del cliente tolera whitespace inicial, por lo
//     que el body final sigue siendo un JSON valido.
//   - Como el status 200 se envia antes de conocer la respuesta
//     real del proveedor, los errores del proveedor viajan como
//     "sobre" JSON: { "error": { "message": ..., "upstream_status": 401 } }
// ============================================================

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

const PORT = process.env.PORT || 3000;
const HEARTBEAT_MS = parseInt(process.env.HEARTBEAT_MS, 10) || 15000;
const UPSTREAM_TIMEOUT_MS = parseInt(process.env.UPSTREAM_TIMEOUT_MS, 10) || 120000;
const MAX_BODY_SIZE = 4 * 1024 * 1024; // 4 MB (los prompts pueden ser largos)
const ALLOW_LOCALHOST = process.env.ALLOW_LOCALHOST === '1';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Whitelist de archivos estaticos servidos: evita path traversal
// (/../server.js, /.env...) y la exposicion de codigo no previsto.
const STATIC_FILES = new Set(['/index.html', '/app.js', '/logo-fap.png']);

// ============================================================
//  RATE LIMIT del proxy (anti-abuso)
//  Token bucket simple en memoria por IP: RL_MAX_REQS peticiones
//  por RL_WINDOW_MS. Detras de un balanceador, la IP del cliente
//  llega en X-Forwarded-For (la pone el propio hosting, no el
//  navegador, por lo que es confiable en produccion).
// ============================================================
const RL_WINDOW_MS = 60000;
const RL_MAX_REQS = 30;
const rlBuckets = new Map();
setInterval(function() {
    const now = Date.now();
    for (const [ip, rec] of rlBuckets) {
        if (now - rec.start > RL_WINDOW_MS) rlBuckets.delete(ip);
    }
}, RL_WINDOW_MS).unref();

function isRateLimited(ip) {
    const now = Date.now();
    let rec = rlBuckets.get(ip);
    if (!rec || now - rec.start > RL_WINDOW_MS) {
        rec = { count: 0, start: now };
        rlBuckets.set(ip, rec);
    }
    rec.count++;
    return rec.count > RL_MAX_REQS;
}

// ============================================================
//  DNS REBINDING (Problema 1 - defensa en profundidad)
//  Aunque la whitelist usa hostnames exactos, un atacante no
//  puede rebindearlos (no controla el DNS de OpenAI/Gemini/etc),
//  pero si el operador agrega hosts propios via SSRF_EXTRA_HOSTS
//  si existe ese riesgo. secureLookup bloquea la conexion si el
//  hostname resuelve a una IP privada/loopback/link-local.
// ============================================================
function isPrivateIp(addr) {
    if (!addr) return true;
    const a = String(addr).toLowerCase();
    if (a.includes(':')) {
        if (a === '::1' || a === '::') return true;
        if (a.startsWith('fc') || a.startsWith('fd')) return true;      // fc00::/7 ULA
        if (/^fe[89ab]/.test(a)) return true;                            // fe80::/10 link-local
        if (a.startsWith('::ffff:')) return isPrivateIp(a.slice(7));     // IPv4 mapeada
        return false;
    }
    const parts = a.split('.');
    if (parts.length !== 4) return true;
    const p = parts.map(Number);
    if (p.some(function(n) { return isNaN(n); })) return true;
    const b0 = p[0], b1 = p[1];
    if (b0 === 0 || b0 === 10 || b0 === 127 || b0 >= 224) return true;
    if (b0 === 169 && b1 === 254) return true;                           // link-local
    if (b0 === 172 && b1 >= 16 && b1 <= 31) return true;                 // RFC1918
    if (b0 === 192 && b1 === 168) return true;                           // RFC1918
    if (b0 === 100 && b1 >= 64 && b1 <= 127) return true;                // CGNAT
    return false;
}

function secureLookup(hostname, opts, cb) {
    dns.lookup(hostname, opts, function(err, address, family) {
        // Node puede pasar all:true en opts (address llega como array)
        const addrList = Array.isArray(address)
            ? address.map(function(a) { return a.address; })
            : [address];
        if (!err) {
            for (let i = 0; i < addrList.length; i++) {
                if (isPrivateIp(addrList[i])) {
                    err = new Error('Resolucion bloqueada por seguridad: IP privada (' + addrList[i] + ')');
                    err.code = 'EBLOCKED';
                    address = undefined;
                    family = undefined;
                    break;
                }
            }
        }
        cb(err, address, family);
    });
}

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.json': 'application/json'
};

// ============================================================
//  WHITELIST SSRF (Problema 1)
//  Comparacion EXACTA de hostname en minusculas: evita bypasses
//  del tipo api.openai.com.evil.com o subdominios falsos.
// ============================================================
const ALLOWED_PROXY_HOSTS = new Set([
    'api.openai.com',                    // OpenAI (pago)
    'generativelanguage.googleapis.com', // Google Gemini (gratis)
    'api.mistral.ai',                    // Mistral AI (gratis/pago)
    'api.deepseek.com',                  // DeepSeek (pago)
    'api.groq.com',                      // Groq (gratis)
    'api.fireworks.ai',                  // Fireworks AI (gratis)
    'api.together.xyz',                  // Together AI (gratis)
    'openrouter.ai',                     // OpenRouter (pago)
    'api.x.ai',                          // xAI Grok (pago)
    'opencode.ai'                        // OpenCode Zen (pago, requiere saldo)
]);

// Hosts adicionales definidos por el operador (ej. SSRF_EXTRA_HOSTS=httpbin.org)
if (process.env.SSRF_EXTRA_HOSTS) {
    process.env.SSRF_EXTRA_HOSTS.split(',')
        .map(function(h) { return h.trim().toLowerCase(); })
        .filter(Boolean)
        .forEach(function(h) { ALLOWED_PROXY_HOSTS.add(h); });
}

// Puertos permitidos para servicios locales (solo si ALLOW_LOCALHOST=1)
const ALLOWED_LOCAL_PORTS = new Set([11434, 1234, 8000, 8080, 5000, 3000]);

/**
 * Valida de forma estricta la URL de destino del proxy.
 * Devuelve { ok: true } o { ok: false, reason: '...' }.
 */
function validateProxyUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.length > 2048) {
        return { ok: false, reason: 'URL faltante o demasiado larga' };
    }

    let parsed;
    try {
        parsed = new URL(rawUrl);
    } catch (e) {
        return { ok: false, reason: 'URL invalida' };
    }

    // 1) Solo http / https
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        return { ok: false, reason: 'Protocolo no permitido' };
    }

    // 2) Sin credenciales embebidas (evita https://api.openai.com@evil.com)
    if (parsed.username || parsed.password) {
        return { ok: false, reason: 'Credenciales en la URL no permitidas' };
    }

    // 3) Hostname normalizado (quita corchetes de IPv6, pasa a minusculas)
    let host = (parsed.hostname || '').toLowerCase().replace(/^\[|\]$/g, '');
    if (!host) {
        return { ok: false, reason: 'Host faltante' };
    }

    // 4) Localhost: solo http y solo puertos de herramientas IA locales
    const isLocal = (host === 'localhost' || host === '127.0.0.1' || host === '::1');
    if (isLocal) {
        if (!ALLOW_LOCALHOST) {
            return { ok: false, reason: 'Host local no permitido (activar con ALLOW_LOCALHOST=1)' };
        }
        if (parsed.protocol !== 'http:') {
            return { ok: false, reason: 'Localhost solo via http' };
        }
        const port = parsed.port ? parseInt(parsed.port, 10) : 80;
        if (parsed.port && !ALLOWED_LOCAL_PORTS.has(port)) {
            return { ok: false, reason: 'Puerto local no permitido' };
        }
        return { ok: true };
    }

    // 5) Hosts externos: whitelist exacta + https obligatorio
    if (parsed.protocol !== 'https:') {
        return { ok: false, reason: 'Solo https para hosts externos' };
    }
    if (!ALLOWED_PROXY_HOSTS.has(host)) {
        return { ok: false, reason: 'Host no permitido: ' + host };
    }
    if (parsed.port && parsed.port !== '443') {
        return { ok: false, reason: 'Puerto no estandar no permitido' };
    }

    return { ok: true };
}

// ============================================================
//  HELPERS
// ============================================================
function setCORS(res) {
    res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-target-url, x-api-key');
}

function serveStatic(req, res) {
    let pathname;
    try {
        pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch (e) {
        pathname = '/';
    }
    if (pathname === '/') pathname = '/index.html';
    if (!STATIC_FILES.has(pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
    }

    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }
        res.setHeader('Content-Type', contentType);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.writeHead(200);
        res.end(data);
    });
}

/**
 * Lee el body de la peticion con un tope de MAX_BODY_SIZE
 * (anti-DoS: evita que el proxy buferee cuerpos infinitos).
 */
function parseBody(req) {
    return new Promise((resolve) => {
        const chunks = [];
        let size = 0;
        req.on('data', function(c) {
            size += c.length;
            if (size > MAX_BODY_SIZE) {
                req.destroy();
                resolve({ overflow: true });
                return;
            }
            chunks.push(c);
        });
        req.on('end', function() { resolve({ buffer: Buffer.concat(chunks) }); });
        req.on('error', function() { resolve({ overflow: true }); });
    });
}

// ============================================================
//  PROXY CON STREAMING + HEARTBEAT (Problema 4)
// ============================================================

/**
 * Envia la peticion al proveedor y transmite la respuesta al cliente
 * con latidos periodicos mientras no llegan datos.
 *
 * Protocolo de respuesta hacia el navegador:
 *   - HTTP 200 inmediato + Content-Type: application/json + chunked.
 *   - Latidos: un byte ' ' (espacio) cada HEARTBEAT_MS mientras el
 *     proveedor no responde. Son whitespace ANTES del JSON, por lo
 *     que JSON.parse() del cliente sigue funcionando.
 *   - Exito: se hace pipe del body JSON del proveedor tal cual.
 *   - Error del proveedor (>=400): como el status ya fue enviado,
 *     se responde un "sobre" JSON que el cliente interpreta:
 *     { "error": { "message": "...", "upstream_status": 401, ... } }
 */
function proxyStreamRequest(targetUrl, method, headers, body, clientRes) {
    const parsed = new URL(targetUrl);
    const isHttps = parsed.protocol === 'https:';
    const transport = isHttps ? https : http;

    const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: method,
        headers: headers,
        timeout: UPSTREAM_TIMEOUT_MS,
        lookup: secureLookup  // anti DNS rebinding
    };
    if (body && body.length) {
        options.headers['Content-Length'] = body.length;
    }

    let settled = false;
    let upstreamReq = null;

    const settle = function() {
        settled = true;
        clearInterval(heartbeatTimer);
    };

    const sendErrorEnvelope = function(message, upstreamStatus, upstreamBody) {
        if (clientRes.writableEnded) return;
        try {
            clientRes.end(JSON.stringify({
                error: {
                    message: message || 'Error del proveedor',
                    upstream_status: upstreamStatus || 502,
                    upstream_body: String(upstreamBody || '').slice(0, 2000)
                }
            }));
        } catch (e) { /* el cliente se fue */ }
    };

    // 1) Responder 200 YA al navegador para poder emitir latidos.
    //    'X-Accel-Buffering: no' evita que nginx/hostings bufereen la respuesta.
    clientRes.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no'
    });

    // 2) Latido: un espacio en blanco cada HEARTBEAT_MS mientras el
    //    proveedor no haya emitido datos. Mantiene viva la conexion TCP.
    const heartbeatTimer = setInterval(function() {
        if (!settled && !clientRes.writableEnded) {
            try { clientRes.write(' '); } catch (e) { settle(); }
        }
    }, HEARTBEAT_MS);

    // 3) Si el navegador cuelga, matar tambien la peticion al proveedor.
    clientRes.on('close', function() {
        settle();
        if (upstreamReq) {
            try { upstreamReq.destroy(); } catch (e) {}
        }
    });

    // 4) Peticion al proveedor
    upstreamReq = transport.request(options, function(proxyRes) {
        settle(); // llegaron datos del proveedor: fin de los latidos

        const status = proxyRes.statusCode || 502;

        if (status >= 200 && status < 300) {
            // Exito: transmitir el body JSON tal cual (pipe = streaming)
            proxyRes.on('error', function(e) {
                sendErrorEnvelope('Error de streaming: ' + e.message, 502);
            });
            proxyRes.pipe(clientRes);
        } else if (status >= 300 && status < 400) {
            // No seguimos redirecciones (evita exfiltracion SSRF)
            proxyRes.resume();
            sendErrorEnvelope('Redireccion no permitida (SSRF)', status);
        } else {
            // Error del proveedor: envolver en el "sobre" JSON
            const chunks = [];
            proxyRes.on('data', function(c) { chunks.push(c); });
            proxyRes.on('end', function() {
                const upstreamBody = Buffer.concat(chunks).toString('utf8');
                let msg = 'Error del proveedor (HTTP ' + status + ')';
                const upstreamJson = (function() {
                    try { return JSON.parse(upstreamBody); } catch (e) { return null; }
                })();
                if (upstreamJson && upstreamJson.error) {
                    msg = (typeof upstreamJson.error === 'string')
                        ? upstreamJson.error
                        : (upstreamJson.error.message || msg);
                } else if (upstreamJson && upstreamJson.message) {
                    msg = upstreamJson.message;
                }
                sendErrorEnvelope(msg, status, upstreamBody);
            });
            proxyRes.on('error', function() {
                sendErrorEnvelope('Error leyendo respuesta del proveedor', 502);
            });
        }
    });

    upstreamReq.on('timeout', function() {
        settle();
        upstreamReq.destroy();
        sendErrorEnvelope('Timeout del proveedor (' + (UPSTREAM_TIMEOUT_MS / 1000) + 's)', 504);
    });

    upstreamReq.on('error', function(e) {
        settle();
        sendErrorEnvelope('Error de conexion: ' + e.message, 502);
    });

    if (body && body.length) {
        upstreamReq.write(body);
    }
    upstreamReq.end();
}

// ============================================================
//  ENDPOINT /api/chat
// ============================================================
async function handleChatProxy(req, res) {
    try {
        // Rate limit por IP de cliente
        const clientIp = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
            req.socket.remoteAddress || 'unknown';
        if (isRateLimited(clientIp)) {
            res.writeHead(429, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Too many requests: limite de ' + RL_MAX_REQS + ' peticiones por minuto');
            return;
        }

        const parsedBody = await parseBody(req);
        if (parsedBody.overflow) {
            res.writeHead(413, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: { message: 'Body demasiado grande', upstream_status: 413 } }));
            return;
        }

        const targetUrl = req.headers['x-target-url'];
        const apiKey = String(req.headers['x-api-key'] || '').slice(0, 512);

        // Validacion SSRF (Problema 1). Responder en texto plano (no JSON)
        // para que el cliente distinga "bloqueo del servidor" de un error
        // del proveedor de IA.
        const validation = validateProxyUrl(targetUrl);
        if (!validation.ok) {
            console.warn('[SSRF BLOQUEADO] ' + validation.reason + ' -> ' + String(targetUrl).slice(0, 200));
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Forbidden: ' + validation.reason);
            return;
        }

        if (/[\r\n]/.test(apiKey)) {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Bad request: API key invalida');
            return;
        }

        const headers = { 'Content-Type': 'application/json' };
        if (apiKey) {
            headers['Authorization'] = 'Bearer ' + apiKey;
        }

        proxyStreamRequest(targetUrl, 'POST', headers, parsedBody.buffer, res);
    } catch (e) {
        try {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: { message: 'Error interno del proxy: ' + e.message, upstream_status: 502 } }));
        } catch (_) {}
    }
}

// ============================================================
//  SERVIDOR
// ============================================================
const server = http.createServer((req, res) => {
    setCORS(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const reqUrl = new URL(req.url, 'http://localhost');
    const pathname = reqUrl.pathname;

    if (pathname === '/api/chat') {
        if (req.method === 'POST') {
            return handleChatProxy(req, res);
        }
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Method not allowed');
        return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Method not allowed');
        return;
    }

    return serveStatic(req, res);
});

server.listen(PORT, () => {
    console.log('==========================================');
    console.log('  SCRIPT AI - Servidor unificado');
    console.log('  http://localhost:' + PORT);
    console.log('==========================================');
    console.log('  Estaticos:   /');
    console.log('  Texto:       POST /api/chat');
    console.log('  SSRF:        whitelist de ' + ALLOWED_PROXY_HOSTS.size + ' dominios');
    console.log('  DNS rebind:  bloqueo de IPs privadas en la conexion');
    console.log('  Rate limit:  ' + RL_MAX_REQS + ' req/min por IP');
    console.log('  CORS:        ' + CORS_ORIGIN);
    console.log('  Localhost:   ' + (ALLOW_LOCALHOST ? 'PERMITIDO (ALLOW_LOCALHOST=1)' : 'bloqueado (ALLOW_LOCALHOST=1 para Ollama)'));
    console.log('  Heartbeat:   cada ' + (HEARTBEAT_MS / 1000) + 's | Timeout upstream: ' + (UPSTREAM_TIMEOUT_MS / 1000) + 's');
    console.log('==========================================');
});
