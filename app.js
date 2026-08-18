// ============================================================
//  SCRIPT AI — Guionista con IA multi-proveedor
//  By FAP / fierroduque.com
//  Frontend: HTML5 + Tailwind + Vanilla JS
// ============================================================

'use strict';

// ============================================================
//  i18n — ESPAÑOL / ENGLISH
// ============================================================
const I18N = {
    es: {
        subtitle: 'Guionista con IA — by Free Animation Power / fierroduque.com',
        desc: 'Escribe tu idea, elige el formato (animacion, ficcion, documental, YouTube...) y genera un guion narrativo completo. Editalo en pantalla y corrige solo las partes que quieras con instrucciones en lenguaje natural.',
        config_apis: 'Configurar APIs',
        api_text: 'API de Texto',
        provider: 'Proveedor',
        api_key: 'API Key',
        model: 'Modelo',
        url_base: 'URL Base',
        save_config: 'Guardar configuracion',
        clear: 'Limpiar',
        config_saved: 'Configuracion guardada',
        config_cleared: 'Configuracion limpiada',
        idea_label: 'Idea / premisa',
        idea_placeholder: 'Ej: Una nina robot descubre un jardin secreto en una ciudad gris y decide defenderlo de las excavadoras...',
        format_label: 'Formato',
        genre: 'Genero',
        genre_placeholder: 'Ej: comedia, drama, sci-fi...',
        duration: 'Duracion',
        duration_placeholder: 'Ej: 10 min / 3 paginas / 1 video',
        tone: 'Tono',
        tone_placeholder: 'Ej: epico, ironico, tierno...',
        audience: 'Audiencia',
        audience_placeholder: 'Ej: ninos 6-10, todo publico...',
        characters: 'Personajes / extras (opcional)',
        characters_placeholder: 'Ej: LIA (robot nina, curiosa) / ABUELO JOSE (jardinero retirado)...',
        script_lang: 'Idioma del guion',
        generate_btn: 'Generar guion',
        processing: 'Generando guion...',
        fixing: 'Corrigiendo con IA...',
        script_result: 'Guion generado (editable)',
        save_project: 'Guardar proyecto',
        copy: 'Copiar',
        download_txt: '.txt',
        download_fountain: '.fountain',
        download_word: 'Word',
        download_pdf: 'PDF',
        pdf_no_js: 'jsPDF no disponible (sin conexion). Usa .txt o .fountain.',
        new_script: '+ Nuevo guion',
        editor_placeholder: 'El guion aparecera aqui...',
        ai_fix_title: 'Correccion inteligente (IA)',
        fix_scope: 'Alcance:',
        no_selection: 'Sin seleccion — selecciona texto en el editor',
        selection_chars: 'Seleccion: {n} caracteres',
        clear_selection: 'Quitar seleccion',
        fix_target: 'O indicar escenas (si no usas seleccion)',
        fix_target_placeholder: 'Ej: ESCENA 2 / ESCENAS 1-3 / ESCENA 5 DIALOGO / TODO',
        fix_instruction: 'Instruccion de correccion',
        fix_instruction_placeholder: 'Ej: haz este dialogo mas comico y mas corto / cambia el final a uno feliz / anade un giro dramatico',
        fix_btn: 'Corregir con IA',
        fix_history: 'Historial de correcciones',
        undo_last: 'Deshacer ultima correccion',
        saved_projects: 'Proyectos guardados',
        no_projects: 'Aun no hay proyectos guardados.',
        copied: 'Guion copiado al portapapeles',
        saved_ok: 'Proyecto guardado',
        storage_error: 'No se pudo guardar: almacenamiento del navegador lleno. Exporta o elimina proyectos antiguos.',
        deleted: 'Proyecto eliminado',
        error_empty_idea: 'Escribe primero tu idea o premisa.',
        error_no_key: 'No hay API key configurada. Abre "Configurar APIs" y agrega tu clave.',
        error_no_script: 'Genera un guion primero.',
        error_no_selection: 'Selecciona texto en el editor o escribe el numero de escena a corregir.',
        error_no_instruction: 'Escribe la instruccion de correccion.',
        error_generation: 'Error al generar el guion:',
        error_fix: 'Error al corregir:',
        footer: 'Las API keys se guardan solo en tu navegador (localStorage).',
        lang_tooltip: 'Cambiar idioma',
        escenas_scope: 'Corrigiendo {scope}...',
        selection_scope: 'Corrigiendo seleccion...',
        fix_done: 'Correccion aplicada',
        no_history: 'Sin correcciones todavia. Selecciona texto del guion, escribe una instruccion y pulsa "Corregir con IA".',
        history_item: 'Correccion {n}: {inst}',
        fixed_at: 'Aplicada {time}',
        project_title_default: 'Proyecto sin titulo',
        projects_load_ok: 'Proyecto cargado',
        new_script_confirm: '¿Empezar un guion nuevo? El actual se perdera si no lo guardas.',
        save_first: 'Guarda el proyecto antes de crear uno nuevo (o ignora y continua).',
        api_key_hint: 'Consejo: Google Gemini, Groq y Mistral son gratuitos. Ver MANUAL_APIS.md.',
    },
    en: {
        subtitle: 'AI Screenwriter — by Free Animation Power / fierroduque.com',
        desc: 'Write your idea, choose the format (animation, fiction, documentary, YouTube...) and generate a complete narrative script. Edit it on screen and fix only the parts you want with natural language instructions.',
        config_apis: 'Configure APIs',
        api_text: 'Text API',
        provider: 'Provider',
        api_key: 'API Key',
        model: 'Model',
        url_base: 'Base URL',
        save_config: 'Save configuration',
        clear: 'Clear',
        config_saved: 'Configuration saved',
        config_cleared: 'Configuration cleared',
        idea_label: 'Idea / premise',
        idea_placeholder: 'Ex: A robot girl discovers a secret garden in a gray city and decides to defend it from the bulldozers...',
        format_label: 'Format',
        genre: 'Genre',
        genre_placeholder: 'Ex: comedy, drama, sci-fi...',
        duration: 'Length',
        duration_placeholder: 'Ex: 10 min / 3 pages / 1 video',
        tone: 'Tone',
        tone_placeholder: 'Ex: epic, ironic, tender...',
        audience: 'Audience',
        audience_placeholder: 'Ex: kids 6-10, general audience...',
        characters: 'Characters / extras (optional)',
        characters_placeholder: 'Ex: LIA (robot girl, curious) / GRANDPA JOE (retired gardener)...',
        script_lang: 'Script language',
        generate_btn: 'Generate script',
        processing: 'Generating script...',
        fixing: 'Fixing with AI...',
        script_result: 'Generated script (editable)',
        save_project: 'Save project',
        copy: 'Copy',
        download_txt: '.txt',
        download_fountain: '.fountain',
        download_word: 'Word',
        download_pdf: 'PDF',
        pdf_no_js: 'jsPDF not available (offline). Use .txt or .fountain.',
        new_script: '+ New script',
        editor_placeholder: 'The script will appear here...',
        ai_fix_title: 'Smart fix (AI)',
        fix_scope: 'Scope:',
        no_selection: 'No selection — select text in the editor',
        selection_chars: 'Selection: {n} characters',
        clear_selection: 'Clear selection',
        fix_target: 'Or specify scenes (if not using a selection)',
        fix_target_placeholder: 'Ex: SCENE 2 / SCENES 1-3 / SCENE 5 DIALOGUE / ALL',
        fix_instruction: 'Fix instruction',
        fix_instruction_placeholder: 'Ex: make this dialogue funnier and shorter / change the ending to a happy one / add a dramatic twist',
        fix_btn: 'Fix with AI',
        fix_history: 'Correction history',
        undo_last: 'Undo last correction',
        saved_projects: 'Saved projects',
        no_projects: 'No saved projects yet.',
        copied: 'Script copied to clipboard',
        saved_ok: 'Project saved',
        storage_error: 'Could not save: browser storage is full. Export or remove old projects.',
        deleted: 'Project deleted',
        error_empty_idea: 'Write your idea or premise first.',
        error_no_key: 'No API key configured. Open "Configure APIs" and add your key.',
        error_no_script: 'Generate a script first.',
        error_no_selection: 'Select text in the editor or type the scene number to fix.',
        error_no_instruction: 'Write the fix instruction.',
        error_generation: 'Error generating the script:',
        error_fix: 'Error while fixing:',
        footer: 'API keys are stored only in your browser (localStorage).',
        lang_tooltip: 'Switch language',
        escenas_scope: 'Fixing {scope}...',
        selection_scope: 'Fixing selection...',
        fix_done: 'Fix applied',
        no_history: 'No corrections yet. Select script text, write an instruction and press "Fix with AI".',
        history_item: 'Fix {n}: {inst}',
        fixed_at: 'Applied {time}',
        project_title_default: 'Untitled project',
        projects_load_ok: 'Project loaded',
        new_script_confirm: 'Start a new script? The current one will be lost if not saved.',
        save_first: 'Save the project before starting a new one (or ignore and continue).',
        api_key_hint: 'Tip: Google Gemini, Groq and Mistral are free. See MANUAL_APIS.md.',
    }
};

let currentLang = localStorage.getItem('scriptai_lang') || 'es';

function __(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key;
}

function applyI18n() {
    const nodes = document.querySelectorAll('[data-i18n]');
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const key = node.getAttribute('data-i18n');
        const isPlaceholder = key.endsWith('_placeholder');
        if (isPlaceholder) {
            node.setAttribute('placeholder', __(key));
        } else {
            node.textContent = __(key);
        }
    }
    const titles = document.querySelectorAll('[data-i18n-title]');
    for (let j = 0; j < titles.length; j++) {
        titles[j].title = __(titles[j].getAttribute('data-i18n-title'));
    }
    renderFormatChips();
    updateSelectionBadge();
    renderHistory();
    renderProjects();
}

function switchLang(lang) {
    currentLang = lang;
    try { localStorage.setItem('scriptai_lang', lang); } catch (e) {}
    const btns = document.querySelectorAll('.lang-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('active-lang', btns[i].getAttribute('data-lang') === lang);
    }
    applyI18n();
}

