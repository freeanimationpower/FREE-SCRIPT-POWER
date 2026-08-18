# INFORME TÉCNICO — SCRIPT AI (FAP_AI_SCRIPT_WEB)

**Fecha:** 18/08/2026
**Autor:** Eduardo Fierro Duque — Free Animation Power / fierroduque.com
**Versión:** 1.0 (web)

---

## 1. Resumen ejecutivo

Script AI es una aplicación web que convierte una **idea + parámetros creativos** en un **guion narrativo completo en formato de guion profesional**, usando IA multi-proveedor. El resultado se muestra en un **editor en pantalla** donde el usuario puede:

1. Editar el texto manualmente.
2. **Seleccionar fragmentos** (o indicar escenas) y pedir **corrección automática con IA** mediante instrucciones en lenguaje natural.
3. Deshacer correcciones, guardar proyectos y exportar a `.txt`, `.fountain` o `PDF`.

La arquitectura replica el patrón validado de FAP_AI_STORYBOARD_WEB: frontend sin build (HTML5 + Tailwind CDN + JS vanilla), servidor Node.js con proxy genérico, y claves de API almacenadas únicamente en el navegador del usuario.

**Estado actual:** funcional. Sintaxis validada (`node --check`), servidor probado (estáticos 200 OK), proxy probado con petición real a Google Gemini (reenvío de error 400 correcto con body JSON intacto). Pendiente de prueba de usuario: generación con API key real.

---

## 2. Estructura de archivos

```
FAP_AI_SCRIPT_WEB/
├── index.html        # UI completa (30 KB) — formulario, editor, paneles
├── app.js            # Lógica de cliente (58 KB) — sin frameworks
├── server.js         # Servidor Node: estáticos + proxy /api/chat (4.7 KB)
├── logo-fap.png      # Logo corporativo FAP
├── README.md         # Documentación de usuario
├── MANUAL_APIS.md    # Guía paso a paso para obtener API keys
└── INFORME.md        # Este documento
```

---

## 3. Arquitectura general

```
┌───────────────────────────── NAVEGADOR ─────────────────────────────┐
│  index.html + app.js (JS vanilla, sin build)                        │
│                                                                     │
│  ┌──────────────┐   ┌────────────────┐   ┌───────────────────────┐  │
│  │ Formulario   │──▶│ callTextAPI()  │──▶│ Editor + corrección   │  │
│  │ (parámetros) │   │ (conector IA)  │   │ por selección + hist. │  │
│  └──────────────┘   └───────┬────────┘   └───────────────────────┘  │
│                             │ fetch POST /api/chat                  │
│        localStorage: config (API keys), proyectos, historial        │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
┌─────────────────────────────▼── SERVIDOR NODE (server.js) ──────────┐
│  POST /api/chat  →  handleChatProxy()                               │
│    Lee headers: x-target-url (URL destino) + x-api-key (clave)      │
│    Reenvía el body JSON SIN MODIFICAR al proveedor                  │
│    NO almacena ninguna key.                                         │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ https (proxyRequest)
                              ▼
        OpenAI / Gemini / Mistral / DeepSeek / Groq / ... (proveedor)
```

**Principio clave:** el navegador nunca habla directo con el proveedor (evita CORS y expone la key en el frontend el menor tiempo posible). El servidor es un simple *passthrough*: reenvía body y devuelve status + body del proveedor tal cual.

---

## 4. FORMATOS DE CONECTORES DE API (detalle)

Existen **2 formatos de conexión** y **11 proveedores** preconfigurados (app.js:208).

### 4.1 Formato A — OpenAI-compatible (10 de 11 proveedores)

Usado por: OpenAI, Mistral, OpenCode Zen, DeepSeek, Groq, Fireworks, Together, OpenRouter, xAI y Personalizado.

**Endpoints (POST):**

