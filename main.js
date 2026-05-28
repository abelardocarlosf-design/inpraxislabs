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
            ctx.strokeStyle = `rgba(52, 224, 196, ${alpha})`;
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
        ctx.fillStyle = `rgba(52, 224, 196, ${Math.min(alpha, 1)})`;

        if (glow > 0.3) {
          ctx.shadowColor = 'rgba(52, 224, 196, 0.5)';
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
