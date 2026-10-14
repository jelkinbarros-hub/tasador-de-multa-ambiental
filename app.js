/* ==========================================================================
   APP ENGINE - TASADOR DE MULTAS AMBIENTALES (CORPOGUAJIRA)
   ========================================================================== */

// Global Constants & Presets
const PRESETS = {
    "2026": { smmlv: 1500000, uvt: 52000, label: "2026 (Proyectado)" },
    "2025": { smmlv: 1420000, uvt: 50000, label: "2025 (Estimado)" },
    "2024": { smmlv: 1300000, uvt: 47065, label: "2024 (Vigente)" }
};

// Default Agravantes (Art. 7 Ley 1333 de 2009)
const AGRAVANTES_DEFAULTS = [
    { id: "agr_reincidencia", text: "Reincidencia del infractor (Art. 7 Num. 1)", weight: 0.20, active: false },
    { id: "agr_dano_grave", text: "Generar daño grave al medio ambiente o salud humana (Art. 7 Num. 2)", weight: 0.25, active: false },
    { id: "agr_ocultamiento", text: "Cometer la infracción para ocultar otra (Art. 7 Num. 3)", weight: 0.15, active: false },
    { id: "agr_evasion", text: "Rehuir la responsabilidad o atribuirla a otros (Art. 7 Num. 4)", weight: 0.10, active: false },
    { id: "agr_obstaculizacion", text: "Obstaculizar la acción de las autoridades ambientales (Art. 7 Num. 5)", weight: 0.15, active: false },
    { id: "agr_provecho", text: "Obtener provecho económico de la infracción (Art. 7 Num. 6)", weight: 0.15, active: false },
    { id: "agr_incumplimiento_prev", text: "Incumplimiento de medidas preventivas previas (Art. 7 Num. 7)", weight: 0.20, active: false },
    { id: "agr_escasez", text: "Cometer la infracción en periodos de escasez o crisis (Art. 7 Num. 8)", weight: 0.15, active: false },
    { id: "agr_area_protegida", text: "Cometer la infracción en áreas de especial importancia ecológica / DMI (Art. 7 Num. 9)", weight: 0.25, active: false },
    { id: "agr_trafico_especies", text: "Comercialización ilegal de fauna/flora silvestre protegida (Art. 7 Num. 10)", weight: 0.20, active: false }
];

// Default Mitigantes (Art. 6 Ley 1333 de 2009)
const MITIGANTES_DEFAULTS = [
    { id: "mit_confesion", text: "Confesión como atenuante de la conducta (Art. 6 Num. 1)", weight: -0.40, active: false },
    { id: "mit_mitigacion", text: "Resarcir o mitigar el daño por iniciativa propia antes del proceso (Art. 6 Num. 2)", weight: -0.40, active: false },
    { id: "mit_colaboracion", text: "Colaboración eficaz con la autoridad ambiental", weight: -0.15, active: false }
];

// Normoteca Laws Database
const NORMOTECA_DB = [
    {
        id: "ley-1333-2009",
        title: "Ley 1333 de 2009",
        subtitle: "Régimen Sancionatorio Ambiental",
        content: `
            <p><strong>Artículo 1o. Titularidad de la potestad sancionatoria en materia ambiental.</strong> El Estado es el titular de la potestad sancionatoria en materia ambiental y la ejerce sin perjuicio de las competencias legales de otras autoridades...</p>
            <p><strong>Artículo 5o. Infracciones.</strong> Se considera infracción en materia ambiental toda acción u omisión con la que se infrinjan las disposiciones ambientales de rango constitucional, legal, reglamento o actos administrativos...</p>
            <p><strong>Artículo 6o. Atenuación de la Responsabilidad.</strong> Son causales de atenuación: 1) Confesar la infracción antes del inicio del proceso. 2) Mitigar o resarcir el daño por iniciativa propia antes de iniciarse el proceso...</p>
            <p><strong>Artículo 7o. Agravación de la Responsabilidad.</strong> Son causales de agravación: 1) Reincidencia. 2) Daño grave. 3) Ocultamiento. 4) Evasión de la responsabilidad. 5) Obstaculizar visitas. 6) Provecho económico. 7) Incumplir medidas preventivas. 8) Ocurrir en épocas de sequía o escasez. 9) En áreas protegidas o de importancia ecológica. 10) Traficar especies protegidas...</p>
            <p><strong>Artículo 40. Sanciones.</strong> Las sanciones ambientales consisten en: 1) Multas diarias. 2) Cierre temporal o definitivo. 3) Revocatoria de licencia. 4) Demolición de obra. 5) Decomiso definitivo. 6) Trabajo comunitario...</p>
        `,
        tags: ["ley 1333", "atenuantes", "agravantes", "sanciones", "procedimiento"]
    },
    {
        id: "ley-2387-2024",
        title: "Ley 2387 de 2024",
        subtitle: "Reforma al Procedimiento Sancionatorio Ambiental",
        content: `
            <p><strong>Artículo 1o. Incremento de las multas.</strong> Modifícase el numeral 1 del artículo 40 de la Ley 1333 de 2009. El tope máximo de las multas impuestas por las autoridades ambientales se incrementa hasta las <strong>100.000 Unidades de Valor Tributario (UVT) o Salarios Mínimos Equivalentes</strong>, reforzando el efecto preventivo y disuasorio.</p>
            <p><strong>Artículo 2o. Suspensión y terminación anticipada.</strong> Permite al presunto infractor suspender o terminar de manera anticipada el procedimiento mediante la adopción de medidas garantizadas de corrección o compensación del daño ambiental, bajo la aprobación técnica de la Corporación.</p>
            <p><strong>Artículo 3o. Descuentos por confesión.</strong> Se consagran los siguientes incentivos procesales:
            <ul>
                <li><strong>Reducción del 30%:</strong> Si el presunto infractor confiesa voluntariamente la conducta antes de que se formalice la apertura del procedimiento sancionatorio ambiental.</li>
                <li><strong>Reducción del 15%:</strong> Si la confesión se produce de manera posterior al auto de apertura, pero antes del auto de formulación de cargos.</li>
            </ul></p>
            <p><strong>Artículo 4o. Caducidad.</strong> Se fija un término perentorio de 5 años para culminar la actuación administrativa sancionatoria a partir de la formulación de cargos.</p>
        `,
        tags: ["ley 2387", "reforma", "confesión", "topes", "reduccion", "100.000", "descuento"]
    },
    {
        id: "resolucion-2086-2010",
        title: "Resolución 2086 de 2010",
        subtitle: "Metodología de Tasación de Multas",
        content: `
            <p><strong>Artículo 1o. Adopción.</strong> Adóptase en todas sus partes la Metodología para la Tasación de Multas de que trata el artículo 40 de la Ley 1333 de 2009, contenida en el Manual Conceptual y Procedimental anexo...</p>
            <p><strong>Artículo 2o. Estructura matemática.</strong> La multa final se calcula como: <br><code>Multa = B + [(&alpha; * i) * (1 + A) + Ca] * Cs</code></p>
            <p><strong>Artículo 4o. Beneficio Ilícito (B).</strong> Representa la ganancia económica obtenida por el infractor, calculada mediante: <br><code>B = Y * (1 - p) / p</code> donde p es la probabilidad de detección (Baja = 0.40, Media = 0.45, Alta = 0.50) e Y representa los costos evitados o ingresos extras.</p>
            <p><strong>Artículo 5o. Temporalidad (&alpha;).</strong> Coeficiente lineal que va de 1.0 (hecho instantáneo o 1 día) hasta 4.0 (hecho continuo de 365 días o más): <br><code>&alpha; = 1 + (3 / 364) * (d - 1)</code>.</p>
            <p><strong>Artículo 6o. Gravedad de la Afectación (i).</strong> 
            <ul>
                <li><strong>Para afectación real:</strong> <code>i = 22.06 * SMMLV * I</code>, donde <code>I = 3IN + 2EX + PE + RV + MC</code>.</li>
                <li><strong>Para riesgo potencial:</strong> <code>i = 11.03 * SMMLV * (o * m)</code>.</li>
            </ul></p>
            <p><strong>Artículo 10o. Capacidad Socioeconómica (Cs).</strong> Coeficientes:
            <ul>
                <li>Personas Naturales (Sisben): Nivel 1 (0.01) al Nivel 6 (0.06).</li>
                <li>Personas Jurídicas: Microempresa (0.25), Pequeña (0.50), Mediana (0.75), Grande (1.00).</li>
                <li>Entidades Públicas / Municipios: Coeficiente de 1.00.</li>
            </ul></p>
        `,
        tags: ["resolucion 2086", "formula", "metodologia", "calculo", "i", "B", "Cs", "alpha"]
    },
    {
        id: "decreto-1076-2015",
        title: "Decreto 1076 de 2015",
        subtitle: "Decreto Único Reglamentario del Sector Ambiente",
        content: `
            <p><strong>Sección de Procedimientos Sancionatorios.</strong> Compila las disposiciones de los Decretos 3678 de 2010 y otros reglamentarios del régimen sancionatorio de la Ley 1333 de 2009.</p>
            <p>Establece la obligatoriedad de motivar técnicamente todos los actos administrativos que impongan multas, justificando cada una de las variables utilizadas en las fórmulas de tasación.</p>
            <p>Asimismo, detalla los canales de cobro coactivo para las Corporaciones Autónomas Regionales y la obligatoriedad de reportar las sanciones en firme al Registro Único de Infractores Ambientales (RUIA).</p>
        `,
        tags: ["decreto 1076", "compilacion", "reglamento", "cobro coactivo", "RUIA"]
    }
];

// App State
let appState = {
    currentTab: "tab-calc",
    currentStep: 1,
    year: "2024",
    smmlv: 1300000,
    uvt: 47065,
    
    // Inputs
    expediente: "",
    infractor: "",
    infractorType: "juridica",
    empresaSize: "micro",
    sisbenLevel: "nivel1",
    cs: 0.25,
    
    days: 1,
    alpha: 1.0,
    
    severityMode: "afectacion",
    // Afectacion attributes
    in: 1,
    ex: 1,
    pe: 1,
    rv: 1,
    mc: 1,
    afectacionI: 8,
    afectacionLevel: "Irrelevante",
    afectacion_i_smmlv: 176.48,
    
    // Riesgo attributes
    o: 0.2,
    m: 20,
    riesgoR: 4,
    riesgo_i_smmlv: 44.12,
    
    // Calculated gravity (i) in SMMLV and COP
    gravitySmmlv: 176.48,
    
    hasBeneficio: false,
    beneficioY: 0,
    beneficioP: 0.50,
    beneficioBCOP: 0,
    beneficioBSmmlv: 0,
    
    agravantes: [...AGRAVANTES_DEFAULTS.map(a => ({ ...a }))],
    mitigantes: [...MITIGANTES_DEFAULTS.map(m => ({ ...m }))],
    factorA: 0.0,
    
    costosCOP: 0,
    costosSmmlv: 0,
    
    lawRegimen: "ley2387",
    confesionType: "ninguna",
    flagrancia: false,
    sancionPrincipal: "multa",
    sancionesAccesorias: [],
    
    // Output final results
    fineSmmlv: 0,
    fineCop: 0,
    fineUvt: 0,
    capHit: false,
    finalConfesionDiscount: 0, // as percentage (e.g. 0.30)
    
    history: []
};

// Initialization logic
function initializeApp() {
    loadHistoryFromLocalStorage();
    renderAgravantesMitigantesLists();
    updateValuesFromYear();
    buildNormotecaTOC();
    filterNormoteca();
    loadApiKey();
    loadThemePreference();
    
    // Initialize tab title and active navigation
    switchTab("tab-calc");
}

// Safely execute initialization regardless of when script loads in deferred modules
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
} else {
    initializeApp();
}

