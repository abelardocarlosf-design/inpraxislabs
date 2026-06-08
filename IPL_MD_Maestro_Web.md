# IPL_MD_Maestro_Web.md
### Fuente única de verdad para SEO y copy de inpraxislabs.com.mx — Edición LearnHub al frente

> **Qué cambia respecto a la web actual:** la web pasa de "consultoría de automatización
> con IA" (genérica, todo al mismo nivel) a **"creadores de LearnHub, la plataforma de
> cursos propia para academias"**, con LearnHub como héroe y producto demostrable, y la
> automatización para clínicas/servicios como **segunda línea**. Razón: LearnHub es lo
> único que un prospecto puede **probar en vivo desde la web hoy mismo** — es el ancla de
> conversión más fuerte y el diferenciador que ningún competidor local tiene.

> **Para Claude Code:** este documento define el contenido y el SEO. La web sigue siendo
> la SPA Vite/React existente; aquí solo se reescriben textos, metadatos y se añade la
> sección/ruta de LearnHub que enlaza a `/learnhub` (ver `IPL_Arquitectura_Integracion_LearnHub.md`).

---

## 1. Decisión de posicionamiento (el "por qué" antes del "qué")

1. **LearnHub es producto, no servicio a medida.** Está construido, vivo y se demuestra
   en un clic. Eso lo vuelve el mejor gancho de conversión: el prospecto no imagina, *ve*.
2. **El resto de servicios pasa a segundo plano, no desaparece.** Automatización de
   WhatsApp/citas, cotización/factura y reportes siguen siendo caja, pero se presentan
   como "lo demás que hacemos", no como el héroe.
3. **Dos audiencias, una marca.** Academias (LearnHub) y clínicas/servicios
   (automatización) son ICPs distintos. La home prioriza LearnHub; una sección clara
   atiende a quien busca automatización.
4. **Autoridad por producto.** Tener un producto propio funcionando posiciona a IPL como
   "los que construyen software", no "otra agencia". Sube el ticket y la percepción.

---

## 2. Arquitectura de información de la web (nueva)

```
inpraxislabs.com.mx (SPA Vite/React)
│
├─ / (HOME) ───────────────── LearnHub es el héroe
│   ├─ Hero: LearnHub (CTA primario → /learnhub  ·  CTA 2º → demo)
│   ├─ 01 Pruébalo ahora: tarjeta "Entra a la plataforma en vivo"
│   ├─ 02 El problema de las academias (rentar vs ser dueño)
│   ├─ 03 Qué es LearnHub (4 pilares: $0, tu marca, 6-partes, reportes)
│   ├─ 04 Cómo se ve cada lección (esqueleto de 6 partes)
│   ├─ 05 Planes LearnHub (Arranque / Crecimiento / Institucional)
│   ├─ 06 — separador — "¿No tienes una academia? También automatizamos negocios"
│   ├─ 07 Automatización para clínicas y servicios (3 sistemas, condensado)
│   ├─ 08 Cómo trabajamos (proceso en días)
│   └─ 09 Contacto / agenda diagnóstico
│
├─ /learnhub ──────────────── (rewrite → app Next.js LearnHub) plataforma real
├─ /industrias/* ──────────── (existentes) páginas de automatización por sector
└─ (resto existente)
```

> El bloque 06 es el **pivote** entre las dos audiencias: deja claro que la
> automatización sigue disponible sin diluir el protagonismo de LearnHub.

---

## 3. SEO — Home (`/`)

### 3.1 Metadatos (reemplazar los actuales)

