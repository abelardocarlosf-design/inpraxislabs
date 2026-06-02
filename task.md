# Lista de Tareas — Implementación SEO + CRO (In Praxis Labs)

- `[x]` **Fase 1: Preparación y Optimización de la Home (Sprint 1)**
  - `[x]` Extraer estilos en línea de `index.html` a un nuevo archivo global `/style.css`
  - `[x]` Corregir datos NAP críticos en `index.html` (WhatsApp: `+52 722 428 2246`, enlaces wa.me reales, email y nombre completo del fundador "Abelardo Carlos Flores")
  - `[x]` Adaptar referencias a recursos en `index.html` usando rutas root-relatives (`/Logo/...`, `/Abelardo_Carlos.png`, `/style.css`)
  - `[x]` Agregar secciones de enlaces internos en `index.html` hacia servicios, industrias y zonas
  - `[x]` Inyectar esquemas JSON-LD en `index.html` (`Organization` + `LocalBusiness` + `FAQPage`)
  - `[x]` Crear `/robots.txt` y `/sitemap.xml` base
  - `[x]` Crear la página de Aviso de Privacidad (`/aviso-de-privacidad/index.html`)

- `[x]` **Fase 2: Páginas de Servicio (Sprint 2)**
  - `[x]` Crear `/servicios/index.html` (Hub de Servicios)
  - `[x]` Crear `/servicios/paginas-web-para-clinicas/index.html` (Pilar #1)
  - `[x]` Crear `/servicios/chatbot-whatsapp-citas-ia/index.html` (Pilar #2)
  - `[x]` Crear `/servicios/automatizacion-procesos-n8n/index.html` (Pilar #3)
  - `[x]` Crear `/servicios/auditoria-digital-gratuita/index.html` (Lead Magnet Principal - Alta Conversión)
  - `[x]` Crear `/contacto/index.html` y `/gracias/index.html`

- `[x]` **Fase 3: SEO Local e Industrias (Sprint 3)**
  - `[x]` Crear `/zonas/index.html` (Hub de Zonas)
  - `[x]` Crear `/zonas/toluca/index.html`
  - `[x]` Crear `/zonas/metepec/index.html`
  - `[x]` Crear `/zonas/lerma/index.html`
  - `[x]` Crear `/zonas/cdmx/index.html`
  - `[x]` Crear `/industrias/index.html` (Hub de Industrias)
  - `[x]` Crear `/industrias/clinicas-dentales/index.html`
  - `[x]` Crear `/industrias/medicina-estetica-dermatologia/index.html`
  - `[x]` Crear `/industrias/nutricion-clinica/index.html`
  - `[x]` Crear `/industrias/fisioterapia-rehabilitacion/index.html`
  - `[x]` Crear `/industrias/veterinaria/index.html`

- `[x]` **Fase 4: Identidad, Casos y Blog (Sprint 4)**
  - `[x]` Crear `/sobre-nosotros/index.html`
  - `[x]` Crear `/casos/index.html`
  - `[x]` Crear `/blog/index.html`
  - `[x]` Crear artículos iniciales del blog:
    - `[x]` `/blog/como-reducir-no-shows-clinica-dental-ia/index.html`
    - `[x]` `/blog/cuanto-cuesta-automatizar-agenda-consultorio-mexico/index.html`
    - `[x]` `/blog/google-maps-vs-pagina-web-clinica/index.html`

- `[x]` **Fase 5: Verificación y QA final (Sprint 5)**
  - `[x]` QA completo de etiquetas meta, títulos, jerarquía de H1-H3 y canonicals en todas las páginas
  - `[x]` Verificar validación de schemas JSON-LD
  - `[x]` Correr auditoría Lighthouse y pulir cualquier problema de LCP/CLS en móvil

- `[x]` **Fase 6: Auditoría de Usuario, Refactorización de Animaciones (.reveal) y Despliegue Final**
  - `[x]` Refactorizar `.reveal` en `style.css` para usar mejora progresiva (`html.js-active .reveal`)
  - `[x]` Implementar activación de `js-active` en `main.js` y optimizar IntersectionObserver (`threshold: 0.01`, `rootMargin: '0px 0px 100px 0px'`)
  - `[x]` Rellenar span del año en el footer (`#footer-year`) en `index.html` con `2026` como fallback
  - `[x]` Ejecutar `npm run build` localmente y verificar compilación sin errores
  - `[x]` Realizar commit semántico y hacer push a GitHub para disparar deploy automático en Vercel
  - `[x]` Validar URLs de producción y certificar el funcionamiento premium del sitio
