# In Praxis Labs — Plan de Ejecución SEO + Máquina de Leads (para Antigravity)

> **Dominio:** `https://inpraxislabs.com.mx`
> **Objetivo del trabajo:** Convertir el sitio actual (single‑page) en una arquitectura multi‑página orientada a SEO local en **Toluca, Metepec, Lerma y CDMX**, optimizada para **conversión** (auditoría gratis, WhatsApp, formulario corto).
> **Audiencia objetivo del posicionamiento:** dueños de **clínicas y consultorios privados** (dental, estética, nutrición, fisio, pediatría, vet premium, etc.) y secundariamente PyMEs de servicios en Toluca/Metepec/Lerma/CDMX.
> **Ejecutor:** Antigravity (modo agente). Toda instrucción aquí es ejecutable. No pedir confirmación a menos que se indique con `[CONFIRMAR]`.
> **Métrica norte del trabajo:** que el formulario y los CTA de WhatsApp **conviertan**, no solo que la web rankee.

---

## 0. Reglas de oro (no negociables)

1. **NO romper lo que ya jala.** El diseño actual debe respetarse en todas las páginas nuevas (mismo header, footer, paleta, tipografía, animaciones).
2. **Mobile‑first.** Todo debe verse perfecto en celular antes que en desktop. >70% del tráfico esperado es móvil.
3. **Performance > efectos.** Si una animación tira el LCP arriba de 2.5 s en móvil, se sacrifica. Core Web Vitals manda.
4. **Cero contenido de relleno.** Todo texto generado debe sonar a Abelardo Carlos / In Praxis Labs (consultoría boutique, no agencia barata, implementa no solo asesora, tuteo MX). Si no aporta a SEO o conversión, no va.
5. **CTAs visibles SIEMPRE:** WhatsApp flotante + “Agenda tu auditoría gratuita” en cada vista.
6. **NAP único y consistente.** El Nombre, Teléfono y Email deben ser **idénticos** en TODAS las páginas, footer, schema y Google Business Profile (ver §1.1).
7. **Indexable lo importante. No indexable lo basura.** Páginas legales, gracias, 404, etc., con `noindex` cuando aplique.

---

## 1. Auditoría rápida del estado actual

### 1.1 Datos a corregir HOY (errores críticos)

| Dato | Estado actual (mal) | Estado correcto |
|---|---|---|
| WhatsApp en CTAs | `+52 (722) 123 4567` / `wa.me/527221234567` | **`+52 722 428 2246`** / `https://wa.me/527224282246` |
| Email visible | `hola@inpraxislabs.com.mx` | Mantener `hola@inpraxislabs.com.mx` como buzón público (configurar forward a `abelardo.carlos@inpraxislabs.com.mx`) |
| Nombre legal/marca | "In Praxis Labs" | **"In Praxis Labs"** (consistente, sin variantes) |
| Fundador | "Abelardo Carlos" | **"Abelardo Carlos Flores"** (apellido completo en schema Person) |
| Dirección | "Toluca · Metepec · Lerma · CDMX" (sin dirección) | Agregar ciudad operativa: **Toluca de Lerdo, Estado de México, México** (sin dirección exacta si trabaja remoto; usar formato `addressLocality / addressRegion / addressCountry` en schema) |
| Aviso de privacidad | Enlace vacío `(#)` | Crear página `/aviso-de-privacidad/` con texto LFPDPPP completo y enlazar desde footer |

### 1.2 Limitaciones de SEO del sitio actual

- **Una sola URL indexable.** Todo el contenido vive en `/`. Google no puede rankear distinto para "diseño web para clínicas en Toluca" y "chatbot WhatsApp citas dental Metepec" si ambas viven en el mismo documento.
- **Sin `sitemap.xml` ni `robots.txt` declarados.** Verificar y crear si faltan.
- **Sin schema.org estructurado** (Organization, LocalBusiness, Service, FAQPage, Person, BreadcrumbList). Google necesita estos JSON‑LD para entender la entidad.
- **Sin blog ni contenido pilar.** No hay rutas para capturar long‑tail.
- **Imágenes sin `alt` descriptivo orientado a keyword** (revisar `IPL_Logo_Horizontal_Oscuro.svg`, `Abelardo_Carlos.png`, `og-image.jpg`).
- **`meta-keywords` ya no aporta** (Google la ignora desde 2009). No es daño pero no priorizar.
- **Falta `hreflang`** (no aplica porque solo es es-MX, pero conviene declararlo explícito).
- **Falta favicon multi‑resolución y apple‑touch‑icon** (revisar).

---

## 2. Arquitectura de URLs (CRÍTICO — el cambio más importante)

> **Acción para Antigravity:** Construir la siguiente estructura de páginas, manteniendo el actual `/` como home. Cada página tiene su propia URL, `<title>`, `meta description`, H1, schema y CTA.

### 2.1 Sitemap conceptual