```
title: LearnHub: tu academia con plataforma de cursos propia | In Praxis Labs
meta-description: LearnHub: plataforma de cursos a tu marca, con costo de operación $0 y sin cuota por alumno. Pruébala en vivo. También automatizamos clínicas y negocios en Toluca, Metepec y CDMX.
meta-keywords: plataforma de cursos propia, LMS para academias México, plataforma cursos sin mensualidad, academia de inglés plataforma propia, software cursos marca propia Toluca, automatización con IA Toluca, In Praxis Labs
canonical: https://www.inpraxislabs.com.mx/
meta-og:title: LearnHub: tu academia con plataforma de cursos propia | In Praxis Labs
meta-og:description: Plataforma de cursos a tu marca, operación $0, sin cuota por alumno. Pruébala en vivo hoy.
meta-og:type: website
meta-og:locale: es_MX
meta-og:url: https://www.inpraxislabs.com.mx/
meta-og:image: https://www.inpraxislabs.com.mx/og-learnhub.jpg   (nuevo: captura de LearnHub)
meta-theme-color: #101820
meta-robots: index, follow
```

> **Keyword principal nueva:** "plataforma de cursos propia / LMS para academias".
> **Keyword secundaria conservada:** "automatización con IA Toluca". La home rankea para
> ambas sin canibalizar, porque LearnHub domina el `<h1>` y la automatización vive en su
> propia sección con sus `<h2>`.

### 3.2 Datos estructurados (JSON-LD a inyectar en la home)

- `Organization` (In Praxis Labs) con `sameAs` a redes y `logo`.
- `SoftwareApplication` para **LearnHub** (`applicationCategory: "EducationalApplication"`,
  `offers` con los 3 planes en MXN). Esto habilita rich results y refuerza "producto".
- `LocalBusiness` (ya implícito) con área de servicio Toluca/Metepec/Lerma/CDMX para el
  bloque de automatización.

---

## 4. COPY — Home, bloque por bloque

> Voz: fundador hablando directo al dueño. Frases cortas, cero jerga. Dolor en su
> lenguaje. Tuteo.

### HERO (LearnHub al frente)

**Kicker:** `LEARNHUB · BY IN PRAXIS LABS · PLATAFORMA DE CURSOS PROPIA`

**H1:** Deja de rentar tu academia. Sé dueño de tu plataforma.

**Subtítulo:**
Plataforma de cursos completa, a tu marca, que corre en tu propia cuenta con costo de
operación $0. Sin cuota mensual por alumno. Sin contenido secuestrado. Cursos visuales,
grupos de alumnos y reportes en PDF — todo tuyo, de una sola inversión.

**CTA primario:** `Entra a la plataforma en vivo →` (a `/learnhub`)
**CTA secundario:** `Agenda una demostración` (a `#contacto`)

**Tres micro-pruebas bajo el hero:**
- `$0` operación mensual, para siempre
- `4 cursos` listos para que los pruebes hoy
- `100%` tuyo — tu marca, tu dominio, tu contenido

---

### 01 — PRUÉBALO AHORA (tarjeta de demostración en vivo)

**Etiqueta:** `01 — sin maquetas: la plataforma real`

**H2:** No te lo contamos. Entra y navégalo tú.

**Texto:** LearnHub ya está funcionando. Entra ahora mismo, recorre los cuatro cursos,
abre una lección, responde un quiz. Lo que ves es exactamente lo que tu academia tendría
— con tu marca encima.

**CTA:** `Abrir LearnHub en vivo →` (a `/learnhub`)

---

### 02 — EL PROBLEMA DE TU ACADEMIA

**Etiqueta:** `02 — lo que vives hoy con un LMS rentado`

**H2:** Cada alumno que sumas hace más rica a otra empresa.

Cuatro dolores (tarjetas):
- **Cuota mensual por cada alumno.** Mientras más creces, más pagas. Tu éxito es el
  ingreso recurrente de otro.
- **Tu contenido es rehén.** Si dejas de pagar, pierdes los cursos que tú diseñaste.
  Nunca fueron tuyos.
- **Tu marca diluida.** El alumno entra a la plataforma de otro. Tu academia es un logo
  en una esquina.
- **Cada curso toma semanas.** Redactar, diagramar y armar exámenes a mano convierte
  cada curso en un proyecto de un mes.

