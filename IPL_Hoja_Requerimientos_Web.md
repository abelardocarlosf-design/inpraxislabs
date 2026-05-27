# Hoja de Requerimientos — Sitio Web In Praxis Labs

| Campo | Detalle |
|---|---|
| **Proyecto** | Sitio web corporativo y de captación — In Praxis Labs |
| **Dominio** | inpraxislabs.com.mx |
| **Versión** | 1.0 |
| **Tipo** | Landing one-page de alto impacto (v1), escalable a multipágina + blog (v2) |
| **Objetivo de negocio** | Generar reuniones de auditoría gratuita con clínicas/consultorios y posicionar a la marca + al fundador como referente de IA y automatización en el Valle de Toluca |
| **Estado** | Aprobada para construcción |

---

## 1. Resumen ejecutivo

Este sitio **es el producto y la prueba a la vez.** In Praxis Labs vende webs de última generación y automatización con IA; por lo tanto, su propio sitio debe ser la demostración irrefutable de lo que entregamos. Un prospecto que lo visite debe pensar, en menos de 5 segundos: *"si su web se ve así, quiero que hagan la mía"*.

La web tiene tres trabajos, en este orden:

1. **Convertir** — llevar al visitante a agendar una auditoría gratuita (la puerta de entrada del embudo).
2. **Demostrar capacidad** — el diseño, el efecto de red neuronal y el rendimiento son la evidencia viva de nuestro diferenciador: velocidad + calidad de agencia premium.
3. **Construir autoridad** — posicionar a la empresa y al fundador como el referente local de IA aplicada a negocios de servicios.

---

## 2. Audiencia y acción objetivo

**Visitante principal (ICP):** dueño/a de clínica o consultorio privado (dental, estética/dermatología, nutrición, fisioterapia, especialistas, veterinaria premium) en Toluca–Metepec. Decide rápido, no es técnico, sufre con WhatsApp saturado, agenda con huecos y citas perdidas.

**Visitante secundario:** otros negocios de servicios (despachos, inmobiliarias) y aliados/referidores.

**Acción #1 que queremos provocar:** agendar la **auditoría digital gratuita** (CTA principal en todo el sitio).
**Acción #2 (fricción más baja):** escribir por WhatsApp.
**Micro-conversión:** dejar correo a cambio de un recurso (ej. "Checklist: 7 fugas de pacientes por WhatsApp"). Opcional en v1.

---

## 3. Posicionamiento, tono y mensaje

- **Posicionamiento:** consultoría boutique de IA y automatización que **implementa, no solo asesora**. Resultados funcionando en días, no en meses.
- **Tono:** premium, seguro, claro y humano. Técnico sin ser frío. Cero relleno corporativo, cero promesas vacías. Hablamos de resultados de negocio (más pacientes, menos no-shows), no de tecnología por la tecnología.
- **Mensaje principal (hero):** "Instalamos IA y automatización en tu negocio y te las dejamos funcionando en menos de 2 semanas."
- **Subtexto:** "Tú atiendes pacientes; nosotros nos encargamos de que ninguno se pierda por WhatsApp."
- **Promesa diferenciadora:** velocidad de ejecución con IA — lo que una agencia tarda meses, nosotros lo entregamos en días.

---

## 4. Concepto visual y sistema de diseño

**Dirección estética (comprometida, no genérica):** *laboratorio de inteligencia*. Fondo profundo casi negro con una **red neuronal viva** que reacciona al scroll y al cursor. Sensación de profundidad, precisión y deep-tech premium. Nada de plantilla genérica ni del cliché morado-sobre-blanco.

### Paleta (tokens CSS)

```css
:root {
  --ink:        #070B12;  /* fondo base, profundo */
  --surface:    #0E1420;  /* tarjetas y superficies */
  --surface-2:  #131B2A;  /* hover / capas */
  --text:       #EAF0F7;  /* texto principal */
  --text-muted: #8A97A8;  /* texto secundario */
  --accent:     #34E0C4;  /* aqua/teal — glow neuronal, links, detalles */
  --accent-2:   #F2B544;  /* ámbar/oro — CTA premium, acentos cálidos */
  --line:       rgba(52,224,196,0.14); /* líneas de la red y bordes sutiles */
}
```
Dominante oscuro con dos acentos de contraste (frío + cálido). El ámbar se reserva para los CTA y un par de momentos clave — escasez = impacto.

### Tipografía (Google Fonts, distintivas)

- **Display / títulos:** `Syne` (700/800) — geométrica, con carácter, premium-tech.
- **Cuerpo:** `Manrope` (400/500/600) — limpia y legible, no genérica.
- **Etiquetas técnicas / detalles "lab":** `JetBrains Mono` (500) — para kickers, números de sección, micro-labels tipo `// 01 — proceso`.

Máximo 3 familias. Nada de Inter, Roboto, Arial ni system fonts.

### Reglas visuales