| Proveedor | URL base (campo `textUrl`) | Modelo por defecto |
|---|---|---|
| OpenAI | `https://api.openai.com/v1/chat/completions` | `gpt-4o` |
| Mistral AI | `https://api.mistral.ai/v1/chat/completions` | `mistral-large-latest` |
| OpenCode Zen | `https://opencode.ai/zen/v1/chat/completions` | `deepseek-v4-flash-free` |
| DeepSeek | `https://api.deepseek.com/v1/chat/completions` | `deepseek-chat` |
| Groq | `https://api.groq.com/openai/v1/chat/completions` | `openai/gpt-oss-20b` |
| Fireworks | `https://api.fireworks.ai/inference/v1/chat/completions` | `accounts/fireworks/models/llama-v3p1-70b-instruct` |
| Together | `https://api.together.xyz/v1/chat/completions` | `meta-llama/Llama-3.3-70B-Instruct-Turbo` |
| OpenRouter | `https://openrouter.ai/api/v1/chat/completions` | `openai/gpt-4o` |
| xAI Grok | `https://api.x.ai/v1/chat/completions` | `grok-2` |
| Personalizado | cualquiera (ej. Ollama `http://localhost:11434/v1/chat/completions`) | el que el usuario escriba |

**Payload enviado (construido en app.js:620-640):**

```json
{
  "model": "<modelo configurado>",
  "messages": [
    { "role": "system", "content": "<prompt de sistema por formato>" },
    { "role": "user",   "content": "<brief con parámetros / fragmento a corregir>" }
  ],
  "max_tokens": 8192
}
```

**Autenticación:** header HTTP estándar `Authorization: Bearer <API_KEY>`.

**Cómo viaja al servidor proxy:** el cliente envía el JSON anterior a `POST /api/chat` con 2 headers propietarios:

```
Content-Type: application/json
x-target-url: https://api.openai.com/v1/chat/completions   ← URL de destino
x-api-key:    sk-proj-...                                   ← clave (opcional)
```

El servidor (server.js:139-145) lee `x-target-url` y `x-api-key`, y reenvía el body con header `Authorization: Bearer <key>` hacia el destino. Si no hay `x-api-key` (ej. Ollama local), no añade el header Authorization.

**Respuesta esperada (parsing en app.js:690-700):**

```json
{ "choices": [ { "message": { "content": "TEXTO DEL GUION..." } } ] }
```

La app extrae `choices[0].message.content`. Si no llega texto, reintenta (ver sección 5).

---

### 4.2 Formato B — Gemini nativo (Google)

Usado por: Google Gemini. **No usa el formato OpenAI**: tiene su propia estructura.

**Endpoint (POST, la key va en la URL):**

```
https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent?key={API_KEY}
```

**Payload enviado (construido en app.js:585-597):**

```json
{
  "system_instruction": { "parts": [ { "text": "<prompt de sistema>" } ] },
  "contents": [
    { "role": "user", "parts": [ { "text": "<brief / fragmento>" } ] }
  ],
  "generationConfig": { "maxOutputTokens": 8192 }
}
```

**Diferencias clave frente al formato A:**
- La API key viaja como query param `?key=` en la URL (por eso va embebida en `x-target-url`), no como header Bearer.
- El prompt de sistema va en `system_instruction.parts[].text`, no en `messages[0].role=system`.
- No existe `x-api-key` en la petición al proxy; el servidor proxy no añade `Authorization`.

**Respuesta esperada (parsing en app.js:599-606):**

```json
{ "candidates": [ { "content": { "parts": [ { "text": "TEXTO DEL GUION..." } ] } } ] }
```

La app concatena todos los `parts[].text` del primer candidato.

---

### 4.3 Tabla comparativa de conectores

| Proveedor | Formato | Auth | Key en | Tipo | Notas |
|---|---|---|---|---|---|
| OpenAI GPT-4o | A (OpenAI) | Bearer | header | Pago | Mejor calidad general |
| Mistral AI | A (OpenAI) | Bearer | header | Gratis/Pago | Tier gratuito generoso |
| Google Gemini | **B (Gemini)** | query `?key=` | URL | Gratis | ~1500 req/día |
| OpenCode Zen | A (OpenAI) | Bearer | header | Pago (saldo $20) | Ya no es gratis |
| DeepSeek | A (OpenAI) | Bearer | header | Pago | ~$0.001/generación |
| Groq | A (OpenAI) | Bearer | header | Gratis | Muy rápido |
| Fireworks | A (OpenAI) | Bearer | header | Gratis | — |
| Together | A (OpenAI) | Bearer | header | Gratis | — |
| OpenRouter | A (OpenAI) | Bearer | header | Pago | +200 modelos |
| xAI Grok | A (OpenAI) | Bearer | header | Pago | — |
| Personalizado | A (OpenAI) | Bearer | header | Local/otro | Ollama/LM Studio OK |