// ============================================================
//  PRESETS DE PROVEEDORES (texto)
// ============================================================
const TEXT_PROVIDERS = {
    openai:     { name: 'OpenAI (GPT-4o)',       url: 'https://api.openai.com/v1/chat/completions',             model: 'gpt-4o' },
    mistral:    { name: 'Mistral AI',            url: 'https://api.mistral.ai/v1/chat/completions',             model: 'mistral-large-latest' },
    gemini:     { name: 'Google Gemini',         url: 'https://generativelanguage.googleapis.com/v1beta/models/', model: 'gemini-2.0-flash', apiFormat: 'gemini' },
    opencode:   { name: 'OpenCode Zen (pago)', url: 'https://opencode.ai/zen/v1/chat/completions',            model: 'deepseek-v4-flash-free' },
    deepseek:   { name: 'DeepSeek (pago)',       url: 'https://api.deepseek.com/v1/chat/completions',           model: 'deepseek-chat' },
    groq:       { name: 'Groq',                  url: 'https://api.groq.com/openai/v1/chat/completions',         model: 'openai/gpt-oss-20b', maxTokens: 5120 },
    fireworks:  { name: 'Fireworks AI (gratis)', url: 'https://api.fireworks.ai/inference/v1/chat/completions',  model: 'accounts/fireworks/models/llama-v3p1-70b-instruct' },
    together:   { name: 'Together AI',           url: 'https://api.together.xyz/v1/chat/completions',            model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' },
    openrouter: { name: 'OpenRouter',            url: 'https://openrouter.ai/api/v1/chat/completions',           model: 'openai/gpt-4o' },
    xai:        { name: 'xAI Grok (pago)',       url: 'https://api.x.ai/v1/chat/completions',                    model: 'grok-2' },
    custom:     { name: 'Personalizado',         url: '',                                                        model: '' }
};

// ============================================================
//  FORMATOS DE GUION (con prompt de estructura)
// ============================================================
const SCRIPT_FORMATS = {
    animacion_2d: {
        es: 'Animación 2D', en: '2D Animation',
        guide: `Formato: guion tecnico de ANIMACION 2D.
Estructura obligatoria:
TITULO:
FORMATO: Animacion 2D
DURACION APROX:
SINOPSIS: (3-4 lineas)
ESCENA 1 — INT./EXT. LUGAR — DIA/NOCHE
(Descripcion visual de la accion, rica en detalle visual y animable)
PERSONAJE
(Dialogo)
(ACCION o EXPRESION entre parentesis)
TRANSICION: (corte, fundido...)
Incluye al final una seccion NOTAS DE PRODUCCION con paleta de color, estilo de dibujo y referencias.`
    },
    animacion_3d: {
        es: 'Animación 3D', en: '3D Animation',
        guide: `Formato: guion tecnico de ANIMACION 3D / CGI.
Estructura obligatoria:
TITULO:
FORMATO: Animacion 3D
DURACION APROX:
SINOPSIS: (3-4 lineas)
ESCENA 1 — INT./EXT. LUGAR — DIA/NOCHE
(Descripcion visual: camaras, iluminacion, texturas, efectos)
PERSONAJE
(Dialogo)
(ACCION)
NOTAS VFX: (particulas, simulaciones, render)
Incluye al final NOTAS DE PRODUCCION: estilo de render (PBR, toon, realista), iluminacion y referencias.`
    },
    cortometraje: {
        es: 'Cortometraje (ficción)', en: 'Short film (fiction)',
        guide: `Formato: guion cinematografico estandar de CORTOMETRAJE de FICCION (estilo Hollywood).
Estructura obligatoria:
TITULO:
FORMATO: Cortometraje
DURACION APROX:
LOGLINE: (1 linea)
SINOPSIS: (4-6 lineas)
PERSONAJES: (nombre en MAYUSCULAS y breve descripcion)
ESCENA 1 — INT./EXT. LUGAR — DIA/NOCHE
(Descripcion de accion en presente, tercera persona)
NOMBRE PERSONAJE
(Dialogo)
(PARENTETICO: emoción / intención)
TRANSICION A:
Sigue la estructura dramatica: planteamiento, conflicto, climax y desenlace.`
    },
    largometraje: {
        es: 'Largometraje', en: 'Feature film',
        guide: `Formato: guion cinematografico estandar de LARGOMETRAJE (estilo Hollywood).
Estructura obligatoria:
TITULO:
FORMATO: Largometraje
LOGLINE: (1 linea)
SINOPSIS: (parrafo completo)
PERSONAJES: (nombre en MAYUSCULAS y descripcion)
ACTOS: resume en una linea el ACTO I, ACTO II y ACTO III.
Luego desarrolla las escenas clave:
ESCENA 1 — INT./EXT. LUGAR — DIA/NOCHE
(Descripcion de accion en presente)
NOMBRE PERSONAJE
(Dialogo)
(PARENTETICO)
TRANSICION A:
Desarrolla minimo 8 escenas con dialogos completos y la estructura de 3 actos.`
    },
    documental: {
        es: 'Documental', en: 'Documentary',
        guide: `Formato: guion de DOCUMENTAL narrativo.
Estructura obligatoria:
TITULO:
FORMATO: Documental
DURACION APROX:
TESIS / TEMA: (1-2 lineas: de que trata y que pregunta responde)
SECUENCIA 1 — TITULO DE LA SECUENCIA
VOZ EN OFF (V.O.):
(Texto literal de la narracion)
ENTREVISTA — NOMBRE Y CARGO
(Cita o pregunta-respuesta)
ARCHIVO / B-ROLL:
(Descripcion de imagenes de apoyo, graficos o material de archivo)
Incluye una escaleta inicial: los bloques numerados con su duracion estimada y una nota de tono (observacional, expositivo, poetico...).`
    },
    youtube: {
        es: 'Video de YouTube', en: 'YouTube video',
        guide: `Formato: guion de VIDEO DE YOUTUBE.
Estructura obligatoria:
TITULO DEL VIDEO: (clickbait honesto, maximo 60 caracteres)
FORMATO: YouTube
DURACION APROX:
HOOK (0:00-0:30):
(Texto literal de las primeras lineas — debe enganchar en los primeros segundos)
INTRO (0:30-1:00):
SECCION 1 — TITULO (1:00-2:30):
(Narracion literal + notas de visual: [B-ROLL: ...], [TEXTO EN PANTALLA: ...], [ZOOM], [CORTE RAPIDO])
SECCION 2 — TITULO (...):
CTA FINAL:
(Texto literal de la llamada a la accion: suscribete, comenta...)
Usa lenguaje conversacional, frases cortas y palabras que retengan audiencia.`
    },
    podcast: {
        es: 'Podcast', en: 'Podcast',
        guide: `Formato: guion de PODCAST (audio).
Estructura obligatoria:
TITULO DEL EPISODIO:
FORMATO: Podcast
DURACION APROX:
DESCRIPCION: (2 lineas para la plataforma)
CABECERA (0:00-0:30):
[SFX: sintonia / jingle]
LOCUTOR: (texto literal de bienvenida)
BLOQUE 1 — TITULO (0:30-8:00):
CONVERSACION / GUION:
PRESENTADOR: (texto literal)
INVITADO: (texto literal, si aplica)
[SFX: musica de transicion]
BLOQUE 2 — ...
CIERRE:
PRESENTADOR: (despedida + CTA)
Incluye notas de tono de voz, musica y ritmo al inicio de cada bloque.`
    },
    teatro: {
        es: 'Obra de teatro', en: 'Stage play',
        guide: `Formato: guion de OBRA DE TEATRO.
Estructura obligatoria:
TITULO:
FORMATO: Teatro
ACTO I
ESCENA 1
(Escenografia: descripcion del espacio escenico, iluminacion, utileria)
PERSONAJE 1: (dialogo)
PERSONAJE 2: (dialogo)
(Acotacion: movimiento, gesto, pausa — en cursiva o parentesis)
ACTO II
...
Incluye una nota inicial con el numero de personajes, espacio unico o multiple, y el conflicto dramatico.`
    },
    videojuego: {
        es: 'Videojuego', en: 'Video game',
        guide: `Formato: guion de VIDEOJUEGO (narrativa interactiva).
Estructura obligatoria:
TITULO DEL JUEGO:
FORMATO: Videojuego
GENERO DE GAMEPLAY:
SINOPSIS: (4-6 lineas)
MISION 1 — TITULO
CONTEXTO: (que hace el jugador: gameplay)
CINEMATICA / ESCENA:
(DESCRIPCION DE ACCION)
PERSONAJE: (dialogo)
OPCION DIALOGO A: (respuesta ramificada)
OPCION DIALOGO B: (respuesta ramificada)
RESULTADO: (que cambia segun la eleccion)
MISION 2 — ...
Incluye arcos de personajes jugables, jefes (bosses), lore y una nota de estructura de niveles.`
    },
    publicidad: {
        es: 'Comercial / publicidad', en: 'Commercial / ad',
        guide: `Formato: guion de COMERCIAL PUBLICITARIO.
Estructura obligatoria:
TITULO DEL SPOT:
MARCA / PRODUCTO:
FORMATO: Publicidad
DURACION: (ej: 30s)
OBJETIVO: (que debe sentir/recordar la audiencia)
ESCENA 1 — (0:00-0:05)
(Descripcion visual)
VOZ EN OFF / PERSONAJE: (texto literal)
TEXTO EN PANTALLA:
SFX / MUSICA:
...
CIERRE: (packshot del producto + slogan)
Incluye la propuesta de valor (promesa de marca) destacada en negrita.`
    },
    tiktok: {
        es: 'TikTok / Reels / Shorts', en: 'TikTok / Reels / Shorts',
        guide: `Formato: guion de VIDEO CORTO VERTICAL (TikTok / Reels / Shorts).
Estructura obligatoria:
TITULO DEL VIDEO:
FORMATO: Video corto vertical
DURACION: (15-60s)
GANCHO (0:00-0:03):
(Texto literal + visual de los primeros 3 segundos — critico para retener)
BEAT 1 (0:03-0:15):
PERSONAJE / VOZ: (texto literal, frases cortas)
[TEXTO EN PANTALLA: ...]
BEAT 2 (0:15-0:30):
...
CIERRE / CTA (ultimos 5s):
Texto corto, punchy, ritmo rapido. Usa mayusculas para enfasis en pantalla.`
    },
    serie: {
        es: 'Serie (episodio)', en: 'TV series (episode)',
        guide: `Formato: guion de EPISODIO DE SERIE.
Estructura obligatoria:
TITULO DE LA SERIE:
EPISODIO: (numero y titulo)
FORMATO: Serie
COLD OPEN / TEASER: (escena antes de los creditos)
ESCENA 1 — INT./EXT. LUGAR — DIA/NOCHE
(Descripcion)
PERSONAJE: (dialogo)
ACTO I / ACTO II / ACTO III con su conflicto central y cliffhanger de cierre.
Incluye RECAP: lo que paso en episodios anteriores (1-2 lineas) y nota de arco de temporada.`
    }
};

// ============================================================
//  GESTION DE CONFIGURACION (localStorage)
// ============================================================
const CONFIG_KEY = 'scriptai_config_v1';
const PROJECTS_KEY = 'scriptai_projects_v1';
const HISTORY_KEY = 'scriptai_fix_history_v1';

// ============================================================
//  ALMACENAMIENTO SEGURO (Problema 2: QuotaExceededError)
//  Wrapper para localStorage con limpieza de emergencia:
//    1) Intento de guardado directo.
//    2) Si falla por cuota: purgar la mitad mas antigua del
//       historial de correcciones (scriptai_fix_history_v1).
//    3) Si aun falla: purgar los proyectos mas antiguos
//       (menos modificados recientemente), manteniendo los
//       mas recientes.
//    4) Si aun falla: devolver false (el caller informa).
// ============================================================

/**
 * Detecta errores de cuota de localStorage en todos los navegadores:
 *  - Chrome/Edge: DOMException "QuotaExceededError" (code 22)
 *  - Firefox:     "NS_ERROR_DOM_QUOTA_REACHED" (code 1014)
 *  - Safari/WebKit: "QuotaExceededError"
 */
function isQuotaError(err) {
    return !!err && (
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 ||
        err.code === 1014
    );
}

/**
 * setItem con try/catch. Devuelve true si se guardo, false si fallo.
 * Si el error NO es de cuota (ej. localStorage deshabilitado),
 * lo registra en consola.
 */
function trySetItem(key, serialized) {
    try {
        localStorage.setItem(key, serialized);
        return true;
    } catch (err) {
        if (!isQuotaError(err)) {
            console.warn('[lsSet] No se pudo escribir en localStorage:', err);
        }
        return false;
    }
}

/**
 * NIVEL 1 de limpieza: elimina la mitad mas antigua del historial
 * de correcciones (el array guarda las entradas mas viejas al inicio).
 * Devuelve true si libero espacio.
 */
function trimOldestHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return false;
        const history = JSON.parse(raw);
        if (!Array.isArray(history) || history.length < 2) return false;
        const keepCount = Math.floor(history.length / 2);
        const trimmed = history.slice(history.length - keepCount);
        const freed = trimmed.length < history.length;
        if (freed) {
            trySetItem(HISTORY_KEY, JSON.stringify(trimmed));
            console.warn('[lsSet] Limpieza de emergencia: historial reducido de ' + history.length + ' a ' + trimmed.length + ' correcciones.');
        }
        return freed;
    } catch (e) {
        return false;
    }
}

