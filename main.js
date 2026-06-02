(function() {
  'use strict';

  // Add js-active class to document root to enable progressive enhancement animations
  document.documentElement.classList.add('js-active');

  // ============================================================
  // NEURAL NETWORK CANVAS
  // ============================================================
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, nodes = [], mouse = { x: -9999, y: -9999 }, scrollY = 0, isVisible = true;
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 35 : 95;
    const CONNECTION_DISTANCE = isMobile ? 120 : 170;
    const MOUSE_RADIUS = 140;
    const PARALLAX_FACTOR = 0.3;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          baseAlpha: Math.random() * 0.4 + 0.2,
          depth: Math.random() * 0.5 + 0.5 // parallax depth layer
        });
      }
    }

    function updateNodes() {
      const scrollNorm = Math.min(scrollY / Math.max(document.body.scrollHeight - height, 1), 1);
      const scrollActivation = 1 + scrollNorm * 0.5; // boost brightness as user scrolls

      // Update and filter temporary sparked nodes
      if (!prefersReducedMotion) {
        nodes = nodes.filter(node => {
          if (node.isTemporary) {
            node.life -= 0.015; // decay life over time
            node.baseAlpha = node.life * 0.75;
            node.vx *= 0.98; // ease particle speed to zero
            node.vy *= 0.98;
            return node.life > 0;
          }
          return true;
        });
      }

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Parallax offset based on scroll
          const parallaxY = scrollY * PARALLAX_FACTOR * node.depth;

          // Mouse interaction
          const dx = node.x - mouse.x;
          const dy = (node.y + parallaxY % height) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.02;
            node.vx += dx / dist * force;
            node.vy += dy / dist * force;
          }

          // Speed damping
          node.vx *= 0.995;
          node.vy *= 0.995;

          // Wrap around edges
          if (!node.isTemporary) {
            if (node.x < -50) node.x = width + 50;
            if (node.x > width + 50) node.x = -50;
            if (node.y < -50) node.y = height + 50;
            if (node.y > height + 50) node.y = -50;
          }
        }
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);
      const scrollNorm = Math.min(scrollY / (Math.max(document.body.scrollHeight - height, 1)), 1);
      const activation = 1 + scrollNorm * 0.6;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const pOffA = prefersReducedMotion ? 0 : (scrollY * PARALLAX_FACTOR * a.depth) % height;
          const pOffB = prefersReducedMotion ? 0 : (scrollY * PARALLAX_FACTOR * b.depth) % height;
          const ax = a.x, ay = a.y - pOffA;
          const bx = b.x, by = b.y - pOffB;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.25 * activation;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(201, 162, 75, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pOff = prefersReducedMotion ? 0 : (scrollY * PARALLAX_FACTOR * node.depth) % height;
        const nx = node.x, ny = node.y - pOff;

        // Mouse proximity glow
        const dx = nx - mouse.x;
        const dy = ny - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let glow = 0;
        if (dist < MOUSE_RADIUS) {
          glow = (1 - dist / MOUSE_RADIUS);
        }

        const alpha = (node.baseAlpha + glow * 0.6) * activation;
        const r = node.radius + glow * 2;

        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 75, ${Math.min(alpha, 1)})`;

        if (glow > 0.3) {
          ctx.shadowColor = 'rgba(201, 162, 75, 0.5)';
          ctx.shadowBlur = 15 * glow;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    function animate() {
      if (!isVisible) { requestAnimationFrame(animate); return; }
      updateNodes();
      drawFrame();
      requestAnimationFrame(animate);
    }

    // Init canvas
    resize();
    createNodes();

    if (prefersReducedMotion) {
      drawFrame(); // single static render
    } else {
      animate();
    }

    window.addEventListener('resize', () => { resize(); if (nodes.length === 0) createNodes(); }, { passive: true });
    let lastMousePos = { x: -999, y: -999 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (prefersReducedMotion) return;

      // Spark / spawn dynamic neural particles on cursor move
      const dx = mouse.x - lastMousePos.x;
      const dy = mouse.y - lastMousePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 20 && nodes.length < 180) { // Limit total active nodes for performance
        const nodeDepth = 0.7;
        const scrollOffset = prefersReducedMotion ? 0 : (scrollY * PARALLAX_FACTOR * nodeDepth) % height;
        nodes.push({
          x: mouse.x,
          y: mouse.y + scrollOffset, // Compensate for parallax scroll subtraction
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 1.2,
          baseAlpha: 0.8,
          depth: nodeDepth,
          isTemporary: true,
          life: 1.0
        });
        lastMousePos.x = mouse.x;
        lastMousePos.y = mouse.y;
      }
    }, { passive: true });
    window.addEventListener('scroll', () => { scrollY = window.pageYOffset; }, { passive: true });
    document.addEventListener('visibilitychange', () => { isVisible = !document.hidden; });

    // Touch support for mobile
    if (isMobile) {
      window.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        mouse.x = t.clientX;
        mouse.y = t.clientY;
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        mouse.x = t.clientX;
        mouse.y = t.clientY;
      }, { passive: true });
      window.addEventListener('touchend', () => {
        setTimeout(() => { mouse.x = -9999; mouse.y = -9999; }, 2000);
      }, { passive: true });
    }
  }

  // ============================================================
  // NAV — scroll effect + mobile toggle
  // ============================================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', open);
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length > 0) {
    if (!prefersReducedMotion) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });

      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('visible'));
    }
  }

  // ============================================================
  // FOOTER YEAR
  // ============================================================
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ============================================================
  // FORM SUBMISSION (with webhook placeholder)
  // ============================================================
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const webhookUrl = form.getAttribute('action');

      if (webhookUrl.includes('PLACEHOLDER') || webhookUrl === '') {
        showFormSuccess();
        console.warn('⚠️ Formulario enviado, pero el webhook de n8n es un placeholder. Configura el action del formulario con tu URL de webhook real.');
        console.log('Datos del formulario:', data);
        return;
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          showFormSuccess();
        } else {
          alert('Hubo un error al enviar. Por favor, intenta por WhatsApp.');
        }
      })
      .catch(() => {
        alert('Hubo un error de conexión. Por favor, intenta por WhatsApp.');
      });
    });

    function showFormSuccess() {
      // Redirect to /gracias/ page for tracking
      window.location.href = '/gracias/';
    }
  }

  // ============================================================
  // SMOOTH SCROLL (for anchor links)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // ============================================================
  // MAGNETIC SPOTLIGHT CARDS
  // ============================================================
  const cards = document.querySelectorAll('.service-card, .problem-card, .why-card, .package-card, .subpage-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });

  // ============================================================
  // TYPEWRITER EFFECT IN HERO H1
  // ============================================================
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const phrases = [
      "IA y automatización",
      "chatbots de citas",
      "asistentes inteligentes",
      "sistemas automáticos"
    ];
    let phraseIdx = 0;
    let charIdx = phrases[phraseIdx].length;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        charIdx--;
        typingSpeed = 40; // faster deletion
      } else {
        charIdx++;
        typingSpeed = 100; // standard typing speed
      }

      typewriter.textContent = currentPhrase.substring(0, charIdx);

      if (!isDeleting && charIdx === currentPhrase.length) {
        typingSpeed = 2200; // pause on full phrase
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // brief pause before typing next
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1800); // Start after animations complete
  }

  // ============================================================
  // COLLAPSIBLE FAQ ACCORDION
  // ============================================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other active items
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
        }
      });
      
      item.classList.toggle('active', !isActive);
    });
  });

})();


  // ============================================================
  // BLOQUE 3: DEMO INTERACTIVO — SIMULADOR DE FLUJOS n8n (MD MAESTRO v2)
  // ============================================================
  const demoData = {
    leads: {
      nodes: [
        { step: "Paso 1", icon: "💬", title: "Paciente escribe" },
        { step: "Paso 2", icon: "🧠", title: "IA interpreta" },
        { step: "Paso 3", icon: "📅", title: "Consulta agenda" },
        { step: "Paso 4", icon: "📝", title: "Agenda la cita" },
        { step: "Paso 5", icon: "🔔", title: "Confirma + recordatorio" }
      ],
      before: "4 horas al día contestando. Mensajes perdidos. Pacientes que se van desesperados con la competencia.",
      after: "Respuesta en <2 min, 24/7. <strong>~20 horas tuyas, de vuelta cada mes.</strong>",
      whatsapp: "Hola Abelardo, me interesó el flujo de Respuesta de Leads y quiero recuperar mi tiempo."
    },
    cotizacion: {
      nodes: [
        { step: "Paso 1", icon: "📩", title: "Cliente pide" },
        { step: "Paso 2", icon: "⚙️", title: "IA arma propuesta" },
        { step: "Paso 3", icon: "🧾", title: "Genera CFDI 4.0" },
        { step: "Paso 4", icon: "✉️", title: "Envía por correo" }
      ],
      before: "Horas cotizando a mano en Word. Propuestas tardías. Facturas que se retrasan y cobranza lenta.",
      after: "Cotizaciones listas en 3 minutos. Facturación al instante. <strong>Ahorro de ~15 horas al mes.</strong>",
      whatsapp: "Hola Abelardo, me interesó el flujo de Cotización y Facturación Automática y quiero recuperar mi tiempo."
    },
    reporte: {
      nodes: [
        { step: "Paso 1", icon: "📊", title: "Se juntan datos" },
        { step: "Paso 2", icon: "🧠", title: "IA redacta resumen" },
        { step: "Paso 3", icon: "📱", title: "WhatsApp cada lunes" }
      ],
      before: "Abrir 5 Excel distintos el domingo en la noche. Errores de captura y sin dirección de KPIs.",
      after: "Diagnóstico operativo cada lunes a las 8:00 AM. Control absoluto. <strong>Toma decisiones en 5 minutos.</strong>",
      whatsapp: "Hola Abelardo, me interesó el flujo de Reporte Semanal del Negocio y quiero recuperar mi tiempo."
    }
  };

  let demoTimeout = null;
  let activeAnimationFrames = [];

  function clearAllSimulations() {
    if (demoTimeout) {
      clearTimeout(demoTimeout);
      demoTimeout = null;
    }
    activeAnimationFrames.forEach(frame => cancelAnimationFrame(frame));
    activeAnimationFrames = [];
  }

  function runDemoSimulation(tabKey) {
    clearAllSimulations();

    const data = demoData[tabKey];
    const diagramEl = document.getElementById('demo-diagram');
    if (!diagramEl) return;

    // Render nodes and connectors
    let html = '';
    data.nodes.forEach((node, idx) => {
      html += `
        <div class="demo-node" id="node-${idx}">
          <span class="demo-node-step">${node.step}</span>
          <div class="demo-node-icon">${node.icon}</div>
          <div class="demo-node-info">
            <h4>${node.title}</h4>
          </div>
        </div>
      `;
      if (idx < data.nodes.length - 1) {
        html += `
          <div class="demo-connector" id="connector-${idx}">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <line x1="0" y1="10" x2="100" y2="10" class="demo-connection-line"></line>
              <line x1="0" y1="10" x2="100" y2="10" class="demo-connection-line-active" id="line-active-${idx}"></line>
              <circle cx="0" cy="10" r="5" class="demo-pulse-circle" id="pulse-${idx}" style="display: none;"></circle>
            </svg>
          </div>
        `;
      }
    });

    diagramEl.innerHTML = html;

    // Simulation Loop States
    let state = 0; // 2 * idx = Node active, 2 * idx + 1 = pulse travelling
    const maxStates = 2 * data.nodes.length - 1;

    function stepSimulation() {
      // Clear previous active elements
      for (let i = 0; i < data.nodes.length; i++) {
        const node = document.getElementById(`node-${i}`);
        if (node) node.classList.remove('active');
      }
      for (let i = 0; i < data.nodes.length - 1; i++) {
        const line = document.getElementById(`line-active-${i}`);
        const pulse = document.getElementById(`pulse-${i}`);
        if (line) line.style.opacity = '0';
        if (pulse) {
          pulse.style.display = 'none';
          pulse.setAttribute('cx', '0');
        }
      }

      if (state % 2 === 0) {
        // Active Node state
        const nodeIdx = state / 2;
        const node = document.getElementById(`node-${nodeIdx}`);
        if (node) node.classList.add('active');
        state = (state + 1) % maxStates;
        demoTimeout = setTimeout(stepSimulation, 1200); // 1.2s pause on node
      } else {
        // Pulse Travel state
        const connIdx = Math.floor(state / 2);
        const pulse = document.getElementById(`pulse-${connIdx}`);
        const line = document.getElementById(`line-active-${connIdx}`);
        if (pulse && line) {
          pulse.style.display = 'block';
          line.style.opacity = '1';

          let progress = 0;
          const duration = 650; // 650ms transit
          const startTime = performance.now();

          function animatePulse(timestamp) {
            const elapsed = timestamp - startTime;
            progress = Math.min(elapsed / duration, 1);
            pulse.setAttribute('cx', (progress * 100).toString());

            if (progress < 1) {
              const frame = requestAnimationFrame(animatePulse);
              activeAnimationFrames.push(frame);
            } else {
              pulse.style.display = 'none';
              state = (state + 1) % maxStates;
              stepSimulation();
            }
          }
          const frame = requestAnimationFrame(animatePulse);
          activeAnimationFrames.push(frame);
        } else {
          state = (state + 1) % maxStates;
          stepSimulation();
        }
      }
    }

    stepSimulation();
  }

  // Bind Tab Click Handlers
  const tabButtons = document.querySelectorAll('.demo-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('active')) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const tabKey = this.getAttribute('data-tab');
      const data = demoData[tabKey];

      // Update calculations and copy
      const beforeText = document.getElementById('demo-before-text');
      const afterText = document.getElementById('demo-after-text');
      const ctaBtn = document.getElementById('demo-cta');

      if (beforeText) beforeText.innerHTML = data.before;
      if (afterText) afterText.innerHTML = data.after;
      if (ctaBtn) {
        ctaBtn.href = `https://wa.me/527224282246?text=${encodeURIComponent(data.whatsapp)}`;
      }

      runDemoSimulation(tabKey);
    });
  });

  // Setup Viewport Intersection Observer for simulation
  if (typeof IntersectionObserver !== 'undefined') {
    const flowContainer = document.querySelector('.demo-flow-container');
    const demoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeTab = document.querySelector('.demo-tab.active');
          const tabKey = activeTab ? activeTab.getAttribute('data-tab') : 'leads';
          runDemoSimulation(tabKey);
        } else {
          clearAllSimulations();
        }
      });
    }, { threshold: 0.15 });

    if (flowContainer) {
      demoObserver.observe(flowContainer);
    }
  } else {
    // Fallback if IntersectionObserver is not supported
    runDemoSimulation('leads');
  }

  // ============================================================
  // CONTADORES ANIMADOS — "los números se animan" (MD-MAESTRO-VISUAL)
  // ============================================================
  (function() {
    const counters = document.querySelectorAll('.count');
    if (!counters.length) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function format(el, value) {
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const num = value.toLocaleString('es-MX', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      el.textContent = prefix + num + suffix;
    }

    function animateCounter(el) {
      const target = parseFloat(el.dataset.to);
      if (isNaN(target)) return;
      if (reduceMotion) { format(el, target); return; }
      const duration = 1400;
      const start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        format(el, target * eased);
        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          format(el, target);
        }
      }
      requestAnimationFrame(frame);
    }

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      counters.forEach(el => format(el, parseFloat(el.dataset.to)));
      return;
    }

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => countObserver.observe(el));
  })();

  // ============================================================
  // LÍNEA DE PROGRESO DEL PROCESO — fill dorado + encendido secuencial
  // ============================================================
  (function() {
    const timeline = document.querySelector('.process-timeline');
    if (!timeline) return;
    const steps = timeline.querySelectorAll('.process-step');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function activate() {
      timeline.classList.add('filling');
      if (reduceMotion) {
        steps.forEach(s => s.classList.add('lit'));
        return;
      }
      steps.forEach((step, i) => {
        setTimeout(() => step.classList.add('lit'), 300 + i * 450);
      });
    }

    if (typeof IntersectionObserver === 'undefined') {
      activate();
      return;
    }

    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activate();
          processObserver.unobserve(timeline);
        }
      });
    }, { threshold: 0.4 });

    processObserver.observe(timeline);
  })();