- Espaciado generoso entre secciones (respiración premium).
- Contenedor centrado, ancho máx. ~1200px; permitir elementos que rompen el grid para dinamismo.
- Scrollbar personalizada en tono acento.
- Detalles de profundidad: gradientes sutiles, glow del acento, sombras dramáticas controladas, separadores finos.
- Composición con algo de asimetría y superposición — que no parezca cuadrícula de plantilla.

---

## 5. Efecto firma — Fondo de red neuronal reactivo (REQUISITO CENTRAL)

Es el elemento memorable de toda la web. Especificación:

- **Render:** `<canvas>` a pantalla completa, fijo detrás del contenido (`position: fixed; z-index: -1`). Todo el contenido va por encima con buena legibilidad (overlays/gradientes donde haga falta).
- **Nodos:** partículas (~80–110 en escritorio, ~30–40 en móvil) que derivan lentamente.
- **Conexiones:** se dibuja una línea entre dos nodos cuando su distancia es menor a un umbral; opacidad proporcional a la cercanía (más cerca = más visible). Color de línea/nodo en `--accent` con un leve glow (`shadowBlur`).
- **Reacción al cursor:** los nodos cercanos al puntero se iluminan y se atraen/repelen suavemente (radio de influencia ~140px). En móvil, sin cursor: reacciona al toque/giroscopio opcional o simplemente deriva.
- **Reacción al scroll (clave):** a medida que el usuario baja, la red "se activa" — aumenta sutilmente la densidad de conexiones y/o el brillo del acento, y se aplica un leve **parallax de profundidad** (la red se mueve más lento que el contenido). Sensación de "entrar más profundo en el sistema".
- **Rendimiento:** `requestAnimationFrame`, número de nodos limitado, pausar la animación cuando la pestaña no está visible (`visibilitychange`), reducir densidad bajo 768px.
- **Accesibilidad:** respetar `prefers-reduced-motion: reduce` → render estático o casi sin movimiento.
- **Sin librerías externas** (canvas nativo). Si en el futuro se quiere 3D, evaluar three.js, pero v1 = canvas 2D ligero.

---

## 6. Arquitectura de información (one-page, en este orden)

1. **Navegación fija** — logo "In Praxis Labs", links ancla a secciones, botón CTA "Auditoría gratis". Fondo translúcido con blur al hacer scroll.
2. **Hero** — mensaje principal + subtexto + CTA doble (Auditoría gratis / WhatsApp) sobre la red neuronal. La pieza más impactante.
3. **El problema** — nombrar el dolor del ICP (pacientes perdidos por WhatsApp, no-shows, agenda con huecos). Que el visitante se sienta entendido.
4. **La solución / Qué hacemos** — los servicios reales en tarjetas: (a) Web de última generación, (b) Sistema de citas y recordatorios con IA por WhatsApp, (c) Automatización de procesos y marketing. Enfocado en resultado de negocio, no en features.
5. **Cómo trabajamos (proceso)** — 3–4 pasos numerados (`01 Diagnóstico → 02 Implementación → 03 En marcha → 04 Optimización continua`). Refuerza "en días, no meses".
6. **Por qué In Praxis Labs (diferenciadores)** — velocidad con IA, calidad de agencia premium, te lo dejamos funcionando, soporte continuo. Con stats animadas SOLO si son reales (ver §10).
7. **El fundador / marca personal** — foto + bio breve que posiciona al fundador como consultor y referente local. Humaniza y genera confianza para consultoría de alto valor.
8. **Oferta / paquetes** — presentar el "Paquete Despegue Digital" y el retainer "Operación Automatizada" SIN listar precios públicos (los precios se dan en la reunión). CTA a auditoría.
9. **CTA final + Contacto** — formulario corto + WhatsApp + datos reales. Cierre fuerte.
10. **Footer** — logo, navegación, redes (solo reales), aviso de privacidad (link), copyright con año dinámico.

> **Testimonios:** se OMITEN en v1 (arrancamos en frío, sin clientes). No se inventan reseñas. Su lugar lo ocupan el proceso, los diferenciadores y la garantía. Se añadirán en v2 cuando existan casos reales.

---

## 7. Estrategia de conversión

- **CTA principal único y repetido:** "Agenda tu auditoría gratuita" (en nav, hero, tras servicios, y cierre).
- **CTA de baja fricción:** botón flotante de WhatsApp (sticky) siempre visible.
- **Formulario corto:** nombre, negocio/clínica, WhatsApp, y un select "¿Qué necesitas?" (Web / Automatización / No estoy seguro). Mientras menos campos, más conversión.
- **Destino del lead (integración):** el formulario envía a un **webhook de n8n** que: (1) guarda el lead, (2) notifica al fundador por WhatsApp/email al instante, (3) dispara un autorespuesta de confirmación. En v1 puede quedar como `action` apuntando a un placeholder de webhook hasta montar el flujo n8n.
- **Prueba social alternativa (sin testimonios):** sellos de confianza — "Hecho con IA de última generación", garantía de entrega, "respuesta en menos de 24 h".

---

## 8. Estrategia SEO