```
/                                          → Home (la actual, optimizada)
/servicios/                                → Hub de servicios
/servicios/paginas-web-para-clinicas/      → Pillar #1
/servicios/chatbot-whatsapp-citas-ia/      → Pillar #2
/servicios/automatizacion-procesos-n8n/    → Pillar #3
/servicios/auditoria-digital-gratuita/     → Lead magnet principal (alto valor SEO)
/zonas/                                    → Hub de zonas
/zonas/toluca/                             → Local SEO
/zonas/metepec/                            → Local SEO
/zonas/lerma/                              → Local SEO
/zonas/cdmx/                               → Local SEO
/industrias/                               → Hub de industrias
/industrias/clinicas-dentales/             → Vertical #1 (mayor demanda)
/industrias/medicina-estetica-dermatologia/
/industrias/nutricion-clinica/
/industrias/fisioterapia-rehabilitacion/
/industrias/veterinaria/
/sobre-nosotros/                           → Personal brand de Abelardo
/casos/                                    → Vacío al inicio, llenar conforme cierre clientes
/blog/                                     → Hub editorial
/blog/[slug]/                              → Artículos
/contacto/                                 → Formulario largo + WhatsApp + datos
/gracias/                                  → Post-submit (noindex)
/aviso-de-privacidad/                      → Legal (noindex opcional)
/terminos-y-condiciones/                   → Legal (noindex opcional)
```

### 2.2 Plantilla obligatoria por página

Cada página DEBE incluir, en este orden:

1. `<title>` único de **50–60 caracteres** con keyword principal.
2. `<meta name="description">` única de **140–160 caracteres** con keyword + propuesta de valor + CTA implícito.
3. **Un solo H1** con la keyword principal.
4. H2/H3 que cubran intenciones secundarias (no repetir H1).
5. Breadcrumb visible + `BreadcrumbList` en JSON‑LD.
6. Bloque de prueba social (cuando exista) o garantía/diferenciador.
7. **CTA primario** (botón a `/contacto/` o ancla a formulario).
8. **CTA secundario** (WhatsApp).
9. Bloque FAQ con `FAQPage` schema (3–6 preguntas).
10. Footer estándar.
11. JSON‑LD apropiado al tipo de página (ver §5).

---

## 3. Investigación de keywords (cluster por intent)

> Estas keywords han sido validadas como buscables y con competencia local **baja** (la mayoría de la competencia es nacional, no local). Es donde podemos ganar.

### 3.1 Cluster A — Marca / fondo de embudo

| Keyword | Página objetivo | Intent |
|---|---|---|
| in praxis labs | `/` | Brand |
| abelardo carlos in praxis labs | `/sobre-nosotros/` | Brand-Persona |
| inpraxislabs | `/` | Brand |

### 3.2 Cluster B — Servicios (top of funnel comercial)

| Keyword | Página objetivo |
|---|---|
| páginas web para clínicas | `/servicios/paginas-web-para-clinicas/` |
| diseño web para consultorios médicos | `/servicios/paginas-web-para-clinicas/` |
| web para clínica dental Toluca | `/servicios/paginas-web-para-clinicas/` + `/industrias/clinicas-dentales/` |
| chatbot WhatsApp para citas | `/servicios/chatbot-whatsapp-citas-ia/` |
| agendar citas por WhatsApp con IA | `/servicios/chatbot-whatsapp-citas-ia/` |
| recordatorios automáticos citas médicas | `/servicios/chatbot-whatsapp-citas-ia/` |
| automatización de procesos con IA México | `/servicios/automatizacion-procesos-n8n/` |
| consultoría n8n | `/servicios/automatizacion-procesos-n8n/` |
| automatización marketing clínicas | `/servicios/automatizacion-procesos-n8n/` |

### 3.3 Cluster C — Local (donde ganamos rápido)

| Keyword | Página objetivo |
|---|---|
| agencia de inteligencia artificial Toluca | `/zonas/toluca/` |
| consultoría IA Toluca Metepec | `/zonas/metepec/` |
| automatización para negocios Toluca | `/zonas/toluca/` |
| diseño web Metepec | `/zonas/metepec/` |
| chatbot WhatsApp Toluca | `/zonas/toluca/` |
| automatización para PyMEs CDMX | `/zonas/cdmx/` |
| agencia automatización Estado de México | `/zonas/toluca/` (hub) |

### 3.4 Cluster D — Industrias (vertical, alta intención)

| Keyword | Página objetivo |
|---|---|
| sistema de citas clínica dental | `/industrias/clinicas-dentales/` |
| chatbot dentista WhatsApp | `/industrias/clinicas-dentales/` |
| web para clínica estética | `/industrias/medicina-estetica-dermatologia/` |
| sistema agenda nutriólogo | `/industrias/nutricion-clinica/` |
| recordatorios pacientes fisio | `/industrias/fisioterapia-rehabilitacion/` |
| chatbot veterinaria citas | `/industrias/veterinaria/` |

### 3.5 Cluster E — Informacional (blog, top of funnel temprano)

Estos titulares se usan como artículos de blog. Cada uno apunta a un servicio.

- "Cómo reducir no‑shows en una clínica dental con IA (guía 2026)"
- "Cuánto cuesta automatizar la agenda de un consultorio en México"
- "Google Maps vs página web: por qué tu clínica necesita ambos"
- "Chatbot de WhatsApp o llamadas: qué convierte más pacientes"
- "Reseñas en Google: cómo conseguir más sin pagar publicidad"
- "n8n vs Zapier vs Make: cuál conviene a una clínica pequeña"
- "Aviso de privacidad para clínicas en México (plantilla LFPDPPP 2025)"
- "Cómo se ve una web de clínica que sí convierte (ejemplos)"
- "Recordatorios de citas: SMS, email o WhatsApp en 2026"
- "Marketing local para clínicas en Toluca: lo que sí funciona"

