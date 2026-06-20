import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.inpraxislabs.com.mx';

// Rutas extra que no son páginas construidas por Vite (se sirven vía rewrite).
// LearnHub vive en el Proyecto B y se monta en /learnhub con un rewrite de Vercel.
const EXTRA_ROUTES = ['/learnhub/', '/brujula/'];

// Directories to ignore completely
const IGNORE_DIRS = new Set([
  'node_modules',
  'dist',
  'public',
  '.git',
  '.gemini',
  'gracias', // Thank you page (disallowed in robots.txt)
  'Logo',
  'LearnHubV2.1', // Repo anidado de Next.js: se sirve por rewrite, no por Vite.
  'BARBERSHOP CONTROL', // Brújula Estética (Next anidado): se sirve por rewrite, no por Vite.
  'coverage', // Reportes de cobertura de tests (HTML), no son páginas públicas.
]);

// Determine changefreq and priority based on route path
function getRouteMeta(route) {
  if (route === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (route === '/learnhub/') {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (route === '/brujula/') {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (route.startsWith('/servicios/')) {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  if (route === '/servicios/') {
    return { changefreq: 'monthly', priority: '0.9' };
  }
  if (route === '/contacto/') {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  if (route === '/sobre-nosotros/') {
    return { changefreq: 'yearly', priority: '0.7' };
  }
  if (route === '/casos/') {
    return { changefreq: 'weekly', priority: '0.7' };
  }
  if (route === '/blog/') {
    return { changefreq: 'weekly', priority: '0.8' };
  }
  if (route.startsWith('/blog/')) {
    return { changefreq: 'monthly', priority: '0.7' };
  }
  if (route.startsWith('/zonas/')) {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  if (route.startsWith('/industrias/')) {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  if (route === '/aviso-de-privacidad/' || route === '/terminos-y-condiciones/') {
    return { changefreq: 'yearly', priority: '0.5' };
  }
  return { changefreq: 'monthly', priority: '0.6' };
}

// Recursively find all HTML page routes
function findHtmlPages(dir, relativePath = '') {
  let pages = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (IGNORE_DIRS.has(file)) continue;
      pages = pages.concat(findHtmlPages(fullPath, path.join(relativePath, file)));
    } else if (file === 'index.html') {
      pages.push(relativePath);
    }
  }
  return pages;
}

// Generate the sitemap XML content
function generateSitemap() {
  console.log('Generating sitemap...');
  const relativePages = findHtmlPages(__dirname);
  
  // Format today's date
  const lastmod = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Sort pages for neat ordering (shorter/alphabetical paths first)
  relativePages.sort((a, b) => {
    const aLen = a.split(path.sep).length;
    const bLen = b.split(path.sep).length;
    if (aLen !== bLen) return aLen - bLen;
    return a.localeCompare(b);
  });

  // Rutas construidas por Vite + rutas extra servidas por rewrite (LearnHub)
  const routes = [
    ...relativePages.map((relPage) => {
      const cleanPath = relPage.replace(/\\/g, '/');
      return cleanPath ? `/${cleanPath}/` : '/';
    }),
    ...EXTRA_ROUTES,
  ];

  for (const route of routes) {
    const { changefreq, priority } = getRouteMeta(route);
    const loc = `${BASE_URL}${route}`;

    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Ensure public folder exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write sitemap to public/sitemap.xml (for Vite build copy) and root (for git tracking)
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  
  console.log(`Sitemap successfully generated with ${relativePages.length} URLs!`);
}

generateSitemap();
