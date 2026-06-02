# MD MAESTRO VISUAL — In Praxis Labs
## La web que vende sola. Recetas visuales exactas para que DEJE de ser texto.

> **Lee esto primero.** El problema de la web actual no es el contenido — es que TODO es texto en bloques estáticos. Las mejores webs del mundo (Awwwards, agencias de IA top) no tienen más texto: tienen **menos texto y más cosas que se mueven, se revelan al hacer scroll y reaccionan al usuario**. Dato duro: el contenido con scrollytelling tiene **3x más engagement** que el estático, y el **94% de la primera impresión es diseño**. Para una agencia de IA, una web visualmente impecable ES la prueba de que sabes construir — responde "¿pueden hacer esto?" antes de que el cliente pregunte.
>
> Este documento NO repite "pon una sección de servicios". Da la **receta visual concreta** de cada bloque: qué se mueve, cómo, con qué técnica CSS/JS, y cuánto texto máximo. Si una instrucción dice "máximo 6 palabras", son 6, no 60.

---

## REGLA DE ORO (rige toda la web)

**Por cada bloque de texto, debe haber un elemento visual que se mueva o reaccione.** Si una sección es solo párrafos, está mal y hay que rehacerla. El texto explica; lo visual convence.

Cinco mandamientos anti-texto:
1. **Ningún párrafo de más de 2 líneas.** Si necesitas explicar más, conviértelo en pasos visuales, números animados, o un diagrama.
2. **Cada sección entra con movimiento** (fade + subida al hacer scroll). Nada aparece "ya puesto".
3. **Los números se animan** (cuentan de 0 a su valor al entrar en pantalla). "20 horas" no se escribe, se *cuenta* frente al usuario.
4. **Hay al menos 3 momentos "wow"** en el scroll: el demo de flujo, una sección sticky que se transforma, y el hero. Esos tres justifican el resto.
5. **Espacio en blanco generoso.** El lujo es aire, no densidad. Secciones con padding vertical grande (120px+ desktop).

---

## STACK TÉCNICO (sin esto, no se logra el efecto)

La web actual probablemente es HTML/CSS plano. Para los efectos necesitas:

- **GSAP + ScrollTrigger** (gratis) — la columna vertebral de las animaciones al scroll. Es lo que usan las webs de Awwwards. CDN, sin build.
- **Lenis** (gratis) — smooth scroll. Transforma la sensación de "página web" a "experiencia premium". Una línea de init.
- **CSS `position: sticky`** — para las secciones que se "pegan" y transforman (scrollytelling). Nativo, sin JS.
- **IntersectionObserver** — para disparar animaciones y contadores. Nativo.
- Opcional avanzado: un fondo de **partículas/shader sutil** en el hero (canvas ligero). Si complica, un gradient mesh animado en CSS logra el 80% del efecto al 5% del costo.

> Si el dev no conoce GSAP: ScrollTrigger permite "cuando este elemento entra en pantalla, anima esto". Es la herramienta #1 del scrollytelling. Documentación oficial gratuita.

---

## SISTEMA DE DISEÑO (tokens exactos)