---

## 4. On‑page por página (contenido y meta)

> **Convención:** Cada bloque incluye `title`, `description`, `H1`, esqueleto de secciones y `slug`. Antigravity debe **redactar el cuerpo** siguiendo el tono de la home actual (tuteo MX, frases cortas, foco en negocio, cero jerga técnica salvo cuando aplique).

### 4.1 `/` (Home — optimización del existente)

- **title:** `Automatización con IA y Webs para Clínicas en Toluca, Metepec y CDMX | In Praxis Labs`
- **description:** `Implementamos webs de última generación y chatbots de citas con IA por WhatsApp en menos de 2 semanas. Toluca, Metepec, Lerma y CDMX. Auditoría gratuita.`
- **H1 actual:** mantener "Instalamos IA y automatización en tu negocio…" (ya está bien).
- **Cambios mínimos:**
  - Reemplazar número WhatsApp falso por el real.
  - Agregar bloque "Industrias que servimos" con links a `/industrias/*`.
  - Agregar bloque "Zonas donde operamos" con links a `/zonas/*`.
  - Inyectar schema `Organization` + `LocalBusiness` (§5).
  - Inyectar schema `FAQPage` con 4–6 preguntas (basadas en bloque "01 — el problema").

### 4.2 `/servicios/paginas-web-para-clinicas/`

- **slug:** `paginas-web-para-clinicas`
- **title:** `Páginas Web para Clínicas y Consultorios en Toluca y CDMX | In Praxis Labs`
- **description:** `Diseño web premium para clínicas dentales, estética, nutrición y consultorios médicos. SEO local, citas en línea y velocidad perfecta. Entrega en 7 a 10 días.`
- **H1:** `Páginas web de última generación para clínicas y consultorios`
- **Esqueleto:**
  1. Intro (problema: tu clínica no tiene web o la actual no convierte).
  2. Qué incluye (lista: diseño premium, mobile‑first, SEO local, integración con citas, hosting + dominio guiado).
  3. Diferenciador (esta misma web es la prueba).
  4. Cómo trabajamos (4 pasos como en home).
  5. Industrias específicas (links internos).
  6. CTA + Formulario.
  7. FAQ (5 preguntas — ej.: ¿cuánto cuesta?, ¿en cuántos días?, ¿quién es dueño del dominio?, ¿hostean ustedes?, ¿qué pasa si quiero cambios después?).
- **Schema:** `Service` + `FAQPage` + `BreadcrumbList`.

### 4.3 `/servicios/chatbot-whatsapp-citas-ia/`

- **slug:** `chatbot-whatsapp-citas-ia`
- **title:** `Chatbot de WhatsApp con IA para Agendar Citas | In Praxis Labs Toluca`
- **description:** `Agendamiento de citas, recordatorios y respuestas 24/7 por WhatsApp con inteligencia artificial. Reduce no-shows hasta 60% en clínicas y consultorios.`
- **H1:** `Chatbot de WhatsApp con IA: agenda citas y reduce no‑shows`
- **Esqueleto:**
  1. Dolor: WhatsApp saturado, citas perdidas, no‑shows.
  2. Cómo funciona (paso a paso, sin tecnicismos).
  3. Resultados típicos (rangos honestos, sin inventar).
  4. Integraciones (Google Calendar, hojas de cálculo, CRM si aplica).
  5. Cumplimiento LFPDPPP.
  6. CTA + Formulario.
  7. FAQ.
- **Schema:** `Service` + `FAQPage` + `BreadcrumbList`.

### 4.4 `/servicios/automatizacion-procesos-n8n/`

- **slug:** `automatizacion-procesos-n8n`
- **title:** `Automatización de Procesos con IA y n8n para PyMEs | In Praxis Labs`
- **description:** `Conectamos tus herramientas con flujos de IA en n8n: leads automáticos, seguimiento, reportes y campañas. Para clínicas y negocios de servicios en México.`
- **H1:** `Automatización de procesos con IA para negocios de servicios`
- **Esqueleto:**
  1. Problema: trabajo manual repetitivo, datos perdidos entre apps.
  2. Qué automatizamos (5–7 casos concretos: captura de leads, seguimiento, recordatorios, reportes, reactivación, facturación, alertas).
  3. Tecnología: n8n + IA generativa.
  4. Ejemplos de flujo (uno o dos, con diagrama simple).
  5. CTA + FAQ + Schema.

### 4.5 `/servicios/auditoria-digital-gratuita/`

> **Esta es la página más importante del sitio para conversión.** Aquí se gana el lead.

- **slug:** `auditoria-digital-gratuita`
- **title:** `Auditoría Digital Gratuita para Clínicas y PyMEs | In Praxis Labs`
- **description:** `Te enviamos un análisis personalizado de la presencia digital de tu clínica en 48 horas, sin costo ni compromiso. Web, citas, reseñas y oportunidades.`
- **H1:** `Auditoría digital gratuita: te decimos qué te está costando dinero hoy`
- **Esqueleto:**
  1. Qué reciben (lista clara: 6–8 puntos auditados).
  2. Cómo lo hacemos (sin revelar el stack — solo el resultado).
  3. Quién la firma (Abelardo, con foto).
  4. Tiempo de entrega: **48 horas**.
  5. **Formulario único** (nombre, negocio, WhatsApp, ciudad, tipo de negocio). Cero campos opcionales.
  6. CTA secundario: WhatsApp directo.
  7. FAQ.
