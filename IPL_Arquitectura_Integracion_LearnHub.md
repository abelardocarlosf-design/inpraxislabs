# IPL_Arquitectura_Integracion_LearnHub.md
### Cómo montar LearnHub V2.1 en `inpraxislabs.com.mx/learnhub` sin reescribir la web actual

> **Fuente única de verdad de la integración.** Este documento NO redefine LearnHub
> (eso vive en `ARCHITECTURE.md` de LearnHub V2.1). Define **únicamente** cómo conviven
> la web de marketing de In Praxis Labs (Vite + React SPA) y la plataforma LearnHub
> (Next.js 16) bajo un mismo dominio, sin que ninguna toque a la otra.

---

## 0. El hecho que define toda la arquitectura

Hay **dos aplicaciones con stacks incompatibles para vivir en el mismo repo**:

| | Web IPL (marketing) | LearnHub V2.1 (producto) |
|---|---|---|
| Stack | **Vite + React (SPA estática)** | **Next.js 16 (App Router)** |
| Naturaleza | Archivos estáticos (HTML/JS/CSS) | App con **servidor**: Server Actions + rutas API |
| Servidor en runtime | No | **Sí** (Auth.js, `/api/auth/[...nextauth]`, `/api/report/*`) |
| Base de datos | Ninguna | SQLite local (dev) / **Turso** (prod) |
| Auth | Ninguna | **Auth.js v5 + Google OAuth** |
| Hosting actual | **Vercel** | **Vercel** (`learnhub-v2-seven.vercel.app`, ya vivo) |

> **Verificado en producción (jun 2026):** `inpraxislabs.com.mx` responde con
> `server: Vercel` y hace `307 → www.inpraxislabs.com.mx`. El bundle es un build de
> Vite (assets con hash tipo `IPL_Logo_Horizontal_Oscuro-mFxgb3Fr.svg`). **No es
> Hostinger.** Cualquier instrucción previa que diga "Hostinger SMTP/hosting" aplica
> solo al correo, no al hosting del sitio.

**Conclusión:** una SPA estática **no puede ejecutar** Server Actions ni los handlers
de Auth.js de LearnHub. Fusionarlos en un repo obligaría a **reescribir toda la web a
Next.js** (semanas) y arriesgaría el SEO ya indexado. **Se descarta.**

---

## 1. La solución: dos proyectos Vercel, un dominio, vía `rewrite`

LearnHub y la web de marketing se despliegan como **dos proyectos Vercel
independientes**. Un **rewrite** en el proyecto de marketing hace que todo el tráfico
de `inpraxislabs.com.mx/learnhub*` se sirva, de forma transparente, desde el proyecto
de LearnHub. Para el visitante y para Google es **una sola web**.

```
                    inpraxislabs.com.mx  (dominio único)
                              │
                ┌─────────────┴──────────────┐
                │   Proyecto Vercel A          │   ← dominio apuntado aquí
                │   "ipl-web" (Vite SPA)       │
                │   vercel.json con rewrite ───┼──┐
                └──────────────────────────────┘  │
                                                   │ /learnhub/*  →  rewrite
                                                   ▼
                ┌──────────────────────────────────────────────┐
                │   Proyecto Vercel B  "ipl-learnhub" (Next 16)  │
                │   basePath = "/learnhub"                       │
                │   Auth.js + Turso + Server Actions             │
                └──────────────────────────────────────────────┘
```

### Por qué esta arquitectura y no otra

- **Riesgo cero sobre lo que ya funciona.** La SPA no se toca; el SEO actual sigue intacto.
- **LearnHub ya está casi listo** (vivo en su URL de Vercel). Solo se le añade `basePath`
  y se reapunta el tráfico. Caja rápida.
- **Aislamiento total de fallos.** Si LearnHub cae, la web de marketing sigue arriba, y
  viceversa. Despliegues independientes.
- **Cada stack en su entorno nativo.** Vite sirve estático (rápido, SEO); Next sirve la
  app con servidor. Nadie pelea con el runtime del otro.

> **Alternativas descartadas:** (a) reescribir IPL a Next.js → semanas, riesgo SEO;
> (b) iframe de LearnHub dentro de la SPA → rompe OAuth de Google (bloquea cookies
> de terceros), URLs no compartibles, mala UX; (c) subdominio `learnhub.inpraxislabs.com.mx`
> → válido técnicamente, pero el PDF de ventas y el posicionamiento piden `/learnhub`
> como ruta de la misma marca. El rewrite da la ruta sin los costos del iframe.