/**
 * NIVEL 2 de limpieza: purga los proyectos mas antiguos (los que llevan
 * mas tiempo sin modificarse), conservando la mitad mas reciente.
 * Devuelve true si libero espacio.
 */
function trimOldestProjects() {
    try {
        const raw = localStorage.getItem(PROJECTS_KEY);
        if (!raw) return false;
        let projects = JSON.parse(raw);
        if (!Array.isArray(projects) || projects.length < 2) return false;
        // Ordenar por fecha de modificacion descendente (mas recientes primero)
        projects = projects.slice().sort(function(a, b) {
            return (b.updated || 0) - (a.updated || 0);
        });
        const keepCount = Math.max(1, Math.ceil(projects.length / 2));
        const trimmed = projects.slice(0, keepCount);
        if (trySetItem(PROJECTS_KEY, JSON.stringify(trimmed))) {
            console.warn('[lsSet] Limpieza de emergencia: proyectos reducidos de ' + projects.length + ' a ' + trimmed.length + '.');
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

/**
 * Guarda cualquier valor en localStorage de forma segura.
 * Devuelve true si se guardo, false si no se pudo ni con limpieza.
 */
function lsSet(key, value) {
    let serialized;
    try {
        serialized = JSON.stringify(value);
    } catch (e) {
        console.warn('[lsSet] Valor no serializable:', e);
        return false;
    }

    // Intento directo
    if (trySetItem(key, serialized)) return true;

    // NIVEL 1: purgar historial de correcciones
    if (trimOldestHistory()) {
        if (trySetItem(key, serialized)) return true;
    }

    // NIVEL 2: si lo que se guarda ES la lista de proyectos,
    // recortar el propio dato (conservar la mitad mas reciente);
    // si no, purgar los proyectos almacenados.
    if (key === PROJECTS_KEY && Array.isArray(value)) {
        const keepCount = Math.max(1, Math.ceil(value.length / 2));
        value = value.slice(0, keepCount);
        serialized = JSON.stringify(value);
    } else {
        trimOldestProjects();
    }
    if (trySetItem(key, serialized)) return true;

    console.warn('[lsSet] localStorage lleno incluso despues de la limpieza de emergencia.');
    return false;
}

function getDefaultConfig() {
    return {
        text: {
            provider: 'gemini',
            apiKey: '',
            model: 'gemini-2.0-flash',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/'
        }
    };
}

function loadConfig() {
    try {
        const raw = localStorage.getItem(CONFIG_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            const def = getDefaultConfig();
            parsed.text = Object.assign({}, def.text, parsed.text || {});
            return parsed;
        }
    } catch (e) {}
    return getDefaultConfig();
}

function saveConfig(config) {
    return lsSet(CONFIG_KEY, config);
}

function clearConfig() {
    try { localStorage.removeItem(CONFIG_KEY); } catch (e) {}
}

// ============================================================
//  UTILIDADES
// ============================================================
function fetchWithTimeout(url, options, timeoutMs) {
    return new Promise(function(resolve, reject) {
        const controller = new AbortController();
        const timer = setTimeout(function() { controller.abort(); }, timeoutMs);
        options.signal = controller.signal;
        fetch(url, options)
            .then(function(res) { clearTimeout(timer); resolve(res); })
            .catch(function(err) {
                clearTimeout(timer);
                reject(err.name === 'AbortError' ? new Error('TIMEOUT') : err);
            });
    });
}

function safeParseJSON(text) {
    try { return JSON.parse(text); } catch (e) { return null; }
}

function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
}

function stripMarkdown(text) {
    return text
        .replace(/^```[a-zA-Z]*\s*[\r\n]+/, '')
        .replace(/[\r\n]+```\s*$/, '')
        .replace(/^\s*```\s*$/gm, '')
        .trim();
}

// ============================================================
//  LIMPIEZA DE RESPUESTAS LLM (Problema 3: "chattiness")
//
//  Estrategia en 2 capas:
//   1) PRIMARIA: el prompt de correccion instruye a la IA a
//      envolver el guion en <script_content>...</script_content>.
//      Si las etiquetas existen, se extrae SOLO su contenido.
//   2) FALLBACK: si no hay etiquetas (modelo que las ignora),
//      heuristica que recorta lineas conversacionales al inicio
//      y al final ("Aqui tienes...", "Claro...", "Espero que...").
//      Nunca toca lineas que parezcan guion (encabezados de
//      escena, TITULO:, nombres de personaje en MAYUSCULAS).
//   Regla de seguridad: si tras limpiar quedara vacio, se
//   devuelve el texto original (nunca perder el contenido).
// ============================================================

// Frases tipicas de "charla" de los LLM (ES + EN). Se comparan
// contra lineas individuales. Sin ancla final: la linea se considera
// chatty si EMPIEZA con una de estas frases (isChattyLine aplica
// protecciones adicionales para no borrar contenido del guion).
const CHATTY_LINE_RE = /^(aqu[ií]|here|he aqu[ií]|vale|ok(ey)?|claro|por supuesto|perfecto|listo|done|great|sure|of course|understood|got it|no problem|dime|let me know|espero|i hope|saludos|regards|de nada|you'?re welcome|ya est[aá]|aqu[ií] (?:tienes|est[aá]|va)|here(?:'s| is) (?:the )?(?:corrected|fixed|revised|updated|rewritten)|(?:the )?(?:corrected|fixed|revised|updated|rewritten) (?:script|text|version|fragment|guion|response|document)|i'?ve (?:corrected|fixed|revised|rewritten|updated)|he (?:corregido|modificado|actualizado)|esto es lo que|this is what|si necesitas|if you need|¿?c[oó]mo te parece|how does (?:it|that) look|a continuaci[oó]n|here you go|encontrar[aá]s (?:el|la|tu))\b/i;

/**
 * Determina si una linea es "charla conversacional" del LLM y no
 * contenido del guion. Ademas de la regex, aplica protecciones
 * para no borrar lineas legitimas del documento.
 */
function isChattyLine(line) {
    const t = (line || '').trim();
    if (!t || t.length > 160) return false;
    // Protecciones: nunca borrar encabezados de escena ni metadatos del guion
    if (SCENE_HEADER_RE.test(t)) return false;
    if (/^(?:TITULO|TITLE|FORMATO|FORMAT|SINOPSIS|SYNOPSIS|PERSONAJES|CHARACTERS|DURACION|DURATION|LOGLINE|TESIS|HOOK|CTA)\s*:/.test(t)) return false;
    // Linea en MAYUSCULAS corta: probablemente nombre de personaje
    if (/^[A-ZÁÉÍÓÚÑ0-9 .\-']{2,40}$/.test(t)) return false;
    // Una sola palabra terminada en '.' o '?' puede ser dialogo real
    // ("Claro."). Solo se considera chatty si es multi-palabra o
    // termina en ':', ',' o '!' ("Claro:" es intro conversacional).
    const words = t.split(/\s+/).filter(Boolean).length;
    if (words === 1 && !/[:,!]$/.test(t)) return false;
    return CHATTY_LINE_RE.test(t);
}

/**
 * Limpia la respuesta cruda del LLM para el editor.
 */
function cleanLLMResponse(text) {
    if (!text || typeof text !== 'string') return '';
    let raw = text;

    // Quitar fences markdown (```json ... ```) si los hay
    raw = raw.replace(/^```[a-zA-Z]*\s*[\r\n]+/, '')
             .replace(/[\r\n]+```\s*$/, '')
             .replace(/^\s*```\s*$/gm, '');

    // Normalizar etiquetas escapadas (&lt;script_content&gt;)
    raw = raw.replace(/&lt;script_content&gt;/gi, '<script_content>')
             .replace(/&lt;\/script_content&gt;/gi, '</script_content>');

    // CAPA 1: extraccion exacta entre etiquetas
    const tagMatch = raw.match(/<script_content>([\s\S]*?)<\/script_content>/i);
    if (tagMatch && tagMatch[1] && tagMatch[1].trim()) {
        return tagMatch[1].trim();
    }

    // CAPA 2: heuristica de lineas conversacionales
    const lines = raw.replace(/\r\n/g, '\n').split('\n');

    let start = 0;
    while (start < lines.length && isChattyLine(lines[start])) start++;

    let end = lines.length - 1;
    while (end >= start && isChattyLine(lines[end])) end--;

    const cleaned = lines.slice(start, end + 1).join('\n').trim();

    // Nunca devolver vacio: preferir el original a perder contenido
    return cleaned || raw.trim();
}

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 60) || 'guion';
}

