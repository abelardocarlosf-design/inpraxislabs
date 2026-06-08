# IPL_Instrucciones_ClaudeCode_LearnHub.md
### CLAUDE.md del proyecto — Integración de LearnHub V2.1 en inpraxislabs.com.mx

> Copia este archivo como `CLAUDE.md` en la raíz del workspace donde tengas **ambos**
> proyectos (la web Vite y el repo `LearnHubV2.1`). Define qué construir, en qué orden y
> las reglas no negociables. Hereda las reglas de ahorro de tokens del proyecto.

---

## CONTEXTO EN UNA FRASE

Montar **LearnHub V2.1** (Next.js 16, repo `LearnHubV2.1`, ya funcional) en
`inpraxislabs.com.mx/learnhub` **sin reescribir** la web de marketing actual (Vite/React
SPA en Vercel), y reescribir el copy + SEO de la web para poner LearnHub al frente como
producto estrella.

## DOCUMENTOS FUENTE (leer ANTES de tocar código)

1. `ARCHITECTURE.md` — cómo es LearnHub por dentro (no lo reescribas; es ley).
2. `IPL_Arquitectura_Integracion_LearnHub.md` — cómo conviven web + LearnHub (rewrite + basePath). **Crítico.**
3. `IPL_MD_Maestro_Web.md` — copy y SEO nuevos de la web.

> No empieces a programar sin haber leído los 3. Si algo de estos documentos contradice
> una suposición tuya, gana el documento.

---

## HECHOS DEL ENTORNO (no re-descubrir)

- Web de marketing: **Vite + React SPA**, desplegada en **Vercel** (no Hostinger). Sirve
  estático. **No tiene servidor.**
- LearnHub: **Next.js 16 App Router**, con servidor (Server Actions, Auth.js, Turso).
  Vivo en `learnhub-v2-seven.vercel.app`. Credenciales y código ya configurados.
- Son **dos repos / dos proyectos Vercel distintos.** No se fusionan. Se unen por
  `rewrite`. (El código que se copió a la carpeta `LearnHubV2.1` ES el repo del Proyecto
  B; se despliega aparte, NO dentro de la web.)
- Dominio canónico: **`www.inpraxislabs.com.mx`** (la raíz hace 307 a www).
- WhatsApp correcto del negocio: **56 5040 5218** (`wa.me/525650405218`). La web vieja
  tiene `wa.me/527224282246` — está MAL, reemplazar.

---

## ORDEN DE EJECUCIÓN (fases con criterio de "hecho")

### FASE 1 — LearnHub bajo `/learnhub` (Proyecto B)
1. Añadir `basePath: "/learnhub"` a `next.config.mjs` de LearnHub.
2. Verificar que NO haya rutas/href con `/learnhub` hardcodeado (basePath lo inyecta).
3. Ajustar env locales: `AUTH_URL=http://localhost:3000/learnhub`,
   `NEXT_PUBLIC_SITE_URL=http://localhost:3000/learnhub`, `AUTH_TRUST_HOST=true`.
4. `npm run dev` → confirmar que la app carga en `localhost:3000/learnhub` y que el login
   con Google funciona en local (requiere redirect URI local registrada en Google Cloud).

**Hecho cuando:** `localhost:3000/learnhub/login` entra con Google y cae en
`/learnhub/dashboard`. Evidencia: captura o log del flujo OK.

### FASE 2 — Google Cloud + env de producción (Proyecto B)
5. Registrar redirect URI en el cliente OAuth de Google:
   `https://www.inpraxislabs.com.mx/learnhub/api/auth/callback/google` (prod) y la local.
6. En Vercel (Proyecto B), setear env de prod:
   `AUTH_URL` y `NEXT_PUBLIC_SITE_URL` = `https://www.inpraxislabs.com.mx/learnhub`,
   `AUTH_TRUST_HOST=true`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`,
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`. **NO** poner `ANTHROPIC_API_KEY`.
7. Redeploy del Proyecto B.

**Hecho cuando:** `https://<proyecto-b>.vercel.app/learnhub` carga y el login Google
funciona EN ESA URL de prod.

