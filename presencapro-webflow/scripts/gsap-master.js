/**
 * PresençaPro — GSAP Master Script
 * Inserir antes do </body> no Webflow Project Settings → Custom Code
 * Requer: GSAP 3.x + ScrollTrigger (carregados via CDN no head)
 */

// ─── CDN (adicionar no <head>) ───────────────────────────────────────────────
// <link rel="preconnect" href="https://cdnjs.cloudflare.com">
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
// ─────────────────────────────────────────────────────────────────────────────

(function() {
  'use strict';

  // Aguardar DOM + GSAP carregado
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(init, 100);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    
    setupNavbar();
    setupHeroAnimations();
    setupScrollReveal();
    setupCounters();
    setupCardHovers();
    setupScrollProgress();
    setupPageTransition();
    console.log('[PresençaPro] GSAP iniciado ✓');
  }

  // ─── 1. NAVBAR (scroll state) ─────────────────────────────────────────────
  function setupNavbar() {
    const navbar = document.querySelector('[data-el="navbar"]');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        if (self.progress > 0) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      }
    });
  }

  // ─── 2. HERO (stagger + parallax leve) ───────────────────────────────────
  function setupHeroAnimations() {
    const heroEls = document.querySelectorAll('[data-hero-anim]');
    if (!heroEls.length) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Badge no topo
    tl.from('[data-hero-badge]', { 
      opacity: 0, y: -16, duration: 0.5 
    }, 0.2);

    // Headline: cada palavra em stagger
    const headline = document.querySelector('[data-hero-headline]');
    if (headline) {
      // Split simples por span (no Webflow, envolve cada palavra manualmente com <span class="word">)
      const words = headline.querySelectorAll('.word');
      if (words.length) {
        tl.from(words, {
          opacity: 0,
          y: 40,
          rotationX: -15,
          stagger: 0.04,
          duration: 0.7,
          transformOrigin: 'top center'
        }, 0.3);
      } else {
        tl.from(headline, { opacity: 0, y: 40, duration: 0.8 }, 0.3);
      }
    }

    // Subheadline
    tl.from('[data-hero-sub]', { 
      opacity: 0, y: 24, duration: 0.7 
    }, 0.6);

    // CTAs
    tl.from('[data-hero-cta]', { 
      opacity: 0, y: 16, stagger: 0.1, duration: 0.5 
    }, 0.8);

    // Social proof / trust badges
    tl.from('[data-hero-trust]', { 
      opacity: 0, y: 12, stagger: 0.08, duration: 0.4 
    }, 1.0);

    // Mockup / 3D element
    tl.from('[data-hero-visual]', {
      opacity: 0,
      y: 60,
      scale: 0.94,
      duration: 1.0,
      ease: 'power2.out'
    }, 0.5);

    // Parallax subtil no visual
    const heroVisual = document.querySelector('[data-hero-visual]');
    if (heroVisual) {
      gsap.to(heroVisual, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-hero-section]',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }
  }

  // ─── 3. SCROLL REVEAL (sections, cards, items) ───────────────────────────
  function setupScrollReveal() {
    // Reveal genérico: adicionar data-reveal="fade-up" | "fade-left" | "fade-right" | "scale"
    const revealEls = document.querySelectorAll('[data-reveal]');
    
    revealEls.forEach((el) => {
      const type = el.getAttribute('data-reveal') || 'fade-up';
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      
      const fromVars = {
        'fade-up':    { opacity: 0, y: 40 },
        'fade-down':  { opacity: 0, y: -30 },
        'fade-left':  { opacity: 0, x: 40 },
        'fade-right': { opacity: 0, x: -40 },
        'scale':      { opacity: 0, scale: 0.88 },
        'fade':       { opacity: 0 },
      }[type] || { opacity: 0, y: 40 };

      gsap.from(el, {
        ...fromVars,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Stagger em grupos: data-stagger-group no container
    const staggerGroups = document.querySelectorAll('[data-stagger-group]');
    staggerGroups.forEach((group) => {
      const children = group.querySelectorAll('[data-stagger-item]');
      if (!children.length) return;

      gsap.from(children, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Timeline / passos (como-funciona)
    const timelineItems = document.querySelectorAll('[data-timeline-item]');
    timelineItems.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -30 : 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      });
    });

    // Linha de progresso da timeline (antes/depois)
    const timelineLine = document.querySelector('[data-timeline-line]');
    if (timelineLine) {
      gsap.from(timelineLine, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: timelineLine,
          start: 'top 80%',
        }
      });
    }
  }

  // ─── 4. CONTADORES ANIMADOS (métricas) ───────────────────────────────────
  function setupCounters() {
    // HTML esperado: <span data-counter data-target="47" data-suffix="%">0</span>
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0');
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2.0,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            }
          });
        }
      });
    });
  }

  // ─── 5. HOVER STATES PREMIUM (cards) ────────────────────────────────────
  function setupCardHovers() {
    const cards = document.querySelectorAll('[data-hover-card]');

    cards.forEach((card) => {
      const inner = card.querySelector('[data-hover-inner]') || card;
      const glow  = card.querySelector('[data-hover-glow]');

      card.addEventListener('mouseenter', (e) => {
        gsap.to(inner, { y: -6, scale: 1.01, duration: 0.35, ease: 'power2.out' });
        if (glow) {
          gsap.to(glow, { opacity: 1, duration: 0.4 });
          // Mover glow com o rato
          card.addEventListener('mousemove', moveGlow);
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(inner, { y: 0, scale: 1, duration: 0.4, ease: 'power2.inOut' });
        if (glow) {
          gsap.to(glow, { opacity: 0, duration: 0.3 });
          card.removeEventListener('mousemove', moveGlow);
        }
      });

      function moveGlow(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(glow, {
          x: x - 100,
          y: y - 100,
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    });

    // Hover em botões (glow pulse)
    document.querySelectorAll('[data-btn-primary]').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { 
          boxShadow: '0 0 30px rgba(255,107,0,0.5)',
          duration: 0.25 
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { 
          boxShadow: '0 0 0px rgba(255,107,0,0)',
          duration: 0.4 
        });
      });
    });
  }

  // ─── 6. PROGRESS BAR NO TOPO ─────────────────────────────────────────────
  function setupScrollProgress() {
    const progressBar = document.querySelector('[data-scroll-progress]');
    if (!progressBar) return;

    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: 0.3
      }
    });

    // Estilo inicial (adicionar no CSS custom do Webflow ou inline)
    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });
  }

  // ─── 7. PAGE TRANSITIONS ─────────────────────────────────────────────────
  function setupPageTransition() {
    const overlay = document.querySelector('[data-page-overlay]');
    if (!overlay) return;

    // Reveal ao entrar
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut',
      delay: 0.1,
      onComplete: () => { overlay.style.pointerEvents = 'none'; }
    });

    // Ao clicar em links internos
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([href^="/#"]):not([target])');
    internalLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === window.location.pathname) return;
        e.preventDefault();
        overlay.style.pointerEvents = 'all';
        gsap.fromTo(overlay,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => { window.location.href = href; }
          }
        );
      });
    });
  }

  // ─── START ────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