---

## 2. Cambios en LearnHub (Proyecto B) para vivir bajo `/learnhub`

LearnHub fue diseñado para correr en la raíz de su dominio. Para servirse bajo
`/learnhub`, **se le añade `basePath`**. Esto es un cambio de configuración, no de
arquitectura: Next.js reescribe automáticamente rutas internas, assets y llamadas a
`/api`.

### 2.1 `next.config.mjs`

```js
// next.config.mjs (LearnHub) — añadir basePath
const nextConfig = {
  basePath: "/learnhub",
  // ...config MDX existente (no se toca)
};
export default nextConfig;
```

Con `basePath`:
- Todas las rutas de la app pasan a colgar de `/learnhub` (`/learnhub/dashboard`,
  `/learnhub/login`, `/learnhub/teacher`, etc.).
- `next/link`, `next/image` y los assets de `public/` se prefijan solos. **No** se
  hardcodea `/learnhub` en el código; se deja que Next lo inyecte.
- Los handlers de API quedan en `/learnhub/api/auth/[...nextauth]` y
  `/learnhub/api/report/*`.

### 2.2 Variables de entorno de Auth.js (críticas)

`AUTH_URL` y `NEXT_PUBLIC_SITE_URL` deben reflejar el **dominio público + basePath**:

```bash
# .env de PRODUCCIÓN del Proyecto B (en Vercel, NO en el repo)
AUTH_URL=https://www.inpraxislabs.com.mx/learnhub
NEXT_PUBLIC_SITE_URL=https://www.inpraxislabs.com.mx/learnhub
AUTH_TRUST_HOST=true          # Auth.js v5 detrás de proxy/rewrite

# Turso (prod) — ya configurados según el estado actual
TURSO_DATABASE_URL=libsql://<db>-<org>.turso.io
TURSO_AUTH_TOKEN=<token>

AUTH_SECRET=<generado con `npx auth secret`>
AUTH_GOOGLE_ID=<client id>
AUTH_GOOGLE_SECRET=<client secret>
# ANTHROPIC_API_KEY: NO se pone en Vercel (la app desplegada no genera cursos)
```

### 2.3 Redirect URI en Google Cloud Console (obligatorio)

Auth.js construye el callback como `{AUTH_URL}/api/auth/callback/google`. Hay que
**registrar la URI exacta** en el cliente OAuth de Google, o el login con Google falla
con `redirect_uri_mismatch`:

```
https://www.inpraxislabs.com.mx/learnhub/api/auth/callback/google
```

Mantener también la de desarrollo:
```
http://localhost:3000/learnhub/api/auth/callback/google
```

> **Este es el error #1 que romperá la demo si se omite.** El callback debe incluir
> `/learnhub`. Si el dominio canónico es `www`, la URI lleva `www`.

---

## 3. Cambios en la web de marketing (Proyecto A)

### 3.1 `vercel.json` — el rewrite

En la **raíz del repo de la web Vite**, crear/editar `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/learnhub", "destination": "https://learnhub-v2-seven.vercel.app/learnhub" },
    { "source": "/learnhub/:path*", "destination": "https://learnhub-v2-seven.vercel.app/learnhub/:path*" }
  ]
}
```

> Reemplazar `learnhub-v2-seven.vercel.app` por el dominio Vercel **final** del
> Proyecto B una vez con `basePath` aplicado (puede ser el mismo si no se renombra).

**Orden importa:** este rewrite debe ir **antes** del fallback SPA (`/(.*) → /index.html`)
si existe. Las reglas de `rewrites` en Vercel se evalúan en orden; `/learnhub*` debe
capturarse antes de que el catch-all de la SPA lo mande a `index.html`.

Si el `vercel.json` actual ya tiene un rewrite catch-all para la SPA, queda así:

```json
{
  "rewrites": [
    { "source": "/learnhub", "destination": "https://learnhub-v2-seven.vercel.app/learnhub" },
    { "source": "/learnhub/:path*", "destination": "https://learnhub-v2-seven.vercel.app/learnhub/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3.2 Enlaces de la SPA hacia LearnHub

Los CTAs nuevos de la web (ver `IPL_MD_Maestro_Web.md`) apuntan a `/learnhub` con
enlaces normales `<a href="/learnhub">`. Al ser misma-origen tras el rewrite, no hay
CORS ni problema de cookies.

---

## 4. SEO de la ruta `/learnhub` (que cuente para el dominio)

El rewrite hace que Google vea el contenido de LearnHub **servido desde
`inpraxislabs.com.mx/learnhub`** (a diferencia de un redirect, que mandaría el crédito
SEO al dominio de Vercel). Para reforzarlo:

- **Canonical** de la landing de LearnHub (página pública de Next) →
  `https://www.inpraxislabs.com.mx/learnhub`. **No** dejar el canonical apuntando al
  dominio `*.vercel.app`.
