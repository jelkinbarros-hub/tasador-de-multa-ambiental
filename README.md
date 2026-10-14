# Tasador de Multas Ambientales - CORPOGUAJIRA

Aplicación web oficial para la tasación técnica y dosimetría de multas sancionatorias ambientales de la **Corporación Autónoma Regional de La Guajira (Corpoguajira)**, en estricto cumplimiento del marco normativo ambiental colombiano:

* **Ley 1333 de 2009:** Régimen sancionatorio ambiental general.
* **Resolución 2086 de 2010:** Metodología técnica para el cálculo y tasación de multas ambientales del Ministerio de Ambiente y Desarrollo Sostenible (MADS).
* **Ley 2387 de 2024:** Actualización normativa sancionatoria ambiental (nuevos topes de 100.000 SMMLV, incentivos procesales por confesión, subrogación por trabajo comunitario y causales de flagrancia).
* **Guía PAAS PGN / ANLA (2024):** Criterios procedimentales y dosimetría de sanciones principales y accesorias.

---

## 🌿 Características Principales

1. **Calculadora Paso a Paso (Wizard Dosimétrico):**
   * **Paso 1:** Capacidad Socioeconómica del Infractor ($Cs$) según tamaño de empresa o nivel de SISBEN.
   * **Paso 2:** Factor de Temporalidad ($\alpha$) de 1 a 365 días.
   * **Paso 3:** Gravedad de la Infracción ($i$) evaluada por Daño Real (Afectación con matriz $I$) o Daño Potencial (Riesgo $R$).
   * **Paso 4:** Beneficio Económico Ilícito ($B$) con costos evitados ($Y$) y probabilidad de detección ($p$).
   * **Paso 5:** Agravantes y Atenuantes ($A$) con topes automáticos (+2.0 máximo para agravantes, -0.6 para atenuantes según Resolución 2086).
   * **Paso 6:** Costos Asociados ($Ca$), régimen sancionatorio y descuentos por confesión con validación de exclusión en flagrancia.
   * **Paso 7:** Liquidación Final en COP, SMMLV y UVT, selección de sanción principal y hasta 2 sanciones accesorias, y alerta de subrogación por trabajo comunitario.

2. **Asistente de Inteligencia Artificial (Gemini 3.5 / 3.8):**
   * Entrevista guiada interactiva o análisis semántico de informes técnicos y actas de visita de campo para deducir y precargar las variables automáticamente.

3. **Normoteca y Guía Corpoguajira:**
   * Textos completos de leyes, decretos y resoluciones ambientales colombianas.

4. **Reporte Oficial Imprimible:**
   * Generación y exportación de dictámenes técnicos y justificación jurídica en formato PDF membretado con el logotipo oficial de Corpoguajira.

---

## 🚀 Despliegue en Vercel

Este proyecto está optimizado con **Vite** y configurado con `vercel.json` para despliegue continuo automático:

* **Framework Preset:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

---

*Desarrollado para el uso de los funcionarios y comités jurídicos de Corpoguajira.*
