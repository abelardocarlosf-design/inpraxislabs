# CLAUDE.md — In Praxis Labs · web + LearnHub

Guía operativa del repo para Claude Code. Si algo aquí contradice una suposición tuya,
gana este documento. Documentos fuente de detalle: `IPL_MD_Maestro_Web.md`,
`IPL_Arquitectura_Integracion_LearnHub.md`, `IPL_Instrucciones_ClaudeCode_LearnHub.md`,
y `LearnHubV2.1/ARCHITECTURE.md` (este último es **ley**: no lo reescribas).

## Contexto en una frase

LearnHub (plataforma de cursos propia, producto estrella) montado en
`inpraxislabs.com.mx/learnhub` **sin reescribir** la web de marketing, con LearnHub al
frente como héroe y la automatización para clínicas/servicios como segunda línea.

## Hechos del entorno (no re-descubrir)

- **Web de marketing**: Vite **multipágina** (HTML/JS/CSS vanilla, no React, no SPA).
  Cada carpeta con `index.html` es una página; las entradas viven en `vite.config.js`.
  Desplegada en **Vercel** (no Hostinger). Sin servidor.
- **LearnHub**: `LearnHubV2.1/` — repo Next.js 16 con **su propio `.git`**, anidado pero
  **independiente**. Tiene servidor (Server Actions, Auth.js v5, Turso). Se despliega
  como **proyecto Vercel aparte**. **NO se fusiona** con la web.
- **Unión**: `vercel.json` de la web hace `rewrite` de `/learnhub*` →
  `learnhub-v2-seven.vercel.app/learnhub*`. Para Google y el visitante es una sola web.
- **Dominio canónico**: `www.inpraxislabs.com.mx` (la raíz hace 307 a www).
- **WhatsApp del negocio**: `525650405218` (`wa.me/525650405218`). El viejo
  `527224282246` está MAL y ya fue reemplazado en todo el repo.

## Reglas no negociables

- **No fusiones los repos.** Si te ves copiando archivos de LearnHub dentro de la web,
  detente. La web estática no ejecuta el servidor de Next.
- **`rewrite`, nunca `redirect`** para `/learnhub` (un redirect manda al `.vercel.app`:
  URL fea + SEO al dominio equivocado).
- **El `vercel.json` de la web NO lleva catch-all** `→ /index.html`: rompería el routing
  multipágina de Vite. Solo los 2 rewrites de `/learnhub`.
- **No hardcodees `/learnhub`** en código. Donde se necesite la ruta base, derívala de
  `NEXT_PUBLIC_SITE_URL` (helper `LearnHubV2.1/src/lib/base-path.ts` → `BASE_PATH`).
- **`AUTH_TRUST_HOST=true`** obligatorio (Auth.js v5 detrás del rewrite).
- **Secretos solo en Vercel**, nunca en el repo. **`ANTHROPIC_API_KEY` NO va a Vercel**
  (la app desplegada no genera cursos; eso es offline en tu máquina).
- **No reescribas la web a Next.js** (riesgo SEO + semanas). Prohibido por alcance.
- **Copy de LearnHub** = "campus de cursos a tu marca" (login Google + grupos + reportes).
  NO sistema de gestión escolar con cobranza ni inscripción pública masiva.

## basePath: lo que Next NO prefija solo (¡cuidado!)

`basePath` de Next prefija `next/link`, `next/image` y `public/`. **NO** prefija:
`fetch()` manuales, el cliente de next-auth, ni `NextResponse.redirect` del middleware.
Ya está resuelto (todo vía `BASE_PATH` derivado de `NEXT_PUBLIC_SITE_URL`):
- `src/components/Quiz.tsx` → `fetch(\`${BASE_PATH}/api/progress/...\`)`.
- `src/components/Providers.tsx` → `SessionProvider basePath={\`${BASE_PATH}/api/auth\`}`
  (sin esto `signIn` pega a `/api/auth` y el login falla). Montado en `src/app/layout.tsx`.
- `middleware.ts` → redirects con `nextUrl.clone()` + set `.pathname`.
Si tocas auth/fetch/redirects, respeta este patrón.

## Estado actual

Hecho y verificado por build: web reescrita (LearnHub héroe, SEO/JSON-LD/canonical/OG en
`www`), WhatsApp corregido en todo el repo, sitemap+robots con `/learnhub`, `vercel.json`
con rewrites, LearnHub con `basePath` + fixes (build OK, 39 páginas).

**Pendiente manual (no ejecutable por el agente — requiere Google Cloud / Vercel / navegador):**
1. Google Cloud: redirect URI `https://www.inpraxislabs.com.mx/learnhub/api/auth/callback/google` (+ local).
2. Vercel Proyecto B: env de prod (`AUTH_URL`/`NEXT_PUBLIC_SITE_URL`=`.../learnhub`,
   `AUTH_TRUST_HOST=true`, Turso, `AUTH_SECRET`, `AUTH_GOOGLE_*`; sin `ANTHROPIC_API_KEY`) → redeploy.
3. Confirmar que el dominio del Proyecto B coincide con el del `vercel.json` → redeploy Proyecto A.
4. Smoke test E2E en el dominio real: login Google → `/learnhub/dashboard`; alumno completa
   lección y sube %; profesor descarga PDF de grupo (ajeno = 403).

## Reglas de trabajo

- Lee los documentos fuente y `git log` antes de codear. No asumas.
- Edita parcial (`Edit`); no reescribas archivos completos salvo cambio >80%.
- Valida antes de declarar hecho: web `npm run build`; LearnHub `npx tsc --noEmit` +
  `npm run build` (o `npm run validate` para contenido). Reporta con evidencia, no narrativa.
- Respuestas breves, sin preámbulo. El diff habla.

## Comandos

```bash
# Web de marketing (raíz)
npm run dev        # vite --host
npm run build      # prebuild genera sitemap (a www) + vite build

# LearnHub (LearnHubV2.1/)
npm run dev        # next dev → localhost:3000/learnhub
npm run build      # prisma generate + next build
npm run validate   # valida contenido de cursos
```