- Añadir `/learnhub` al **sitemap** de la web principal.
- La landing pública de LearnHub (`app/page.tsx` del Proyecto B) debe tener su propio
  `<title>` y meta description orientados a "plataforma de cursos para academias".
- `robots.txt`: permitir indexar `/learnhub`.

---

## 5. Checklist de despliegue (orden exacto, verificable)

| # | Acción | Hecho cuando… |
|---|---|---|
| 1 | En LearnHub: añadir `basePath: "/learnhub"` a `next.config.mjs` | `npm run dev` sirve la app en `localhost:3000/learnhub` |
| 2 | En LearnHub: ajustar `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `AUTH_TRUST_HOST` (local y Vercel) | Variables presentes en el dashboard de Vercel del Proyecto B |
| 3 | En Google Cloud: registrar redirect URI con `/learnhub` (prod + local) | La URI aparece listada en el cliente OAuth |
| 4 | Redeploy del Proyecto B en Vercel | `https://<proyecto-b>.vercel.app/learnhub` carga y el login con Google funciona en esa URL |
| 5 | En la web Vite: crear/editar `vercel.json` con los 2 rewrites de `/learnhub*` | El archivo está en la raíz y commiteado |
| 6 | Redeploy del Proyecto A (web) | `https://www.inpraxislabs.com.mx/learnhub` muestra la landing de LearnHub |
| 7 | Smoke test E2E sobre el dominio real | (a) login Google en `/learnhub/login`; (b) alumno completa lección y % sube; (c) profesor abre grupo y descarga PDF — los 3 pasan en `inpraxislabs.com.mx/learnhub` |
| 8 | Canonical + sitemap + robots de `/learnhub` | Google Search Console acepta `/learnhub` como URL indexable |

---

## 6. Qué NO hacer (errores que rompen la integración)

- **No** copiar la carpeta de LearnHub dentro del repo de la SPA esperando que "corra".
  Una SPA estática no ejecuta el servidor de Next. (El código fuente que copiaste a
  `LearnHubV2.1` es **el repo del Proyecto B**, que se despliega aparte — no se
  fusiona con la web.)
- **No** usar `redirect` en lugar de `rewrite`: un redirect manda al usuario al dominio
  `.vercel.app` (URL fea, SEO al dominio equivocado). El rewrite mantiene la URL bonita.
- **No** hardcodear `/learnhub` en los `href` internos de LearnHub. `basePath` lo hace
  solo; duplicarlo genera `/learnhub/learnhub/...`.
- **No** olvidar `AUTH_TRUST_HOST=true`: detrás del rewrite, Auth.js v5 lo necesita para
  confiar en el host reenviado.
- **No** poner `ANTHROPIC_API_KEY` en Vercel: la app desplegada nunca llama al modelo;
  la generación de cursos es offline en tu máquina (principio #2 de LearnHub).

---

## 7. Relación entre los tres documentos del proyecto

| Documento | Responde a | Lo consume |
|---|---|---|
| `ARCHITECTURE.md` (LearnHub V2.1) | Cómo es LearnHub por dentro | Claude Code, al construir/operar LearnHub |
| **`IPL_Arquitectura_Integracion_LearnHub.md`** (este) | Cómo conviven web + LearnHub bajo un dominio | Claude Code, al desplegar la integración |
| `IPL_MD_Maestro_Web.md` | SEO + copy de la web con LearnHub al frente | Claude Code / agente, al reescribir la web |
| `IPL_Instrucciones_ClaudeCode_LearnHub.md` | Reglas y orden de ejecución para el agente | Claude Code, como `CLAUDE.md` del proyecto |

> **Fin.** Esta integración entrega LearnHub demostrable en `inpraxislabs.com.mx/learnhub`
> sin reescribir la web ni arriesgar el SEO actual, reutilizando el LearnHub ya
> desplegado. Ejecutar en el orden de §5.