function extractTitle(script) {
    const m = script.match(/^(?:TITULO|TITLE)\s*:?\s*(.+)$/im);
    if (m && m[1]) return m[1].trim();
    const firstLine = script.split(/\r?\n/)[0];
    if (firstLine && firstLine.length <= 80) return firstLine.trim();
    return __('project_title_default');
}

function countWords(text) {
    return (text.trim().match(/\S+/g) || []).length;
}

function formatTime(ts) {
    const d = new Date(ts);
    const pad = function(n) { return String(n).padStart(2, '0'); };
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

// ============================================================
//  PROMPTS DE SISTEMA
// ============================================================
function buildBrief(params) {
    const fmt = SCRIPT_FORMATS[params.format] || SCRIPT_FORMATS.cortometraje;
    const fmtName = currentLang === 'en' ? fmt.en : fmt.es;
    let brief = 'IDEA / PREMISA:\n' + params.idea + '\n\n';
    brief += 'FORMATO: ' + fmtName + '\n';
    if (params.genre) brief += 'GENERO: ' + params.genre + '\n';
    if (params.duration) brief += 'DURACION: ' + params.duration + '\n';
    if (params.tone) brief += 'TONO: ' + params.tone + '\n';
    if (params.audience) brief += 'AUDIENCIA: ' + params.audience + '\n';
    if (params.characters) brief += 'PERSONAJES:\n' + params.characters + '\n';
    brief += 'IDIOMA DEL GUION: ' + (params.scriptLang === 'en' ? 'INGLES' : 'ESPANOL') + '\n';
    return brief;
}

function obtenerSystemPrompt(params) {
    const fmt = SCRIPT_FORMATS[params.format] || SCRIPT_FORMATS.cortometraje;
    const lang = params.scriptLang === 'en' ? 'EN INGLES' : 'EN ESPANOL';
    return 'Actua como un guionista profesional experto en todos los formatos narrativos. Escribe el guion ' + lang + '.\n\n' +
        fmt.guide + '\n\n' +
        'REGLAS ESTRICTAS:\n' +
        '1. Responde UNICAMENTE con el texto del guion, en texto plano. Sin markdown, sin ```, sin explicaciones previas ni posteriores.\n' +
        '2. Respeta EXACTAMENTE la estructura del formato indicado.\n' +
        '3. Los dialogos deben ser creibles, con subtexto y voz propia por personaje.\n' +
        '4. Las descripciones en presente, visuales y cinematograficas.\n' +
        '5. Usa los nombres de los personajes en MAYUSCULAS antes de sus dialogos.\n' +
        '6. Si el usuario da duracion, dimensiona la cantidad de escenas en consecuencia.\n' +
        '7. El guion debe estar COMPLETO: con principio, desarrollo y final. Sin dejar escenas a medias.';
}

function obtenerFixSystemPrompt() {
    return 'Actua como un editor de guiones profesional. Tu trabajo es CORREGIR el fragmento indicado segun la instruccion del usuario, manteniendo el resto del guion intacto.\n\n' +
        'REGLAS ESTRICTAS:\n' +
        '1. Responde UNICAMENTE con el texto corregido, en texto plano. Sin markdown, sin ```, sin explicaciones.\n' +
        '2. Envuelve el fragmento corregido entre las etiquetas <script_content> y </script_content>. NADA de texto fuera de esas etiquetas: ni saludos, ni introducciones, ni despedidas.\n' +
        '3. Conserva el mismo formato, estilo y nombres de personajes del original.\n' +
        '4. Aplica SOLO los cambios pedidos. No reescribas partes no solicitadas.\n' +
        '5. Devuelve el fragmento COMPLETO ya corregido (no solo la parte cambiada).';
}

// ============================================================
//  LLAMADA A LA API DE TEXTO (proxy generico)
// ============================================================
function buildGeminiPayload(tc, systemPrompt, userText, maxTokens) {
    return {
        body: {
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userText }] }],
            generationConfig: { maxOutputTokens: maxTokens || 8192 }
        },
        headers: {
            'Content-Type': 'application/json',
            'x-target-url': tc.baseUrl + tc.model + ':generateContent?key=' + tc.apiKey
        }
    };
}

function parseGeminiResponse(data) {
    const parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
    if (parts) {
        return parts.map(function(p) { return p.text || ''; }).join('').trim();
    }
    return '';
}

function callTextAPI(systemPrompt, userText, intento) {
    intento = intento || 1;
    const MAX_INTENTOS = 3;
    const config = loadConfig();
    const tc = config.text;

    if (!tc.apiKey) {
        return Promise.reject(new Error('CONFIG_REQUIRED'));
    }

    const provider = TEXT_PROVIDERS[tc.provider] || TEXT_PROVIDERS.custom;
    const isGemini = (provider.apiFormat === 'gemini');
    // Tope de tokens de salida por proveedor: los tiers gratuitos
    // (ej. Groq on_demand) limitan los TPM contando prompt + salida,
    // por eso los proveedores gratuitos usan topes mas bajos.
    const maxTokens = provider.maxTokens || 8192;

    function makeError(code, msg) {
        const err = new Error(msg || code);
        err.errorCode = code;
        err.providerName = provider.name;
        return err;
    }

    let requestHeaders, requestBody;

    if (isGemini) {
        const geminiReq = buildGeminiPayload(tc, systemPrompt, userText, maxTokens);
        requestHeaders = geminiReq.headers;
        requestBody = geminiReq.body;
    } else {
        const payload = {
            model: tc.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userText }
            ],
            max_tokens: maxTokens
        };
        requestHeaders = {
            'Content-Type': 'application/json',
            'x-target-url': tc.baseUrl,
            'x-api-key': tc.apiKey
        };
        requestBody = payload;
    }

    // Helper de reintento con espera
    function retryWithDelay(delay) {
        return new Promise(function(r) { setTimeout(r, delay); })
            .then(function() { return callTextAPI(systemPrompt, userText, intento + 1); });
    }

    // El proxy ahora responde SIEMPRE 200 (para poder enviar latidos
    // heartbeat antes de que el proveedor conteste). Los errores del
    // proveedor viajan como "sobre" JSON dentro del body:
    // { "error": { "message": "...", "upstream_status": 401 } }
    function handleUpstreamError(status, msg) {
        const lower = (msg || '').toLowerCase();

        // Google Gemini devuelve 400 con "API key not valid" para
        // claves invalidas (no 401/403 como OpenAI)
        if (status === 401 || status === 403 ||
            (status === 400 && /api key not valid|api_key_invalid|invalid key|expired api key/i.test(lower))) {
            return Promise.reject(makeError('API_KEY_INVALID', msg));
        }

        // Modelo inexistente o mal escrito
        if (status === 404 || (status === 400 && /not found|modelo/i.test(lower))) {
            return Promise.reject(makeError('MODEL_NOT_FOUND', msg || 'Modelo no encontrado'));
        }

        // Plan gratuito del proveedor: la peticion excede el limite de tokens
        if (status === 413 || /too large|tokens per minute|reduce your message size/i.test(lower)) {
            return Promise.reject(makeError('REQUEST_TOO_LARGE', msg || 'La peticion excede el limite de tokens del plan gratuito.'));
        }

        if (status === 429) {
            if (intento < MAX_INTENTOS) {
                console.warn('Rate limit (' + provider.name + '). Reintento ' + intento + '/' + (MAX_INTENTOS - 1) + '...');
                return retryWithDelay(intento * 20000 + 10000);
            }
            return Promise.reject(makeError('RATE_LIMITED', msg));
        }
        if (status === 503) {
            if (intento < MAX_INTENTOS) {
                console.warn('Modelo cargando (' + provider.name + '). Reintento ' + intento + '/' + (MAX_INTENTOS - 1) + '...');
                return retryWithDelay(intento * 30000 + 20000);
            }
            return Promise.reject(makeError('MODEL_LOADING', msg));
        }

        // Errores 4xx (salvo los de arriba): culpa de la peticion.
        // No tiene sentido reintentar: fallar rapido con el mensaje real.
        if (status >= 400 && status < 500) {
            return Promise.reject(makeError('HTTP_ERROR', msg || ('HTTP ' + status)));
        }

        // Errores 5xx y desconocidos: reintentar antes de rendirse
        if (intento < MAX_INTENTOS) {
            return retryWithDelay(intento * 10000);
        }
        return Promise.reject(makeError('HTTP_ERROR', msg || ('HTTP ' + status)));
    }

    return fetchWithTimeout('/api/chat', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
    }, 180000)
    .then(function(response) {
        return response.text().then(function(text) {
            return { ok: response.ok, status: response.status, text: text };
        });
    })
    .then(function(resp) {
        const parsed = safeParseJSON(resp.text);

        // 1) Sobre de error del proveedor (upstream_status)
        if (parsed && parsed.error) {
            return handleUpstreamError(parsed.error.upstream_status || 502, parsed.error.message || '');
        }

        // 2) El proxy respondio con un error NO-JSON (caida del proxy,
        //    bloqueo SSRF 403, timeout del hosting...)
        if (!resp.ok && !parsed) {
            if (resp.status === 403) {
                throw makeError('SSRF_BLOCKED', 'El servidor bloqueo la URL del proveedor (whitelist SSRF).');
            }
            if (resp.status === 502 || resp.status === 504) {
                throw makeError('SERVER_DOWN', 'El servidor proxy no responde.');
            }
            if (intento < MAX_INTENTOS) {
                return retryWithDelay(intento * 10000);
            }
            throw makeError('HTTP_ERROR', 'HTTP ' + resp.status);
        }

        // 3) Respuesta normal del proveedor
        let content = '';
        if (parsed) {
            if (isGemini) {
                content = parseGeminiResponse(parsed);
            } else if (parsed.choices && parsed.choices.length) {
                content = parsed.choices[0].message.content || '';
            }
        }

        if (!content) {
            if (intento < MAX_INTENTOS) {
                return retryWithDelay(2500);
            }
            throw makeError('PARSE_ERROR');
        }

        // 4) Limpieza anti-chattiness antes de tocar el editor
        return cleanLLMResponse(content);
    });
}

