import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'aviso-de-privacidad': resolve(__dirname, 'aviso-de-privacidad/index.html'),
        'terminos-y-condiciones': resolve(__dirname, 'terminos-y-condiciones/index.html'),
        'servicios': resolve(__dirname, 'servicios/index.html'),
        'servicios/paginas-web-para-clinicas': resolve(__dirname, 'servicios/paginas-web-para-clinicas/index.html'),
        'servicios/chatbot-whatsapp-citas-ia': resolve(__dirname, 'servicios/chatbot-whatsapp-citas-ia/index.html'),
        'servicios/automatizacion-procesos-n8n': resolve(__dirname, 'servicios/automatizacion-procesos-n8n/index.html'),
        'servicios/auditoria-digital-gratuita': resolve(__dirname, 'servicios/auditoria-digital-gratuita/index.html'),
        'contacto': resolve(__dirname, 'contacto/index.html'),
        'gracias': resolve(__dirname, 'gracias/index.html'),
        'zonas': resolve(__dirname, 'zonas/index.html'),
        'zonas/toluca': resolve(__dirname, 'zonas/toluca/index.html'),
        'zonas/metepec': resolve(__dirname, 'zonas/metepec/index.html'),
        'zonas/lerma': resolve(__dirname, 'zonas/lerma/index.html'),
        'zonas/cdmx': resolve(__dirname, 'zonas/cdmx/index.html'),
        'industrias': resolve(__dirname, 'industrias/index.html'),
        'industrias/clinicas-dentales': resolve(__dirname, 'industrias/clinicas-dentales/index.html'),
        'industrias/medicina-estetica-dermatologia': resolve(__dirname, 'industrias/medicina-estetica-dermatologia/index.html'),
        'industrias/nutricion-clinica': resolve(__dirname, 'industrias/nutricion-clinica/index.html'),
        'industrias/fisioterapia-rehabilitacion': resolve(__dirname, 'industrias/fisioterapia-rehabilitacion/index.html'),
        'industrias/veterinaria': resolve(__dirname, 'industrias/veterinaria/index.html'),
        'sobre-nosotros': resolve(__dirname, 'sobre-nosotros/index.html'),
        'comparativas': resolve(__dirname, 'comparativas/index.html'),
        'comparativas/learnhub-vs-italki-preply-cambly': resolve(__dirname, 'comparativas/learnhub-vs-italki-preply-cambly/index.html'),
        'comparativas/learnhub-vs-thinkific-kajabi': resolve(__dirname, 'comparativas/learnhub-vs-thinkific-kajabi/index.html'),
        'casos': resolve(__dirname, 'casos/index.html'),
        'blog': resolve(__dirname, 'blog/index.html'),
        'blog/como-conseguir-alumnos-clases-de-ingles': resolve(__dirname, 'blog/como-conseguir-alumnos-clases-de-ingles/index.html'),
        'blog/cuanto-cobrar-clases-de-ingles-mexico': resolve(__dirname, 'blog/cuanto-cobrar-clases-de-ingles-mexico/index.html'),
        'blog/como-crear-academia-de-ingles-en-linea': resolve(__dirname, 'blog/como-crear-academia-de-ingles-en-linea/index.html'),
        'blog/como-reducir-no-shows-clinica-dental-ia': resolve(__dirname, 'blog/como-reducir-no-shows-clinica-dental-ia/index.html'),
        'blog/cuanto-cuesta-automatizar-agenda-consultorio-mexico': resolve(__dirname, 'blog/cuanto-cuesta-automatizar-agenda-consultorio-mexico/index.html'),
        'blog/google-maps-vs-pagina-web-clinica': resolve(__dirname, 'blog/google-maps-vs-pagina-web-clinica/index.html'),
      }
    }
  }
});