**Dato de mercado (caja destacada):**
Una academia de ~150 alumnos paga **$9,000–18,000 MXN al mes** en un LMS por suscripción
(~$5 USD por alumno + plan base). Son **más de $100,000 MXN al año** en renta — que se
evaporan el día que dejas de pagar.

---

### 03 — QUÉ ES LEARNHUB (4 pilares)

**Etiqueta:** `03 — una plataforma que te pertenece`

**H2:** Pagas una vez. Es tuya. Para siempre.

Cuatro pilares (tarjetas):
- **🏛 100% tuyo** — Tu dominio y tu marca. El contenido vive en archivos que respaldas,
  mueves y editas. Si un día te vas, te lo llevas todo.
- **∞ $0 al mes** — Persistencia en la nube (Turso, tier gratuito). Sube alumnos sin que
  suba la factura. La IA se paga una vez, al crear el curso.
- **📚 Calidad pedagógica** — Cada lección sigue la misma estructura probada de 6 partes:
  objetivos, analogías, ejemplos, diagrama, resumen y quiz.
- **👥 Grupos y reportes** — El profesor crea un grupo con un código; el alumno entra con
  Google en un clic. Avance, rachas y reportes PDF con tu marca.

---

### 04 — CÓMO SE VE CADA LECCIÓN (esqueleto de 6 partes)

**Etiqueta:** `04 — la diferencia está en cada lección`

**H2:** No improvisamos. Toda lección sigue el mismo esqueleto.

1. **Objetivos** — qué sabrá hacer al terminar.
2. **Analogía** — "Good morning es el traje; Hey! es la camiseta".
3. **Ejemplos concretos** — tablas y mini-diálogos reales.
4. **Elemento visual** — un diagrama en cada lección.
5. **Resumen** — lo esencial, de un vistazo.
6. **Quiz** — con explicación de cada respuesta.

**CTA:** `Ver una lección real →` (a `/learnhub`)

---

### 05 — PLANES LEARNHUB

**Etiqueta:** `05 — inversión única, sin sorpresas`

**H2:** Una inversión. Sin cuotas por alumno.

> Se recupera en 2–3 meses de lo que hoy pagarías de suscripción. A partir de ahí, todo
> lo que ahorras es tuyo.

| | **Arranque** | **Crecimiento** ⭐ | **Institucional** |
|---|---|---|---|
| | ESENCIAL | RECOMENDADO · ACADEMIA | RED / FRANQUICIA |
| Precio | **$14,900 MXN** · pago único | **$29,900 MXN** · pago único + cursos a medida | **desde $59,900 MXN** · cotización por proyecto |
| Incluye | Plataforma con tu marca · 4 cursos base · hospedaje en tu equipo $0/mes · 1 capacitación · guía para subir cursos | Todo lo de Arranque · 6 cursos a medida con IA · tu paleta/logo/dominio · despliegue en nube (Turso $0) · panel + reportes PDF · 3 meses de soporte | Catálogo ilimitado · multi-sede/multi-marca · profesores ilimitados · integraciones a medida · soporte prioritario anual |

Pie: *Cursos adicionales sueltos desde $1,900 MXN c/u. Mantenimiento opcional $990 MXN/mes
(no requerido para operar). Precios de referencia 2026, sujetos al alcance final.*

**CTA primario:** `Quiero LearnHub para mi academia` (a `#contacto`)
**CTA secundario:** `Probar la plataforma primero →` (a `/learnhub`)

---

### 06 — PIVOTE A AUTOMATIZACIÓN (separador entre audiencias)

**Etiqueta:** `06 — ¿no tienes una academia?`

**H2:** También devolvemos horas a clínicas y negocios de servicios.

**Texto:** Si tu negocio no es una academia pero pierdes horas contestando WhatsApp,
persiguiendo citas o armando cotizaciones a mano, instalamos sistemas de IA que lo hacen
por ti — funcionando en menos de dos semanas, en Toluca, Metepec, Lerma y CDMX.

---

### 07 — AUTOMATIZACIÓN PARA CLÍNICAS Y SERVICIOS (condensado, 2º plano)