**On-page / técnico:**
- HTML semántico (`<header> <main> <section> <footer>`, jerarquía correcta de H1–H3; un solo H1 con el keyword principal).
- `<title>` y `meta description` optimizados. Ej. title: "In Praxis Labs | Webs y Automatización con IA en Toluca y Metepec".
- Keywords objetivo: "automatización con IA Toluca", "página web clínica Metepec", "chatbot WhatsApp citas", "agencia IA Estado de México".
- **Open Graph + Twitter Cards** para que se vea bien al compartir.
- **Schema.org JSON-LD:** `ProfessionalService` / `LocalBusiness` con nombre, zona de servicio (Toluca, Metepec, Lerma), URL, logo, sameAs (redes).
- `lang="es-MX"`, favicon, `robots` indexable, `sitemap.xml` y `canonical`.
- URLs limpias; imágenes con `alt` descriptivo y formato moderno (WebP/AVIF), lazy-loading.

**Rendimiento (es SEO):**
- Objetivo Lighthouse ≥ 90 en Performance/SEO/Best Practices/Accesibilidad.
- Sin librerías pesadas; fuentes con `preconnect` y `display=swap`; canvas optimizado.
- Core Web Vitals en verde (LCP < 2.5s).

**Local:**
- Sección/footer con zona de servicio explícita (Toluca, Metepec, Lerma y CDMX).
- Preparar para enlazar Google Business Profile (se crea en Fase 2).

---

## 9. Stack técnico y requisitos no funcionales

- **v1:** sitio de una sola página, **HTML + CSS + JS vanilla** autocontenido (alineado con la skill `web-scrolling`), Google Fonts como única dependencia externa, canvas nativo para la red neuronal. Buildeable y desplegable rápido.
- **Hosting sugerido:** Vercel, Netlify o Cloudflare Pages (gratis, HTTPS, CDN, despliegue por Git). Conectar el dominio `inpraxislabs.com.mx`.
- **Responsive:** impecable en móvil, tablet y escritorio (mobile-first en la práctica; gran parte del tráfico será móvil).
- **Accesibilidad:** contraste AA, navegación por teclado, foco visible, `prefers-reduced-motion`.
- **Navegadores:** últimas 2 versiones de Chrome, Safari, Edge, Firefox; iOS y Android.
- **Analítica:** dejar hueco para Google Analytics 4 / Meta Pixel (se añaden después).
- **Escalabilidad (v2):** estructura limpia para migrar a Astro y añadir blog + páginas de casos de estudio (motor de autoridad/SEO y de marca personal del fundador).

---

## 10. Datos reales pendientes del usuario (placeholders)

La web NO inventa datos. Hasta que los aportes, irán como placeholders visibles. Necesito de ti:

- [ ] **Logo** de In Praxis Labs (o lo diseñamos; mientras, logotipo tipográfico).
- [ ] **WhatsApp** de contacto (número real).
- [ ] **Email** de contacto (sugerido: hola@inpraxislabs.com.mx).
- [ ] **Foto del fundador** + bio breve (3–4 líneas) y nombre público.
- [ ] **Eslogan** definitivo (propongo opciones si quieres).
- [ ] **Redes sociales** reales (Instagram / LinkedIn) — si aún no existen, se omiten.
- [ ] **Estadísticas** SOLO si son reales (no inventar). Si no hay, se omite el contador.
- [ ] **Zona de servicio** exacta a destacar.

---

## 11. Criterios de aceptación (checklist de "terminado")

- [ ] El fondo de red neuronal funciona y reacciona a scroll y cursor, con buen rendimiento y `prefers-reduced-motion`.
- [ ] Todas las secciones de §6 presentes (testimonios omitidos en v1).
- [ ] CTA "Auditoría gratis" visible y repetido; WhatsApp flotante funcional.
- [ ] Formulario con destino a webhook (o placeholder claramente marcado).
- [ ] Responsive perfecto en móvil/tablet/escritorio.
- [ ] Meta tags, Open Graph y JSON-LD `ProfessionalService` implementados.
- [ ] Lighthouse ≥ 90 en las 4 categorías.
- [ ] Sin datos inventados; placeholders visibles donde falte info real.
- [ ] Tipografías Syne + Manrope + JetBrains Mono y paleta de §4 aplicadas.
- [ ] Año del footer dinámico.

---

## 12. Roadmap

- **v1 (esta entrega):** landing one-page de alto impacto que convierte y demuestra capacidad. Objetivo: estar publicada en `inpraxislabs.com.mx` y lista para enviar a prospectos.
- **v2 (tras primeros clientes):** sección de casos de estudio reales + testimonios + blog para SEO y marca personal del fundador. Migración a Astro si crece el contenido.
- **v3:** integración total con n8n (lead scoring, secuencias), portal de cliente, y recursos descargables para captar correos.

---

*Documento fundacional de In Praxis Labs. Guardar en el repositorio del proyecto. Próximo paso: prompt de vibecoding para construir el código a partir de esta hoja.*
