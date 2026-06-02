# MD MAESTRO v2 — In Praxis Labs
## Web premium que vende tiempo a dueños de negocios. Especificación completa de construcción.

> **Para quien ejecuta en code:** fuente de verdad única. Esta versión reposiciona la marca a nivel premium real. No vendemos "automatizaciones con IA" — vendemos **el tiempo que el dueño recupera**. Cada decisión de copy, diseño y estructura sirve a eso. El estándar es competir con las mejores agencias del mundo en percepción, con productos que sí se entregan y se cierran hoy.

---

## 0. La tesis del negocio

**El dueño de un negocio premium no compra software. Compra su tiempo de vuelta.**

Él ya tiene dinero. Lo que no tiene es horas. Cada minuto que pasa contestando WhatsApp, persiguiendo confirmaciones o copiando datos es un minuto robado a dirigir, crecer o vivir. Nuestra promesa no es técnica, es existencial: **le devolvemos el control de su tiempo.**

### Jerarquía de mensaje (rige toda la copy)
1. **Tiempo recuperado** (mensaje central) — "Recupera 20 horas al mes."
2. **Dinero que deja de perder** (refuerzo racional) — "Ningún paciente se vuelve a ir."
3. **Tranquilidad / control** (cierre emocional) — "Tu operación corre sola. Tú diriges."

Toda sección de copy debe poder rastrearse a uno de estos tres, en ese orden de prioridad.

### Cómo se ve "premium" sin mentir
Tres reglas que separan una marca cara de una que solo lo aparenta:
1. **El precio se enmarca por valor, nunca se esconde ni se disculpa.** El número es el mismo; el marco lo eleva.
2. **Cero prueba falsa.** Ni un logo placeholder, ni un testimonio inventado. Con este público, una mentira detectada mata el negocio. La prueba se diseña para nacer real.
3. **El diseño habla antes que las palabras.** Una web que se ve cara genera confianza cara. Aquí no se escatima.

---

## 1. Posicionamiento de precio (crítico — leer antes de la copy)

Mantenemos los productos accesibles, pero **jamás los presentamos por el costo de la tarea.** Los presentamos por el valor del tiempo y el dinero que devuelven.

| Producto | Marco POBRE (prohibido) | Marco PREMIUM (usar) |
|---|---|---|
| Respuesta de Leads — $9,000 | "Te configuro un chatbot por $9,000" | "Por menos de lo que cuesta un mes de recepcionista, ningún paciente vuelve a quedarse sin respuesta. Para siempre." |
| Cotización Automática — $12,000 | "Automatización de cotizaciones, $12,000" | "Recupera las horas que se van en cotizar a mano. Tus propuestas salen en minutos, con factura lista." |
| Reporte Semanal — $7,000 | "Reportes automáticos, $7,000" | "Cada lunes sabes exactamente cómo va tu negocio, sin abrir una sola hoja de cálculo." |

**Principio:** el precio aparece, pero siempre acompañado del valor que lo hace ver pequeño. Nunca un precio solo y desnudo.

---

## 2. Dirección de diseño (NO negociable)

Aesthetic: **"laboratorio de precisión premium" — dark, técnico, sereno, con vida.** Piensa en el panel de control de algo caro y bien hecho. Sobriedad, no fuegos artificiales. El lujo está en la precisión y el espacio, no en el ruido.

