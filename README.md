<img width="1536" height="1024" alt="free script power" src="https://github.com/user-attachments/assets/3f65aa18-79cc-4aba-b7f8-f9e7b055b72e" />



# FREE SCRIPT POWER — Guionista con IA

> **By FAP / fierroduque.com** — Parte del ecosistema [Free Animation Power](https://freeanimationpower.org).

Aplicacion web que convierte una **idea + parametros creativos** en un **guion narrativo completo en formato de guion profesional**, usando inteligencia artificial multi-proveedor. El resultado se muestra en un **editor en pantalla** donde puedes:

- **Editar el texto** directamente.
- **Seleccionar cualquier parte** (o indicar escenas) y pedir una **correccion automatica con IA** escribiendo una instruccion en lenguaje natural: *"haz este dialogo mas comico"*, *"cambia el final a uno feliz"*...
- Deshacer correcciones, guardar proyectos y exportar a `.txt`, `.fountain`, `.docx` (Word) o `PDF` con **formato de guion profesional** y **portada con marca de agua**.

Arquitectura multi-proveedor: el usuario conecta su **propia API key** del servicio que prefiera (OpenAI, Gemini, Mistral, DeepSeek, Groq, OpenRouter...), sin depender de un unico modelo. Hay proveedores **gratuitos** y **de pago**.

Parte del ecosistema **Free Animation Power (FAP)** junto con:

- [FAP Web Hub](https://freeanimationpower.org) — Landing page oficial con todas las herramientas
- [FAP Desktop](https://github.com/freeanimationpower/FAP_PC_WEB_VERSION) — Estudio de animacion 2D para PC
- [FAP Mobile](https://github.com/freeanimationpower/FAP_MOBILE_WEB_VERSION) — Estudio de animacion 2D para moviles
- [FAP AI Storyboard WEB](https://github.com/freeanimationpower/FAP_AI_STORYBOARD_WEB) — Generador de storyboards con IA
- [FAP Desktop App](https://github.com/freeanimationpower/FreeAnimationPower) — Aplicacion nativa Windows (C++20/Qt 6)

---

## Tabla de contenidos

1. [Caracteristicas](#caracteristicas)
2. [Inicio rapido](#inicio-rapido)
3. [Guia de uso paso a paso](#guia-de-uso-paso-a-paso)
4. [Los 12 formatos de guion](#los-12-formatos-de-guion)
5. [Correccion inteligente](#correccion-inteligente)
6. [Proyectos guardados](#proyectos-guardados)
7. [Exportacion](#exportacion)
8. [Proveedores de IA](#proveedores-de-ia)
9. [Arquitectura tecnica](#arquitectura-tecnica)
10. [Seguridad](#seguridad)
11. [Errores inteligentes](#errores-inteligentes)
12. [Variables de entorno](#variables-de-entorno)
13. [Deploy a produccion](#deploy-a-produccion)
14. [Estructura de archivos](#estructura-de-archivos)
15. [Licencia](#licencia)

---

## Caracteristicas

- **12 formatos de guion** con estructura profesional forzada por prompt: Animacion 2D, Animacion 3D, Cortometraje, Largometraje, Documental, YouTube, Podcast, Teatro, Videojuego, Publicidad, TikTok/Reels/Shorts y Serie.
- **Parametros creativos**: idea, formato, genero, duracion, tono, audiencia, personajes e idioma del guion (espanol / ingles).
- **Editor en pantalla**: el guion generado es 100% editable antes de exportar.
- **Correccion inteligente por seleccion**: selecciona un fragmento con el raton (o escribe `ESCENA 2`, `ESCENAS 1-3`, `ACTO IV`, `TODO`) + una instruccion → la IA devuelve **solo esa parte corregida**, el resto del guion queda intacto.
- **Historial de correcciones** con deshacer.
- **Proyectos guardados** en el navegador (hasta 30, con carga completa de parametros).
- **Exportacion**: copiar al portapapeles, `.txt`, `.fountain` (compatible con Final Draft / Highland 2 / Trelby), `.docx` (Word real) y `PDF` con portada, marca de agua y formato de guion profesional.
- **Interfaz ES/EN** con selector de idioma en vivo.
- **11 proveedores de texto** (formato OpenAI-compatible generico + Gemini nativo), gratuitos y de pago.
- **Cero dependencias de servidor**: solo modulos nativos de Node.js (`http`, `https`, `fs`, `path`).

---

## Inicio rapido

```bash
# 1. Clonar
git clone https://github.com/freeanimationpower/FREE-SCRIPT-POWER.git
cd FREE-SCRIPT-POWER

# 2. Iniciar servidor (Node.js, sin npm install)
node server.js

# 3. Abrir navegador
http://localhost:3000

# 4. (Opcional) Configurar API
Click en "Configurar APIs" > elegir proveedor > pegar API key > Guardar

# 5. Escribir idea, elegir formato y parametros
# 6. Click "Generar guion"
# 7. Editar / corregir con IA / exportar
```

> **Nota**: las API keys se guardan solo en tu navegador (localStorage). El servidor no las almacena. Sin key configurada la app te lo indicara con un mensaje.

---

## Guia de uso paso a paso

### 1. Configurar la API

Abre **"Configurar APIs"** (boton naranja). El panel permite:

| Campo | Descripcion |
|---|---|
| **Proveedor** | 11 presets: OpenAI, Mistral, Gemini, OpenCode Zen, DeepSeek, Groq, Fireworks, Together, OpenRouter, xAI y Personalizado |
| **API Key** | Tu clave. El placeholder muestra el formato correcto segun el proveedor (`AIzaSy...` para Gemini, `gsk_...` para Groq, `sk-proj-...` para OpenAI...) |
| **Modelo** | Se rellena automaticamente al elegir proveedor. Puedes cambiarlo (ej. `gemini-2.0-flash` → `gemini-2.5-pro`) |
| **URL Base** | Se rellena automaticamente. Solo editable en "Personalizado" (ej. Ollama local) |

Pulsa **Guardar configuracion**. Guia completa para obtener keys gratuitas y de pago: [`MANUAL_APIS.md`](MANUAL_APIS.md).

### 2. Crear el guion

- **Idea / premisa**: describe la historia en 1-4 lineas.
- **Formato**: elige uno de los 12 chips (ver seccion siguiente).
- **Genero, duracion, tono, audiencia**: parametros opcionales que la IA incorpora al guion.
- **Personajes**: opcional, con el formato `NOMBRE (descripcion)`.
- **Idioma del guion**: Espanol o English (independiente del idioma de la interfaz).

Pulsa **Generar guion**. La IA responde con el guion completo en el editor.

### 3. Editar

El editor es un area de texto libre: puedes corregir palabras, reescribir dialogos, borrar escenas... El contador de palabras se actualiza en vivo.

### 4. Corregir con IA

Ver seccion [Correccion inteligente](#correccion-inteligente).

### 5. Exportar

Ver seccion [Exportacion](#exportacion).

---

## Los 12 formatos de guion

Cada formato inyecta en el prompt una **estructura obligatoria** propia, de modo que la IA entrega un documento coherente con el medio:

| Formato | Estructura forzada |
|---|---|
| **Animación 2D** | TITULO / FORMATO / DURACION / SINOPSIS / ESCENAS con descripcion visual animable / dialogos / (ACCION) / TRANSICION / NOTAS DE PRODUCCION (paleta, estilo de dibujo) |
| **Animación 3D** | Igual que 2D + NOTAS VFX (particulas, simulaciones) y estilo de render (PBR, toon, realista) |
| **Cortometraje** | Estilo Hollywood: TITULO / LOGLINE / SINOPSIS / PERSONAJES / ESCENA INT./EXT. / dialogos / (PARENTETICO) / TRANSICION / planteamiento-nudo-climax |
| **Largometraje** | Como corto + resumen ACTO I/II/III y minimo 8 escenas con dialogos completos |
| **Documental** | TESIS / escaleta con duraciones / SECUENCIAS / VOZ EN OFF literal / ENTREVISTA / ARCHIVO-B-ROLL / tono (observacional, expositivo, poetico) |
| **YouTube** | TITULO clickbait (max 60 caracteres) / HOOK (0:00-0:30) / INTRO / SECCIONES con timestamps / notas [B-ROLL], [TEXTO EN PANTALLA], [ZOOM] / CTA FINAL |
| **Podcast** | CABECERA con [SFX] / BLOQUES con duracion / LOCUTOR-INVITADO literal / CIERRE con CTA |
| **Teatro** | ACTOS / ESCENAS / escenografia e iluminacion / dialogos `PERSONAJE:` / acotaciones |
| **Videojuego** | MISIONES / CONTEXTO de gameplay / cinematicas / dialogos ramificados (OPCION A/B) / RESULTADO de cada eleccion / bosses y lore |
| **Publicidad** | SPOT / MARCA / OBJETIVO / ESCENAS con tiempos / V.O. literal / SFX / packshot + slogan |
| **TikTok / Reels / Shorts** | GANCHO (0:00-0:03, critico) / BEATS con tiempos / [TEXTO EN PANTALLA] / CTA final |
| **Serie** | COLD OPEN / RECAP / ESCENAS / ACTOS / cliffhanger de cierre / arco de temporada |

Reglas globales aplicadas siempre: respuesta en texto plano sin markdown, personajes en MAYUSCULAS antes del dialogo, descripciones cinematograficas en presente, guion completo con principio-desarrollo-final.

---

## Correccion inteligente

### Alcance por 2 vias

**Via 1 — Seleccion manual**: selecciona texto con el raton dentro del editor. Un badge muestra "Seleccion: N caracteres". Tiene prioridad sobre la via 2 (boton "Quitar seleccion" para desactivarla).

**Via 2 — Por escenas**: escribe en el campo "O indicar escenas". Sintaxis soportada:

| Input | Resultado |
|---|---|
| `ESCENA 2` | corrige la escena 2 |
| `ESCENAS 1-3` | corrige las escenas 1 a 3 |
| `2 A 4` | idem con rango |
| `ACTO IV` | soporta numeros romanos |
| `ESCENA 5 DIALOGO` | ignora las palabras extra y corrige la escena 5 |
| `TODO` | corrige el guion completo |

La app divide el guion en bloques detectando encabezados (`ESCENA`, `SECUENCIA`, `SECCION`, `BLOQUE`, `ACTO`, `MISION`, `BEAT`, `SHOT`, `COLD OPEN`, `EPISODIO`) con numero arabigo o romano.

### Flujo

1. Escribe la **instruccion de correccion** (ej. *"haz este dialogo mas comico y mas corto"*).
2. Pulsa **Corregir con IA**.
3. La app envia a la IA: una **ventana de contexto** alrededor del fragmento (3000 caracteres antes / 1500 despues, para no gastar tokens), el fragmento marcado y tu instruccion.
4. La IA debe devolver el fragmento corregido envuelto en `<script_content>...</script_content>`. Una funcion `cleanLLMResponse()` extrae solo ese contenido; si el modelo ignora las etiquetas, una heuristica recorta las lineas conversacionales ("Aqui tienes...", "Claro...", "Espero que te sirva...") sin tocar dialogos reales.
5. Solo se reemplaza el rango indicado; el resto del guion queda **intacto**.

### Historial y deshacer

- Cada correccion guarda: instruccion, alcance, texto antes, texto despues y fecha.
- **Deshacer ultima correccion** restaura el estado anterior si el guion no fue editado manualmente despues.
- El historial se limpia al generar un guion nuevo o cargar un proyecto.

---

## Proyectos guardados

- Boton **Guardar proyecto**: guarda el guion + todos los parametros (idea, formato, genero, etc.) en localStorage (maximo 30).
- La lista de **Proyectos guardados** permite **Abrir** (restaura todo) o **X** (eliminar).
- Los titulos se extraen de la linea `TITULO:` del guion.
- Si el almacenamiento del navegador se llena, la app ejecuta una limpieza de emergencia automatica (ver [Seguridad](#seguridad)).

---

## Exportacion

| Boton | Formato | Detalle |
|---|---|---|
| **Copiar** | portapapeles | con fallback para navegadores sin `navigator.clipboard` |
| **.txt** | texto plano | UTF-8, nombre = titulo del guion |
| **.fountain** | [Fountain](https://fountain.io) | estandar de texto plano para guiones, importable en Final Draft, Highland 2, Trelby, Beat... |
| **Word** | `.docx` real | generado en el navegador (JSZip CDN) con formato profesional. Fallback a `.doc` compatible si no hay conexion |
| **PDF** | `.pdf` | portada + formato de guion + marca de agua (ver abajo) |

### Formato de guion aplicado en PDF y Word

La app clasifica cada linea y le da el tratamiento profesional estandar:

- `TITULO:` → titulo grande centrado.
- `FORMATO: / DURACION: / SINOPSIS: ...` → etiquetas en negrita.
- `ESCENA 1 — INT. LUGAR — DIA` → **negrita**, en mayusculas, con espacio previo.
- `LIA` (linea en MAYUSCULAS) → **nombre de personaje CENTRADO** en negrita.
- Linea siguiente → **dialogo** en bloque indentado (izquierda/derecha).
- `(acotacion)` → centrada en italica.
- `CORTE A: / FUNDIDO: / TRANSICION:` → alineada a la derecha.
- Texto normal → parrafo de accion.

### Portada y marca de agua (PDF)

- **Portada**: logo FAP, "SCRIPT AI", titulo del guion, fecha y los logos con **freeanimationpower.org** y **fierroduque.com** al pie.
- **Marca de agua**: en cada pagina, al pie, los logos y URLs semitransparentes (opacidad 7%).
- El Word incluye su propia portada con salto de pagina.

---

## Proveedores de IA

| Proveedor | Modelo sugerido | Tipo | Formato key |
|---|---|---|---|
| Google Gemini | gemini-2.0-flash | **Gratis** | `AIzaSy...` |
| Mistral AI | mistral-large-latest | Gratis/Pago | key de console.mistral.ai |
| Groq | openai/gpt-oss-20b | **Gratis** | `gsk_...` |
| Fireworks AI | llama-v3p1-70b-instruct | Gratis | key de fireworks.ai |
| Together AI | Llama-3.3-70B-Instruct-Turbo | Gratis | key de together.xyz |
| OpenCode Zen | deepseek-v4-flash-free | Pago (saldo $20) | key de opencode.ai/zen |
| OpenAI | gpt-4o | Pago | `sk-proj-...` |
| DeepSeek | deepseek-chat | Pago (barato) | `sk-...` |
| OpenRouter | openai/gpt-4o | Pago | `sk-or-...` |
| xAI Grok | grok-2 | Pago | `xai-...` |
| Personalizado | cualquier endpoint OpenAI-compatible | — | opcional (Ollama/LM Studio) |

**Recomendado para empezar**: Google Gemini (una sola key, ~1500 peticiones/dia gratis, excelente en espanol). Guia paso a paso para obtener cada key: [`MANUAL_APIS.md`](MANUAL_APIS.md).

> **Nota sobre limites gratuitos**: algunos planes gratuitos limitan los tokens por minuto (ej. Groq on_demand: 8000 TPM). La app ajusta automaticamente el `max_tokens` por proveedor (5120 en Groq) y las correcciones usan ventanas de contexto reducidas para no reventar esos limites.

---

## Arquitectura tecnica

```
┌───────────────────────────── NAVEGADOR ─────────────────────────────┐
│  index.html + app.js (HTML5 + Tailwind CDN + Vanilla JS, sin build) │
│                                                                     │
│  ┌──────────────┐   ┌────────────────┐   ┌───────────────────────┐  │
│  │ Formulario   │──▶│ callTextAPI()  │──▶│ Editor + correccion   │  │
│  │ (parametros) │   │ (conector IA)  │   │ por seleccion + hist. │  │
│  └──────────────┘   └───────┬────────┘   └───────────────────────┘  │
│                             │ fetch POST /api/chat                  │
│   localStorage: config (API keys), proyectos, historial, idioma     │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
┌─────────────────────────────▼── SERVIDOR NODE (server.js) ──────────┐
│  POST /api/chat → whitelist SSRF → proxy streaming con heartbeat    │
│  Lee headers: x-target-url (URL destino) + x-api-key (clave)        │
│  Reenvia el body JSON SIN MODIFICAR al proveedor.                   │
│  NO almacena ninguna key.                                           │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ https
                              ▼
        OpenAI / Gemini / Mistral / DeepSeek / Groq / ... (proveedor)
```

- **Frontend**: HTML5 + Tailwind CSS (CDN) + JavaScript Vanilla. Sin build, sin dependencias npm.
- **Tema visual**: FAP corporativo — fondo amarillo `#ffdc00`, cards blancas, acento naranja `#ff4200`, fuentes Outfit + Plus Jakarta Sans + JetBrains Mono.
- **Servidor**: Node.js puro — estaticos + proxy de texto `/api/chat`.
- **Exportacion**: jsPDF + JSZip (CDN) — empaquetado 100% en el navegador.
- **2 formatos de conector**: (A) OpenAI-compatible con `Authorization: Bearer` para 10 proveedores; (B) Gemini nativo con la key en query param y prompt en `system_instruction.parts`.
- **Reintentos inteligentes**: 429 (rate limit) reintenta 2 veces esperando 30s/50s; 503 (modelo cargando) esperando 50s/80s; respuesta sin texto parseable reintenta 3 veces; errores 4xx fallan rapido sin reintentar.

---

## Seguridad

### Anti-SSRF (servidor)

El endpoint `/api/chat` **no acepta URLs arbitrarias**. `validateProxyUrl()` aplica:

- **Whitelist estricta** de dominios: `api.openai.com`, `generativelanguage.googleapis.com`, `api.mistral.ai`, `api.deepseek.com`, `api.groq.com`, `api.fireworks.ai`, `api.together.xyz`, `openrouter.ai`, `api.x.ai`, `opencode.ai`.
- Comparacion **exacta** de hostname en minusculas (bloquea `api.openai.com.evil.com` y similares).
- Prohibido: credenciales en URL (`https://user@host`), puertos no estandar, protocolos no http(s), redirecciones 3xx (no se siguen).
- `localhost` bloqueado por defecto; activable solo con `ALLOW_LOCALHOST=1` (Ollama / LM Studio), solo http y puertos de IA conocidos.
- **Anti DNS rebinding**: `secureLookup` resuelve el hostname en el momento de conectar y bloquea la conexion si alguna IP es privada, loopback, link-local o reservada (10/8, 172.16/12, 192.168/16, 127/8, 169.254/16, 100.64/10, `::1`, ULA, fe80::/10...). Protege en caso de que se agreguen hosts propios via `SSRF_EXTRA_HOSTS`.
- Anti-DoS: body maximo 4 MB, key maximo 512 caracteres sin saltos de linea.
- Respuesta 403 en texto plano (para que el cliente lo distinga de un error del proveedor).

### Anti path traversal (servidor)

Los archivos estaticos se sirven desde una **whitelist cerrada** (`/index.html`, `/app.js`, `/logo-fap.png`). Cualquier otra ruta (incluidos intentos con `../`, `%2e%2e`, backslashes o query strings) responde 404. Esto impide leer `server.js`, un hipotetico `.env` o cualquier archivo del servidor.

### Rate limit (servidor)

`/api/chat` limita a **30 peticiones por minuto por IP** (token bucket en memoria). Pasado el limite responde `429`. Pensado para evitar que el proxy se use como relay abierto o se abuse del hosting.

### CORS

`Access-Control-Allow-Origin` es configurable con `CORS_ORIGIN`. Por defecto `*` (desarrollo); en produccion se recomienda fijarlo al dominio oficial, ej. `CORS_ORIGIN=https://freeanimationpower.org`. Si la app y el proxy viven en el mismo dominio, CORS no interviene.

### Headers de seguridad

Los estaticos se sirven con `X-Content-Type-Options: nosniff` y `X-Frame-Options: DENY`. Metodos no permitidos (`POST` a estaticos, `GET` a `/api/chat`) responden `405`.

### Heartbeat anti-timeout

El proxy responde **HTTP 200 inmediato (chunked)** y emite **un byte en blanco cada 15 s** mientras el proveedor no responde. Esto evita que los balanceadores de hostings (Render, Railway, Heroku...) corten conexiones inactivas de 30-60 s. Los bytes son espacios en blanco antes del JSON, tolerados por `JSON.parse()`. Como el status se envia temprano, los errores del proveedor viajan en un "sobre" JSON (`{"error":{"message","upstream_status"}}`) que el cliente mapea a los mismos errores de siempre.

### Almacenamiento local seguro

Wrapper `lsSet()` con limpieza de emergencia ante `QuotaExceededError` (codigo 22 / Firefox 1014):

1. Intento de guardado directo.
2. Si falla: purga la **mitad mas antigua** del historial de correcciones.
3. Si sigue fallando: purga los **proyectos mas antiguos** (menos modificados recientemente).
4. Si aun falla: devuelve `false` y la UI avisa con un mensaje claro (nunca rompe la app).

### Limpieza anti-"chattiness" de los LLM

`cleanLLMResponse()` evita que texto conversacional de la IA contamine el guion: extrae el contenido entre `<script_content>...</script_content>` (instruido en el prompt); si no hay etiquetas, una heuristica recorta lineas de saludo/despedida en ES/EN con protecciones para no borrar encabezados de escena, metadatos o dialogos reales ("Claro." como dialogo se respeta).

### Privacidad

- Las API keys se guardan **solo en el navegador** del usuario (localStorage).
- El servidor proxy **no almacena** ninguna key — solo forwardea peticiones.
- Las keys nunca se envian a servidores de terceros no configurados por el usuario.

---

## Errores inteligentes

| Mensaje | Causa | Solucion |
|---|---|---|
| `No hay API key configurada` | falta key en Configurar APIs | pega tu key y Guardar |
| `API key invalida o sin creditos` | key mal copiada, vencida o sin saldo | revisa la key (Gemini usa `AIzaSy...`) |
| `Limite de uso alcanzado` | 429 del proveedor gratuito | espera unos minutos o cambia de proveedor |
| `Modelo no encontrado` | nombre del modelo mal escrito o deprecado | re-elegir el proveedor en el dropdown (rellena el modelo correcto) |
| `La peticion excede el limite de tokens del plan gratuito` | plan gratuito con TPM bajo (ej. Groq) | usa Gemini o acorta la idea |
| `El servidor proxy no responde` | server.js no esta corriendo | ejecuta `node server.js` |
| `El servidor bloqueo la URL del proveedor (whitelist)` | la URL Base apunta a un host no permitido | re-elegir el proveedor o revisar URL Base |
| `Tiempo de espera agotado` | el proveedor tardo mas de 120 s | reintenta |

---

## Variables de entorno (server.js)

| Variable | Defecto | Descripcion |
|---|---|---|
| `PORT` | `3000` | Puerto HTTP |
| `HEARTBEAT_MS` | `15000` | Intervalo del latido de conexion en ms |
| `UPSTREAM_TIMEOUT_MS` | `120000` | Timeout de la peticion al proveedor |
| `ALLOW_LOCALHOST` | `(off)` | `1` para permitir proveedores locales (Ollama/LM Studio) |
| `SSRF_EXTRA_HOSTS` | `(vacio)` | Hosts extra permitidos en el proxy, separados por comas |
| `CORS_ORIGIN` | `*` | Origen permitido en CORS; fijar al dominio oficial en produccion |

Ejemplo:

```bash
# PowerShell
$env:PORT=3001; node server.js

# Bash
PORT=3001 ALLOW_LOCALHOST=1 node server.js
```

---

## Deploy a produccion

| Plataforma | Comando |
|---|---|
| Render.com / Railway / Fly.io | `node server.js` |
| VPS / Hostinger | `node server.js` |

- Sin `npm install`: cero dependencias de servidor.
- Configura `PORT` segun la plataforma.
- Los CDN (Tailwind, jsPDF, JSZip) requieren conexion a internet del navegador; el resto funciona offline.

---

## Estructura de archivos

```
FREE-SCRIPT-POWER/
├── index.html        # UI completa: formulario, editor, paneles, toolbar
├── app.js            # Logica del cliente (~1750 lineas, vanilla JS)
├── server.js         # Servidor Node: estaticos + proxy /api/chat
├── logo-fap.png      # Logo corporativo (portada y marca de agua)
├── README.md         # Este documento
├── MANUAL_APIS.md    # Guia paso a paso para obtener cada API key
├── INFORME.md        # Informe tecnico detallado de arquitectura
└── .gitignore
```

Secciones principales de `app.js`: `I18N` (ES/EN) · `TEXT_PROVIDERS` (11 conectores) · `SCRIPT_FORMATS` (12 plantillas de estructura) · `lsSet` (almacenamiento seguro) · `cleanLLMResponse` (anti-chattiness) · `callTextAPI` (proxy + reintentos) · `parseSceneRange` / `extractSceneBlocks` (correccion por escenas) · `classifyScriptLines` (formato profesional de export) · `exportPdf` / `exportWord` / `exportTxt` / `exportFountain`.

---

## Licencia

© Todos los derechos reservados. Free Animation Power (FAP) por Eduardo Fierro Duque.

- [freeanimationpower.org](https://freeanimationpower.org)
- [fierroduque.com](https://www.fierroduque.com)
- GitHub: [freeanimationpower](https://github.com/freeanimationpower)