// Tab Switcher
function switchTab(tabId) {
    appState.currentTab = tabId;
    
    // Toggle active classes on tab pane elements
    document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
    
    // Toggle active classes on navigation items
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });
    
    const activeNavItemId = "nav-" + tabId.replace("tab-", "");
    const activeNavItem = document.getElementById(activeNavItemId);
    if (activeNavItem) {
        activeNavItem.classList.add("active");
    }
    
    // Update headers based on current tab
    const titleEl = document.getElementById("current-tab-title");
    const descEl = document.getElementById("current-tab-desc");
    
    if (tabId === "tab-calc") {
        titleEl.textContent = "Tasador de Multas Sancionatorias";
        descEl.textContent = "Herramienta técnica de cálculo bajo Resolución 2086 de 2010 y Ley 2387 de 2024.";
    } else if (tabId === "tab-norm") {
        titleEl.textContent = "Normoteca Ambiental Colombiana";
        descEl.textContent = "Compilación de normas jurídicas referentes al proceso administrativo sancionatorio ambiental.";
    } else if (tabId === "tab-guide") {
        titleEl.textContent = "Guía Especial Corpoguajira";
        descEl.textContent = "Directrices jurídicas y ecosistémicas aplicables a la jurisdicción de La Guajira.";
    } else if (tabId === "tab-history") {
        titleEl.textContent = "Historial de Tasaciones";
        descEl.textContent = "Consulte, compare y exporte tasaciones de multas guardadas localmente.";
        renderHistoryTable();
    } else if (tabId === "tab-ai") {
        titleEl.textContent = "Asistente de Inteligencia Artificial";
        descEl.textContent = "Determine variables y liquide sanciones mediante entrevista interactiva o análisis de informes técnicos.";
    }
}

// Update SMMLV and UVT based on selected year
function updateValuesFromYear() {
    const yearSelect = document.getElementById("preset-year");
    const selectedYear = yearSelect.value;
    
    appState.year = selectedYear;
    appState.smmlv = PRESETS[selectedYear].smmlv;
    appState.uvt = PRESETS[selectedYear].uvt;
    
    document.getElementById("val-smmlv").value = appState.smmlv;
    document.getElementById("val-uvt").value = appState.uvt;
    
    recalculateEverything();
}

// Update internal state when inputs are changed manually
function toggleInfractorFields() {
    const infractorType = document.getElementById("infractor-type").value;
    appState.infractorType = infractorType;
    
    if (infractorType === "juridica") {
        document.getElementById("fields-juridica").classList.remove("hidden");
        document.getElementById("fields-natural").classList.add("hidden");
    } else {
        document.getElementById("fields-juridica").classList.add("hidden");
        document.getElementById("fields-natural").classList.remove("hidden");
    }
    
    updateCsValue();
}

// Calculate Cs value based on selected sub-type
function updateCsValue() {
    const type = appState.infractorType;
    let csVal = 0.25;
    
    if (type === "juridica") {
        const size = document.getElementById("empresa-size").value;
        appState.empresaSize = size;
        if (size === "micro") csVal = 0.25;
        else if (size === "pequena") csVal = 0.50;
        else if (size === "mediana") csVal = 0.75;
        else if (size === "grande") csVal = 1.00;
        else if (size === "publica") csVal = 1.00;
    } else {
        const level = document.getElementById("sisben-level").value;
        appState.sisbenLevel = level;
        if (level === "nivel1") csVal = 0.01;
        else if (level === "nivel2") csVal = 0.02;
        else if (level === "nivel3") csVal = 0.03;
        else if (level === "nivel4") csVal = 0.04;
        else if (level === "nivel5") csVal = 0.05;
        else if (level === "nivel6") csVal = 0.06;
        else if (level === "indigena") csVal = 0.01;
    }
    
    appState.cs = csVal;
    document.getElementById("cs-calculated").value = csVal;
    recalculateEverything();
}

// Calculate Temporalidad (alpha)
function calculateAlphaValue() {
    const daysInput = document.getElementById("infraction-days");
    let days = parseInt(daysInput.value) || 1;
    if (days < 1) days = 1;
    
    appState.days = days;
    
    // Capped at 365 days
    const calcDays = Math.min(days, 365);
    
    // Formula: alpha = 1 + (3 / 364) * (days - 1)
    const alpha = 1 + (3 / 364) * (calcDays - 1);
    
    appState.alpha = parseFloat(alpha.toFixed(4));
    document.getElementById("alpha-calculated").value = appState.alpha;
    recalculateEverything();
}

// Toggle Gravity Evaluation mode
function toggleSeverityMode() {
    const mode = document.querySelector('input[name="severity-mode"]:checked').value;
    appState.severityMode = mode;
    
    // Toggle active selector class
    document.querySelectorAll(".severity-mode-selector .mode-option").forEach(opt => {
        opt.classList.remove("active");
    });
    
    const activeLabel = document.querySelector(`input[name="severity-mode"][value="${mode}"]`).parentElement;
    if (activeLabel) activeLabel.classList.add("active");
    
    if (mode === "afectacion") {
        document.getElementById("severity-afectacion-section").classList.remove("hidden");
        document.getElementById("severity-riesgo-section").classList.add("hidden");
        calculateIValue();
    } else {
        document.getElementById("severity-afectacion-section").classList.add("hidden");
        document.getElementById("severity-riesgo-section").classList.remove("hidden");
        calculateRValue();
    }
}

// Calculate I (Importancia de Afectacion) for Daño Real
function calculateIValue() {
    const inVal = parseInt(document.getElementById("attr-in").value);
    const exVal = parseInt(document.getElementById("attr-ex").value);
    const peVal = parseInt(document.getElementById("attr-pe").value);
    const rvVal = parseInt(document.getElementById("attr-rv").value);
    const mcVal = parseInt(document.getElementById("attr-mc").value);
    
    appState.in = inVal;
    appState.ex = exVal;
    appState.pe = peVal;
    appState.rv = rvVal;
    appState.mc = mcVal;
    
    // Formula: I = 3*IN + 2*EX + PE + RV + MC
    const I = (3 * inVal) + (2 * exVal) + peVal + rvVal + mcVal;
    appState.afectacionI = I;
    
    // Classify Importance level
    let level = "Irrelevante";
    let badgeClass = "level-irrelevante";
    if (I === 8) {
        level = "Irrelevante";
        badgeClass = "level-irrelevante";
    } else if (I >= 9 && I <= 20) {
        level = "Leve";
        badgeClass = "level-leve";
    } else if (I >= 21 && I <= 40) {
        level = "Moderada";
        badgeClass = "level-moderada";
    } else if (I >= 41 && I <= 60) {
        level = "Severa";
        badgeClass = "level-severa";
    } else if (I >= 61 && I <= 80) {
        level = "Crítica";
        badgeClass = "level-critica";
    }
    
    appState.afectacionLevel = level;
    
    // Calculate gravity: i = 22.06 * I in SMMLV
    const iValSmmlv = 22.06 * I;
    appState.afectacion_i_smmlv = parseFloat(iValSmmlv.toFixed(2));
    appState.gravitySmmlv = appState.afectacion_i_smmlv;
    
    // Update DOM
    document.getElementById("afectacion-I-score").textContent = I;
    const badgeEl = document.getElementById("afectacion-I-level");
    badgeEl.textContent = level;
    badgeEl.className = "value badge-level " + badgeClass;
    document.getElementById("afectacion-i-smmlv").textContent = appState.afectacion_i_smmlv;
    
    recalculateEverything();
}

// Calculate r (Riesgo) for Daño Potencial
function calculateRValue() {
    const oVal = parseFloat(document.getElementById("attr-o").value);
    const mVal = parseInt(document.getElementById("attr-m").value);
    
    appState.o = oVal;
    appState.m = mVal;
    
    // Formula: r = o * m
    const r = oVal * mVal;
    appState.riesgoR = r;
    
    // Calculate gravity: i = 11.03 * r in SMMLV
    const iValSmmlv = 11.03 * r;
    appState.riesgo_i_smmlv = parseFloat(iValSmmlv.toFixed(2));
    appState.gravitySmmlv = appState.riesgo_i_smmlv;
    
    // Update DOM
    document.getElementById("riesgo-r-score").textContent = r.toFixed(1);
    document.getElementById("riesgo-i-smmlv").textContent = appState.riesgo_i_smmlv;
    
    recalculateEverything();
}

// Enable/Disable Beneficio Ilícito Fields
function toggleBeneficioFields() {
    const hasBeneficio = document.getElementById("has-beneficio").checked;
    appState.hasBeneficio = hasBeneficio;
    
    const yGroup = document.getElementById("beneficio-y-group");
    const pGroup = document.getElementById("beneficio-p-group");
    const yInput = document.getElementById("beneficio-y");
    const pSelect = document.getElementById("beneficio-p");
    
    if (hasBeneficio) {
        yGroup.classList.remove("disabled-field");
        pGroup.classList.remove("disabled-field");
        yInput.disabled = false;
        pSelect.disabled = false;
    } else {
        yGroup.classList.add("disabled-field");
        pGroup.classList.add("disabled-field");
        yInput.disabled = true;
        pSelect.disabled = true;
        yInput.value = 0;
        appState.beneficioY = 0;
    }
    
    calculateBeneficioValue();
}

// Calculate B (Beneficio Económico Ilícito)
function calculateBeneficioValue() {
    if (!appState.hasBeneficio) {
        appState.beneficioBCOP = 0;
        appState.beneficioBSmmlv = 0;
        document.getElementById("beneficio-calculated-cop").textContent = "$0";
        document.getElementById("beneficio-calculated-smmlv").textContent = "0.00";
        recalculateEverything();
        return;
    }
    
    const yVal = parseFloat(document.getElementById("beneficio-y").value) || 0;
    const pVal = parseFloat(document.getElementById("beneficio-p").value) || 0.50;
    
    appState.beneficioY = yVal;
    appState.beneficioP = pVal;
    
    // Formula: B = Y * (1 - p) / p
    const B_cop = yVal * ((1 - pVal) / pVal);
    appState.beneficioBCOP = B_cop;
    
    const smmlvVal = parseFloat(document.getElementById("val-smmlv").value) || 1300000;
    appState.beneficioBSmmlv = parseFloat((B_cop / smmlvVal).toFixed(2));
    
    // Update DOM
    document.getElementById("beneficio-calculated-cop").textContent = formatCurrency(B_cop);
    document.getElementById("beneficio-calculated-smmlv").textContent = appState.beneficioBSmmlv;
    
    recalculateEverything();
}

// Render Agravantes and Mitigantes Lists
function renderAgravantesMitigantesLists() {
    const mitigantesContainer = document.getElementById("mitigantes-list");
    const agravantesContainer = document.getElementById("agravantes-list");
    
    mitigantesContainer.innerHTML = "";
    agravantesContainer.innerHTML = "";
    
    // Render Mitigantes
    appState.mitigantes.forEach((mit, idx) => {
        const item = document.createElement("div");
        item.className = "factor-item";
        item.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" id="${mit.id}" ${mit.active ? 'checked' : ''} onchange="toggleFactor('mitigantes', ${idx})">
                <span class="checkmark"></span>
                ${mit.text}
            </label>
            <input type="number" id="weight-${mit.id}" value="${mit.weight}" step="0.05" max="0" min="-1" onchange="updateFactorWeight('mitigantes', ${idx}, this.value)">
        `;
        mitigantesContainer.appendChild(item);
    });
    
    // Render Agravantes
    appState.agravantes.forEach((agr, idx) => {
        const item = document.createElement("div");
        item.className = "factor-item";
        item.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" id="${agr.id}" ${agr.active ? 'checked' : ''} onchange="toggleFactor('agravantes', ${idx})">
                <span class="checkmark"></span>
                ${agr.text}
            </label>
            <input type="number" id="weight-${agr.id}" value="${agr.weight}" step="0.05" min="0" max="1" onchange="updateFactorWeight('agravantes', ${idx}, this.value)">
        `;
        agravantesContainer.appendChild(item);
    });
}

// Toggle active factors
function toggleFactor(type, index) {
    if (type === "mitigantes") {
        const checkbox = document.getElementById(appState.mitigantes[index].id);
        appState.mitigantes[index].active = checkbox.checked;
    } else {
        const checkbox = document.getElementById(appState.agravantes[index].id);
        appState.agravantes[index].active = checkbox.checked;
    }
    
    calculateFactors();
}

// Update individual factor weight manually
function updateFactorWeight(type, index, value) {
    const floatVal = parseFloat(value) || 0;
    if (type === "mitigantes") {
        appState.mitigantes[index].weight = Math.min(0, floatVal);
    } else {
        appState.agravantes[index].weight = Math.max(0, floatVal);
    }
    
    calculateFactors();
}