\`\`\`css
:root {
  /* Color */
  --bg-deep:    #07090E;
  --bg-panel:   #0C1018;
  --bg-elev:    #11161F;
  --line:       #1C2230;
  --text-hi:    #F4F7FB;
  --text-mid:   #9AA5B8;
  --text-low:   #566075;
  --accent:     #C9A24B;   /* dorado: firma premium */
  --accent-soft:#E3C77E;
  --live:       #46D39A;   /* verde: SOLO pulsos de flujo "vivo" */
  --warn:       #E07A6B;
  --glow:       rgba(201,162,75,0.16);

  /* Motion (usar SIEMPRE estos easings, no linear) */
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft:  cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast:   0.4s;
  --dur-mid:    0.7s;
  --dur-slow:   1.1s;
}
\`\`\`

**Tipografía:**
- Títulos: `Fraunces` (serif editorial = lujo) o `Clash Display`. Tamaños grandes, `letter-spacing: -0.02em`.
- Cuerpo: `Inter Tight` / `Geist`.
- Datos/etiquetas/nodos: `JetBrains Mono`.
- Cargar vía Fontshare/Google Fonts. NUNCA dejar la fuente del sistema.

**Reglas visuales constantes:**
- Bordes `1px solid var(--line)`, nunca sombras pesadas.
- Glow dorado solo en CTAs y elementos "vivos".
- Grain sutil global (overlay PNG de ruido a ~3% opacidad) — quita el aspecto "plano digital".
- Todo redondeo coherente: `border-radius: 16px` en cards, `999px` en botones.

---

## ARQUITECTURA + RECETA VISUAL POR BLOQUE

Orden de la página. Cada bloque trae: **propósito · texto máximo · LA RECETA VISUAL (lo importante)**.

---

### BLOQUE 1 — NAV
**Texto:** logo + 4 links + 1 botón.
**Receta visual:**
- Transparente sobre el hero; al hacer scroll >50px, aparece fondo `--bg-deep` con `backdrop-filter: blur(12px)` y un borde inferior `--line` (transición 0.3s).
- El botón CTA tiene glow dorado sutil que pulsa muy lento (animación infinita 3s, opacidad del glow 0.4↔0.8).
- Móvil: drawer que entra desde la derecha con `--ease-out`.

---

### BLOQUE 2 — HERO  ★ momento wow #1
**Propósito:** vender tiempo en 5 segundos + demostrar nivel visual al instante.
**Texto máximo:** eyebrow (5 palabras) + H1 (10 palabras) + sub (20 palabras) + 2 botones.

**Receta visual (esto es lo que lo hace premium):**
- **Fondo vivo:** gradient mesh dorado/oscuro que se mueve lentamente (animación CSS de `background-position`, 20s loop) + grain encima. Opcional: partículas doradas flotando muy lento (canvas) o líneas tipo constelación que reaccionan al mouse.
- **Entrada orquestada al cargar (NO todo de golpe):** eyebrow baja y aparece (0.1s) → H1 revela **palabra por palabra** con un `clip-path` o `translateY` escalonado (cada palabra +0.08s) → sub fade (0.6s) → botones suben (0.8s). Esta secuencia de ~1.5s es la primera impresión; que sea cinematográfica.
- **La cifra "20 horas" en el H1** va en dorado y tiene un sutil glow que respira.
- **Nodo de flujo decorativo** a la derecha (desktop): 3-4 nodos conectados con un pulso `--live` viajando en loop. Adelanta el demo y dice "esto es técnico y vivo".
- **Indicador de scroll** abajo (línea o flecha que sube y baja suave) invitando a bajar.
- Bajo los botones: 3 micro-pruebas en mono separadas por puntos, fade-in al final de la secuencia.

**H1 sugerido:** "Recupera las **20 horas al mes** que tu negocio te roba."

---

### BLOQUE 3 — DEMO INTERACTIVO DE FLUJO  ★ momento wow #2 (LA PIEZA QUE VENDE)
**Dedica el 35% del esfuerzo aquí. Es lo que ninguna web local tiene.**
**Propósito:** que el visitante VEA una automatización corriendo y entienda qué compra sin leer.
**Texto máximo:** título (8 palabras) + 3 labels de tab + labels cortos de nodos + 2 líneas antes/después.

**Receta visual:**
- **3 tabs** arriba (`Respuesta de Leads` · `Cotización` · `Reporte`). El activo tiene subrayado dorado que se desliza al cambiar (transición de `transform`, no de posición).
- **Diagrama horizontal de 5 nodos máximo**, conectados por líneas SVG (`<path>`):
  `[ Paciente escribe ] → [ IA interpreta ] → [ Consulta agenda ] → [ Agenda cita ] → [ Confirma + recordatorio ]`
- **EL EFECTO CLAVE — el pulso vivo:** un punto de luz `--live` viaja por cada `<path>` de izquierda a derecha, en loop continuo (3-4s). Técnica: `stroke-dasharray` + `stroke-dashoffset` animado, o un `<circle>` con `offset-path: path(...)`. Cuando el pulso llega a un nodo, ese nodo se enciende: borde pasa a `--live`, glow aparece, `transform: scale(1.04)` por 0.4s. Esto comunica "corre solo, 24/7" mejor que cualquier frase.
- **Activar el loop solo en viewport** (IntersectionObserver) para no gastar batería.
- **Cambio de tab:** el diagrama actual hace fade-out (0.3s), el nuevo fade-in con los nodos entrando en cascada de izq a der (+0.06s c/u).
- **Debajo — el cálculo de tiempo, en grande:**
  - Izquierda (`--warn`, ícono ↓): "Antes: 4 h/día contestando. Pacientes que se van."
  - Derecha (`--live`, ícono ✓): número animado que cuenta **0 → 20** + "horas tuyas, de vuelta cada mes."
- **CTA** centrado debajo: `Quiero este flujo` → WhatsApp contextual del tab activo.
- **Móvil:** nodos en columna vertical, pulso viaja de arriba a abajo. Tabs se vuelven scroll horizontal.

---

### BLOQUE 4 — EL COSTO DE TU TIEMPO (sticky scrollytelling)  ★ momento wow #3
**Propósito:** crear urgencia mostrando lo que pierde — con una técnica que "atrapa" el scroll.
**Texto máximo:** 1 título + 3 dolores de 1 línea c/u + sus 3 soluciones de 1 línea.

**Receta visual (la técnica sticky es la estrella aquí):**
- Sección alta (300vh). A la izquierda, una **columna sticky** (`position: sticky; top: 20vh`) con un visual grande (un reloj, un contador de "horas perdidas", o una agenda). A la derecha, el texto va pasando.
- Mientras haces scroll, el visual sticky **se transforma en 3 etapas** (ScrollTrigger): etapa 1 muestra "WhatsApp saturado" con un contador de mensajes sin responder subiendo; etapa 2 "no-shows" con huecos rojos apareciendo en una agenda; etapa 3 "procesos manuales" con tu tiempo evaporándose. Cada etapa el texto de la derecha cambia y el visual reacciona.
- Cada dolor (`--warn`) se "resuelve" visualmente al final: el rojo se vuelve dorado/verde, indicando la solución.
- Esta es la sección que demuestra dominio técnico. Si el tiempo es limitado, una versión simple: 3 cards en **bento grid** que se revelan con fade+scale escalonado al entrar, cada una con un número animado de "costo".

---

### BLOQUE 5 — LOS 3 PRODUCTOS (bento grid premium)
**Propósito:** habilitar la venta con precio enmarcado por valor.
**Texto máximo por card:** nombre (4 palabras) + titular de valor (8 palabras) + precio + entrega + 3 ítems incluye / 1 no incluye.

**Receta visual:**
- **Bento grid** (no 3 columnas iguales aburridas): la card de "Respuesta de Leads" más grande (es la estrella), las otras dos más pequeñas al lado. Asimetría = diseño premium.
- Cada card: fondo `--bg-panel`, borde `--line`. **Al hover:** borde se vuelve dorado, la card sube 6px (`translateY`), aparece glow dorado, y un sutil gradiente dorado recorre el borde (animación de `background` en un pseudo-elemento). En móvil el efecto se activa al entrar en viewport.
- **El precio** entra con número animado (cuenta hasta $9,000). Va en dorado, grande.
- Badge "Empieza por aquí" en la card de Leads, en dorado, esquina superior.
- Entrada de las cards: cascada con fade + `translateY(24px)` + `scale(0.96→1)` al hacer scroll.
- **El valor primero, el precio después.** "Ningún paciente vuelve a quedarse sin respuesta" en grande; "$9,000" debajo como dato, no como protagonista.

| Producto | Titular (grande) | Precio | Entrega |
|---|---|---|---|
| Respuesta Instantánea de Leads | "Ningún paciente vuelve a quedarse sin respuesta." | $9,000 MXN | 5 días |
| Cotización / Factura Automática | "Propuestas en minutos, con CFDI listo." | $12,000 MXN | 7-10 días |
| Reporte Semanal | "Cada lunes sabes cómo va todo, sin Excel." | $7,000 MXN | 5 días |

---

### BLOQUE 6 — GARANTÍA (banda con peso visual)
**Texto máximo:** 1 frase.
**Receta visual:** banda full-width, fondo `--bg-panel`, un ícono de escudo dorado grande a la izquierda que se dibuja solo (SVG `stroke-dashoffset`) al entrar en viewport. Texto al lado. Línea dorada fina arriba y abajo de la banda. Frase: "**Si en la primera semana no te ahorra 5 horas, te devolvemos tu dinero.**"

---

### BLOQUE 7 — CÓMO TRABAJAMOS (línea de progreso animada)
**Texto máximo:** 4 pasos × (título 3 palabras + 1 línea).
**Receta visual:**
- 4 pasos conectados por una **línea horizontal que se "llena" de dorado** conforme haces scroll (ScrollTrigger ligado al progreso: la línea va de gris a dorada de izq a der).
- Cada paso: número grande en mono, que se enciende (gris → dorado + scale) cuando la línea de progreso llega a él.
- Refuerzo abajo: "Lo que una agencia tarda meses, lo entregamos en días."

---

### BLOQUE 8 — PRUEBA (nace real, NUNCA falsa)
**Regla: cero invención. Ni un logo ni testimonio inventado.**
**Receta visual:**
- **Hoy (sin casos):** 3 números grandes en fila — `< 2 min`, `−60%`, `< 2 semanas` — cada uno **cuenta animado** al entrar, con su label debajo en mono. Enmarcado como "El estándar que perseguimos". Honesto y visualmente fuerte.
- **Card de testimonio ya maquetada** (oculta hasta tener el primero): foto + cita + nombre + métrica. Diseñada, lista para poblar.
- **Estrategia:** primer cliente a precio de fundador → caso documentado → reemplaza esta sección.

---

### BLOQUE 9 — INDUSTRIAS (grid con hover reactivo)
**Texto máximo:** 5 verticales × (nombre + 1 línea de dolor).
**Receta visual:** grid de 5 cards (Dental, Estética, Nutrición, Fisio, Veterinaria). Cada una con un ícono lineal que se anima al hover (se dibuja o rota suave). Al hover: la card se ilumina, las demás se atenúan ligeramente (efecto "foco"). Links internos para SEO local. Entrada en cascada al scroll.

---

### BLOQUE 10 — ZONAS (mapa o tira visual)
**Texto máximo:** 4 zonas.
**Receta visual:** en vez de lista de texto, una tira horizontal de 4 con un mapa estilizado del corredor Toluca-Metepec-Lerma-CDMX, o 4 "pins" que caen con un pequeño bounce al entrar en viewport. Links internos. Mantener para SEO.

---

### BLOQUE 11 — FUNDADOR (autoridad con foto que reacciona)
**Texto máximo:** nombre + rol + cita (2 líneas) + 3 credenciales.
**Receta visual:** layout asimétrico: foto de Abelardo a un lado (con tratamiento — duotono sutil hacia el dorado, o que pase de B/N a color al entrar en viewport), cita grande al otro lado entrecomillada en serif. 3 credenciales en mono debajo (años, proyectos, stack). Mantener la frase actual sobre la tecnología.

---

### BLOQUE 12 — OFERTA (2 caminos)
**Texto máximo:** 2 paquetes × (nombre + 4 ítems + precio "desde").
**Receta visual:** 2 cards lado a lado, la de "Despegue Digital" marcada "Más popular" con borde dorado completo y leve elevación permanente. Hover igual que Bloque 5. Precio "desde" con número animado. El retainer enmarcado como "tu equipo de tecnología sin contratarlo".

---

### BLOQUE 13 — FAQ (acordeón animado)
**Texto máximo:** 8 preguntas + respuestas de 1-2 líneas.
**Receta visual:** acordeón donde cada item abre con animación suave de altura (`--ease-out`) y el ícono + rota a × (transform 0.3s). Solo uno abierto a la vez. Las del comprador premium (confianza, discreción, "¿cuánto de mi tiempo cuesta?", seguridad de datos, facturación, garantía).

---

### BLOQUE 14 — CTA FINAL + FORMULARIO
**Texto máximo:** título (8 palabras) + form (5 campos) + datos de contacto.
**Receta visual:** fondo con gradient mesh dorado más intenso que el resto (es el clímax). Título grande. Form con campos que tienen label flotante animado (sube al hacer focus) y borde que se vuelve dorado en focus. Botón con glow. Estado de envío claro (spinner → check verde animado). **Conectar a tu n8n vía webhook** — predica con el ejemplo.

---

### BLOQUE 15 — FOOTER + WhatsApp flotante
**Receta visual:** footer limpio, links en grid, línea dorada fina arriba. **Burbuja de WhatsApp fija** (esquina inf. der.) que aparece tras el primer scroll con un pequeño bounce, glow verde sutil pulsante. Mensaje pre-cargado.

---

## ELEMENTOS GLOBALES
- **Smooth scroll (Lenis)** en toda la página — cambia por completo la sensación.
- **Cursor personalizado** (opcional, desktop): un punto que crece sobre elementos clickeables. Detalle de web premium. Si complica, omitir.
- **CTAs contextuales:** cada botón pre-carga texto WhatsApp distinto según origen.
- **`prefers-reduced-motion`:** si activo, TODO aparece sin animación (accesibilidad + legal WCAG).
- **Precios como constantes** en un solo archivo.

---

## PERFORMANCE (no negociable — premium ≠ lento)
- Lighthouse > 90 mobile. Las animaciones usan SOLO `transform` y `opacity` (no disparan reflow).
- `requestAnimationFrame` para scroll, nunca listeners pesados.
- Imágenes `loading="lazy"`, formato WebP/AVIF, SVG inline para iconos/diagramas.
- GSAP/Lenis vía CDN, defer. El shader del hero, si se usa, con fallback a gradient CSS en móvil.
- Objetivo de fps: 60 desktop, 45+ móvil (como las webs de Awwwards).

---

## SEO
- Conservar meta tags. Añadir Schema: `LocalBusiness` + `Service` (×3) + `FAQPage`.
- `og-image` premium real.
- La velocidad ES SEO: el performance de arriba también posiciona.

---

## ORDEN DE EJECUCIÓN (por impacto)
1. **Stack** (GSAP + Lenis + tokens + fuentes). Sin esto nada se mueve.
2. **Bloque 2 — Hero** con entrada orquestada y fondo vivo. Primera impresión.
3. **Bloque 3 — Demo de flujo** con el pulso. El diferenciador.
4. **Bloque 5 — Productos** en bento con hover y precio animado.
5. **Bloque 4 — Costo del tiempo** sticky (o versión bento si falta tiempo).
6. **Bloque 7 — Proceso** con línea animada.
7. **Bloques 6, 8, 13** (garantía, prueba, FAQ).
8. **Resto** (industrias, zonas, fundador, oferta, footer) con sus micro-animaciones.
9. **Performance + SEO** como capa final.

---

## DEFINITION OF DONE (el estándar para "vende sola")
Un dueño de negocio premium, en una visita, debe:
1. En los primeros 3 segundos pensar "esta empresa es de otro nivel" (hero + movimiento).
2. **Ver** una automatización corriendo y entenderla sin leer (demo con pulso).
3. Sentir la urgencia de lo que pierde (sección sticky de costo).
4. Ver el precio enmarcado por valor, no desnudo (bento de productos).
5. Recorrer toda la página sin encontrar UN solo bloque que sea "solo texto plano".
6. Escribir por WhatsApp con un mensaje que ya dice qué le interesó.

**Prueba final:** si quitas todo el texto de la web y aún se entiende qué hace y se ve impresionante → está bien hecha. Si sin texto queda vacía → sigue siendo "texto y más texto" y hay que volver a las recetas de arriba.