**Etiqueta:** `07 — sistemas de automatización con IA`

**H2:** Sistemas de precisión. Alcance cerrado. Precios honestos.

Tres sistemas (tarjetas compactas — no expandir como antes, mantener jerarquía bajo LearnHub):
- **Respuesta Instantánea de Leads** — Agente de WhatsApp oficial que contesta y agenda
  24/7. *Desde $9,000 MXN · 5 días.*
- **Cotización / Factura Automática** — Propuestas en minutos con CFDI 4.0 listo.
  *Desde $12,000 MXN · 7–10 días.*
- **Reporte Semanal del Negocio** — Cada lunes sabes cómo va todo, sin tocar una hoja de
  cálculo. *Desde $7,000 MXN · 5 días.*

**Garantía:** Si en la primera semana no te ahorra al menos 5 horas, te devolvemos tu
dinero. Riesgo cero.

**CTA:** `Ver soluciones por industria →` (a `/industrias`)

---

### 08 — CÓMO TRABAJAMOS

**H2:** De cero a funcionando en días, no meses.

`01 Diagnóstico` → `02 Implementación` → `03 En marcha` → `04 Optimización`

Cierre: Lo que una agencia tarda meses en cotizar y programar, nosotros lo entregamos
funcionando en días.

---

### 09 — CONTACTO

**H2:** Veamos tu negocio con su propia plataforma.

**Texto:** Para academias: te muestro los cuatro cursos funcionando y, si quieres,
generamos juntos un curso a tu medida en la misma reunión. Para negocios de servicios:
mapeamos tus fugas de tiempo en 45 minutos. Mientras tanto, explora LearnHub ahora mismo.

- WhatsApp: **+52 56 5040 5218**
- Correo: **abelardo.carlos@inpraxislabs.com.mx**
- Sitio: **inpraxislabs.com.mx**

**CTA primario:** `Abrir LearnHub en vivo →` (a `/learnhub`)
**CTA secundario:** `Hablemos por WhatsApp` (a `wa.me/525650405218`)

> **Nota de corrección:** el WhatsApp correcto es **56 5040 5218**. La web actual aún
> tiene enlaces a `wa.me/527224282246` — reemplazar TODOS por `wa.me/525650405218`.

---

## 5. Cambios técnicos puntuales para Claude Code (en la SPA)

- Reemplazar `<h1>` y subtítulo del hero por el copy de LearnHub (§4 HERO).
- Insertar bloques 01–05 (LearnHub) **antes** del contenido de automatización actual.
- Condensar los 3 sistemas de automatización actuales a tarjetas compactas (bloque 07);
  conservar el contenido detallado en `/industrias/*`.
- Añadir CTAs `<a href="/learnhub">` en hero, 01, 04, 05 y 09.
- Reemplazar **todos** los `wa.me/527224282246` por `wa.me/525650405218`.
- Actualizar `<title>`, meta description, OG y canonical (§3.1).
- Añadir JSON-LD `Organization` + `SoftwareApplication` (§3.2).
- Reparar el enlace roto de **aviso de privacidad** (pendiente histórico conocido).
- Añadir `/learnhub` al sitemap.

---

## 6. Qué evitar en el copy

- **No** prometer funciones que LearnHub no tiene como producto de inscripción pública:
  se vende como **"campus de cursos a tu marca"** (login Google + grupos + reportes),
  no como sistema de gestión escolar con cobranza integrada.
- **No** mezclar las dos audiencias en el mismo bloque: LearnHub manda, automatización
  es la segunda sección claramente separada por el pivote (06).
- **No** sobrecargar de jerga técnica (Next.js, Turso, Auth.js) en la cara pública: el
  dueño compra resultado y propiedad, no stack. El stack vive en los documentos de
  arquitectura, no en el copy de venta.

> **Fin del MD maestro de la web.** LearnHub es el héroe y la prueba viva; la
> automatización es la segunda línea de caja. Ejecutar los cambios de §5 sobre la SPA
> existente.