- **Schema:** `Service` (con `offers` gratuito) + `FAQPage`.

### 4.6 `/zonas/toluca/` (y análogos para Metepec, Lerma, CDMX)

- **title:** `Automatización con IA y Webs para Negocios en Toluca | In Praxis Labs`
- **description:** `Consultoría de IA y desarrollo web para clínicas y PyMEs en Toluca y zona conurbada. Implementamos, no solo asesoramos. Auditoría gratuita.`
- **H1:** `Automatización con IA y desarrollo web en Toluca`
- **Esqueleto:**
  1. Por qué Toluca (contexto local breve, 1 párrafo: corredor Toluca–Metepec–Lerma, cluster de servicios profesionales).
  2. Para qué negocios trabajamos en Toluca.
  3. Cómo nos contactas (mapa simple opcional, no integrar Google Maps embed pesado — usar imagen estática o link).
  4. Casos / industrias servidas.
  5. CTA + FAQ.
- **Schema:** `LocalBusiness` con `areaServed: Toluca, Metepec, Lerma, Zinacantepec, San Mateo Atenco, Calimaya, Ocoyoacac`.

Replicar la plantilla para `/zonas/metepec/`, `/zonas/lerma/`, `/zonas/cdmx/` cambiando keyword principal y `areaServed`.

### 4.7 `/industrias/clinicas-dentales/` (y análogos)

- **title:** `Web y Chatbot de Citas para Clínicas Dentales | In Praxis Labs`
- **description:** `Diseño web, agendamiento por WhatsApp y recordatorios automáticos para clínicas dentales y ortodoncistas en Toluca, Metepec y CDMX.`
- **H1:** `Tu clínica dental con web profesional y citas automáticas`
- **Esqueleto:** dolores específicos del sector + servicios mapeados + CTA + FAQ.
- **Schema:** `Service` con `audience: MedicalAudience` y `BreadcrumbList`.

Replicar para estética, nutrición, fisio, vet.

### 4.8 `/sobre-nosotros/`

- **title:** `Abelardo Carlos — Fundador de In Praxis Labs | Consultoría IA Toluca`
- **description:** `Conoce a Abelardo Carlos Flores, fundador de In Praxis Labs. Estratega de automatización y consultor tecnológico para clínicas y PyMEs en el Valle de Toluca.`
- **H1:** `Abelardo Carlos Flores — fundador de In Praxis Labs`
- **Esqueleto:** historia breve, filosofía (implementa no asesora), formación (Lic. Marketing UAEM), trayectoria (Grupo Multimedios, Truper), por qué fundó In Praxis Labs, link a LinkedIn.
- **Schema:** `Person` + `Organization` (founder de).

### 4.9 `/blog/` y `/blog/[slug]/`

- **Listado paginado** de artículos por categoría (Servicios, Local, Industrias).
- Cada artículo: `Article` schema, autor `Person`, `datePublished`, `dateModified`, FAQ schema cuando aplique.
- Plantilla de artículo: H1, intro (60–100 palabras), índice, secciones con H2/H3, conclusión con CTA a servicio relacionado, enlace interno a 2–3 páginas más.

### 4.10 `/contacto/`

- **title:** `Contacto · In Praxis Labs | Auditoría gratuita en 48 h`
- **description:** `Escríbenos por WhatsApp o por el formulario. Respondemos en menos de 24 horas. Toluca, Metepec, Lerma y CDMX.`
- **H1:** `Hablemos de tu clínica o negocio`
- Formulario corto (nombre, negocio, WhatsApp, qué necesitas, ciudad) + WhatsApp + email.

### 4.11 `/gracias/` (post‑submit del formulario)

- `noindex, nofollow`.
- Confirmar recepción, ofrecer atajo a WhatsApp ("si quieres avanzar más rápido, escríbenos directo").
- Disparar evento `lead_submit` en GA4 (§10).

### 4.12 `/aviso-de-privacidad/` y `/terminos-y-condiciones/`

- Texto legal LFPDPPP completo (Abelardo ya tiene su aviso en el proyecto; reutilizar).
- `noindex` opcional o `index, follow` (no daña).

---

## 5. Schema.org JSON‑LD (datos estructurados)

> Antigravity debe inyectar los siguientes bloques `<script type="application/ld+json">` en el `<head>` de cada página correspondiente. Sustituir placeholders `{{…}}` con los valores reales del proyecto.