// ============================================================
//  GENERACION DEL GUION
// ============================================================
let lastParams = null;

function collectParams() {
    const format = document.querySelector('.format-chip.active-format')
        ? document.querySelector('.format-chip.active-format').getAttribute('data-format')
        : 'cortometraje';
    return {
        idea: document.getElementById('ideaInput').value.trim(),
        format: format,
        genre: document.getElementById('genreInput').value.trim(),
        duration: document.getElementById('durationInput').value.trim(),
        tone: document.getElementById('toneInput').value.trim(),
        audience: document.getElementById('audienceInput').value.trim(),
        characters: document.getElementById('charactersInput').value.trim(),
        scriptLang: document.getElementById('scriptLang').value
    };
}

function setLoading(on, textKey) {
    const loader = document.getElementById('loader');
    const status = document.getElementById('statusText');
    const btn = document.getElementById('generateBtn');
    loader.classList.toggle('hidden', !on);
    if (textKey) status.textContent = __(textKey);
    btn.disabled = on;
    if (on) {
        loader.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function showError(msg) {
    setLoading(false);
    alert(msg);
}

function generateScript() {
    const params = collectParams();
    if (!params.idea) {
        alert(__('error_empty_idea'));
        return;
    }
    const config = loadConfig();
    if (!config.text.apiKey) {
        alert(__('error_no_key'));
        return;
    }

    lastParams = params;
    setLoading(true, 'processing');

    callTextAPI(obtenerSystemPrompt(params), buildBrief(params))
        .then(function(script) {
            setLoading(false);
            const editor = document.getElementById('scriptEditor');
            editor.value = script;
            document.getElementById('resultSection').classList.remove('hidden');
            document.getElementById('fixStatus').style.display = 'none';
            clearFixHistory();
            updateWordCount();
            editor.focus();
            document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function(err) {
            let msg = err.message || '';
            const map = {
                CONFIG_REQUIRED: __('error_no_key'),
                API_KEY_INVALID: 'API key invalida o sin creditos.',
                RATE_LIMITED: 'Limite de uso alcanzado. Espera unos minutos o cambia de proveedor.',
                MODEL_LOADING: 'El modelo se esta cargando. Reintentando...',
                MODEL_NOT_FOUND: 'Modelo no encontrado. Revisa el nombre del modelo en Configurar APIs.',
                REQUEST_TOO_LARGE: 'La peticion excede el limite de tokens del plan gratuito. Prueba Gemini (gratis con mas limite) o acorta la idea.',
                TIMEOUT: 'Tiempo de espera agotado en la API.',
                PARSE_ERROR: 'La IA devolvio una respuesta inesperada. Intenta de nuevo.',
                HTTP_ERROR: 'Error HTTP de la API.',
                SERVER_DOWN: 'El servidor proxy no responde. Ejecuta "node server.js" en la terminal.',
                SSRF_BLOCKED: 'El servidor bloqueo la URL del proveedor (whitelist SSRF). Revisa la URL Base en Configurar APIs.'
            };
            if (err.errorCode && map[err.errorCode]) msg = map[err.errorCode];
            // Para HTTP_ERROR preferir el mensaje real del proveedor
            if (err.errorCode === 'HTTP_ERROR' && err.message && err.message !== 'HTTP_ERROR' && err.message !== 'HTTP 400') {
                msg = err.message;
            }
            if (err.name === 'TypeError') msg = 'El servidor proxy no responde. Ejecuta "node server.js" en la terminal.';
            showError(__('error_generation') + ' ' + msg);
        });
}

// ============================================================
//  EDITOR + CORRECCION POR SELECCION
// ============================================================
let editorSelection = null; // { start, end, text }

function updateWordCount() {
    const editor = document.getElementById('scriptEditor');
    document.getElementById('wordCount').textContent = countWords(editor.value) + ' ' + (currentLang === 'en' ? 'words' : 'palabras');
}

function updateSelectionBadge() {
    const badge = document.getElementById('selectionBadge');
    const clearBtn = document.getElementById('clearSelectionBtn');
    if (editorSelection && editorSelection.text.length > 0) {
        badge.textContent = __('selection_chars').replace('{n}', editorSelection.text.length);
        badge.classList.remove('empty');
        clearBtn.classList.remove('hidden');
    } else {
        badge.textContent = __('no_selection');
        badge.classList.add('empty');
        clearBtn.classList.add('hidden');
    }
}

function trackSelection() {
    const editor = document.getElementById('scriptEditor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    if (start !== end) {
        editorSelection = { start: start, end: end, text: editor.value.substring(start, end) };
    } else {
        editorSelection = null;
    }
    updateSelectionBadge();
}

function clearSelectionState() {
    editorSelection = null;
    const editor = document.getElementById('scriptEditor');
    editor.selectionStart = editor.selectionEnd = editor.selectionEnd;
    updateSelectionBadge();
}

// --- extraccion de escenas por nombre/numero ---
const SCENE_HEADER_RE = /^(?:ESCENA|ESC|SECUENCIA|SECCION|SECCIÓN|SEC|BLOQUE|ACTO|MISION|MISIÓN|MOMENTO|BEAT|SHOT|COLD OPEN|EPISODIO)\s*[:\-–—]?\s*(\d+|[IVXLC]+)/i;

function parseSceneRange(spec) {
    spec = (spec || '').trim().toUpperCase().replace(/^TODO$/, 'ALL');
    if (!spec || spec === 'ALL') return { all: true };

    const romanToInt = function(r) { const m = {'I':1,'V':5,'X':10,'L':50,'C':100}; let n = 0; for (let i = 0; i < r.length; i++) { const c = m[r[i]]; const nx = m[r[i+1]]; n += (nx && nx > c) ? -c : c; } return n; };
    const parseNum = function(s) { return /^\d+$/.test(s) ? parseInt(s, 10) : (/^[IVXLC]+$/.test(s) ? romanToInt(s) : null); };

    let from = null, to = null;

    // rango explícito: "ESCENAS 1-3" / "2 A 4"
    const m = spec.match(/(\d+|[IVXLC]+)\s*(?:-\s*|\s+(?:A|AL)\s+)(\d+|[IVXLC]+)/);
    if (m) {
        from = parseNum(m[1]);
        to = parseNum(m[2]);
    } else {
        // escena única: tomar el ultimo token numerico/romano INDEPENDIENTE
        // (precedido por espacio e inicio, seguido de espacio o fin de texto)
        const tokenRe = /(?:^|\s)(\d+|[IVXLC]+)(?=\s|$)/g;
        const tokens = [];
        let mt;
        while ((mt = tokenRe.exec(spec)) !== null) {
            tokens.push(mt[1]);
        }
        if (tokens.length) {
            from = to = parseNum(tokens[tokens.length - 1]);
        }
    }
    if (from === null && to === null) return null;
    return { all: false, from: from, to: to !== null ? to : from };
}

function extractSceneBlocks(script) {
    const lines = script.split(/\r?\n/);
    const blocks = [];
    let current = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const m = line.match(SCENE_HEADER_RE);
        if (m && (line.trim().length < 80)) {
            if (current) blocks.push(current);
            current = { header: line.trim(), num: null, startLine: i, lines: [line] };
            const rawNum = m[1];
            current.num = /^\d+$/.test(rawNum) ? parseInt(rawNum, 10) : null;
            if (current.num === null && /^[IVXLC]+$/.test(rawNum)) {
                const romanToInt = function(r) { const mp = {'I':1,'V':5,'X':10,'L':50,'C':100}; let n = 0; for (let j = 0; j < r.length; j++) { const c = mp[r[j]]; const nx = mp[r[j+1]]; n += (nx && nx > c) ? -c : c; } return n; };
                current.num = romanToInt(rawNum);
            }
        } else if (current) {
            current.lines.push(line);
        }
    }
    if (current) blocks.push(current);
    return blocks;
}

function getTargetText(editorValue) {
    // 1) seleccion manual
    if (editorSelection && editorSelection.text.trim().length > 0) {
        return {
            type: 'selection',
            label: __('selection_scope'),
            text: editorSelection.text,
            start: editorSelection.start,
            end: editorSelection.end
        };
    }
    // 2) alcance por escenas
    const spec = document.getElementById('fixTargetInput').value;
    const range = parseSceneRange(spec);
    if (range) {
        if (range.all) {
            return { type: 'all', label: __('escenas_scope').replace('{scope}', 'TODO'), text: editorValue, start: 0, end: editorValue.length };
        }
        const blocks = extractSceneBlocks(editorValue);
        const selected = blocks.filter(function(b) {
            if (b.num === null) return false;
            return b.num >= range.from && b.num <= range.to;
        });
        if (selected.length) {
            const firstLine = selected[0].startLine;
            const lastBlock = selected[selected.length - 1];
            const lastLine = lastBlock.startLine + lastBlock.lines.length;
            const lines = editorValue.split(/\r?\n/);
            const startIdx = lines.slice(0, firstLine).reduce(function(acc, l) { return acc + l.length + 1; }, 0);
            const endIdx = lines.slice(0, lastLine).reduce(function(acc, l) { return acc + l.length + 1; }, 0);
            return {
                type: 'scenes',
                label: __('escenas_scope').replace('{scope}', spec.toUpperCase()),
                text: editorValue.substring(startIdx, endIdx),
                start: startIdx,
                end: endIdx
            };
        }
    }
    return null;
}

function applyFixToEditor(target, fixedText) {
    const editor = document.getElementById('scriptEditor');
    const before = editor.value;
    let ft = fixedText;
    if (target.text.endsWith('\n') && !ft.endsWith('\n')) ft += '\n';
    if (target.text.startsWith('\n') && !ft.startsWith('\n')) ft = '\n' + ft;
    const after = before.substring(0, target.start) + ft + before.substring(target.end);
    editor.value = after;
    editorSelection = null;
    updateSelectionBadge();
    updateWordCount();
    addFixHistory(before, after, target.label);
}

// --- historial de correcciones ---
function loadFixHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (e) { return []; }
}

function saveFixHistory(history) {
    return lsSet(HISTORY_KEY, history.slice(-20));
}

function clearFixHistory() {
    saveFixHistory([]);
    renderHistory();
}

function addFixHistory(before, after, scopeLabel) {
    const history = loadFixHistory();
    history.push({
        instruction: document.getElementById('fixInstructionInput').value.trim(),
        scope: scopeLabel,
        before: before,
        after: after,
        ts: Date.now()
    });
    saveFixHistory(history);
    renderHistory();
}

function undoLastFix() {
    const history = loadFixHistory();
    const editor = document.getElementById('scriptEditor');
    for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        if (item.after === editor.value) {
            editor.value = item.before;
            history.splice(i, 1);
            saveFixHistory(history);
            renderHistory();
            updateWordCount();
            updateSelectionBadge();
            return;
        }
    }
    alert(currentLang === 'en' ? 'No undoable correction found.' : 'No se encontro una correccion para deshacer.');
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const undoBtn = document.getElementById('undoFixBtn');
    const history = loadFixHistory();
    if (!list) return;
    list.innerHTML = '';
    if (!history.length) {
        list.innerHTML = '<div class="ci-meta" style="padding:4px 0;">' + __('no_history') + '</div>';
        undoBtn.classList.add('hidden');
        return;
    }
    for (let i = history.length - 1; i >= 0; i--) {
        const item = history[i];
        const div = document.createElement('div');
        div.className = 'correction-item';
        div.style.marginBottom = '8px';
        const inst = item.instruction.length > 90 ? item.instruction.slice(0, 90) + '...' : item.instruction;
        div.innerHTML =
            '<div class="ci-head">' +
                '<span class="ci-inst">' + escapeHtml(inst) + '</span>' +
                '<span class="ci-meta">' + escapeHtml(formatTime(item.ts)) + '</span>' +
            '</div>' +
            '<div class="ci-meta">' + escapeHtml(item.scope) + '</div>';
        list.appendChild(div);
    }
    undoBtn.classList.remove('hidden');
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

function runFix() {
    const editor = document.getElementById('scriptEditor');
    const instruction = document.getElementById('fixInstructionInput').value.trim();

    if (!editor.value.trim()) {
        alert(__('error_no_script'));
        return;
    }
    if (!instruction) {
        alert(__('error_no_instruction'));
        return;
    }

    const target = getTargetText(editor.value);
    if (!target) {
        alert(__('error_no_selection'));
        return;
    }

    const config = loadConfig();
    if (!config.text.apiKey) {
        alert(__('error_no_key'));
        return;
    }

    const fixStatus = document.getElementById('fixStatus');
    const fixBtn = document.getElementById('fixBtn');
    fixStatus.style.display = 'block';
    fixStatus.textContent = target.label;
    fixStatus.style.color = 'var(--muted)';
    fixBtn.disabled = true;

    // Contexto inteligente: para no gastar tokens (y no reventar los
    // limites TPM de tiers gratuitos como Groq), se envia solo una
    // ventana del guion alrededor del fragmento a corregir.
    const CONTEXT_BEFORE = 3000; // caracteres antes del fragmento
    const CONTEXT_AFTER = 1500;  // caracteres despues del fragmento
    let context = editor.value;
    if (context.length > 6000) {
        const from = Math.max(0, target.start - CONTEXT_BEFORE);
        const to = Math.min(editor.value.length, target.end + CONTEXT_AFTER);
        context = editor.value.substring(from, to);
        context =
            (from > 0 ? '[...guion previo omitido para ahorrar tokens...]\n\n' : '') +
            context +
            (to < editor.value.length ? '\n\n[...resto del guion omitido para ahorrar tokens...]' : '');
    }

    const userText =
        'GUION (CONTEXTO ALREDEDOR DEL FRAGMENTO):\n' + context +
        '\n\n===== FRAGMENTO A CORREGIR =====\n' + target.text +
        '\n===== FIN DEL FRAGMENTO =====\n\n' +
        'INSTRUCCION: ' + instruction +
        '\n\nCorrige UNICAMENTE el fragmento marcado y devuelvelo completo ya corregido.';

    callTextAPI(obtenerFixSystemPrompt(), userText)
        .then(function(fixedText) {
            fixedText = cleanLLMResponse(fixedText);
            if (!fixedText) {
                throw new Error('La IA devolvio una respuesta vacia. Intenta de nuevo.');
            }
            applyFixToEditor(target, fixedText);
            fixStatus.textContent = __('fix_done') + '.';
            fixStatus.style.color = 'var(--success)';
            fixBtn.disabled = false;
            document.getElementById('fixInstructionInput').value = '';
            document.getElementById('fixTargetInput').value = '';
            setTimeout(function() { fixStatus.style.display = 'none'; }, 4000);
        })
        .catch(function(err) {
            fixBtn.disabled = false;
            let msg = err.message || '';
            if (err.errorCode === 'API_KEY_INVALID') msg = 'API key invalida o sin creditos.';
            if (err.errorCode === 'RATE_LIMITED') msg = 'Limite de uso alcanzado.';
            if (err.errorCode === 'MODEL_NOT_FOUND') msg = 'Modelo no encontrado. Revisa el nombre del modelo.';
            if (err.errorCode === 'REQUEST_TOO_LARGE') msg = 'La peticion excede el limite de tokens del plan gratuito. Prueba Gemini.';
            if (err.errorCode === 'SERVER_DOWN') msg = 'El servidor proxy no responde. Ejecuta "node server.js".';
            if (err.errorCode === 'SSRF_BLOCKED') msg = 'El servidor bloqueo la URL del proveedor (whitelist).';
            if (err.name === 'TypeError') msg = 'El servidor proxy no responde. Ejecuta "node server.js".';
            fixStatus.textContent = __('error_fix') + ' ' + msg;
            fixStatus.style.color = 'var(--error)';
        });
}

// ============================================================
//  PROYECTOS GUARDADOS
// ============================================================
function loadProjects() {
    try { return JSON.parse(localStorage.getItem(PROJECTS_KEY)) || []; } catch (e) { return []; }
}

function saveProjects(projects) {
    return lsSet(PROJECTS_KEY, projects.slice(0, 30));
}

function saveCurrentProject() {
    const editor = document.getElementById('scriptEditor');
    if (!editor.value.trim()) {
        alert(__('error_no_script'));
        return;
    }
    const projects = loadProjects();
    const existing = projects.find(function(p) { return p.script === editor.value; });
    if (existing) {
        alert(__('saved_ok'));
        return;
    }
    projects.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: extractTitle(editor.value),
        format: lastParams ? lastParams.format : '',
        script: editor.value,
        params: lastParams,
        updated: Date.now()
    });
    const ok = saveProjects(projects.slice(0, 30));
    renderProjects();
    alert(ok ? __('saved_ok') : __('storage_error'));
}