// Calculate net Aggravating / Mitigating Coefficient (A)
function calculateFactors() {
    let sumMitigantes = 0.0;
    let sumAgravantes = 0.0;
    
    appState.mitigantes.forEach(mit => {
        if (mit.active) sumMitigantes += mit.weight;
    });
    
    appState.agravantes.forEach(agr => {
        if (agr.active) sumAgravantes += agr.weight;
    });
    
    // Apply legal caps under Resolucion 2086 of 2010
    // Mitigating factor sum is negative (e.g. -0.4), so capping it at -0.6 means Math.max(-0.6, sumMitigantes)
    const cappedMitigantes = Math.max(-0.6, sumMitigantes);
    
    // Aggravating factor sum is positive, capping at 2.0
    const cappedAgravantes = Math.min(2.0, sumAgravantes);
    
    appState.factorA = parseFloat((cappedMitigantes + cappedAgravantes).toFixed(4));
    
    // Update DOM
    document.getElementById("total-A-factor").textContent = appState.factorA.toFixed(2);
    
    const factorPlusOne = Math.max(0, 1 + appState.factorA);
    const percentageText = (appState.factorA >= 0 ? "+" : "") + Math.round(appState.factorA * 100) + "%";
    document.getElementById("total-A-percentage").textContent = percentageText + ` (Factor: ${factorPlusOne.toFixed(2)})`;
    
    recalculateEverything();
}

// Convert Costos Asociados COP to SMMLV
function calculateCostosAsociadosSmmlv() {
    const copVal = parseFloat(document.getElementById("costos-asociados-cop").value) || 0;
    appState.costosCOP = copVal;
    
    const smmlvVal = parseFloat(document.getElementById("val-smmlv").value) || 1300000;
    const smmlvEquivalent = copVal / smmlvVal;
    
    appState.costosSmmlv = parseFloat(smmlvEquivalent.toFixed(4));
    document.getElementById("costos-asociados-smmlv").value = appState.costosSmmlv.toFixed(2);
    
    recalculateEverything();
}

// MAIN MATHEMATICAL RESOLUTION FUNCTION
function recalculateEverything() {
    // Read parameters from inputs
    appState.smmlv = parseFloat(document.getElementById("val-smmlv").value) || 1300000;
    appState.uvt = parseFloat(document.getElementById("val-uvt").value) || 47065;
    
    appState.expediente = document.getElementById("case-expediente").value;
    appState.infractor = document.getElementById("case-infractor").value;
    appState.cs = parseFloat(document.getElementById("cs-calculated").value) || 0.25;
    appState.lawRegimen = document.getElementById("law-regimen").value;
    appState.confesionType = document.getElementById("ley2387-confesion").value;
    
    // Recalculate gravity values (i) based on current mode
    if (appState.severityMode === "afectacion") {
        appState.gravitySmmlv = appState.afectacion_i_smmlv;
    } else {
        appState.gravitySmmlv = appState.riesgo_i_smmlv;
    }
    
    // Apply core methodology formula:
    // Multa_base = [ (alpha * i) * (1 + A) + Ca ] * Cs  (expressed in SMMLV)
    const alpha_x_i = appState.alpha * appState.gravitySmmlv;
    const factorPlusOne = Math.max(0, 1 + appState.factorA);
    const adjustedGravity = alpha_x_i * factorPlusOne;
    
    const baseMultaSmmlv = (adjustedGravity + appState.costosSmmlv) * appState.cs;
    
    // Total fine before confession discount: Multa = B + Multa_base
    let totalMultaSmmlv = appState.beneficioBSmmlv + baseMultaSmmlv;
    
    // Calculate final confession discount (Ley 2387 de 2024)
    let discountPercent = 0;
    if (appState.confesionType === "antes_proceso") {
        discountPercent = 0.30;
    } else if (appState.confesionType === "antes_cargos") {
        discountPercent = 0.15;
    }
    
    appState.finalConfesionDiscount = discountPercent;
    
    // Apply discount
    if (discountPercent > 0) {
        totalMultaSmmlv = totalMultaSmmlv * (1 - discountPercent);
        document.getElementById("res-row-discount").style.display = "flex";
        document.getElementById("res-val-discount").textContent = `-${discountPercent * 100}%`;
    } else {
        document.getElementById("res-row-discount").style.display = "none";
    }
    
    // Check Topes Legales (Capping)
    let maxCapSmmlv = 100000; // default Ley 2387
    if (appState.lawRegimen === "ley1333") {
        maxCapSmmlv = 5000;
    }
    
    if (totalMultaSmmlv > maxCapSmmlv) {
        totalMultaSmmlv = maxCapSmmlv;
        appState.capHit = true;
        document.getElementById("res-row-tope").style.display = "flex";
    } else {
        appState.capHit = false;
        document.getElementById("res-row-tope").style.display = "none";
    }
    
    // Set Outputs
    appState.fineSmmlv = parseFloat(totalMultaSmmlv.toFixed(4));
    appState.fineCop = Math.round(appState.fineSmmlv * appState.smmlv);
    
    // Show/hide trabajo comunitario recommendation
    const avisoTC = document.getElementById("trabajo-comunitario-aviso");
    if (avisoTC) {
        if (appState.cs < 0.25) {
            avisoTC.style.display = "block";
            document.getElementById("aviso-cs-val").textContent = appState.cs.toFixed(2);
        } else {
            avisoTC.style.display = "none";
        }
    }
    appState.fineUvt = parseFloat((appState.fineCop / appState.uvt).toFixed(2));
    
    // Update Liquidación UI Summary
    document.getElementById("final-fine-cop").textContent = formatCurrency(appState.fineCop);
    document.getElementById("final-fine-smmlv").textContent = appState.fineSmmlv.toFixed(2) + " SMMLV";
    document.getElementById("final-fine-uvt").textContent = formatNumber(appState.fineUvt) + " UVT";
    
    document.getElementById("res-val-B").textContent = formatCurrency(appState.beneficioBCOP) + ` (${appState.beneficioBSmmlv} SMMLV)`;
    document.getElementById("res-val-alpha").textContent = appState.alpha.toFixed(4);
    document.getElementById("res-val-i").textContent = appState.gravitySmmlv.toFixed(2) + " SMMLV";
    document.getElementById("res-val-A").textContent = factorPlusOne.toFixed(2) + ` (${percentageText(appState.factorA)})`;
    document.getElementById("res-val-Ca").textContent = formatCurrency(appState.costosCOP) + ` (${appState.costosSmmlv.toFixed(2)} SMMLV)`;
    document.getElementById("res-val-Cs").textContent = appState.cs.toFixed(2);
    
    // Render dynamic SVG chart and build written justification text
    renderSVGChart(baseMultaSmmlv, appState.beneficioBSmmlv);
    generateLegalJustification();
}

// Generate the written legal justifications
function generateLegalJustification() {
    const typeLabel = appState.infractorType === "juridica" 
        ? `Persona Jurídica (Empresa clasificada como: ${appState.empresaSize.toUpperCase()})` 
        : `Persona Natural (Nivel de Sisben: ${appState.sisbenLevel.toUpperCase()})`;
    
    const severityLabel = appState.severityMode === "afectacion"
        ? `Daño Real (Afectación con Importancia I = ${appState.afectacionI}, clasificada como ${appState.afectacionLevel.toUpperCase()})`
        : `Daño Potencial (Riesgo con Probabilidad = ${appState.o} y Magnitud = ${appState.m})`;
        
    const text = `SUSTENTO TÉCNICO Y JURÍDICO DE LA LIQUIDACIÓN DE LA SANCION PECUNIARIA
----------------------------------------------------------------------
EXPEDIENTE: ${appState.expediente || 'NO ESPECIFICADO'}
PRESUNTO INFRACTOR: ${appState.infractor || 'NO ESPECIFICADO'}
AÑO DE LIQUIDACIÓN: ${appState.year} (SMMLV: ${formatCurrency(appState.smmlv)} COP | UVT: ${formatCurrency(appState.uvt)} COP)

En cumplimiento de lo dispuesto por la Ley 1333 de 2009 y de conformidad con la metodología de tasación técnica establecida en la Resolución 2086 de 2010, se realiza la liquidación de la multa correspondiente bajo la fórmula:
Multa = B + [(\u03B1 * i) * (1 + A) + Ca] * Cs

1. BENEFICIO ILÍCITO (B):
Se determinó un beneficio ilícito ascendiente a ${formatCurrency(appState.beneficioBCOP)} COP (${appState.beneficioBSmmlv} SMMLV), con base en una sumatoria de costos evitados/ingresos (Y) de ${formatCurrency(appState.beneficioY)} COP y una probabilidad de detección del comportamiento infractor (p) de ${appState.beneficioP} (${appState.beneficioP === 0.50 ? 'Alta' : appState.beneficioP === 0.45 ? 'Media' : 'Baja'}).

2. TEMPORALIDAD (\u03B1):
La infracción ambiental tuvo una duración de ${appState.days} días, arrojando un factor de temporalidad \u03B1 = ${appState.alpha.toFixed(4)}, calculado mediante la ecuación: \u03B1 = 1 + (3 / 364) * (d - 1).

3. GRAVEDAD DE LA INFRACCIÓN (i):
Se evaluó un escenario de ${severityLabel}. El grado de afectación o riesgo (i) en salarios mínimos es de ${appState.gravitySmmlv.toFixed(2)} SMMLV.

4. AGRAVANTES Y ATENUANTES (A):
El coeficiente neto de circunstancias agravantes y atenuantes de la responsabilidad es A = ${appState.factorA.toFixed(2)} (Factor de ajuste de gravedad 1 + A = ${Math.max(0, 1 + appState.factorA).toFixed(2)}).
Causales aplicadas:
${getActiveFactorsText()}

5. COSTOS ASOCIADOS (Ca):
Se incurrió en costos asociados al control y monitoreo de la infracción equivalentes a ${formatCurrency(appState.costosCOP)} COP (${appState.costosSmmlv.toFixed(4)} SMMLV).

6. CAPACIDAD SOCIOECONÓMICA DEL INFRACTOR (Cs):
El investigado corresponde a una ${typeLabel}, asignándosele un factor de capacidad de pago Cs = ${appState.cs.toFixed(2)}.

7. LIQUIDACIÓN MATEMÁTICA EN SALARIOS MÍNIMOS (SMMLV):
Multa = ${appState.beneficioBSmmlv} + [(${appState.alpha.toFixed(4)} * ${appState.gravitySmmlv.toFixed(2)}) * ${Math.max(0, 1 + appState.factorA).toFixed(2)} + ${appState.costosSmmlv.toFixed(2)}] * ${appState.cs.toFixed(2)}
Multa base = [${(appState.alpha * appState.gravitySmmlv).toFixed(2)} * ${Math.max(0, 1 + appState.factorA).toFixed(2)} + ${appState.costosSmmlv.toFixed(2)}] * ${appState.cs.toFixed(2)} = ${(((appState.alpha * appState.gravitySmmlv) * Math.max(0, 1 + appState.factorA) + appState.costosSmmlv) * appState.cs).toFixed(2)} SMMLV.
Suma con Beneficio Ilícito = ${(appState.beneficioBSmmlv + (((appState.alpha * appState.gravitySmmlv) * Math.max(0, 1 + appState.factorA) + appState.costosSmmlv) * appState.cs)).toFixed(2)} SMMLV.
${appState.finalConfesionDiscount > 0 ? `Descuento del ${appState.finalConfesionDiscount * 100}% por confesión según Ley 2387 de 2024 aplicado.` : ''}
${appState.capHit ? `Capping aplicado por límite legal superior (${appState.lawRegimen === 'ley1333' ? '5.000' : '100.000'} SMMLV).` : ''}

MULTA FINAL LIQUIDADA:
COP: ${formatCurrency(appState.fineCop)} COP
SMMLV: ${appState.fineSmmlv.toFixed(2)} SMMLV
UVT: ${formatNumber(appState.fineUvt)} UVT

DOSIMETRÍA DE SANCIONES Y ACOMPAÑAMIENTO:
SANCIÓN PRINCIPAL: ${appState.sancionPrincipal === 'multa' ? 'Multa Pecuniaria (Tasada en esta liquidación)' : appState.sancionPrincipal === 'cierre' ? 'Cierre Temporal o Definitivo del Establecimiento' : appState.sancionPrincipal === 'revocatoria' ? 'Revocatoria de Licencia/Permiso/Concesión' : appState.sancionPrincipal === 'demolicion' ? 'Demolición de Obra a costa del infractor' : 'Trabajo Comunitario (Subrogación de Multa)'}
SANCIONES ACCESORIAS: ${appState.sancionesAccesorias.length > 0 ? appState.sancionesAccesorias.map(val => val === 'decomiso' ? 'Decomiso definitivo de especímenes o elementos' : val === 'restitucion' ? 'Restitución de especímenes de fauna/flora silvestres' : 'Cierre temporal del establecimiento/obra').join(", ") : 'Ninguna'}
${appState.cs < 0.25 ? `\n* NOTA DE RECOMENDACIÓN (Art. 21 Ley 2387 de 2024): Al ser el investigado un infractor de baja capacidad socioeconómica (Cs = ${appState.cs.toFixed(2)}), Corpoguajira podrá autorizar el reemplazo de esta multa por Trabajo Comunitario o Servicio Comunitario.` : ''}`;

    document.getElementById("legal-justification-text").value = text;
}