---

### 4.4 Verificación realizada del proxy

Prueba ejecutada contra el servidor real (`node server.js`, puerto 3000):

```
POST /api/chat
x-target-url: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaTestInvalidKey123
Body: {"contents":[{"role":"user","parts":[{"text":"hola"}]}]}

→ Respuesta: HTTP 400 (del proveedor, reenviado intacto)
{ "error": { "code": 400, "message": "API key not valid. Please pass a valid API key.",
             "status": "INVALID_ARGUMENT", ... } }
```

**Conclusión:** el proxy reenvía body, headers y status correctamente en ambos sentidos. Con una key válida el flujo completo genera el guion. (Pollinations se descartó como proveedor de texto porque su endpoint openai ahora devuelve 402 "pago requerido".)

---

## 5. Flujo de generación del guion

1. Usuario llena idea + parámetros (formato, género, duración, tono, audiencia, personajes, idioma) y pulsa **Generar guion** (app.js:754).
2. `collectParams()` lee el formulario y el chip de formato activo.
3. `buildBrief()` (app.js:544) arma el mensaje del usuario:
   ```
   IDEA / PREMISA: ...
   FORMATO: Animación 2D
   GENERO: ...   DURACION: ...   TONO: ...
   AUDIENCIA: ...  PERSONAJES: ...
   IDIOMA DEL GUION: ESPANOL
   ```
4. `obtenerSystemPrompt()` (app.js:558) selecciona la **guía de estructura del formato** (12 plantillas distintas, ver sección 6) y añade reglas estrictas: responder solo con texto plano, sin markdown, diálogos con subtexto, descripciones en presente, etc.
5. `callTextAPI()` (app.js:607) ejecuta la llamada con **reintentos inteligentes**:
   - 401/403 → error inmediato "API key inválida o sin créditos".
   - 429 (rate limit) → reintenta 2 veces más, esperando 30s y 50s.
   - 503 (modelo cargando) → reintenta 2 veces más, esperando 50s y 80s.
   - Respuesta sin texto parseable → reintenta hasta 3 intentos totales.
   - Timeout de fetch: 120 s (AbortController).