function deleteProject(id) {
    let projects = loadProjects();
    projects = projects.filter(function(p) { return p.id !== id; });
    saveProjects(projects);
    renderProjects();
}

function loadProject(id) {
    const projects = loadProjects();
    const project = projects.find(function(p) { return p.id === id; });
    if (!project) return;
    const editor = document.getElementById('scriptEditor');
    editor.value = project.script;
    lastParams = project.params || null;
    if (project.params) {
        document.getElementById('ideaInput').value = project.params.idea || '';
        document.getElementById('genreInput').value = project.params.genre || '';
        document.getElementById('durationInput').value = project.params.duration || '';
        document.getElementById('toneInput').value = project.params.tone || '';
        document.getElementById('audienceInput').value = project.params.audience || '';
        document.getElementById('charactersInput').value = project.params.characters || '';
        document.getElementById('scriptLang').value = project.params.scriptLang || 'es';
        document.querySelectorAll('.format-chip').forEach(function(chip) {
            chip.classList.toggle('active-format', chip.getAttribute('data-format') === (project.params.format || 'cortometraje'));
        });
    }
    clearFixHistory();
    editorSelection = null;
    updateSelectionBadge();
    updateWordCount();
    document.getElementById('resultSection').classList.remove('hidden');
    alert(__('projects_load_ok'));
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderProjects() {
    const list = document.getElementById('projectsList');
    if (!list) return;
    const projects = loadProjects();
    list.innerHTML = '';
    if (!projects.length) {
        list.innerHTML = '<div class="ci-meta" style="padding:4px 0;">' + __('no_projects') + '</div>';
        return;
    }
    projects.forEach(function(p) {
        const div = document.createElement('div');
        div.className = 'project-item';
        const fmtName = p.format && SCRIPT_FORMATS[p.format] ? (currentLang === 'en' ? SCRIPT_FORMATS[p.format].en : SCRIPT_FORMATS[p.format].es) : '';
        div.innerHTML =
            '<span class="pj-title">' + escapeHtml(p.title) + '</span>' +
            '<span class="pj-meta">' + escapeHtml(fmtName) + ' · ' + escapeHtml(formatTime(p.updated)) + '</span>' +
            '<button class="ci-btn" data-action="load">' + (currentLang === 'en' ? 'Open' : 'Abrir') + '</button>' +
            '<button class="ci-btn" data-action="delete">X</button>';
        div.querySelector('[data-action="load"]').addEventListener('click', function() { loadProject(p.id); });
        div.querySelector('[data-action="delete"]').addEventListener('click', function() { deleteProject(p.id); });
        list.appendChild(div);
    });
}

// ============================================================
//  EXPORTACION
// ============================================================
function getCurrentScript() {
    return document.getElementById('scriptEditor').value;
}

function exportTxt() {
    const script = getCurrentScript();
    if (!script.trim()) { alert(__('error_no_script')); return; }
    downloadFile(slugify(extractTitle(script)) + '.txt', script);
}

function exportFountain() {
    const script = getCurrentScript();
    if (!script.trim()) { alert(__('error_no_script')); return; }
    downloadFile(slugify(extractTitle(script)) + '.fountain', script);
}

// ============================================================
//  CLASIFICADOR DE LINEAS DEL GUION (para export con formato)
//  Tipos: title | meta | scene | character | dialogue |
//         parenthetical | transition | action | blank
// ============================================================
const METADATA_KEY_RE = /^(?:FORMATO|FORMAT|DURACION|DURATION|LOGLINE|SINOPSIS|SYNOPSIS|PERSONAJES|CHARACTERS|GENERO|GENRE|ACTOS|ACTS|TESIS|TEMA|THEME|HOOK|CTA|MARCA|BRAND|PRODUCTO|OBJETIVO|EPISODIO|RECAP|IDIOMA|AUDIENCIA|TONO)(?:\s+\S+)*\s*:/i;
const TRANSITION_RE = /^(?:TRANSICION|TRANSITION|CORTE|CUT|FUNDIDO|FADE|DISOLVENCIA|DISSOLVE|BARRA|WIPE|SMASH)[\s:.]?/i;
const CHARACTER_LINE_RE = /^[A-ZÁÉÍÓÚÑ0-9 .\-']{2,40}$/;

/**
 * Clasifica cada linea del guion segun el formato profesional:
 *  - 'scene': encabezado de escena → negrita
 *  - 'character': nombre en MAYUSCULAS → CENTRADO
 *  - 'dialogue': linea siguiente a un personaje → bloque indentado
 *  - 'parenthetical': (acotacion) → centrada, italica
 *  - 'transition': CORTE A / FUNDIDO → alineada a la derecha
 */
function classifyScriptLines(script) {
    const lines = script.replace(/\r\n/g, '\n').split('\n');
    const out = [];
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (!t) { out.push({ type: 'blank', text: '' }); continue; }

        let type = 'action';
        if (/^(?:TITULO|TITLE)\b[^:]*:/.test(t)) type = 'title';
        else if (METADATA_KEY_RE.test(t)) type = 'meta';
        else if (SCENE_HEADER_RE.test(t)) type = 'scene';
        else if (TRANSITION_RE.test(t)) type = 'transition';
        else if (/^\(.+\)$/.test(t)) type = 'parenthetical';
        else if (CHARACTER_LINE_RE.test(t)) type = 'character';

        // 'dialogue': solo lineas normales ('action') que siguen a un
        // personaje, o a una acotacion que sigue a un personaje.
        if (type === 'action') {
            let prev = null;
            for (let j = out.length - 1; j >= 0; j--) {
                if (out[j].type !== 'blank') { prev = out[j]; break; }
            }
            if (prev && prev.type === 'character') {
                type = 'dialogue';
            } else if (prev && prev.type === 'parenthetical') {
                for (let j = out.length - 1; j >= 0; j--) {
                    if (out[j].type === 'blank' || out[j].type === 'parenthetical') continue;
                    if (out[j].type === 'character') type = 'dialogue';
                    break;
                }
            }
        }
        out.push({ type: type, text: t });
    }
    return out;
}

// Carga el logo FAP una sola vez y lo cachea como dataURL
let logoDataUrlPromise = null;
function getLogoDataURL() {
    if (!logoDataUrlPromise) {
        logoDataUrlPromise = fetch('logo-fap.png')
            .then(function(r) { if (!r.ok) throw new Error('no logo'); return r.blob(); })
            .then(function(blob) {
                return new Promise(function(resolve) {
                    const fr = new FileReader();
                    fr.onload = function() { resolve(fr.result); };
                    fr.onerror = function() { resolve(null); };
                    fr.readAsDataURL(blob);
                });
            })
            .catch(function() { return null; });
    }
    return logoDataUrlPromise;
}

function exportPdf() {
    const script = getCurrentScript();
    if (!script.trim()) { alert(__('error_no_script')); return; }
    if (typeof window.jspdf === 'undefined') {
        alert(__('pdf_no_js'));
        return;
    }
    const title = extractTitle(script);

    getLogoDataURL().then(function(logoData) {
        const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const M = 60;       // margen
        const LINE = 14;    // interlineado
        const INK = [7, 7, 6];
        const MUTED = [107, 101, 0];

        // ---------- PORTADA ----------
        if (logoData) doc.addImage(logoData, 'PNG', pageW / 2 - 45, 70, 90, 90);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(30);
        doc.setTextColor(INK[0], INK[1], INK[2]);
        doc.text('SCRIPT AI', pageW / 2, logoData ? 200 : 130, { align: 'center' });
        doc.setFontSize(18);
        const wrappedTitle = doc.splitTextToSize(title, pageW - 160);
        doc.text(wrappedTitle, pageW / 2, logoData ? 240 : 160, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
        doc.text(currentLang === 'en' ? 'AI-generated screenplay' : 'Guion generado con IA', pageW / 2, 300, { align: 'center' });
        doc.text(formatTime(Date.now()), pageW / 2, 316, { align: 'center' });
        // logos de marca abajo (freeanimationpower.org + fierroduque.com)
        doc.setTextColor(INK[0], INK[1], INK[2]);
        doc.setFontSize(11);
        if (logoData) {
            doc.addImage(logoData, 'PNG', pageW / 2 - 108, pageH - 158, 34, 34);
            doc.addImage(logoData, 'PNG', pageW / 2 + 74, pageH - 158, 34, 34);
        }
        doc.text('freeanimationpower.org', pageW / 2 - 60, pageH - 110, { align: 'center' });
        doc.text('fierroduque.com', pageW / 2 + 110, pageH - 110, { align: 'center' });
        doc.addPage();

        // ---------- CUERPO CON FORMATO DE GUION ----------
        const items = classifyScriptLines(script);
        doc.setTextColor(INK[0], INK[1], INK[2]);
        let y = M;

        function ensureSpace(blockH) {
            if (y + blockH > pageH - M) {
                doc.addPage();
                y = M;
            }
        }

        for (let i = 0; i < items.length; i++) {
            const it = items[i];
            if (it.type === 'blank') { y += LINE * 0.5; continue; }

            let wrapped, x, align, blockH;
            if (it.type === 'title') {
                doc.setFont('courier', 'bold'); doc.setFontSize(16);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2);
                x = pageW / 2; align = 'center';
                y += LINE;
            } else if (it.type === 'meta') {
                doc.setFont('courier', 'bold'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2);
                x = M; align = 'left';
                y += LINE * 0.4;
            } else if (it.type === 'scene') {
                doc.setFont('courier', 'bold'); doc.setFontSize(11);
                wrapped = doc.splitTextToSize(it.text.toUpperCase(), pageW - M * 2);
                x = M; align = 'left';
                y += LINE;
            } else if (it.type === 'character') {
                doc.setFont('courier', 'bold'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2 - 100);
                x = pageW / 2; align = 'center';
                y += LINE * 0.5;
            } else if (it.type === 'dialogue') {
                doc.setFont('courier', 'normal'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2 - 120);
                x = M + 60; align = 'left';
            } else if (it.type === 'parenthetical') {
                doc.setFont('courier', 'italic'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2 - 160);
                x = pageW / 2; align = 'center';
            } else if (it.type === 'transition') {
                doc.setFont('courier', 'bold'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text.toUpperCase(), 200);
                x = pageW - M; align = 'right';
                y += LINE * 0.5;
            } else {
                doc.setFont('courier', 'normal'); doc.setFontSize(10);
                wrapped = doc.splitTextToSize(it.text, pageW - M * 2);
                x = M; align = 'left';
            }

            blockH = wrapped.length * LINE;
            ensureSpace(blockH);
            doc.text(wrapped, x, y, { align: align });
            y += blockH;
            doc.setFont('courier', 'normal');
            doc.setFontSize(10);
        }

        // ---------- MARCA DE AGUA EN CADA PAGINA ----------
        const totalPages = doc.internal.getNumberOfPages();
        for (let p = 2; p <= totalPages; p++) {
            doc.setPage(p);
            doc.saveGraphicsState();
            try { doc.setGState(new doc.GState({ opacity: 0.07 })); } catch (e) {}
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(INK[0], INK[1], INK[2]);
            doc.text('freeanimationpower.org  ·  fierroduque.com', pageW / 2, pageH - 28, { align: 'center' });
            if (logoData) {
                doc.addImage(logoData, 'PNG', pageW / 2 - 7, pageH - 21, 14, 14);
            }
            doc.restoreGraphicsState();
        }

        doc.save(slugify(title) + '.pdf');
    });
}

// ============================================================
//  EXPORT WORD (.docx real, con JSZip CDN + fallback .doc)
// ============================================================
function xmlEscape(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildDocxParagraph(type, text) {
    let pPr = '';
    let rPr = '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>';
    let sz = '21'; // 10.5pt (en half-points)

    if (type === 'title') {
        pPr = '<w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/>';
        rPr += '<w:b/><w:sz w:val="32"/><w:szCs w:val="32"/>';
        sz = '32';
    } else if (type === 'meta') {
        pPr = '<w:spacing w:before="60" w:after="60"/>';
        rPr += '<w:b/>';
    } else if (type === 'scene') {
        pPr = '<w:spacing w:before="240" w:after="60"/>';
        rPr += '<w:b/><w:caps/>';
    } else if (type === 'character') {
        pPr = '<w:jc w:val="center"/><w:spacing w:before="120" w:after="0"/>';
        rPr += '<w:b/>';
    } else if (type === 'dialogue') {
        pPr = '<w:ind w:left="720" w:right="720"/><w:spacing w:after="60"/>';
    } else if (type === 'parenthetical') {
        pPr = '<w:jc w:val="center"/><w:ind w:left="1080" w:right="1080"/>';
        rPr += '<w:i/>';
    } else if (type === 'transition') {
        pPr = '<w:jc w:val="right"/><w:spacing w:before="120" w:after="120"/>';
        rPr += '<w:b/><w:caps/>';
    } else {
        pPr = '<w:spacing w:after="60"/>';
    }
    rPr += '<w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/>';

    return '<w:p><w:pPr>' + pPr + '</w:pPr><w:r><w:rPr>' + rPr +
        '</w:rPr><w:t xml:space="preserve">' + xmlEscape(text) + '</w:t></w:r></w:p>';
}

function fallbackExportDoc(script) {
    // Fallback sin JSZip: .doc compatible con Word (HTML embebido)
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:w="urn:schemas-microsoft-com:office:word">' +
        '<head><meta charset="utf-8"><title>' + xmlEscape(extractTitle(script)) + '</title></head>' +
        '<body><pre style="font-family:Consolas,monospace;font-size:11pt;">' +
        xmlEscape(script) + '</pre></body></html>';
    downloadFile(slugify(extractTitle(script)) + '.doc', '\ufeff' + html, 'application/msword');
}

function exportWord() {
    const script = getCurrentScript();
    if (!script.trim()) { alert(__('error_no_script')); return; }
    const title = extractTitle(script);
    const items = classifyScriptLines(script);

    const paragraphs = [];
    // Portada
    paragraphs.push(buildDocxParagraph('title', 'SCRIPT AI — ' + (currentLang === 'en' ? 'AI-generated screenplay' : 'Guion generado con IA')));
    paragraphs.push(buildDocxParagraph('title', title));
    paragraphs.push(buildDocxParagraph('meta', currentLang === 'en' ? 'Generated: ' + formatTime(Date.now()) : 'Generado: ' + formatTime(Date.now())));
    paragraphs.push(buildDocxParagraph('meta', 'freeanimationpower.org  ·  fierroduque.com'));
    paragraphs.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    // Cuerpo
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.type === 'blank') { paragraphs.push('<w:p/>'); continue; }
        paragraphs.push(buildDocxParagraph(it.type, it.text));
    }
    paragraphs.push(buildDocxParagraph('meta', 'freeanimationpower.org  ·  fierroduque.com'));

    const docXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
        '<w:body>' + paragraphs.join('') +
        '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>' +
        '<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>' +
        '</w:body></w:document>';

    const contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
        '</Types>';

    const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
        '</Relationships>';

    const finish = function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = slugify(title) + '.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
    };

    if (typeof window.JSZip !== 'undefined') {
        const zip = new window.JSZip();
        zip.file('[Content_Types].xml', contentTypes);
        zip.file('_rels/.rels', rels);
        zip.file('word/document.xml', docXml);
        zip.generateAsync({ type: 'blob' })
            .then(finish)
            .catch(function() { fallbackExportDoc(script); });
    } else {
        fallbackExportDoc(script);
    }
}