// Helper to get text list of active agravantes/atenuantes
function getActiveFactorsText() {
    let result = [];
    appState.mitigantes.forEach(m => {
        if (m.active) result.push(`  - [ATENUANTE] ${m.text} (Coeficiente: ${m.weight})`);
    });
    appState.agravantes.forEach(a => {
        if (a.active) result.push(`  - [AGRAVANTE] ${a.text} (Coeficiente: ${a.weight})`);
    });
    
    return result.length > 0 ? result.join("\n") : "  - No se aplicaron causales de agravación ni atenuación (A = 0.00).";
}

// Render dynamic SVG bar or circle chart
function renderSVGChart(baseMultaSmmlv, beneficioSmmlv) {
    const container = document.getElementById("svg-chart-container");
    container.innerHTML = "";
    
    const total = baseMultaSmmlv + beneficioSmmlv;
    if (total === 0) return;
    
    // Values as percentages
    const pctBase = (baseMultaSmmlv / total) * 100;
    const pctBeneficio = (beneficioSmmlv / total) * 100;
    
    // We'll create a clean dynamic SVG horizontal stacked chart
    const svg = `
        <svg viewBox="0 0 200 200" width="100%" height="100%">
            <!-- Pie/Donut Chart -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="var(--border-color)" stroke-width="25" />
            
            <!-- Base Segment (Verde Corpoguajira) -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="#008A4B" stroke-width="25" 
                stroke-dasharray="${(pctBase / 100) * 439.8} 439.8" 
                transform="rotate(-90 100 100)" />
            
            <!-- Beneficio Segment (Ocre Guajiro) -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="#F7941D" stroke-width="25" 
                stroke-dasharray="${(pctBeneficio / 100) * 439.8} 439.8" 
                stroke-dashoffset="-${(pctBase / 100) * 439.8}" 
                transform="rotate(-90 100 100)" />
            
            <!-- Center Text -->
            <text x="100" y="95" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="700" font-size="14" fill="#008A4B">MULTA</text>
            <text x="100" y="115" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="16" fill="var(--text-main)">${pctBase.toFixed(0)}%</text>
            <text x="100" y="130" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="500" font-size="10" fill="var(--text-muted)">Daño Ambiental</text>
            
            <!-- Legend indicators -->
            <rect x="25" y="165" width="8" height="8" fill="#008A4B" rx="2" />
            <text x="38" y="173" font-family="inherit" font-size="8" fill="var(--text-muted)">Daño / Gravedad</text>
            
            <rect x="120" y="165" width="8" height="8" fill="#F7941D" rx="2" />
            <text x="133" y="173" font-family="inherit" font-size="8" fill="var(--text-muted)">Beneficio Ilícito</text>
        </svg>
    `;
    container.innerHTML = svg;
}

// Wizard Steps Controller
function moveWizardStep(direction) {
    // Validate current step before proceeding
    if (direction === 1 && !validateCurrentStep()) {
        return;
    }
    
    // Hide current step
    document.getElementById(`step-${appState.currentStep}`).classList.add("hidden");
    
    // Update step
    appState.currentStep += direction;
    
    // Show new step
    document.getElementById(`step-${appState.currentStep}`).classList.remove("hidden");
    
    // Update progress DOM
    updateProgressUI();
}

function validateCurrentStep() {
    if (appState.currentStep === 1) {
        const exp = document.getElementById("case-expediente").value.trim();
        const inf = document.getElementById("case-infractor").value.trim();
        
        if (!exp || !inf) {
            alert("Por favor ingrese el Número de Expediente y el Nombre del Infractor para continuar.");
            return false;
        }
    }
    return true;
}

function updateProgressUI() {
    const current = appState.currentStep;
    const totalSteps = 7;
    
    // Calculate progress percentage
    const progressPercent = ((current - 1) / (totalSteps - 1)) * 100;
    document.getElementById("wizard-progress-bar").style.width = `${progressPercent}%`;
    
    // Update indicators
    for (let i = 1; i <= totalSteps; i++) {
        const ind = document.getElementById(`step-ind-${i}`);
        if (i < current) {
            ind.className = "step-indicator completed";
        } else if (i === current) {
            ind.className = "step-indicator active";
        } else {
            ind.className = "step-indicator";
        }
    }
    
    // Enable/Disable navigation buttons
    document.getElementById("btn-prev").disabled = (current === 1);
    
    const nextBtn = document.getElementById("btn-next");
    if (current === totalSteps) {
        nextBtn.textContent = "Finalizado";
        nextBtn.disabled = true;
    } else {
        nextBtn.textContent = "Siguiente";
        nextBtn.disabled = false;
    }
}

// Load history item back to wizard calculator
function loadHistoryToCalculator(index) {
    const item = appState.history[index];
    if (!item) return;
    
    // Map variables from history item
    appState.expediente = item.expediente;
    appState.infractor = item.infractor;
    appState.infractorType = item.infractorType;
    appState.empresaSize = item.empresaSize;
    appState.sisbenLevel = item.sisbenLevel;
    appState.cs = item.cs;
    appState.days = item.days;
    appState.alpha = item.alpha;
    appState.severityMode = item.severityMode;
    appState.in = item.in || 1;
    appState.ex = item.ex || 1;
    appState.pe = item.pe || 1;
    appState.rv = item.rv || 1;
    appState.mc = item.mc || 1;
    appState.afectacionI = item.afectacionI || 8;
    appState.afectacionLevel = item.afectacionLevel || "Irrelevante";
    appState.afectacion_i_smmlv = item.afectacion_i_smmlv || 176.48;
    appState.o = item.o || 0.2;
    appState.m = item.m || 20;
    appState.riesgoR = item.riesgoR || 4;
    appState.riesgo_i_smmlv = item.riesgo_i_smmlv || 44.12;
    appState.hasBeneficio = item.hasBeneficio;
    appState.beneficioY = item.beneficioY;
    appState.beneficioP = item.beneficioP;
    appState.beneficioBCOP = item.beneficioBCOP;
    appState.beneficioBSmmlv = item.beneficioBSmmlv;
    appState.costosCOP = item.costosCOP;
    appState.costosSmmlv = item.costosSmmlv;
    appState.lawRegimen = item.lawRegimen || "ley2387";
    appState.confesionType = item.confesionType || "ninguna";
    appState.flagrancia = item.flagrancia || false;
    appState.sancionPrincipal = item.sancionPrincipal || "multa";
    appState.sancionesAccesorias = item.sancionesAccesorias || [];
    
    // Aggravating / Mitigating
    appState.agravantes = item.agravantes.map(a => ({ ...a }));
    appState.mitigantes = item.mitigantes.map(m => ({ ...m }));
    appState.factorA = item.factorA;
    
    // Update inputs in the DOM
    document.getElementById("case-expediente").value = appState.expediente;
    document.getElementById("case-infractor").value = appState.infractor;
    document.getElementById("infractor-type").value = appState.infractorType;
    document.getElementById("empresa-size").value = appState.empresaSize;
    document.getElementById("sisben-level").value = appState.sisbenLevel;
    document.getElementById("cs-calculated").value = appState.cs;
    document.getElementById("infraction-days").value = appState.days;
    document.getElementById("alpha-calculated").value = appState.alpha;
    
    // Gravity settings
    if (appState.severityMode === "afectacion") {
        document.getElementById("attr-in").value = appState.in;
        document.getElementById("attr-ex").value = appState.ex;
        document.getElementById("attr-pe").value = appState.pe;
        document.getElementById("attr-rv").value = appState.rv;
        document.getElementById("attr-mc").value = appState.mc;
        document.querySelector('input[name="severity-mode"][value="afectacion"]').checked = true;
    } else {
        document.getElementById("attr-o").value = appState.o;
        document.getElementById("attr-m").value = appState.m;
        document.querySelector('input[name="severity-mode"][value="riesgo"]').checked = true;
    }
    
    // Beneficio settings
    document.getElementById("has-beneficio").checked = appState.hasBeneficio;
    document.getElementById("beneficio-y").value = appState.beneficioY;
    document.getElementById("beneficio-p").value = appState.beneficioP;
    
    // Costos
    document.getElementById("costos-asociados-cop").value = appState.costosCOP;
    document.getElementById("costos-asociados-smmlv").value = appState.costosSmmlv;
    document.getElementById("law-regimen").value = appState.lawRegimen;
    document.getElementById("ley2387-confesion").value = appState.confesionType;
    document.getElementById("chk-flagrancia").checked = appState.flagrancia;
    document.getElementById("sancion-principal").value = appState.sancionPrincipal;
    document.querySelectorAll(".chk-accesoria").forEach(chk => {
        chk.checked = appState.sancionesAccesorias.includes(chk.value);
    });
    
    // Force DOM updates
    toggleInfractorFields();
    toggleSeverityMode();
    toggleBeneficioFields();
    renderAgravantesMitigantesLists();
    calculateFactors();
    calculateCostosAsociadosSmmlv();
    
    // Jump to the result step
    document.getElementById(`step-${appState.currentStep}`).classList.add("hidden");
    appState.currentStep = 7;
    document.getElementById("step-7").classList.remove("hidden");
    updateProgressUI();
    
    // Recalculate
    recalculateEverything();
    
    // Switch to calculator tab
    switchTab("tab-calc");
}

// Print Report compiler
function printReport() {
    const typeLabel = appState.infractorType === "juridica" 
        ? `Persona Jurídica - ${appState.empresaSize.toUpperCase()}` 
        : `Persona Natural - SISBEN ${appState.sisbenLevel.toUpperCase()}`;
    
    const severityLabel = appState.severityMode === "afectacion"
        ? `Daño Real (Afectación con Gravedad ${appState.afectacionLevel.toUpperCase()} - Importancia I = ${appState.afectacionI})`
        : `Daño Potencial (Riesgo con Probabilidad = ${appState.o} y Magnitud = ${appState.m})`;

    const reportHTML = `
        <div class="print-header">
            <div class="print-logo">
                <img src="/logo-corpoguajira.png" alt="Logo Corpoguajira" width="76" height="76" style="object-fit: contain;">
            </div>
            <div class="print-title">
                <h1>Corpoguajira</h1>
                <h2>Corporación Autónoma Regional de La Guajira</h2>
                <p>Oficina Asesora Jurídica - Liquidación Técnica de Multas Ambientales (Resolución 2086 de 2010)</p>
            </div>
        </div>
        
        <div class="print-grid">
            <div class="print-field">
                <strong>Número de Expediente:</strong>
                ${appState.expediente || 'EXP-NO-ESPECIFICADO'}
            </div>
            <div class="print-field">
                <strong>Presunto Infractor:</strong>
                ${appState.infractor || 'NO ESPECIFICADO'}
            </div>
            <div class="print-field">
                <strong>Tipo de Persona / Infractor:</strong>
                ${typeLabel} (Cs = ${appState.cs.toFixed(2)})
            </div>
            <div class="print-field">
                <strong>Año de Liquidación (Parámetro):</strong>
                Año ${appState.year} (SMMLV = ${formatCurrency(appState.smmlv)} COP)
            </div>
        </div>
        
        <div class="print-fine-card">
            <span>VALOR TOTAL DE LA MULTA AMBIENTAL LIQUIDADA</span>
            <h2>${formatCurrency(appState.fineCop)} COP</h2>
            <div class="print-fine-sub">
                ${appState.fineSmmlv.toFixed(2)} SMMLV &nbsp;&nbsp;|&nbsp;&nbsp; ${formatNumber(appState.fineUvt)} UVT
            </div>
        </div>
        
        <h3>Desglose Detallado de Variables (Fórmula Oficial)</h3>
        <table class="print-table">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th>Concepto Técnico</th>
                    <th>Valor / Coeficiente</th>
                    <th>Equivalente Monetario (COP)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>B</strong></td>
                    <td>Beneficio Económico Ilícito (Recuperación directa)</td>
                    <td>${appState.beneficioBSmmlv} SMMLV</td>
                    <td>${formatCurrency(appState.beneficioBCOP)} COP</td>
                </tr>
                <tr>
                    <td><strong>&alpha;</strong></td>
                    <td>Factor de Temporalidad (${appState.days} días)</td>
                    <td>${appState.alpha.toFixed(4)}</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td><strong>i</strong></td>
                    <td>Gravedad de la Infracción [${severityLabel}]</td>
                    <td>${appState.gravitySmmlv.toFixed(2)} SMMLV</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td><strong>A</strong></td>
                    <td>Circunstancias Agravantes y Atenuantes (Neto)</td>
                    <td>${(1 + appState.factorA).toFixed(2)} (${percentageText(appState.factorA)})</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td><strong>Ca</strong></td>
                    <td>Costos Asociados (Investigación y análisis)</td>
                    <td>${appState.costosSmmlv.toFixed(4)} SMMLV</td>
                    <td>${formatCurrency(appState.costosCOP)} COP</td>
                </tr>
                <tr>
                    <td><strong>Cs</strong></td>
                    <td>Capacidad Socioeconómica del Sancionado</td>
                    <td>${appState.cs.toFixed(2)}</td>
                    <td>--</td>
                </tr>
                ${appState.finalConfesionDiscount > 0 ? `
                <tr style="font-weight: bold; color: #0f5132;">
                    <td><strong>Desc.</strong></td>
                    <td>Descuento por Confesión (Ley 2387 de 2024)</td>
                    <td>-${appState.finalConfesionDiscount * 100}%</td>
                    <td>--</td>
                </tr>
                ` : ''}
            </tbody>
        </table>
        
        <div class="print-justification">
            <h3>Sustento Jurídico y Justificación de Cargos</h3>
            <p>${document.getElementById("legal-justification-text").value.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div class="print-signatures">
            <div class="print-sig-line">
                Elaboró: Técnico Evaluador
                <span>Área de Control y Vigilancia Corpoguajira</span>
            </div>
            <div class="print-sig-line">
                Revisó / Aprobó: Asesor Jurídico
                <span>Oficina Asesora Jurídica Corpoguajira</span>
            </div>
        </div>
    `;
    
    document.getElementById("print-report-template").innerHTML = reportHTML;
    window.print();
}