### 2.1 Paleta (CSS variables)
\`\`\`css
:root {
  --bg-deep:    #07090E;  /* fondo base, casi negro */
  --bg-panel:   #0C1018;  /* tarjetas, paneles */
  --bg-elev:    #11161F;  /* elevados / hover */
  --line:       #1C2230;  /* bordes sutiles */
  --text-hi:    #F4F7FB;  /* títulos */
  --text-mid:   #9AA5B8;  /* cuerpo */
  --text-low:   #566075;  /* labels, metadatos */
  --accent:     #C9A24B;  /* dorado sobrio: la firma premium */
  --accent-soft:#E3C77E;  /* dorado claro para hover/glow */
  --live:       #46D39A;  /* verde "vivo": solo pulsos de flujo */
  --warn:       #E07A6B;  /* "antes / lo que pierdes" */
  --glow:       rgba(201,162,75,0.16);
}
\`\`\`
**Decisión clave:** el acento es un **dorado sobrio**, no el verde de SaaS genérico. El dorado dice "premium, atemporal, caro". El verde \`--live\` se reserva *solo* para los pulsos del demo (comunica "esto corre solo"). Dominante negro + dorado puntual. Disciplina absoluta con el color.

### 2.2 Tipografía
- **Display (títulos):** una serif o sans de alta gama con carácter editorial — \`Fraunces\` (serif con alma, transmite lujo), o \`Clash Display\` / \`Satoshi\` si prefieres sans. NUNCA Inter, Roboto, Space Grotesk.
- **Cuerpo:** \`Inter Tight\` o \`Geist\` — limpio, legible, moderno.
- **Mono (datos, etiquetas, nodos):** \`JetBrains Mono\` — refuerza precisión técnica.
- Jerarquía: H1 grande con tracking negativo y mucho aire alrededor. El espacio en blanco es señal de lujo; no lo llenes.

### 2.3 Motion
- Carga: revelado escalonado y *lento* del hero (más pausado que una landing normal — la calma comunica confianza). \`animation-delay\` de ~100ms entre elementos.
- Scroll: cada bloque entra con fade + translateY 20px, suave (\`cubic-bezier(0.22,1,0.36,1)\`).
- Demo de flujos: pulsos \`--live\` viajando por las conexiones en loop, activados en viewport.
- \`prefers-reduced-motion\`: todo aparece sin animación.

### 2.4 Textura y profundidad
- Grain muy sutil sobre el fondo + gradient mesh casi imperceptible (dorado tenue) tras el hero.
- Bordes finos \`--line\`, no sombras pesadas. Glow dorado \`--glow\` solo en elementos "vivos" o CTAs.
- Retícula tipo blueprint, tenue, en secciones técnicas.

### 2.5 Reglas duras
- Mobile-first real. El demo se reorganiza vertical en móvil.
- Sin librerías pesadas. CSS + JS vanilla. Lighthouse > 90 mobile.
- \`loading="lazy"\` en imágenes; SVG inline para iconos/diagramas.
- Más espacio en blanco del que creas necesario. Premium = aire.

---

## 3. Arquitectura de la página (orden exacto)

\`\`\`
1.  NAV (sticky, minimal)
2.  HERO — promesa de tiempo + gancho
3.  DEMO INTERACTIVO — el flujo que devuelve tu tiempo  <- PIEZA ESTRELLA
4.  EL COSTO DE TU TIEMPO (antes/después, en horas y dinero)
5.  LOS 3 PRODUCTOS (precio enmarcado por valor)
6.  GARANTÍA (banda)
7.  CÓMO TRABAJAMOS (proceso 4 pasos)
8.  PRUEBA (estructura real, nace con el primer caso)
9.  INDUSTRIAS (las 5)
10. ZONAS (las 4)
11. FUNDADOR (autoridad)
12. OFERTA (2 caminos, precio "desde")
13. FAQ (mata objeciones del comprador premium)
14. CTA FINAL + FORMULARIO (conectado a tu n8n)
15. FOOTER + WhatsApp flotante
\`\`\`

---

## 4. Especificación bloque por bloque

### BLOQUE 1 — Nav
Logo izq · links centro (\`Cómo funciona\`, \`Servicios\`, \`Industrias\`, \`Contacto\`) · CTA der \`Agenda tu diagnóstico\`. Sticky con blur al scroll. Móvil: drawer. El primer link lleva al **demo**, no a servicios.

> Nota de lenguaje: "auditoría" -> considera "**diagnóstico**" o "**sesión de estrategia**". Suena más a consultoría premium y menos a revisión contable.

---

### BLOQUE 2 — Hero
**Objetivo:** vender tiempo en 5 segundos.

- **Eyebrow** (mono, \`--text-low\`): \`CONSULTORÍA DE AUTOMATIZACIÓN · TOLUCA · METEPEC · LERMA · CDMX\`
- **H1:** "Recupera las **20 horas al mes** que tu negocio te está robando." (la cifra en \`--accent\` dorado).
- **Sub:** "Instalamos sistemas de IA que contestan, agendan y dan seguimiento por ti. Tú vuelves a dirigir — y a vivir. Funcionando en menos de 2 semanas."
- **CTAs:** primario \`Agenda tu diagnóstico\` (relleno dorado), secundario \`Hablemos por WhatsApp\` (outline).
- **Micro-prueba bajo CTAs** (3 ítems, mono): \`Resultados en días, no meses\` · \`Construido con IA de última generación\` · \`Respuesta en menos de 24 h\`.
- Fondo: gradient mesh dorado tenue + grain. Opcional: un nodo de flujo animado discreto a la derecha (desktop).
- Carga escalonada, pausada.

---

### BLOQUE 3 — DEMO INTERACTIVO (40% del esfuerzo) [PIEZA ESTRELLA]
**Objetivo:** que el visitante *vea* cómo el sistema le devuelve su tiempo.

- **Título:** "Esto pasa mientras tú haces algo más importante."
- **3 tabs:** \`Respuesta de Leads\` · \`Cotización\` · \`Reporte Semanal\`.
- **Diagrama horizontal de nodos** (estilo n8n simplificado), máx 5 nodos:

  Default (Leads): \`[ Paciente escribe ] -> [ IA lee e interpreta ] -> [ Consulta tu agenda ] -> [ Agenda la cita ] -> [ Confirma + recordatorio ]\`

- Cada nodo: tarjeta \`--bg-panel\`, borde \`--line\`, icono mono, label corto, etiqueta "paso N".
- **Animación clave:** pulso \`--live\` viaja por las conexiones izq->der en loop (3-4s). Al pasar por un nodo, este se enciende (glow + scale 1.03). Comunica "corre solo" sin palabras. Solo activo en viewport.
- **Otros flujos:**
  - Cotización: \`[ Cliente pide ] -> [ IA arma propuesta ] -> [ Genera CFDI 4.0 ] -> [ Envía por correo ]\`
  - Reporte: \`[ Se juntan datos ] -> [ IA redacta resumen ] -> [ Llega a tu WhatsApp cada lunes ]\`
- **Bajo el diagrama — el cálculo de tiempo** (no solo antes/después, sino *cuánto tiempo recupera*):
  - Antes (\`--warn\`): "4 horas al día contestando. Mensajes perdidos. Pacientes que se van."
  - Después (\`--live\`): "Respuesta en <2 min, 24/7. **~20 horas tuyas, de vuelta cada mes.**"
- **CTA:** \`Quiero recuperar mi tiempo\` -> WhatsApp con mensaje del tab activo.
- **Técnica:** SVG inline + CSS. Conexiones \`<path>\`; pulso con \`stroke-dashoffset\` o círculo sobre \`offset-path\`. Móvil: vertical. Sin canvas, sin librerías de grafos.

---

### BLOQUE 4 — El costo de tu tiempo
Transforma "el problema" en una cuantificación de pérdida (el comprador premium piensa en costo de oportunidad).
- **Título:** "Cada hora que haces esto a mano, cuesta más de lo que crees."
- 3 columnas de dolor, cada una con su cifra de costo y su contraparte resuelta:
  - WhatsApp saturado -> "X horas/semana + pacientes perdidos" -> resuelto.
  - No-shows -> "huecos en agenda = facturación que se evapora" -> resuelto.
  - Procesos manuales -> "tu tiempo de dueño, en tareas de \$0" -> resuelto.
- Dolor en \`--warn\`, solución en \`--accent\`. Marco: el tiempo de un dueño es el recurso más caro del negocio.

---

### BLOQUE 5 — Los 3 productos (precio enmarcado por valor)
3 tarjetas grandes. Cada una:
- Nombre del producto.
- **El valor primero** (titular en términos de tiempo/dinero), precio "desde" debajo en \`--accent\`.
- Badge de entrega (mono).
- "Incluye" (3-4) / "No incluye" (1-2) — el alcance cerrado y honesto genera confianza premium.
- CTA \`Lo quiero\` -> WhatsApp contextual.

| Producto | Titular de valor (lo grande) | Precio | Entrega |
|---|---|---|---|
| Respuesta Instantánea de Leads [empieza aquí] | "Ningún paciente vuelve a quedarse sin respuesta." | desde **\$9,000 MXN** | 5 días |
| Cotización / Factura Automática | "Tus propuestas salen en minutos, con CFDI listo." | desde **\$12,000 MXN** | 7-10 días |
| Reporte Semanal del Negocio | "Cada lunes sabes cómo va todo, sin tocar Excel." | desde **\$7,000 MXN** | 5 días |

Destacar Leads con badge "Empieza por aquí" (es el que entregas hoy sin infra nueva).

---

### BLOQUE 6 — Garantía (banda)
Banda full-width, \`--bg-panel\`, icono escudo \`--accent\`. Texto: "**Si en la primera semana no te ahorra al menos 5 horas, te devolvemos tu dinero.**" Va justo tras los precios.

---

### BLOQUE 7 — Cómo trabajamos
4 pasos actuales (Diagnóstico -> Implementación -> En marcha -> Optimización), reestilizados con línea de progreso y pulso sutil. Refuerzo: "Lo que una agencia tarda meses, lo entregamos en días — sin que muevas un dedo."

---

### BLOQUE 8 — Prueba (nace real, nunca falsa)
**Regla absoluta: cero invención.**
- **Hoy (sin casos):** banda honesta de "el estándar que perseguimos" — \`<2 min\` respuesta, \`-60%\` no-shows objetivo, \`<2 semanas\` a producción. Enmarcado como compromiso, no como logro pasado.
- **Estrategia del primer caso (poner en marcha YA):** tu primer cliente entra a **precio de fundador** a cambio de ser tu caso documentado (métricas + testimonio + permiso de nombre). Ese caso reemplaza esta banda y multiplica tu credibilidad.
- Dejar maquetada la card de testimonio para insertar cuando llegue.

---

### BLOQUE 9 — Industrias
Las 5 actuales (Dental, Estética/Derma, Nutrición, Fisio, Veterinaria) con links internos. Reestilizar a la paleta dorada. Mantener dolor por vertical (SEO local).

---

### BLOQUE 10 — Zonas
Las 4 actuales (Toluca, Metepec, Lerma, CDMX) con links internos. Reestilizar. Mantener (SEO local).

---

### BLOQUE 11 — Fundador (autoridad)
Bio + foto + cita de Abelardo. Reestilizar. Reforzar autoridad: posicionarlo como estratega que *implementa*, no solo asesora. Añadir credenciales de confianza en mono si las hay. La frase actual ("la tecnología no debería ser un dolor de cabeza...") funciona — mantenerla.

---

### BLOQUE 12 — Oferta (2 caminos)
Los 2 paquetes (Despegue Digital + Operación Automatizada). Cambiar "precio a medida" por **rango "desde"** al menos en el de proyecto, para reducir fricción sin abaratar. Retainer "desde \$X/mes" = "tu equipo de tecnología sin contratarlo". El retainer es tu ingreso recurrente: véndelo fuerte.

---

### BLOQUE 13 — FAQ (objeciones del comprador premium)
Acordeón. El comprador premium tiene objeciones distintas — no pregunta "¿es barato?", pregunta "¿es confiable, discreto, sin que yo tenga que involucrarme?":
- "¿Tengo que aprender algo o meterme a configurar?" -> No. Lo dejamos funcionando y capacitamos a tu equipo.
- "¿Esto interrumpe mi operación mientras lo montan?" -> No. Construimos en paralelo, sin frenar tu día.
- "¿Cuánto de mi tiempo me va a costar el proyecto?" -> Casi nada: una sesión de diagnóstico y la info inicial.
- "¿Y si ya tengo web/sistema?" -> Lo integramos o lo reemplazamos.
- "¿Mis datos y los de mis pacientes están seguros?" -> Sí (aviso de privacidad LFPDPPP, manejo responsable).
- "¿Facturan?" -> Sí, CFDI 4.0.
- "¿Qué pasa después de la entrega?" -> Soporte / retainer opcional.
- "¿Y si no me sirve?" -> Garantía de devolución.

---

### BLOQUE 14 — CTA final + formulario
Conservar el formulario actual (nombre, negocio, WhatsApp, ciudad, necesidad), reestilizar. Título: "Recupera tu tiempo. Empieza con un diagnóstico." Datos de contacto + WhatsApp al lado. Validación inline, estado de envío claro. **Conectar a tu n8n vía webhook** — tu web usa la automatización que vendes (predica con el ejemplo, y se lo cuentas en la sesión).

---

### BLOQUE 15 — Footer + WhatsApp flotante
Estructura actual de links, reestilizada. Burbuja de WhatsApp fija en toda la página (esquina inf. der.) con mensaje pre-cargado.

---

## 5. Elementos globales
- WhatsApp flotante en todas las páginas.
- **CTAs contextuales:** cada botón pre-carga texto distinto según origen (Leads / Cotización / diagnóstico). Sabes qué le interesó antes de que escriba.
- Precios como constantes en un solo lugar (fuente de verdad).

---

## 6. SEO técnico
- Conservar meta tags actuales (buenos).
- Añadir Schema.org: \`LocalBusiness\` + \`Service\` (uno por producto) + \`FAQPage\`.
- \`og-image.jpg\` real y premium (verificar que exista y se vea caro).
- Lighthouse > 90 mobile (velocidad = SEO + percepción premium).

---

## 7. Orden de ejecución en code (por impacto en venta)
1. **Bloque 3 — Demo interactivo.** El diferenciador. Primero y excelente.
2. **Bloque 2 — Hero.** La promesa de tiempo, el gancho.
3. **Bloque 5 — 3 productos con precio enmarcado.** Habilita la venta.
4. **Bloque 6 — Garantía.** Barato, alto impacto.
5. **Bloque 4 — Costo del tiempo.** Crea urgencia racional.
6. **Bloque 13 — FAQ.** Cierra objeciones premium.
7. **Bloque 8 — Prueba** (estructura; llenar con primer caso).
8. **Reestilizado** de bloques conservados a la dirección dorada premium.
9. **SEO + Schema + performance.**

---

## 8. Lo que se construye EN PARALELO a la web (no es código, pero define el éxito)
La web premium acelera el cierre. Pero sin un caso real, sigue siendo aspiracional. Por eso, mientras se construye:
1. **Cierra tu primer cliente a precio de fundador** (Producto Leads, lo entregas hoy).
2. **Documenta el resultado** con métrica dura (ej. "respuesta a leads: 4h -> 2 min").
3. **Pide testimonio + permiso de nombre.**
4. Ese caso entra al Bloque 8 y transforma la web de "promesa elegante" a "prueba irrefutable".

Esta es la única secuencia que te lleva a vender como las mejores agencias del mundo: marca premium **+** prueba real, construidas a la vez.

---

## 9. Definition of done
La web está lista cuando un dueño de negocio premium, en una sola visita, puede:
1. Entender en 5 segundos que le devuelves su **tiempo** (Hero).
2. **Ver** el sistema trabajar y cuánto tiempo recupera (Demo).
3. Saber el precio enmarcado por su valor, sin sentirlo barato ni opaco (Productos).
4. Sentir riesgo cero (Garantía).
5. Resolver su objeción de confianza/discreción (FAQ).
6. Escribirte por WhatsApp con un mensaje que ya dice qué le interesó (CTAs contextuales).

Si las 6 se cumplen y hay un caso real en el Bloque 8, vendes al nivel de las mejores del mundo.