function copyScript() {
    const script = getCurrentScript();
    if (!script.trim()) { alert(__('error_no_script')); return; }
    const copyText = function() {
        navigator.clipboard.writeText(script).then(
            function() { alert(__('copied')); },
            function() {
                const ta = document.createElement('textarea');
                ta.value = script;
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); alert(__('copied')); } catch (e) { alert('No se pudo copiar.'); }
                document.body.removeChild(ta);
            }
        );
    };
    copyText();
}

function newScript() {
    if (!confirm(__('new_script_confirm'))) return;
    document.getElementById('ideaInput').value = '';
    document.getElementById('genreInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('toneInput').value = '';
    document.getElementById('audienceInput').value = '';
    document.getElementById('charactersInput').value = '';
    const editor = document.getElementById('scriptEditor');
    editor.value = '';
    editorSelection = null;
    lastParams = null;
    clearFixHistory();
    updateSelectionBadge();
    updateWordCount();
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('ideaInput').focus();
}

// ============================================================
//  CHIPS DE FORMATO
// ============================================================
function renderFormatChips() {
    const container = document.getElementById('formatChips');
    if (!container) return;
    container.innerHTML = '';
    const keys = Object.keys(SCRIPT_FORMATS);
    const selectedKey = document.querySelector('.format-chip.active-format')
        ? document.querySelector('.format-chip.active-format').getAttribute('data-format')
        : 'cortometraje';
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const fmt = SCRIPT_FORMATS[key];
        const label = currentLang === 'en' ? fmt.en : fmt.es;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'format-chip' + (key === selectedKey ? ' active-format' : '');
        chip.setAttribute('data-format', key);
        chip.textContent = label;
        chip.addEventListener('click', function() {
            document.querySelectorAll('.format-chip').forEach(function(c) { c.classList.remove('active-format'); });
            chip.classList.add('active-format');
        });
        container.appendChild(chip);
    }
}