// Clipboard copy helper
function copyJustification() {
    const textEl = document.getElementById("legal-justification-text");
    textEl.select();
    document.execCommand("copy");
    alert("¡Sustento Técnico-Jurídico copiado al portapapeles con éxito!");
}

// Local Storage History Management
function saveCalculationToHistory() {
    const newRecord = {
        id: "rec_" + Date.now(),
        date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        year: appState.year,
        smmlv: appState.smmlv,
        uvt: appState.uvt,
        expediente: appState.expediente,
        infractor: appState.infractor,
        infractorType: appState.infractorType,
        empresaSize: appState.empresaSize,
        sisbenLevel: appState.sisbenLevel,
        cs: appState.cs,
        days: appState.days,
        alpha: appState.alpha,
        severityMode: appState.severityMode,
        in: appState.in,
        ex: appState.ex,
        pe: appState.pe,
        rv: appState.rv,
        mc: appState.mc,
        afectacionI: appState.afectacionI,
        afectacionLevel: appState.afectacionLevel,
        afectacion_i_smmlv: appState.afectacion_i_smmlv,
        o: appState.o,
        m: appState.m,
        riesgoR: appState.riesgoR,
        riesgo_i_smmlv: appState.riesgo_i_smmlv,
        hasBeneficio: appState.hasBeneficio,
        beneficioY: appState.beneficioY,
        beneficioP: appState.beneficioP,
        beneficioBCOP: appState.beneficioBCOP,
        beneficioBSmmlv: appState.beneficioBSmmlv,
        costosCOP: appState.costosCOP,
        costosSmmlv: appState.costosSmmlv,
        factorA: appState.factorA,
        lawRegimen: appState.lawRegimen,
        confesionType: appState.confesionType,
        flagrancia: appState.flagrancia,
        sancionPrincipal: appState.sancionPrincipal,
        sancionesAccesorias: [...appState.sancionesAccesorias],
        fineCop: appState.fineCop,
        fineSmmlv: appState.fineSmmlv,
        fineUvt: appState.fineUvt,
        // Clone lists to prevent reference sharing
        agravantes: appState.agravantes.map(a => ({ ...a })),
        mitigantes: appState.mitigantes.map(m => ({ ...m }))
    };
    
    // Add to state and save
    appState.history.unshift(newRecord);
    saveHistoryToLocalStorage();
    alert("¡Tasación guardada en el historial local!");
}

function loadHistoryFromLocalStorage() {
    const data = localStorage.getItem("corpoguajira_fine_history");
    if (data) {
        try {
            appState.history = JSON.parse(data);
        } catch (e) {
            appState.history = [];
        }
    } else {
        appState.history = [];
    }
}

function saveHistoryToLocalStorage() {
    localStorage.setItem("corpoguajira_fine_history", JSON.stringify(appState.history));
}

function renderHistoryTable() {
    const tbody = document.getElementById("history-table-body");
    tbody.innerHTML = "";
    
    if (appState.history.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center" style="color: var(--text-muted); padding: 2rem;">No hay registros guardados. Realice una tasación en el Asistente y guárdela.</td>
            </tr>
        `;
        return;
    }
    
    appState.history.forEach((record, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td><strong>${record.expediente || 'N/A'}</strong></td>
            <td>${record.infractor || 'N/A'}</td>
            <td style="color: var(--primary); font-weight: 600;">${formatCurrency(record.fineCop)}</td>
            <td>${record.fineSmmlv.toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="loadHistoryToCalculator(${index})">Cargar</button>
            </td>
            <td>
                <button class="btn btn-secondary btn-sm" style="background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border-color: rgba(239, 68, 68, 0.2);" onclick="deleteHistoryItem(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteHistoryItem(index) {
    if (confirm("¿Está seguro de eliminar esta tasación del historial?")) {
        appState.history.splice(index, 1);
        saveHistoryToLocalStorage();
        renderHistoryTable();
    }
}

function clearAllHistory() {
    if (confirm("¿Está seguro de borrar todo el historial de tasaciones? Esta acción no se puede deshacer.")) {
        appState.history = [];
        saveHistoryToLocalStorage();
        renderHistoryTable();
    }
}

// Export History to JSON file
function exportHistory() {
    if (appState.history.length === 0) {
        alert("El historial está vacío, no hay nada que exportar.");
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `historial_tasador_corpoguajira_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Import History from JSON file
function importHistory(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                // Merge with existing history, filtering duplicates by ID
                const existingIds = new Set(appState.history.map(item => item.id));
                const newRecords = imported.filter(item => item.id && !existingIds.has(item.id));
                
                appState.history = [...newRecords, ...appState.history];
                saveHistoryToLocalStorage();
                renderHistoryTable();
                alert(`¡Se importaron con éxito ${newRecords.length} registros nuevos!`);
            } else {
                alert("El archivo cargado no contiene un formato de historial válido.");
            }
        } catch (err) {
            alert("Error al leer el archivo JSON. Verifique su formato.");
        }
    };
    reader.readAsText(file);
    // Reset file input value
    event.target.value = "";
}

// Normoteca content and search functions
function buildNormotecaTOC() {
    const toc = document.getElementById("norm-toc-list");
    toc.innerHTML = "";
    
    NORMOTECA_DB.forEach(norm => {
        const li = document.createElement("li");
        li.className = "norm-toc-item";
        li.id = `toc-${norm.id}`;
        li.textContent = norm.title;
        li.onclick = () => scrollToNormCard(norm.id);
        toc.appendChild(li);
    });
}

function scrollToNormCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight active TOC item
        document.querySelectorAll(".norm-toc-item").forEach(item => {
            item.classList.remove("active");
        });
        document.getElementById(`toc-${id}`).classList.add("active");
    }
}

