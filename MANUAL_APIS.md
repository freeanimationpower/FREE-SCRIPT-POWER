# Guia de APIs — como obtener tus claves

La calidad del guion depende directamente del modelo que conectes. Un modelo gratuito basico produce resultados funcionales; uno pago de gama alta genera guiones con calidad profesional.

---

## APIs GRATUITAS (sin tarjeta de credito)

### 1. Google Gemini (recomendado para empezar)

1. Entra a [Google AI Studio](https://aistudio.google.com/)
2. Inicia sesion con tu cuenta de Google
3. Click en **"Get API key"** (esquina superior izquierda)
4. Click en **"Create API key"** > selecciona un proyecto (o crea uno nuevo)
5. Copia la key (formato: `AIzaSy...`)
6. En Script AI: **Configurar APIs** > `Google Gemini`, modelo `gemini-2.0-flash`

**Limites gratuitos:** ~1500 peticiones/dia. **Calidad:** muy buena en español e ingles, excelente siguiendo estructuras de guion.

---

### 2. OpenCode Zen (de pago — ya no es gratis)

1. Entra a [opencode.ai/zen](https://opencode.ai/zen/)
2. Registrate en [opencode.ai/auth](https://opencode.ai/auth) y añade saldo (minimo $20, pay-as-you-go)
3. Crea tu API key en el panel de Zen
4. En Script AI: **Configurar APIs** > `OpenCode Zen`, modelo `deepseek-v4-flash-free`

**Nota:** si buscas una opcion gratuita, usa Gemini (seccion 1), Mistral (seccion 3) o Groq (seccion 4).

---

### 3. Mistral AI (La Plateforme)

1. Entra a [console.mistral.ai](https://console.mistral.ai/)
2. Crea cuenta (Google/GitHub/Microsoft)
3. Ve a **API Keys** > **Create new key**
4. En Script AI: `Mistral AI`, modelo `mistral-large-latest`

**Limites gratuitos:** rate-limit generoso en tier gratuito. **Calidad:** excelente en textos largos y multilingue.

---

### 4. Groq (modelos de texto rapidos)

1. Entra a [console.groq.com](https://console.groq.com/)
2. Inicia sesion con Google/GitHub
3. Ve a **API Keys** > **Create API Key** (formato: `gsk_...`)
4. En Script AI: `Groq`, modelo `openai/gpt-oss-20b` (o `openai/gpt-oss-120b` para mas calidad)

**Limites:** plan Developer gratuito con rate limits. Muy rapido.

---

### 5. Fireworks AI

1. Entra a [fireworks.ai](https://fireworks.ai/)
2. Crea cuenta > **API Keys**
3. En Script AI: `Fireworks AI (gratis)`

---

### 6. Together AI

1. Entra a [together.xyz](https://www.together.xyz/)
2. Crea cuenta > **API Keys**
3. En Script AI: `Together AI`, modelo `meta-llama/Llama-3.3-70B-Instruct-Turbo`

---

## APIs de PAGO (mejor calidad, mayor limite)

### OpenAI — GPT-4o

1. Entra a [platform.openai.com](https://platform.openai.com/)
2. Ve a [Billing](https://platform.openai.com/settings/organization/billing) > agrega metodo de pago ($5 min)
3. Ve a [API Keys](https://platform.openai.com/api-keys) > **Create new secret key** (formato: `sk-proj-...`)
4. En Script AI: `OpenAI (GPT-4o)`, modelo `gpt-4o`

**Calidad profesional.** ~$0.01-0.05 por guion completo.

---

### DeepSeek — deepseek-chat

1. Entra a [platform.deepseek.com](https://platform.deepseek.com/)
2. Crea cuenta > **API Keys** > agrega saldo (~$2 min)
3. En Script AI: `DeepSeek`, modelo `deepseek-chat`

**Costos:** ~$0.001 por generacion. Extremadamente barato. Comparable a GPT-4o.

---

### OpenRouter — acceso a +200 modelos, 1 sola key

1. Entra a [openrouter.ai](https://openrouter.ai/)
2. Crea cuenta > **Keys** > agrega creditos ($5 min)
3. En Script AI: `OpenRouter`
4. Modelos recomendados: `openai/gpt-4o`, `anthropic/claude-3.5-sonnet`, `google/gemini-2.0-flash-001`

---

### xAI Grok

1. Entra a [console.x.ai](https://console.x.ai/)
2. Crea cuenta > **API Keys**
3. En Script AI: `xAI Grok (pago)`

---

## Personalizado (cualquier endpoint OpenAI-compatible)

Sirve para servicios locales como **Ollama**, **LM Studio** o cualquier proxy OpenAI-compatible:

- Proveedor: `Personalizado`
- URL Base: `http://localhost:11434/v1/chat/completions` (Ollama)
- Modelo: `llama3` (el que tengas cargado)
- API Key: puedes dejarla vacia si el servicio local no la pide

---

## Tabla comparativa (texto)

| Proveedor + Modelo | Creatividad | Espanol | Guiones largos | Costo |
|---|---|---|---|---|
| OpenAI GPT-4o | ★★★★★ | ★★★★★ | ★★★★★ | $$ |
| Mistral Large | ★★★★ | ★★★★ | ★★★★ | Gratis |
| Google Gemini 2.0 Flash | ★★★★ | ★★★★ | ★★★★ | Gratis |
| DeepSeek Chat | ★★★★ | ★★★ | ★★★★ | $ |
| Groq Llama 3.3 70B | ★★★ | ★★★ | ★★★ | Gratis |

---

## Errores inteligentes

Cada error indica exactamente que fallo y el motivo:

- `API key invalida o sin creditos` → revisa la key en **Configurar APIs**.
- `Limite de uso alcanzado` → espera unos minutos o cambia de proveedor gratuito.
- `El servidor proxy no responde` → ejecuta `node server.js` en la terminal.
- `La IA devolvio una respuesta inesperada` → la app reintenta automaticamente 3 veces.

## Seguridad

- Las API keys se guardan **solo en tu navegador** (localStorage).
- El servidor proxy no almacena ninguna key.