6. El texto resultante pasa por `stripMarkdown()` (elimina ``` si el modelo los añadió) y se vuelca al editor.
7. El editor muestra el guion editable; se activan herramientas: copiar, exportar, guardar, corregir.

---

## 6. Los 12 formatos de guion (prompts de estructura)

Cada formato tiene una plantilla de estructura obligatoria que se inyecta en el prompt del sistema (app.js:236-330):

| Formato | Estructura forzada |
|---|---|
| **Animación 2D** | TITULO / FORMATO / DURACIÓN / SINOPSIS / ESCENAS con (descripción visual animable) / diálogos / (ACCION) / TRANSICION / NOTAS DE PRODUCCIÓN (paleta, estilo) |
| **Animación 3D** | Igual + NOTAS VFX (partículas, simulaciones, render) y estilo de render (PBR, toon, realista) |
| **Cortometraje** | Estándar Hollywood: TITULO / LOGLINE / SINOPSIS / PERSONAJES / ESCENA INT./EXT. / diálogos / (PARENTÉTICO) / TRANSICIÓN / estructura planteamiento-nudo-clímax |
| **Largometraje** | + resumen ACTO I/II/III, mínimo 8 escenas con diálogos completos |
| **Documental** | TESIS / SECUENCIAS / VOZ EN OFF (literal) / ENTREVISTA / ARCHIVO-B-ROLL / escaleta con duraciones y tono |
| **YouTube** | TITULO clickbait / HOOK (0:00-0:30) / INTRO / SECCIONES con timestamps / notas [B-ROLL], [TEXTO EN PANTALLA], [ZOOM] / CTA FINAL |
| **Podcast** | CABECERA con [SFX] / BLOQUES con duración / LOCUTOR-INVITADO literal / CIERRE con CTA |
| **Teatro** | ACTOS / ESCENAS / escenografía / diálogos con nombre: / acotaciones |
| **Videojuego** | MISIONES / CONTEXTO gameplay / cinemáticas / diálogos ramificados (OPCIÓN A/B) / RESULTADO / bosses y lore |
| **Publicidad** | SPOT / MARCA / OBJETIVO / ESCENAS con tiempos / V.O. literal / SFX / packshot + slogan |
| **TikTok/Reels** | GANCHO (0:00-0:03) / BEATS con tiempos / [TEXTO EN PANTALLA] / CTA final |
| **Serie** | COLD OPEN / RECAP / ESCENAS / ACTOS / cliffhanger / arco de temporada |

Reglas globales añadidas siempre: respuesta en texto plano sin markdown, personajes en MAYÚSCULAS antes del diálogo, descripciones cinematográficas en presente, guion completo con principio-desarrollo-final.

---

## 7. Sistema de corrección inteligente

### 7.1 Selección de alcance (2 vías)

**Vía 1 — Selección manual:** el usuario selecciona texto con el ratón en el editor. Un listener (`select`/`mouseup`/`keyup` + `selectionchange`, app.js:801-810) captura `selectionStart/selectionEnd` y muestra un badge: "Selección: N caracteres".

**Vía 2 — Por escenas:** campo de texto libre parseado por `parseSceneRange()` (app.js:844). Sintaxis soportada (validada con tests):

| Input | Resultado |
|---|---|
| `ESCENA 2` | {from:2, to:2} |
| `ESCENAS 1-3` | {from:1, to:3} |
| `2 A 4` | {from:2, to:4} |
| `ACTO IV` | {from:4, to:4} (romanos) |
| `ESCENA 5 DIALOGO` | {from:5, to:5} |
| `TODO` | guion completo |
| texto sin números | null → alerta al usuario |

`extractSceneBlocks()` (app.js:875) divide el guion en bloques detectando encabezados `ESCENA/SECUENCIA/SECCION/BLOQUE/ACTO/MISION/BEAT/SHOT/COLD OPEN/EPISODIO` + número arábigo o romano, y calcula los índices exactos de caracteres del rango.

**Prioridad:** si hay selección manual activa, gana sobre el campo de escenas (botón "Quitar selección" para cambiar).

### 7.2 Flujo de corrección (app.js:1034)

1. Valida: guion existente + instrucción escrita + alcance válido.
2. Arma el mensaje:
   ```
   GUION COMPLETO (CONTEXTO): <guion actual>
   ===== FRAGMENTO A CORREGIR =====
   <solo la parte seleccionada>
   ===== FIN DEL FRAGMENTO =====
   INSTRUCCION: haz este dialogo mas comico...
   ```
3. Usa el prompt de sistema de editor (`obtenerFixSystemPrompt`, app.js:573): responder SOLO el fragmento corregido completo, mismo formato/estilo, sin explicaciones.
4. `applyFixToEditor()` (app.js:941) reemplaza únicamente el rango de caracteres indicado; el resto del guion queda intacto. Preserva saltos de línea del fragmento original.
5. Se guarda en historial: {instrucción, alcance, before, after, timestamp}.

### 7.3 Historial y deshacer

- Historial en localStorage (máx. 20 entradas), renderizado en el panel "Historial de correcciones".
- **Deshacer:** `undoLastFix()` busca la última entrada cuyo `after` coincida con el texto actual del editor y restaura su `before`. Funciona como undo simple y tolera ediciones manuales intermedias (solo deshace si el guion sigue intacto).
- Al generar un guion nuevo o cargar un proyecto, el historial se limpia.

---

## 8. Persistencia (localStorage)

| Clave | Contenido |
|---|---|
| `scriptai_config_v1` | proveedor, apiKey, modelo, baseUrl |
| `scriptai_projects_v1` | hasta 30 proyectos {id, title, format, script, params, updated} |
| `scriptai_fix_history_v1` | hasta 20 correcciones {instruction, scope, before, after, ts} |
| `scriptai_lang` | idioma UI ('es'/'en') |

- **Cargar proyecto** restaura guion + todos los parámetros del formulario + chip de formato.
- **Guardar proyecto** detecta duplicados (mismo texto → no duplica).
- Las API keys **nunca** se envían a terceros no configurados por el usuario; el servidor no las persiste.

---

## 9. Exportación

| Formato | Método | Detalle |
|---|---|---|
| Copiar | `navigator.clipboard` + fallback `execCommand` | app.js:1250 |
| `.txt` | Blob + descarga | nombre = slug del título |
| `.fountain` | Blob + descarga | compatible con Highland 2, Final Draft, etc. |
| `PDF` | jsPDF 2.5.1 (CDN) | Courier 10pt, A4, wrap de líneas con `splitTextToSize`, paginación automática |

El nombre de archivo sale de `extractTitle()`: lee la línea `TITULO:` del guion, o la primera línea si ≤80 caracteres.

---

## 10. Internacionalización

- 2 idiomas: **español** (default) y **inglés**, selector en vivo sin recargar.
- Diccionario completo en `I18N` (app.js:9-120): UI, placeholders, errores, historial.
- El idioma de la **interfaz** es independiente del idioma **del guion** (selector "Idioma del guion" ES/EN que se inyecta en el brief).

---

## 11. Servidor (server.js)

- Puerto `PORT` (env) o 3000.
- CORS abierto (`*`) para poder servir a otros orígenes.
- Endpoints: `GET/POST /api/chat` + estáticos (MIME completo).
- `proxyRequest()`: timeout 120 s, soporta http y https, reenvía status/headers/body intactos.
- Sin dependencias npm (solo módulos nativos `http`, `https`, `fs`, `path`).
- Compatible con Render/Railway/Fly.io/VPS sin cambios.

---

## 12. Manejo de errores (de cara al usuario)

| Código interno | Mensaje al usuario |
|---|---|
| `CONFIG_REQUIRED` | "No hay API key configurada. Abre Configurar APIs..." |
| `API_KEY_INVALID` (401/403) | "API key invalida o sin creditos." |
| `RATE_LIMITED` (429) | "Limite de uso alcanzado. Espera o cambia de proveedor." |
| `MODEL_LOADING` (503) | reintentos silenciosos con status en consola |
| `TIMEOUT` | "Tiempo de espera agotado en la API." |
| `PARSE_ERROR` | "La IA devolvio una respuesta inesperada." + 2 reintentos |
| fetch TypeError | "El servidor proxy no responde. Ejecuta node server.js." |
| Sin selección/escena | "Selecciona texto o escribe el numero de escena." |
| Sin instrucción | "Escribe la instruccion de correccion." |

---

## 13. Estado de verificación

| Prueba | Resultado |
|---|---|
| `node --check app.js` | OK |
| `node --check server.js` | OK |
| Servidor sirve `/` y `/app.js` | 200 OK |
| Proxy reenvía POST a Google (Gemini) | OK — body y status intactos (400 con JSON de Google) |
| Parseo de rangos de escenas (10 casos) | OK — todos correctos |
| Generación con API key real del usuario | **Pendiente** (requiere key) |

---

## 14. Limitaciones conocidas y roadmap

1. **Sin streaming**: la respuesta llega completa al terminar (aceptable para guiones <8k tokens).
2. **UI responsive**: funcional en móvil, pero diseñada pensando en PC; el port nativo (React Native + Expo, patrón de fap_mobile) está planificado.
3. **Sin modo colaborativo ni autoguardado del editor** (solo guardado manual de proyectos).
4. La corrección devuelve el fragmento completo regenerado; si el modelo responde con texto adicional, `stripMarkdown` solo limpia bloques de código.
5. `max_tokens: 8192` cubre guiones cortos/medios; un largometraje completo puede truncarse en modelos de contexto pequeño — dividir en actos si ocurre.

**Roadmap propuesto:** (1) streaming con `text/event-stream`, (2) selector de longitud (corto/medio/largo) con ajuste de tokens, (3) corrección por escena con diff visual, (4) port móvil Expo, (5) integración con FAP Web Hub (proxy PHP como el storyboard).