function filterNormoteca() {
    const query = document.getElementById("normoteca-search-input").value.toLowerCase().trim();
    const container = document.getElementById("norm-articles-container");
    container.innerHTML = "";
    
    const filtered = NORMOTECA_DB.filter(norm => {
        if (!query) return true;
        
        // Search in title, subtitle, content, or tags
        return norm.title.toLowerCase().includes(query) || 
               norm.subtitle.toLowerCase().includes(query) || 
               norm.content.toLowerCase().includes(query) || 
               norm.tags.some(tag => tag.includes(query));
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="card text-center" style="color: var(--text-muted); padding: 3rem;">
                No se encontraron normas que coincidan con la búsqueda.
            </div>
        `;
        return;
    }
    
    filtered.forEach(norm => {
        const card = document.createElement("article");
        card.className = "norm-card";
        card.id = `card-${norm.id}`;
        card.innerHTML = `
            <h5>${norm.subtitle}</h5>
            <h3>${norm.title}</h3>
            <div class="norm-content">${norm.content}</div>
            <div class="norm-card-footer">
                Palabras clave: ${norm.tags.join(", ")}
            </div>
        `;
        container.appendChild(card);
    });
    
    // Mark first search result as active in TOC if query exists
    if (filtered.length > 0) {
        const firstId = filtered[0].id;
        const tocEl = document.getElementById(`toc-${firstId}`);
        if (tocEl) {
            document.querySelectorAll(".norm-toc-item").forEach(item => {
                item.classList.remove("active");
            });
            tocEl.classList.add("active");
        }
    }
}

// Utility Formatting Helpers
function formatCurrency(val) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val);
}

function formatNumber(val) {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
}

function percentageText(val) {
    return (val >= 0 ? "+" : "") + Math.round(val * 100) + "%";
}

/* ==========================================================================
   THEME MANAGEMENT SYSTEM
   ========================================================================== */
function changeTheme() {
    const select = document.getElementById("theme-select");
    const theme = select.value;
    
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("corpoguajira_theme_preference", theme);
    
    // Adjust colors of the brand logo stroke if needed
    const orbit = document.querySelector(".sun-orbit");
    if (orbit) {
        if (theme === "corpoguajira") {
            orbit.setAttribute("stroke", "#004F9F");
        } else if (theme === "desierto") {
            orbit.setAttribute("stroke", "#E3A857");
        } else {
            orbit.setAttribute("stroke", "#E0A96D");
        }
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem("corpoguajira_theme_preference") || "corpoguajira";
    document.getElementById("theme-select").value = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);
    changeTheme();
}

/* ==========================================================================
   AI SETTINGS & API KEY MANAGEMENT
   ========================================================================== */
function saveApiKey() {
    const key = document.getElementById("gemini-api-key").value.trim();
    localStorage.setItem("corpoguajira_gemini_api_key", key);
    alert("Clave de API de Gemini guardada correctamente.");
}

function loadApiKey() {
    const savedKey = localStorage.getItem("corpoguajira_gemini_api_key") || "AIzaSyCarh5bNGmDkRssIog30CYrLhDxCUAd3o4";
    document.getElementById("gemini-api-key").value = savedKey;
}

function switchAiMode(mode) {
    console.log("switchAiMode called with mode:", mode);
    const chatBtn = document.getElementById("btn-ai-chat");
    const textBtn = document.getElementById("btn-ai-text");
    const chatInterface = document.getElementById("ai-chat-interface");
    const textInterface = document.getElementById("ai-text-interface");
    
    if (mode === "chat") {
        chatBtn.className = "btn btn-primary btn-sm";
        textBtn.className = "btn btn-secondary btn-sm";
        chatInterface.classList.remove("hidden");
        textInterface.classList.add("hidden");
        
        // Auto-start chat if not already in progress to avoid double click confusion
        const messages = document.getElementById("chat-messages");
        if (messages && (messages.children.length <= 1 || aiChatState.step === 0)) {
            console.log("Auto-starting AI chatbot interview...");
            startAiChat();
        }
    } else {
        chatBtn.className = "btn btn-secondary btn-sm";
        textBtn.className = "btn btn-primary btn-sm";
        chatInterface.classList.add("hidden");
        textInterface.classList.remove("hidden");
        console.log("Switched to Text Analysis interface.");
    }
}

/* ==========================================================================
   AI CHATBOT (GUIDED INTERVIEW) ENGINE
   ========================================================================== */
let aiChatState = {
    step: 0,
    answers: {
        expediente: "",
        infractor: "",
        infractorType: "juridica",
        empresaSize: "micro",
        sisbenLevel: "nivel1",
        days: 1,
        severityMode: "afectacion",
        in: 1, ex: 1, pe: 1, rv: 1, mc: 1,
        o: 0.2, m: 20,
        hasBeneficio: false, beneficioY: 0, beneficioP: 0.50,
        costosCOP: 0,
        agravantes: [],
        mitigantes: [],
        confesionType: "ninguna"
    }
};

const CHAT_FLOW = {
    0: {
        text: "<p>Iniciemos la tasación del expediente. Por favor, <strong>ingrese el número de expediente y el nombre del presunto infractor</strong> en formato:</p><p><em>EXPEDIENTE | NOMBRE</em> (Ej: <code>EXP-045-2026 | Minería del Norte S.A.S</code>)</p>",
        type: "text_input",
        placeholder: "EXPEDIENTE | NOMBRE",
        handler: (input) => {
            const parts = input.split("|");
            aiChatState.answers.expediente = parts[0]?.trim() || "EXP-AI-" + Date.now();
            aiChatState.answers.infractor = parts[1]?.trim() || "Infractor Determinado por IA";
            
            // Move to Q1
            aiChatState.step = 1;
            sendBotMessage(`Expediente registrado: <strong>${aiChatState.answers.expediente}</strong>.<br>Infractor registrado: <strong>${aiChatState.answers.infractor}</strong>.`);
            askQuestion();
        }
    },
    1: {
        text: "¿Cuál es la <strong>naturaleza jurídica</strong> del presunto infractor?",
        type: "buttons",
        options: [
            { text: "🏢 Persona Jurídica (Empresa/Entidad)", value: "juridica" },
            { text: "👤 Persona Natural (Ciudadano)", value: "natural" }
        ],
        handler: (value) => {
            aiChatState.answers.infractorType = value;
            if (value === "juridica") {
                aiChatState.step = 2; // Juridica size question
            } else {
                aiChatState.step = 3; // Natural Sisben question
            }
            askQuestion();
        }
    },
    2: { // Juridica size
        text: "¿De qué <strong>tamaño</strong> es la empresa investigada?",
        type: "buttons",
        options: [
            { text: "Microempresa (Cs = 0.25)", value: "micro" },
            { text: "Pequeña Empresa (Cs = 0.50)", value: "pequena" },
            { text: "Mediana Empresa (Cs = 0.75)", value: "mediana" },
            { text: "Gran Empresa (Cs = 1.00)", value: "grande" },
            { text: "Entidad Pública/Municipio (Cs = 1.00)", value: "publica" }
        ],
        handler: (value) => {
            aiChatState.answers.empresaSize = value;
            aiChatState.step = 4; // Move to infraction type
            askQuestion();
        }
    },
    3: { // Natural Sisben
        text: "¿Cuál es la clasificación del <strong>SISBEN o vulnerabilidad</strong> del ciudadano?",
        type: "buttons",
        options: [
            { text: "Nivel 1 (Cs = 0.01)", value: "nivel1" },
            { text: "Nivel 2 (Cs = 0.02)", value: "nivel2" },
            { text: "Nivel 3 (Cs = 0.03)", value: "nivel3" },
            { text: "Nivel 4 (Cs = 0.04)", value: "nivel4" },
            { text: "Nivel 5 (Cs = 0.05)", value: "nivel5" },
            { text: "Nivel 6 / Sin Sisben (Cs = 0.06)", value: "nivel6" },
            { text: "🌵 Resguardo Indígena Wayuu / Vulnerable (Cs = 0.01)", value: "indigena" }
        ],
        handler: (value) => {
            aiChatState.answers.sisbenLevel = value;
            aiChatState.step = 4; // Move to infraction type
            askQuestion();
        }
    },
    4: { // Infraction type (Real vs Potential)
        text: "¿La infracción generó un <strong>daño material real</strong> (tala de árboles, contaminación del río Ranchería, caza de fauna) o constituyó un <strong>riesgo potencial</strong> (no tener permisos, no presentar informes)?",
        type: "buttons",
        options: [
            { text: "🌳 Daño Real (Afectación física)", value: "afectacion" },
            { text: "⚠️ Daño Potencial (Riesgo / Formal)", value: "riesgo" }
        ],
        handler: (value) => {
            aiChatState.answers.severityMode = value;
            if (value === "afectacion") {
                aiChatState.step = 5; // IN
            } else {
                aiChatState.step = 10; // Probability of risk
            }
            askQuestion();
        }
    },
    5: { // IN (Intensidad)
        text: "Califique la <strong>Intensidad (IN)</strong>: ¿En qué proporción se excedieron los límites o cuál fue el nivel de cambio del recurso?",
        type: "buttons",
        options: [
            { text: "Muy Baja/Baja (Desviación 0-33%) [IN = 1]", value: 1 },
            { text: "Media (Desviación 34-66%) [IN = 4]", value: 4 },
            { text: "Alta (Desviación 67-99%) [IN = 8]", value: 8 },
            { text: "Muy Alta / Exceso Crítico (>= 100%) [IN = 12]", value: 12 }
        ],
        handler: (value) => {
            aiChatState.answers.in = parseInt(value);
            aiChatState.step = 6; // EX
            askQuestion();
        }
    },
    6: { // EX (Extensión)
        text: "Califique la <strong>Extensión (EX)</strong>: ¿Qué área del entorno se vio directamente afectada?",
        type: "buttons",
        options: [
            { text: "Localizada e inferior a 1 Hectárea [EX = 1]", value: 1 },
            { text: "Regional o entre 1 y 5 Hectáreas [EX = 4]", value: 4 },
            { text: "Generalizada o superior a 5 Hectáreas [EX = 12]", value: 12 }
        ],
        handler: (value) => {
            aiChatState.answers.ex = parseInt(value);
            aiChatState.step = 7; // PE
            askQuestion();
        }
    },
    7: { // PE (Persistencia)
        text: "Califique la <strong>Persistencia (PE)</strong>: ¿Cuánto dura el efecto de la afectación en el ambiente?",
        type: "buttons",
        options: [
            { text: "Fugaz (menos de 6 meses) [PE = 1]", value: 1 },
            { text: "Persistente (6 meses a 5 años) [PE = 3]", value: 3 },
            { text: "Permanente (más de 5 años) [PE = 5]", value: 5 }
        ],
        handler: (value) => {
            aiChatState.answers.pe = parseInt(value);
            aiChatState.step = 8; // RV
            askQuestion();
        }
    },
    8: { // RV (Reversibilidad)
        text: "Califique la <strong>Reversibilidad (RV)</strong>: ¿Cuánto tardará en regenerarse el recurso de forma natural?",
        type: "buttons",
        options: [
            { text: "Corto plazo (menos de 1 año) [RV = 1]", value: 1 },
            { text: "Mediano/Largo plazo (1 a 10 años) [RV = 3]", value: 3 },
            { text: "Irreversible (más de 10 años) [RV = 5]", value: 5 }
        ],
        handler: (value) => {
            aiChatState.answers.rv = parseInt(value);
            aiChatState.step = 9; // MC
            askQuestion();
        }
    },
    9: { // MC (Recuperabilidad)
        text: "Califique la <strong>Recuperabilidad (MC)</strong>: ¿Qué tan viable es restaurar el área mediante obras humanas?",
        type: "buttons",
        options: [
            { text: "Recuperable a corto plazo (menos de 6 meses) [MC = 1]", value: 1 },
            { text: "Recuperable a mediano plazo (6m a 5 años) [MC = 3]", value: 3 },
            { text: "Irrecuperable (daño irreparable) [MC = 10]", value: 10 }
        ],
        handler: (value) => {
            aiChatState.answers.mc = parseInt(value);
            aiChatState.step = 12; // Temporalidad days
            askQuestion();
        }
    },
    10: { // Risk Probability (o)
        text: "¿Cuál es la <strong>Probabilidad de ocurrencia (o)</strong> de que el riesgo se materialice en daño?",
        type: "buttons",
        options: [
            { text: "Muy Baja (0.2)", value: 0.2 },
            { text: "Baja (0.4)", value: 0.4 },
            { text: "Media (0.6)", value: 0.6 },
            { text: "Alta (0.8)", value: 0.8 },
            { text: "Muy Alta (1.0)", value: 1.0 }
        ],
        handler: (value) => {
            aiChatState.answers.o = parseFloat(value);
            aiChatState.step = 11; // Magnitude
            askQuestion();
        }
    },
    11: { // Risk Magnitude (m)
        text: "¿Cuál es la <strong>Magnitud del impacto potencial (m)</strong> si sucediera?",
        type: "buttons",
        options: [
            { text: "Irrelevante (20)", value: 20 },
            { text: "Leve (35)", value: 35 },
            { text: "Moderado (50)", value: 50 },
            { text: "Severo (65)", value: 65 },
            { text: "Crítico (80)", value: 80 }
        ],
        handler: (value) => {
            aiChatState.answers.m = parseInt(value);
            aiChatState.step = 12; // Temporalidad days
            askQuestion();
        }
    },
    12: { // Days of infraction
        text: "¿Cuántos <strong>días</strong> duró o se mantuvo la infracción ambiental?",
        type: "buttons",
        options: [
            { text: "1 día (Instantánea)", value: 1 },
            { text: "15 días", value: 15 },
            { text: "30 días", value: 30 },
            { text: "90 días", value: 90 },
            { text: "365 días o más (Continua)", value: 365 },
            { text: "✏️ Ingresar días específicos", value: "custom" }
        ],
        handler: (value) => {
            if (value === "custom") {
                sendBotMessage("Por favor ingrese el número exacto de días en la caja de texto:");
                renderTextInputForChat((daysText) => {
                    const daysVal = parseInt(daysText) || 1;
                    aiChatState.answers.days = daysVal;
                    aiChatState.step = 13; // Beneficio
                    sendBotMessage(`Días registrados: <strong>${daysVal}</strong>.`);
                    askQuestion();
                });
            } else {
                aiChatState.answers.days = parseInt(value);
                aiChatState.step = 13; // Beneficio
                askQuestion();
            }
        }
    },
    13: { // Has Beneficio
        text: "¿Se obtuvo o probó algún **Beneficio Económico Ilícito (B)**? (Ej: ahorros por no instalar planta de tratamiento, ingresos por ventas ilegales)",
        type: "buttons",
        options: [
            { text: "❌ No hubo beneficio probado / No aplica", value: "no" },
            { text: "💰 Sí, se determinó beneficio", value: "si" }
        ],
        handler: (value) => {
            if (value === "si") {
                aiChatState.answers.hasBeneficio = true;
                sendBotMessage("Ingrese el **valor estimado del beneficio económico (Y)** obtenido en pesos colombianos (sin puntos ni comas):");
                renderTextInputForChat((beneficioText) => {
                    const yVal = parseFloat(beneficioText) || 0;
                    aiChatState.answers.beneficioY = yVal;
                    
                    // Ask for detection probability
                    sendBotMessage(`Beneficio base (Y): <strong>${formatCurrency(yVal)} COP</strong>.`);
                    aiChatState.step = 14; // p value
                    askQuestion();
                });
            } else {
                aiChatState.answers.hasBeneficio = false;
                aiChatState.answers.beneficioY = 0;
                aiChatState.step = 15; // Costos asociados
                askQuestion();
            }
        }
    },
    14: { // p value
        text: "¿Cuál es la **capacidad de detección (p)** que tiene Corpoguajira sobre esta conducta específica?",
        type: "buttons",
        options: [
            { text: "Alta capacidad (p = 0.50) [Factor: 1.0]", value: 0.50 },
            { text: "Media capacidad (p = 0.45) [Factor: 1.22]", value: 0.45 },
            { text: "Baja capacidad (p = 0.40) [Factor: 1.5]", value: 0.40 }
        ],
        handler: (value) => {
            aiChatState.answers.beneficioP = parseFloat(value);
            aiChatState.step = 15; // Costos asociados
            askQuestion();
        }
    },
    15: { // Costos Asociados
        text: "¿Corpoguajira incurrió en **costos de investigación** para este caso? (Ej. viáticos, análisis de laboratorio externos)",
        type: "buttons",
        options: [
            { text: "❌ No hubo costos extraordinarios", value: "no" },
            { text: "💸 Sí, se generaron costos", value: "si" }
        ],
        handler: (value) => {
            if (value === "si") {
                sendBotMessage("Ingrese el valor de los **costos asociados ($Ca$)** en pesos colombianos:");
                renderTextInputForChat((costosText) => {
                    const caVal = parseFloat(costosText) || 0;
                    aiChatState.answers.costosCOP = caVal;
                    sendBotMessage(`Costos asociados registrados: <strong>${formatCurrency(caVal)} COP</strong>.`);
                    aiChatState.step = 16; // Agravantes / Atenuantes
                    askQuestion();
                });
            } else {
                aiChatState.answers.costosCOP = 0;
                aiChatState.step = 16; // Agravantes / Atenuantes
                askQuestion();
            }
        }
    },
    16: { // Agravantes / Atenuantes
        text: "¿Se presentan **circunstancias agravantes o atenuantes** especiales para la conducta?",
        type: "buttons",
        options: [
            { text: "Reincidente o cometida en área protegida / resguardo indígena Wayuu (+ Agravantes)", value: "agravante" },
            { text: "El infractor mitigó o reparó el daño voluntariamente antes del proceso (- Atenuante)", value: "atenuante" },
            { text: "Ninguna de las anteriores / Estándar", value: "ninguna" }
        ],
        handler: (value) => {
            aiChatState.answers.agravantes = [];
            aiChatState.answers.mitigantes = [];
            
            if (value === "agravante") {
                // Apply reincidencia and area protegida
                aiChatState.answers.agravantes.push("agr_reincidencia");
                aiChatState.answers.agravantes.push("agr_area_protegida");
                sendBotMessage("Se ha configurado: <strong>Reincidencia y Comisión en Área Protegida/Ecosistema de Importancia (+0.45 total)</strong>.");
            } else if (value === "atenuante") {
                aiChatState.answers.mitigantes.push("mit_mitigacion");
                sendBotMessage("Se ha configurado: <strong>Mitigación voluntaria del daño (-0.40 total)</strong>.");
            }
            
            aiChatState.step = 17; // Confesión Ley 2387
            askQuestion();
        }
    },
    17: { // Confesión Ley 2387
        text: "¿El presunto infractor ha realizado una **confesión voluntaria** de la conducta según los incentivos de la Ley 2387 de 2024?",
        type: "buttons",
        options: [
            { text: "Sí, confesó ANTES del inicio formal del proceso sancionatorio (-30% Multa)", value: "antes_proceso" },
            { text: "Sí, confesó ANTES de la formulación del pliego de cargos (-15% Multa)", value: "antes_cargos" },
            { text: "No confesó / No aplica descuento", value: "ninguna" }
        ],
        handler: (value) => {
            aiChatState.answers.confesionType = value;
            aiChatState.step = 18; // End of interview & results
            askQuestion();
        }
    }
};

function startAiChat() {
    aiChatState.step = 0;
    aiChatState.answers = {
        expediente: "", infractor: "", infractorType: "juridica", empresaSize: "micro", sisbenLevel: "nivel1",
        days: 1, severityMode: "afectacion", in: 1, ex: 1, pe: 1, rv: 1, mc: 1, o: 0.2, m: 20,
        hasBeneficio: false, beneficioY: 0, beneficioP: 0.50, costosCOP: 0, agravantes: [], mitigantes: [],
        confesionType: "ninguna"
    };
    
    const messages = document.getElementById("chat-messages");
    messages.innerHTML = "";
    document.getElementById("chat-status").textContent = "Entrevista en Progreso";
    
    sendBotMessage("Hola. Soy su asistente virtual de Corpoguajira. Le guiaré paso a paso para tasar la sanción pecuniaria de forma objetiva.");
    askQuestion();
}

function askQuestion() {
    const step = aiChatState.step;
    
    if (step === 18) {
        // Complete interview
        document.getElementById("chat-status").textContent = "Entrevista Finalizada";
        sendBotMessage("<p>¡Excelente! He recolectado todos los parámetros de la tasación.</p><p>Haga clic en el botón inferior para cargar los datos en la calculadora principal y generar la liquidación oficial.</p>");
        renderLoadDataButton();
        return;
    }
    
    const question = CHAT_FLOW[step];
    sendBotMessage(question.text);
    
    if (question.type === "buttons") {
        renderReplyButtons(question.options, question.handler);
    } else if (question.type === "text_input") {
        renderTextInputForChat((input) => {
            sendUserMessage(input);
            question.handler(input);
        }, question.placeholder);
    }
}

function sendBotMessage(text) {
    const messages = document.getElementById("chat-messages");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot-message";
    bubble.innerHTML = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function sendUserMessage(text) {
    const messages = document.getElementById("chat-messages");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble user-message";
    bubble.innerHTML = `<p>${text}</p>`;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function renderReplyButtons(options, handler) {
    const inputArea = document.getElementById("chat-input-area");
    inputArea.innerHTML = "";
    
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "chat-reply-btn";
        btn.innerHTML = opt.text;
        btn.onclick = () => {
            sendUserMessage(opt.text);
            handler(opt.value);
        };
        inputArea.appendChild(btn);
    });
}

function renderTextInputForChat(onSend, placeholder = "") {
    const inputArea = document.getElementById("chat-input-area");
    inputArea.innerHTML = `
        <input type="text" id="chat-text-input" placeholder="${placeholder}" style="flex-grow: 1; padding: 0.5rem 0.85rem; border: 1px solid var(--border-color); background: rgba(0,0,0,0.2); color: var(--text-main); border-radius: 50px; outline: none; font-size: 0.85rem;">
        <button class="btn btn-primary btn-sm" id="btn-chat-send" style="border-radius: 50px; padding: 0.4rem 1.1rem; font-size: 0.8rem;">Enviar</button>
    `;
    
    const input = document.getElementById("chat-text-input");
    const sendBtn = document.getElementById("btn-chat-send");
    
    const handleSend = () => {
        const text = input.value.trim();
        if (text) {
            onSend(text);
        }
    };
    
    sendBtn.onclick = handleSend;
    input.onkeydown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };
    input.focus();
}

function renderLoadDataButton() {
    const inputArea = document.getElementById("chat-input-area");
    inputArea.innerHTML = `
        <button class="btn btn-primary" onclick="loadChatDataToCalculator()" style="width: 100%; border-radius: 50px;">📥 Cargar Datos en la Calculadora</button>
    `;
}

function loadChatDataToCalculator() {
    const answers = aiChatState.answers;
    
    // Load into appState
    appState.expediente = answers.expediente;
    appState.infractor = answers.infractor;
    appState.infractorType = answers.infractorType;
    appState.empresaSize = answers.empresaSize;
    appState.sisbenLevel = answers.sisbenLevel;
    appState.days = answers.days;
    appState.severityMode = answers.severityMode;
    appState.in = answers.in;
    appState.ex = answers.ex;
    appState.pe = answers.pe;
    appState.rv = answers.rv;
    appState.mc = answers.mc;
    appState.o = answers.o;
    appState.m = answers.m;
    appState.hasBeneficio = answers.hasBeneficio;
    appState.beneficioY = answers.beneficioY;
    appState.beneficioP = answers.beneficioP;
    appState.costosCOP = answers.costosCOP;
    appState.confesionType = answers.confesionType;
    
    // Reset and select active agravantes/mitigantes
    appState.agravantes = AGRAVANTES_DEFAULTS.map(a => ({ ...a, active: answers.agravantes.includes(a.id) }));
    appState.mitigantes = MITIGANTES_DEFAULTS.map(m => ({ ...m, active: answers.mitigantes.includes(m.id) }));
    
    // Sync all DOM elements
    document.getElementById("case-expediente").value = appState.expediente;
    document.getElementById("case-infractor").value = appState.infractor;
    document.getElementById("infractor-type").value = appState.infractorType;
    document.getElementById("empresa-size").value = appState.empresaSize;
    document.getElementById("sisben-level").value = appState.sisbenLevel;
    document.getElementById("infraction-days").value = appState.days;
    document.getElementById("has-beneficio").checked = appState.hasBeneficio;
    document.getElementById("beneficio-y").value = appState.beneficioY;
    document.getElementById("beneficio-p").value = appState.beneficioP;
    document.getElementById("costos-asociados-cop").value = appState.costosCOP;
    document.getElementById("ley2387-confesion").value = appState.confesionType;
    
    if (appState.severityMode === "afectacion") {
        document.getElementById("attr-in").value = appState.in;
        document.getElementById("attr-ex").value = appState.ex;
        document.getElementById("attr-pe").value = appState.pe;
        document.getElementById("attr-rv").value = appState.rv;
        document.getElementById("attr-mc").value = appState.mc;
        document.querySelector('input[name="severity-mode"][value="afectacion"]').checked = true;
    } else {
        document.getElementById("attr-o").value = appState.o;
        document.getElementById("attr-m").value = appState.m;
        document.querySelector('input[name="severity-mode"][value="riesgo"]').checked = true;
    }
    
    // Run recalculators
    toggleInfractorFields();
    toggleSeverityMode();
    toggleBeneficioFields();
    renderAgravantesMitigantesLists();
    calculateFactors();
    calculateCostosAsociadosSmmlv();
    calculateAlphaValue();
    
    // Jump to summary step
    document.getElementById(`step-${appState.currentStep}`).classList.add("hidden");
    appState.currentStep = 7;
    document.getElementById("step-7").classList.remove("hidden");
    updateProgressUI();
    
    recalculateEverything();
    
    // Switch to main calculator tab
    switchTab("tab-calc");
    alert("¡Variables precargadas de la IA con éxito! Revise la liquidación final.");
}

/* ==========================================================================
   AI TEXT ANALYZER (GEMINI API INTEGRATION)
   ========================================================================== */
function loadAiSampleText() {
    const sample = `INFORME TÉCNICO DE INFRACCIÓN - EXPEDIENTE CO-03-2026
Lugar: Albania, La Guajira (zona del arroyo Limón, ecosistema de bosque seco tropical).
Presunto Infractor: Lácteos de la Sierra S.A.S. (clasificada como una Pequeña Empresa).
Hechos: Se evidenció el vertimiento de aguas residuales industriales sin tratamiento directamente en el arroyo Limón. El vertimiento se prolongó de forma continua por un lapso de 15 días.
Gravedad del Daño:
- La descarga generó un cambio severo de color y olor del agua (DBO5 excedió el 80% del límite legal - intensidad alta).
- El área afectada se localiza en 0.8 hectáreas del cauce.
- La persistencia del lodo se estima menor a 6 meses.
- El ecosistema es reversible de forma natural en unos 2 años.
- El daño es recuperable por medios humanos mediante limpieza en 5 meses.
Agravantes y Atenuantes: Se comprobó reincidencia de la empresa en vertimientos anteriores. Sin embargo, el infractor confesó voluntariamente el hecho antes del inicio del pliego de cargos.
Beneficio económico: Se estiman ahorros por costos evitados de operación de planta por un valor de $6.500.000 COP, con capacidad media de detección.
Costos de Corpoguajira: Los viáticos de inspección y laboratorios técnicos de monitoreo costaron $1.500.000 COP.`;

    document.getElementById("ai-text-input").value = sample;
}

// Global variable for storing deductions
let aiParsedDeductions = null;

async function analyzeTextWithAI() {
    const text = document.getElementById("ai-text-input").value.trim();
    if (!text) {
        alert("Por favor ingrese o pegue algún texto para analizar.");
        return;
    }
    
    const apiKey = localStorage.getItem("corpoguajira_gemini_api_key") || "";
    const resultsContainer = document.getElementById("ai-analysis-results");
    
    resultsContainer.classList.remove("hidden");
    resultsContainer.innerHTML = `<p style="color: var(--primary); font-weight: 500; text-align: center;">⏳ Procesando texto técnico con IA, por favor espere...</p>`;
    
    if (!apiKey) {
        // Run simulated analysis
        setTimeout(() => {
            runSimulatedAiAnalysis(text);
        }, 1500);
        return;
    }
    
    // If API Key is present, make a real call to Gemini API
    const systemPrompt = `Eres un asesor jurídico experto en derecho ambiental colombiano y en la metodología de tasación de multas de la Resolución 2086 de 2010.
Analiza el informe técnico provisto y extrae EXACTAMENTE los parámetros numéricos de la multa. Debes retornar ÚNICAMENTE un objeto JSON válido, sin markdown, con la estructura siguiente:
{
  "expediente": "Código del expediente o N/A",
  "infractor": "Nombre o razón social",
  "infractorType": "natural" o "juridica",
  "empresaSize": "micro" | "pequena" | "mediana" | "grande" | "publica" (por defecto "micro"),
  "sisbenLevel": "nivel1" | "nivel2" | "nivel3" | "nivel4" | "nivel5" | "nivel6" | "indigena",
  "days": número de días,
  "severityMode": "afectacion" o "riesgo",
  "in": 1 | 4 | 8 | 12 (Intensidad, defecto 1),
  "ex": 1 | 4 | 12 (Extensión, defecto 1),
  "pe": 1 | 3 | 5 (Persistencia, defecto 1),
  "rv": 1 | 3 | 5 (Reversibilidad, defecto 1),
  "mc": 1 | 3 | 10 (Recuperabilidad, defecto 1),
  "o": 0.2 | 0.4 | 0.6 | 0.8 | 1.0 (Probabilidad de riesgo),
  "m": 20 | 35 | 50 | 65 | 80 (Magnitud de riesgo),
  "hasBeneficio": boolean,
  "beneficioY": valor de Y en COP (número sin formato),
  "beneficioP": 0.40 | 0.45 | 0.50 (Probabilidad detección),
  "costosCOP": costos asociados en COP,
  "agravantes": array de IDs que aplican (ej. ["agr_reincidencia", "agr_area_protegida"]),
  "mitigantes": array de IDs que aplican (ej. ["mit_mitigacion"]),
  "confesionType": "antes_proceso" | "antes_cargos" | "ninguna",
  "justificacion": "Breve explicación jurídica de los valores encontrados"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const requestBody = {
        contents: [
            {
                parts: [
                    { text: systemPrompt + "\n\nTexto a analizar:\n" + text }
                ]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json"
        }
    };
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error("La llamada a la API falló. Código: " + response.status);
        }
        
        const data = await response.json();
        const jsonResponseText = data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(jsonResponseText);
        
        displayAiDeductionResults(parsed, false);
    } catch (e) {
        resultsContainer.innerHTML = `
            <p style="color: var(--danger); font-weight: 600; text-align: center; margin-bottom: 0.5rem;">❌ Error en el procesamiento de la IA Real</p>
            <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-bottom: 1rem;">${e.message}. Corrija su API Key o use la Simulación.</p>
            <button class="btn btn-secondary btn-sm" onclick="runSimulatedAiAnalysis('${text.replace(/'/g, "\\'")}')" style="margin: 0 auto; display: block;">Ejecutar Simulación de Prueba</button>
        `;
    }
}

// Local mock parser when no API key is provided
function runSimulatedAiAnalysis(text) {
    // Basic regex keyword parser
    const lower = text.toLowerCase();
    
    let infractor = "Infractor de Muestra";
    if (lower.includes("lácteos de la sierra")) infractor = "Lácteos de la Sierra S.A.S.";
    else if (lower.includes("minera")) infractor = "Minería del Carbón S.A.";
    
    let expediente = "EXP-2026-AI";
    if (lower.includes("co-03-2026")) expediente = "CO-03-2026";
    
    let infractorType = "juridica";
    let size = "micro";
    if (lower.includes("pequeña empresa")) size = "pequena";
    else if (lower.includes("mediana empresa")) size = "mediana";
    else if (lower.includes("gran empresa")) size = "grande";
    
    let days = 1;
    if (lower.includes("15 días")) days = 15;
    else if (lower.includes("90 días")) days = 90;
    else if (lower.includes("30 días")) days = 30;
    
    let hasB = false;
    let bCOP = 0;
    if (lower.includes("6.500.000")) {
        hasB = true;
        bCOP = 6500000;
    }
    
    let caCOP = 0;
    if (lower.includes("1.500.000")) {
        caCOP = 1500000;
    }
    
    let confesion = "ninguna";
    if (lower.includes("antes del inicio del pliego de cargos")) confesion = "antes_cargos";
    else if (lower.includes("antes del inicio formal")) confesion = "antes_proceso";
    
    let agravantes = [];
    if (lower.includes("reincidencia")) agravantes.push("agr_reincidencia");
    if (lower.includes("bosque seco tropical") || lower.includes("área protegida")) agravantes.push("agr_area_protegida");
    
    const parsedMock = {
        expediente: expediente,
        infractor: infractor,
        infractorType: infractorType,
        empresaSize: size,
        sisbenLevel: "nivel1",
        days: days,
        severityMode: "afectacion",
        in: 8, ex: 4, pe: 1, rv: 3, mc: 1, // Standard derived values for the sample
        o: 0.6, m: 50,
        hasBeneficio: hasB,
        beneficioY: bCOP,
        beneficioP: 0.45,
        costosCOP: caCOP,
        agravantes: agravantes,
        mitigantes: [],
        confesionType: confesion,
        justificacion: "Simulación de IA: Se identificaron los patrones del informe técnico de muestra de Corpoguajira. Pequeña empresa (Cs = 0.50), vertimiento en área protegida de bosque seco (agravante), reincidencia (agravante), duración de 15 días (temporalidad), costos de laboratorio y beneficio por costos evitados de $6.500.000 COP con descuento por confesión temprana (15% de reducción)."
    };
    
    displayAiDeductionResults(parsedMock, true);
}

function displayAiDeductionResults(data, isSimulated) {
    aiParsedDeductions = data;
    const resultsContainer = document.getElementById("ai-analysis-results");
    
    const typeLabel = data.infractorType === "juridica" 
        ? `Persona Jurídica (${data.empresaSize.toUpperCase()})` 
        : `Persona Natural (Sisben: ${data.sisbenLevel.toUpperCase()})`;
        
    const severityText = data.severityMode === "afectacion"
        ? `Afectación Real (IN:${data.in}, EX:${data.ex}, PE:${data.pe}, RV:${data.rv}, MC:${data.mc})`
        : `Riesgo Potencial (o:${data.o}, m:${data.m})`;
        
    resultsContainer.innerHTML = `
        <h4 style="color: var(--primary); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span>Variables Deducidas ${isSimulated ? '(Simuladas)' : 'por IA'}</span>
            <span style="font-size: 0.75rem; background: var(--accent); color: var(--bg-dark); padding: 0.15rem 0.5rem; border-radius: 4px;">Listo</span>
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">${data.justificacion}</p>
        
        <div class="ai-var-grid">
            <div class="ai-var-box">
                Expediente
                <strong>${data.expediente}</strong>
            </div>
            <div class="ai-var-box">
                Infractor
                <strong>${data.infractor}</strong>
            </div>
            <div class="ai-var-box">
                Tipo Infractor
                <strong>${typeLabel}</strong>
            </div>
            <div class="ai-var-box">
                Duración (Días)
                <strong>${data.days} días</strong>
            </div>
            <div class="ai-var-box">
                Gravedad
                <strong>${severityText}</strong>
            </div>
            <div class="ai-var-box">
                Beneficio (Y)
                <strong>${formatCurrency(data.beneficioY)}</strong>
            </div>
            <div class="ai-var-box">
                Costos Ca
                <strong>${formatCurrency(data.costosCOP)}</strong>
            </div>
            <div class="ai-var-box">
                Agravantes
                <strong>${data.agravantes.length} aplicados</strong>
            </div>
            <div class="ai-var-box">
                Confesión
                <strong>${data.confesionType}</strong>
            </div>
        </div>
        
        <button class="btn btn-primary" onclick="loadParsedAiDataToCalculator()" style="width: 100%; border-radius: 50px; margin-top: 1rem;">📥 Precargar en la Calculadora</button>
    `;
}

function loadParsedAiDataToCalculator() {
    if (!aiParsedDeductions) return;
    
    const data = aiParsedDeductions;
    
    // Load into state
    appState.expediente = data.expediente;
    appState.infractor = data.infractor;
    appState.infractorType = data.infractorType;
    appState.empresaSize = data.empresaSize;
    appState.sisbenLevel = data.sisbenLevel;
    appState.days = data.days;
    appState.severityMode = data.severityMode;
    appState.in = data.in;
    appState.ex = data.ex;
    appState.pe = data.pe;
    appState.rv = data.rv;
    appState.mc = data.mc;
    appState.o = data.o;
    appState.m = data.m;
    appState.hasBeneficio = data.hasBeneficio;
    appState.beneficioY = data.beneficioY;
    appState.beneficioP = data.beneficioP;
    appState.costosCOP = data.costosCOP;
    appState.confesionType = data.confesionType;
    
    // Set active factors
    appState.agravantes = AGRAVANTES_DEFAULTS.map(a => ({ ...a, active: data.agravantes.includes(a.id) }));
    appState.mitigantes = MITIGANTES_DEFAULTS.map(m => ({ ...m, active: data.mitigantes.includes(m.id) }));
    
    // Sync DOM elements
    document.getElementById("case-expediente").value = appState.expediente;
    document.getElementById("case-infractor").value = appState.infractor;
    document.getElementById("infractor-type").value = appState.infractorType;
    document.getElementById("empresa-size").value = appState.empresaSize;
    document.getElementById("sisben-level").value = appState.sisbenLevel;
    document.getElementById("infraction-days").value = appState.days;
    document.getElementById("has-beneficio").checked = appState.hasBeneficio;
    document.getElementById("beneficio-y").value = appState.beneficioY;
    document.getElementById("beneficio-p").value = appState.beneficioP;
    document.getElementById("costos-asociados-cop").value = appState.costosCOP;
    document.getElementById("ley2387-confesion").value = appState.confesionType;
    
    if (appState.severityMode === "afectacion") {
        document.getElementById("attr-in").value = appState.in;
        document.getElementById("attr-ex").value = appState.ex;
        document.getElementById("attr-pe").value = appState.pe;
        document.getElementById("attr-rv").value = appState.rv;
        document.getElementById("attr-mc").value = appState.mc;
        document.querySelector('input[name="severity-mode"][value="afectacion"]').checked = true;
    } else {
        document.getElementById("attr-o").value = appState.o;
        document.getElementById("attr-m").value = appState.m;
        document.querySelector('input[name="severity-mode"][value="riesgo"]').checked = true;
    }
    
    // Sync all updates
    toggleInfractorFields();
    toggleSeverityMode();
    toggleBeneficioFields();
    renderAgravantesMitigantesLists();
    calculateFactors();
    calculateCostosAsociadosSmmlv();
    calculateAlphaValue();
    
    // Go to summary step in wizard
    document.getElementById(`step-${appState.currentStep}`).classList.add("hidden");
    appState.currentStep = 7;
    document.getElementById("step-7").classList.remove("hidden");
    updateProgressUI();
    
    recalculateEverything();
    
    // Switch to calculator tab
    switchTab("tab-calc");
    alert("¡Variables precargadas de la IA con éxito! Revise la liquidación final.");
}

function toggleFlagrancia() {
    const chk = document.getElementById("chk-flagrancia");
    const select = document.getElementById("ley2387-confesion");
    const hint = document.getElementById("flagrancia-hint");
    
    appState.flagrancia = chk.checked;
    
    if (chk.checked) {
        select.value = "ninguna";
        select.disabled = true;
        hint.style.display = "block";
    } else {
        select.disabled = false;
        hint.style.display = "none";
    }
    
    recalculateEverything();
}

function updateSancionesReporte() {
    const principalSelect = document.getElementById("sancion-principal");
    appState.sancionPrincipal = principalSelect.value;
    
    const accesorias = [];
    document.querySelectorAll(".chk-accesoria:checked").forEach(chk => {
        accesorias.push(chk.value);
    });
    
    if (accesorias.length > 2) {
        alert("Según la reglamentación ambiental, solo se pueden imponer hasta dos sanciones accesorias.");
        const lastChecked = document.querySelectorAll(".chk-accesoria:checked");
        if (lastChecked.length > 0) {
            lastChecked[lastChecked.length - 1].checked = false;
        }
        return;
    }
    
    appState.sancionesAccesorias = accesorias;
    recalculateEverything();
}

// Expose all functions to the global window scope to work with inline HTML event handlers (since app.js is type="module")
window.toggleFlagrancia = toggleFlagrancia;
window.updateSancionesReporte = updateSancionesReporte;
window.switchTab = switchTab;
window.changeTheme = changeTheme;
window.updateValuesFromYear = updateValuesFromYear;
window.recalculateEverything = recalculateEverything;
window.toggleInfractorFields = toggleInfractorFields;
window.updateCsValue = updateCsValue;
window.calculateAlphaValue = calculateAlphaValue;
window.toggleSeverityMode = toggleSeverityMode;
window.calculateIValue = calculateIValue;
window.calculateRValue = calculateRValue;
window.toggleBeneficioFields = toggleBeneficioFields;
window.calculateBeneficioValue = calculateBeneficioValue;
window.toggleFactor = toggleFactor;
window.updateFactorWeight = updateFactorWeight;
window.calculateCostosAsociadosSmmlv = calculateCostosAsociadosSmmlv;
window.moveWizardStep = moveWizardStep;
window.saveCalculationToHistory = saveCalculationToHistory;
window.printReport = printReport;
window.copyJustification = copyJustification;
window.exportHistory = exportHistory;
window.importHistory = importHistory;
window.clearAllHistory = clearAllHistory;
window.deleteHistoryItem = deleteHistoryItem;
window.loadHistoryToCalculator = loadHistoryToCalculator;
window.filterNormoteca = filterNormoteca;

// AI functions
window.saveApiKey = saveApiKey;
window.switchAiMode = switchAiMode;
window.startAiChat = startAiChat;
window.loadAiSampleText = loadAiSampleText;
window.analyzeTextWithAI = analyzeTextWithAI;
window.loadParsedAiDataToCalculator = loadParsedAiDataToCalculator;
window.loadChatDataToCalculator = loadChatDataToCalculator;
window.runSimulatedAiAnalysis = runSimulatedAiAnalysis;