### FASE 3 — Rewrite en la web (Proyecto A)
8. En la raíz del repo de la web Vite, crear/editar `vercel.json` con los 2 rewrites de
   `/learnhub` y `/learnhub/:path*` apuntando al dominio Vercel del Proyecto B, **antes**
   del catch-all SPA (ver §3.1 de `IPL_Arquitectura_Integracion_LearnHub.md`).
9. Redeploy del Proyecto A.

**Hecho cuando:** `https://www.inpraxislabs.com.mx/learnhub` muestra la landing de
LearnHub (no la SPA) y los 3 flujos E2E pasan SOBRE EL DOMINIO REAL.

### FASE 4 — Reescritura de la web (copy + SEO)
10. Aplicar `IPL_MD_Maestro_Web.md` sobre la SPA: hero LearnHub, bloques 01–05, condensar
    automatización (07), pivote (06), contacto (09).
11. Reemplazar **todos** los `wa.me/527224282246` por `wa.me/525650405218`.
12. Actualizar `<title>`, meta description, OG, canonical (§3.1 del MD maestro).
13. Inyectar JSON-LD `Organization` + `SoftwareApplication` (§3.2).
14. Reparar enlace roto de aviso de privacidad.
15. Añadir `/learnhub` al sitemap; permitirlo en robots.

**Hecho cuando:** la home presenta LearnHub como héroe con CTA a `/learnhub` funcionando,
el WhatsApp es el correcto en todos los enlaces, y el HTML servido trae los nuevos metas.

---

## REGLAS NO NEGOCIABLES

- **No fusiones los repos.** La SPA no ejecuta el servidor de Next. Si te ves "copiando
  archivos de LearnHub dentro de la web", detente: vas mal.
- **`rewrite`, nunca `redirect`** para `/learnhub`. Redirect manda al `.vercel.app` (URL
  fea + SEO al dominio equivocado).
- **No hardcodees `/learnhub`** en hrefs internos de LearnHub. `basePath` lo hace solo.
- **`AUTH_TRUST_HOST=true`** obligatorio (Auth.js v5 detrás del rewrite).
- **Secretos solo en Vercel**, nunca en el repo. `ANTHROPIC_API_KEY` NO va a Vercel.
- **No reescribas la web a Next.js.** Riesgo SEO + semanas de trabajo. Está prohibido por
  alcance.
- **El contenido de LearnHub son archivos** en `content/courses/`; no lo metas a la DB.
- **Posicionamiento del copy:** LearnHub = "campus de cursos a tu marca", NO sistema de
  gestión escolar con cobranza. No prometas login cloud de alumnos masivo ni pagos
  integrados.

---

## REGLAS DE TRABAJO (ahorro de tokens)

- Lee los 3 documentos fuente y el `git log` antes de codear. No asumas.
- Edita parcial (Edit), no reescribas archivos completos salvo cambio >80%.
- Valida antes de declarar hecho: `npm run dev`, `npm run validate`, `npm run test`,
  smoke test del flujo. Nunca digas "listo" sin evidencia.
- Respuestas de 1–3 oraciones, sin preámbulo ni adulación. El diff habla.
- No releas archivos ya leídos. Paraleliza lecturas independientes.
- Una pregunta a la vez si falta algo; si puedes asumir un supuesto razonable, hazlo y
  señálalo.

---

## VALIDACIÓN FINAL (los 3 flujos que deben pasar en `inpraxislabs.com.mx/learnhub`)

1. **Login:** `/learnhub/login` → "Entrar con Google" → `/learnhub/dashboard` como alumno.
2. **Alumno:** completa una lección → el % de avance sube → descarga su PDF de progreso.
3. **Profesor:** abre un grupo → ve el avance de sus alumnos → descarga el PDF del grupo;
   un usuario ajeno recibe 403.

Más: la home pública de IPL muestra LearnHub como héroe, todos los `wa.me` usan
`525650405218`, y `/learnhub` aparece en el sitemap con canonical al dominio propio.

> Si los 3 flujos pasan sobre el dominio real y la home quedó con LearnHub al frente, la
> integración está hecha. Reporta con evidencia, no con narrativa.