// ============================================================
//  PANEL DE CONFIGURACION
// ============================================================
function fillSelect(select, providers, selectedKey) {
    select.innerHTML = '';
    const keys = Object.keys(providers);
    for (let i = 0; i < keys.length; i++) {
        const opt = document.createElement('option');
        opt.value = keys[i];
        opt.textContent = providers[keys[i]].name;
        select.appendChild(opt);
    }
    select.value = providers[selectedKey] ? selectedKey : 'gemini';
}

function syncConfigFields(providerKey) {
    const preset = TEXT_PROVIDERS[providerKey];
    const modelInput = document.getElementById('textModel');
    const urlInput = document.getElementById('textUrl');
    if (preset && preset.url) {
        modelInput.value = preset.model || '';
        urlInput.value = preset.url;
    }
    modelInput.disabled = false;
    urlInput.disabled = (providerKey !== 'custom');
}

function setupConfigPanel() {
    const showBtn = document.getElementById('showConfigBtn');
    const panel = document.getElementById('configPanel');
    const providerSelect = document.getElementById('textProvider');
    const apiKeyInput = document.getElementById('textApiKey');
    const modelInput = document.getElementById('textModel');
    const urlInput = document.getElementById('textUrl');
    const saveBtn = document.getElementById('saveConfigBtn');
    const clearBtn = document.getElementById('clearConfigBtn');
    const status = document.getElementById('configStatus');

    showBtn.addEventListener('click', function() {
        panel.classList.toggle('hidden');
        showBtn.textContent = panel.classList.contains('hidden')
            ? (currentLang === 'en' ? 'Configure APIs' : 'Configurar APIs')
            : (currentLang === 'en' ? 'Hide configuration' : 'Ocultar configuracion');
    });

    // Placeholder de la key segun el proveedor (evita confusiones:
    // Gemini usa "AIzaSy...", Groq "gsk_...", OpenAI "sk-..."...)
    const KEY_HINTS = {
        gemini: 'AIzaSy... (la key de Google AI Studio)',
        groq: 'gsk_...',
        openai: 'sk-proj-...',
        deepseek: 'sk-...',
        openrouter: 'sk-or-...',
        xai: 'xai-...',
        mistral: 'key de console.mistral.ai',
        opencode: 'key de opencode.ai/zen (requiere saldo $20)',
        custom: 'opcional (vacia si el servicio local no la pide)'
    };

    function loadConfigIntoUI() {
        const config = loadConfig();
        fillSelect(providerSelect, TEXT_PROVIDERS, config.text.provider);
        apiKeyInput.value = config.text.apiKey || '';
        modelInput.value = config.text.model || '';
        urlInput.value = config.text.baseUrl || '';
        syncConfigFields(config.text.provider);
    }

    providerSelect.addEventListener('change', function() {
        apiKeyInput.setAttribute('placeholder', KEY_HINTS[providerSelect.value] || 'sk-...');
        syncConfigFields(providerSelect.value);
    });

    saveBtn.addEventListener('click', function() {
        const config = loadConfig();
        config.text.provider = providerSelect.value;
        config.text.apiKey = apiKeyInput.value.trim();
        config.text.model = modelInput.value.trim() || (TEXT_PROVIDERS[providerSelect.value] && TEXT_PROVIDERS[providerSelect.value].model) || '';
        config.text.baseUrl = urlInput.value.trim() || (TEXT_PROVIDERS[providerSelect.value] && TEXT_PROVIDERS[providerSelect.value].url) || '';
        saveConfig(config);
        status.textContent = '✔ ' + __('config_saved') + '. ' + __('api_key_hint');
        status.style.color = 'var(--success)';
        setTimeout(function() { status.textContent = ''; }, 6000);
    });

    clearBtn.addEventListener('click', function() {
        clearConfig();
        loadConfigIntoUI();
        status.textContent = '✔ ' + __('config_cleared');
        status.style.color = 'var(--muted)';
        setTimeout(function() { status.textContent = ''; }, 3000);
    });

    loadConfigIntoUI();
    apiKeyInput.setAttribute('placeholder', KEY_HINTS[providerSelect.value] || 'sk-...');
}

// ============================================================
//  INIT
// ============================================================
function init() {
    // idioma
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(function(btn) {
        btn.addEventListener('click', function() { switchLang(btn.getAttribute('data-lang')); });
        btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === currentLang);
    });

    setupConfigPanel();
    renderFormatChips();
    renderHistory();
    renderProjects();
    updateWordCount();
    updateSelectionBadge();

    // eventos
    document.getElementById('generateBtn').addEventListener('click', generateScript);
    document.getElementById('fixBtn').addEventListener('click', runFix);
    document.getElementById('saveProjectBtn').addEventListener('click', saveCurrentProject);
    document.getElementById('copyBtn').addEventListener('click', copyScript);
    document.getElementById('downloadTxtBtn').addEventListener('click', exportTxt);
    document.getElementById('downloadFountainBtn').addEventListener('click', exportFountain);
    document.getElementById('downloadWordBtn').addEventListener('click', exportWord);
    document.getElementById('downloadPdfBtn').addEventListener('click', exportPdf);
    document.getElementById('newScriptBtn').addEventListener('click', newScript);
    document.getElementById('undoFixBtn').addEventListener('click', undoLastFix);
    document.getElementById('clearSelectionBtn').addEventListener('click', clearSelectionState);

    const editor = document.getElementById('scriptEditor');
    editor.addEventListener('input', updateWordCount);
    editor.addEventListener('select', trackSelection);
    editor.addEventListener('mouseup', trackSelection);
    editor.addEventListener('keyup', trackSelection);
    document.addEventListener('selectionchange', function() {
        if (document.activeElement === editor) trackSelection();
    });

    applyI18n();
}

document.addEventListener('DOMContentLoaded', init);