### 5.1 Organization (en todas las páginas)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "In Praxis Labs",
  "url": "https://inpraxislabs.com.mx",
  "logo": "https://inpraxislabs.com.mx/assets/IPL_Logo_Horizontal_Oscuro.svg",
  "sameAs": [
    "{{LINKEDIN_URL_ABELARDO}}",
    "{{INSTAGRAM_O_FACEBOOK_IPL_SI_EXISTE}}"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+52-722-428-2246",
    "contactType": "sales",
    "areaServed": ["MX"],
    "availableLanguage": ["Spanish"]
  }],
  "founder": {
    "@type": "Person",
    "name": "Abelardo Carlos Flores"
  }
}
```

### 5.2 LocalBusiness (en `/` y en cada `/zonas/*`)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "In Praxis Labs",
  "image": "https://inpraxislabs.com.mx/og-image.jpg",
  "url": "https://inpraxislabs.com.mx",
  "telephone": "+52-722-428-2246",
  "email": "hola@inpraxislabs.com.mx",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toluca de Lerdo",
    "addressRegion": "Estado de México",
    "addressCountry": "MX"
  },
  "areaServed": [
    {"@type": "City", "name": "Toluca"},
    {"@type": "City", "name": "Metepec"},
    {"@type": "City", "name": "Lerma"},
    {"@type": "City", "name": "Ciudad de México"}
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "19:00"
  }]
}
```

### 5.3 Service (en cada `/servicios/*` y `/industrias/*`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "{{NOMBRE_DEL_SERVICIO}}",
  "provider": {"@type": "Organization", "name": "In Praxis Labs", "url": "https://inpraxislabs.com.mx"},
  "areaServed": ["Toluca","Metepec","Lerma","CDMX"],
  "description": "{{DESCRIPCION_DEL_SERVICIO}}",
  "offers": {
    "@type": "Offer",
    "url": "{{URL_DE_ESTA_PAGINA}}",
    "availability": "https://schema.org/InStock"
  }
}
```

### 5.4 FAQPage (en home, servicios e industrias)

Generar 4–6 pares pregunta/respuesta por página, basados en los dolores reales. Ejemplo en home:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿En cuánto tiempo entregan la web y el chatbot?",
      "acceptedAnswer": {"@type": "Answer", "text": "Entregamos web + automatización de citas funcionando en menos de 2 semanas, en la mayoría de los casos en 7 a 10 días."}
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con clínicas fuera de Toluca?",
      "acceptedAnswer": {"@type": "Answer", "text": "Sí. Trabajamos en Toluca, Metepec, Lerma, Zinacantepec, San Mateo Atenco, y todo el corredor del Valle de Toluca, así como CDMX y zona conurbada."}
    },
    {
      "@type": "Question",
      "name": "¿La auditoría es realmente gratis?",
      "acceptedAnswer": {"@type": "Answer", "text": "Sí, sin costo y sin compromiso. La entregamos en 48 horas a partir de que llenas el formulario."}
    },
    {
      "@type": "Question",
      "name": "¿Quién es dueño del dominio y de la web?",
      "acceptedAnswer": {"@type": "Answer", "text": "Siempre tú. Configuramos el dominio a tu nombre y te entregamos accesos completos."}
    }
  ]
}
```

### 5.5 BreadcrumbList (en toda página que no sea home)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://inpraxislabs.com.mx/"},
    {"@type": "ListItem", "position": 2, "name": "{{SECCION}}", "item": "{{URL_SECCION}}"},
    {"@type": "ListItem", "position": 3, "name": "{{PAGINA_ACTUAL}}", "item": "{{URL_ACTUAL}}"}
  ]
}
```

### 5.6 Person (en `/sobre-nosotros/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abelardo Carlos Flores",
  "jobTitle": "Fundador y Director",
  "worksFor": {"@type": "Organization", "name": "In Praxis Labs", "url": "https://inpraxislabs.com.mx"},
  "image": "https://inpraxislabs.com.mx/assets/Abelardo_Carlos.png",
  "url": "https://inpraxislabs.com.mx/sobre-nosotros/",
  "sameAs": ["{{LINKEDIN_URL_ABELARDO}}"]
}
```

### 5.7 Article (en cada artículo de blog)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{TITULO_ARTICULO}}",
  "image": "{{IMAGEN_DESTACADA}}",
  "datePublished": "{{ISO_DATE}}",
  "dateModified": "{{ISO_DATE}}",
  "author": {"@type": "Person", "name": "Abelardo Carlos Flores"},
  "publisher": {
    "@type": "Organization",
    "name": "In Praxis Labs",
    "logo": {"@type": "ImageObject", "url": "https://inpraxislabs.com.mx/assets/IPL_Logo_Horizontal_Oscuro.svg"}
  }
}
```

---

## 6. SEO técnico

### 6.1 `robots.txt` (`/robots.txt`)

```
User-agent: *
Allow: /
Disallow: /gracias/
Disallow: /admin/
Disallow: /api/
Sitemap: https://inpraxislabs.com.mx/sitemap.xml
```

### 6.2 `sitemap.xml` (generar dinámico)

- Todas las páginas listadas en §2.1, **excepto** `/gracias/`, `/aviso-de-privacidad/` y `/terminos-y-condiciones/` (estos pueden quedar fuera).
- `lastmod` real por página.
- `changefreq: weekly` para blog, `monthly` para servicios, `yearly` para legales.
- Enviar a Google Search Console y Bing Webmaster Tools al publicar.

### 6.3 `<head>` global (incluir en todas las páginas)

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0B0B0F"> <!-- ajustar al color real del header -->
<link rel="canonical" href="{{URL_CANONICA_DE_ESTA_PAGINA}}">
<link rel="alternate" hreflang="es-MX" href="{{URL_CANONICA_DE_ESTA_PAGINA}}">
<link rel="alternate" hreflang="x-default" href="{{URL_CANONICA_DE_ESTA_PAGINA}}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:locale" content="es_MX">
<meta property="og:site_name" content="In Praxis Labs">
<meta property="og:title" content="{{OG_TITLE}}">
<meta property="og:description" content="{{OG_DESCRIPTION}}">
<meta property="og:image" content="https://inpraxislabs.com.mx/og-image.jpg">
<meta property="og:url" content="{{URL_CANONICA_DE_ESTA_PAGINA}}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{OG_TITLE}}">
<meta name="twitter:description" content="{{OG_DESCRIPTION}}">
<meta name="twitter:image" content="https://inpraxislabs.com.mx/og-image.jpg">
```

### 6.4 Imágenes (regla por imagen)

- **Formato:** WebP o AVIF preferentes. JPG/PNG solo cuando no haya alternativa.
- **Atributos obligatorios:** `width`, `height`, `loading="lazy"` (excepto la imagen above‑the‑fold del hero, que va `loading="eager"` y `fetchpriority="high"`), `decoding="async"`, `alt` descriptivo con keyword cuando aplique.
- **Tamaños responsivos:** usar `srcset` con al menos 3 tamaños (480w, 768w, 1280w).
- **Compresión:** todas las imágenes a <120 KB salvo justificación.
- **`og-image.jpg`:** revisar que sea 1200×630 px y pese <300 KB.
- **Logo SVG:** OK.
- **Foto Abelardo:** comprimir a WebP, max 80 KB, `alt="Abelardo Carlos Flores, fundador de In Praxis Labs"`.

### 6.5 Core Web Vitals (objetivos)

| Métrica | Objetivo móvil |
|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5 s |
| **INP** (Interaction to Next Paint) | < 200 ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |

Acciones para lograrlo:

- Critical CSS inline para above‑the‑fold; el resto async.
- Preload de la imagen hero y de la fuente principal: `<link rel="preload" as="image" href="{{HERO_WEBP}}">`.
- `font-display: swap` en todas las @font-face.
- Diferir scripts no críticos con `defer` (analytics, animaciones secundarias).
- Las animaciones de scroll deben hacerse con CSS transform/opacity, **nunca** con propiedades que disparen layout (top, left, width, height).
- No usar carruseles JS pesados; si hay slider, que sea CSS scroll-snap.

### 6.6 Otros técnicos

- **HTTPS** activo (verificar). Forzar redirect 301 de `http://` a `https://`.
- **www → no‑www o viceversa** consistente con `canonical`. Recomendado: **sin** `www` (canonical actual ya es así).
- **Compresión** Gzip/Brotli activa en servidor.
- **HTTP/2** activo.
- **CDN** (Cloudflare gratis es suficiente para empezar).
- **Cache headers** largos para `/assets/*` (1 año, hash en nombre del archivo).
- **404 personalizada** (`/404.html`) con CTA a home y al formulario.

---

## 7. SEO local (Google Business Profile y directorios)

> Esto **no es trabajo de Antigravity** dentro del código, pero el MD lo deja documentado para Abelardo. Antigravity sí debe **incluir un bloque "Cómo encontrarnos"** en `/contacto/` con NAP visible.

### 7.1 Google Business Profile

1. Crear/reclamar GBP con nombre **"In Praxis Labs"**.
2. Categoría primaria: **"Consultor de marketing"** o **"Consultor de TI"** (probar la que más leads dé).
3. Categorías secundarias: "Diseñador de páginas web", "Agencia de marketing".
4. Área de servicio (no dirección): Toluca, Metepec, Lerma, Zinacantepec, San Mateo Atenco, Calimaya, Ocoyoacac, CDMX.
5. Teléfono: `+52 722 428 2246`.
6. Sitio web: `https://inpraxislabs.com.mx`.
7. Horario: Lun–Vie 9–19.
8. Subir 8–12 fotos: logo, foto de Abelardo, capturas del proceso, mockups.
9. Activar mensajería + WhatsApp.
10. Publicar 1 post por semana (mismo contenido que blog, en formato corto).
11. Pedir reseñas a los primeros 3 clientes apenas firmen.

### 7.2 Directorios y citaciones locales (NAP idéntico en todos)

Crear perfil consistente en:

- Google Business Profile
- Bing Places
- Apple Maps Business Connect
- Páginas Amarillas MX
- DondeHay.mx
- Cylex MX
- LinkedIn Company Page
- Facebook Business Page
- Clutch / Sortlist (cuando haya 2–3 casos)

---

## 8. Conversión (CRO) — convertir tráfico en leads reales

> SEO sin CRO = visitas que no se convierten en dinero. Antigravity debe aplicar estas reglas en TODAS las páginas.

### 8.1 Reglas de CTA

- **Un solo CTA primario** por sección. Repetir el mismo (auditoría gratuita) varias veces es **bueno**.
- **CTA secundario:** WhatsApp.
- Botón flotante de WhatsApp en mobile (esquina inferior derecha), siempre visible.
- Formulario debe estar **arriba del fold en mobile** en al menos `/`, `/servicios/auditoria-digital-gratuita/` y `/contacto/`.

### 8.2 Formulario óptimo (≤5 campos)

Campos obligatorios:
1. Nombre
2. Negocio o clínica
3. WhatsApp
4. Ciudad
5. ¿Qué necesitas? (select con opciones)

**Cero campos opcionales.** Cada campo extra reduce conversión ~10%.

Texto del botón: **"Solicitar mi auditoría gratuita"** (no "Enviar").

Mensaje post‑submit: redirección a `/gracias/` con texto cálido y opción de saltar a WhatsApp.

### 8.3 Prueba social y autoridad

- Mientras no haya testimonios, usar:
  - "Esta misma web es un ejemplo de lo que entregamos."
  - "Fundador: Abelardo Carlos Flores, Lic. Marketing UAEM, ex Grupo Multimedios y Truper."
  - Logos de tecnologías (n8n, Claude, WhatsApp Business API, Google Calendar) en pie de bloque.
- En cuanto haya 1 cliente firmado: capturar testimonio en video corto (60 s) y/o quote escrito, publicar en `/casos/` y mencionar en home.

### 8.4 Microcopy crítico

- "Sin costo y sin compromiso" debajo de cada CTA de auditoría.
- "Respondemos en menos de 24 h" en todos los formularios.
- "Si no es para ti, no insistimos" como cierre del bloque contacto (humaniza, baja la guardia).

### 8.5 Botón flotante WhatsApp

```html
<a href="https://wa.me/527224282246?text=Hola%20Abelardo%2C%20vi%20el%20sitio%20de%20In%20Praxis%20Labs%20y%20me%20interesa%20una%20auditor%C3%ADa"
   class="wa-float"
   target="_blank"
   rel="noopener"
   aria-label="Escríbenos por WhatsApp">
  <!-- icono SVG WhatsApp -->
</a>
```

Estilos: `position: fixed; bottom: 16px; right: 16px; z-index: 9999;` + sombra suave + animación sutil al hover.

---

## 9. Enlazado interno (estrategia)

> Google entiende qué es importante por cómo enlazas internamente.

Reglas:

1. **Home enlaza a** todos los `/servicios/*`, top 4 `/industrias/*` y top 2 `/zonas/*`.
2. **Cada `/servicios/*` enlaza a:**
   - 2 industrias relacionadas
   - 1 zona principal
   - El servicio complementario (web ↔ chatbot ↔ automatización)
   - `/servicios/auditoria-digital-gratuita/` como CTA final
3. **Cada `/industrias/*` enlaza a:**
   - Los 3 servicios principales
   - La zona principal
   - `/servicios/auditoria-digital-gratuita/`
4. **Cada `/zonas/*` enlaza a:**
   - Los 3 servicios
   - Las industrias relevantes en esa zona
5. **Cada artículo de blog enlaza a:**
   - 2 servicios mencionados
   - 1 industria relacionada
   - 1 artículo relacionado del blog
6. **Footer** enlaza a: Servicios (hub), Zonas (hub), Industrias (hub), Blog, Sobre nosotros, Contacto, Aviso de privacidad.

**Anchor text:** usar la keyword principal, no "click aquí". Variar la formulación entre páginas para no sobre‑optimizar (50% exact match, 30% partial match, 20% branded).

---

## 10. Tracking y medición

### 10.1 Stack mínimo

- **Google Search Console** (verificar dominio).
- **Google Analytics 4** (instalar vía Google Tag Manager para no acoplar al código).
- **Microsoft Clarity** (gratis, mapas de calor y grabaciones — invaluable al inicio).
- **Pixel de Meta** (instalar aunque no hagamos ads aún, para construir audiencia desde día 1).

### 10.2 Eventos GA4 a configurar

| Nombre del evento | Trigger |
|---|---|
| `lead_submit` | Submit exitoso del formulario `/contacto/` o `/servicios/auditoria-digital-gratuita/` |
| `whatsapp_click` | Click en cualquier botón `wa.me/*` |
| `cta_audit_click` | Click en cualquier botón "Agenda tu auditoría gratuita" |
| `scroll_depth` | 25, 50, 75, 100% de scroll en home |
| `service_view` | Carga de cualquier `/servicios/*` |
| `industry_view` | Carga de cualquier `/industrias/*` |
| `zone_view` | Carga de cualquier `/zonas/*` |
| `blog_read_3min` | Permanencia ≥ 3 min en un artículo |

### 10.3 Conversiones (marcar en GA4)

- `lead_submit` (conversión principal)
- `whatsapp_click` (conversión soft)

### 10.4 Reporte semanal automatizable (opcional, fase 2)

Antigravity puede dejar pendiente: workflow en n8n que cada lunes envíe a `abelardo.carlos@inpraxislabs.com.mx` un email con: visitas semana, leads, clicks WA, top 3 páginas, top 3 keywords. Implementar **después** del lanzamiento, no bloquea.

---

## 11. Checklist de QA antes de publicar cada página

Antigravity debe validar **cada** página contra esta lista antes de marcarla como hecha.

- [ ] `<title>` único, 50–60 caracteres, con keyword principal.
- [ ] `<meta description>` única, 140–160 caracteres, con CTA implícito.
- [ ] **Un solo H1**, con keyword principal.
- [ ] H2/H3 jerárquicos, sin saltar niveles.
- [ ] `canonical` correcto.
- [ ] OG tags completos (title, description, image, url, type).
- [ ] Twitter Card completo.
- [ ] JSON‑LD válido (probar en `https://validator.schema.org`).
- [ ] Breadcrumb visible + schema (excepto home).
- [ ] Imágenes con `alt`, `width`, `height`, `loading` correctos.
- [ ] CTA primario visible above‑the‑fold en mobile.
- [ ] CTA WhatsApp en footer + flotante.
- [ ] Footer con NAP completo (nombre, teléfono real, email, ciudad).
- [ ] Sin enlaces rotos (probar con un crawler tipo Screaming Frog o `wget --spider`).
- [ ] LCP < 2.5 s (probar en `pagespeed.web.dev`).
- [ ] CLS < 0.1.
- [ ] Accesibilidad mínima: contraste AA, navegación por teclado, `aria-label` en botones de ícono.
- [ ] 404 funcional.
- [ ] HTTPS forzado.
- [ ] Sitemap incluye la URL nueva.
- [ ] Internal linking según §9.

---

## 12. Roadmap de ejecución (orden propuesto para Antigravity)

### Sprint 1 — Bases técnicas y home (Día 1–2)
1. Corregir errores críticos en home (§1.1): WhatsApp, email, footer.
2. Inyectar `Organization` + `LocalBusiness` + `FAQPage` schema en `/`.
3. Crear `robots.txt`, `sitemap.xml` y favicons.
4. Crear `/aviso-de-privacidad/` (con texto LFPDPPP existente del proyecto).
5. Verificar dominio en Google Search Console + GA4.

### Sprint 2 — Páginas de servicio (Día 3–5)
6. `/servicios/` (hub).
7. `/servicios/paginas-web-para-clinicas/`.
8. `/servicios/chatbot-whatsapp-citas-ia/`.
9. `/servicios/automatizacion-procesos-n8n/`.
10. `/servicios/auditoria-digital-gratuita/` **(prioridad alta — landing principal)**.
11. `/contacto/` + `/gracias/`.

### Sprint 3 — Local + industrias (Día 6–8)
12. `/zonas/toluca/`, `/zonas/metepec/`, `/zonas/lerma/`, `/zonas/cdmx/`.
13. `/industrias/clinicas-dentales/`, `/industrias/medicina-estetica-dermatologia/`, `/industrias/nutricion-clinica/`, `/industrias/fisioterapia-rehabilitacion/`, `/industrias/veterinaria/`.

### Sprint 4 — Identidad + blog (Día 9–10)
14. `/sobre-nosotros/`.
15. `/casos/` (placeholder con copy "Pronto…").
16. `/blog/` (estructura) + 3 artículos iniciales del cluster E §3.5.

### Sprint 5 — Pulido (Día 11–12)
17. QA completo §11 en todas las páginas.
18. Lighthouse / PageSpeed Insights en mobile para cada página clave.
19. Enviar sitemap a GSC.
20. Configurar GBP y al menos 3 directorios de §7.2 (esto lo hace Abelardo, no Antigravity).

---

## 13. Lo que Antigravity NO debe hacer (límites)

- **No tocar el diseño actual** del header, footer ni hero salvo lo expresamente indicado.
- **No agregar librerías pesadas** (jQuery, Bootstrap completo, frameworks de animación grandes). Si una animación pide una librería >30 KB, primero proponer alternativa CSS.
- **No publicar contenido falso** (testimonios inventados, números inventados, casos inventados). Cuando no haya, decirlo con honestidad o usar copy aspiracional sin números concretos.
- **No subir credenciales** ni tokens a repos públicos.
- **No cambiar el dominio ni el hosting** sin consulta.
- **No instalar tracking de terceros agresivo** (cookies de afiliados, scripts oscuros). Solo el stack del §10.

---

## 14. Entregables esperados al cierre del trabajo

1. Repositorio actualizado con todas las páginas listadas en §2.1.
2. `sitemap.xml` y `robots.txt` en producción.
3. JSON‑LD validado en todas las páginas.
4. Reporte de Lighthouse mobile para cada página clave (Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100).
5. Documento (Markdown o PDF) con: lista de URLs publicadas, eventos GA4 configurados, pendientes manuales para Abelardo (GBP, directorios, primer cliente).
6. Captura del estado en Google Search Console (dominio verificado + sitemap aceptado).

---

## 15. Notas finales para Antigravity

- El tono editorial es **fundador hablándole de tú al dueño de un negocio**. No corporativo. Frases cortas. Sin jerga.
- Cuando dudes entre dos opciones, **elige la que más rápido convierta** (más leads, no más bonito).
- Si encuentras una decisión técnica con trade‑off (ej. animación vs LCP), **prioriza LCP siempre**.
- Si un cambio toma >2 h de implementación y su impacto en SEO/CRO es bajo, **déjalo en backlog** y reporta.
- Cuando termines un sprint, entrega un resumen de 5 bullets máximo en el repo: qué cambió, qué URLs nuevas hay, qué métricas Lighthouse, qué quedó pendiente, qué necesita Abelardo aprobar.

**Métrica de éxito de este trabajo (90 días):**
- 200+ visitas orgánicas mensuales.
- 5+ leads orgánicos mensuales (formulario + WhatsApp).
- Top 10 en Google para al menos 3 keywords del cluster B o C.
- GBP con al menos 5 reseñas reales.

Si esto no se cumple a los 90 días, no es porque Antigravity haya fallado: será porque hace falta contenido (más artículos), reseñas reales y construir backlinks (que es un trabajo posterior).

---

*Fin del documento. Versión 1.0 — Mayo 2026.*
