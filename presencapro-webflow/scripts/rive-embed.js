/**
 * PresençaPro — Rive Embed & Triggers
 * ─────────────────────────────────────────────────────────────────
 * Inserir antes do </body> no Webflow Project Settings → Custom Code
 *
 * CDN no <head>:
 *   <script src="https://unpkg.com/@rive-app/canvas@2.21.6/rive.js"></script>
 *
 * Arquivos .riv a hospedar no Webflow Assets (ou CDN próprio):
 *   /assets/pp-logo-emblem.riv     → Logo animado no hero
 *   /assets/pp-icon-speed.riv      → Ícone "Rápido"
 *   /assets/pp-icon-secure.riv     → Ícone "Seguro"
 *
 * HTML no Webflow para cada animação:
 *   <canvas data-rive="logo-emblem" width="200" height="200" style="display:block;"></canvas>
 *   <canvas data-rive="icon-speed"  width="64"  height="64"  style="display:block;"></canvas>
 *   <canvas data-rive="icon-secure" width="64"  height="64"  style="display:block;"></canvas>
 * ─────────────────────────────────────────────────────────────────
 */

(function() {
  'use strict';

  // Configuração das animações Rive
  const RIVE_ANIMATIONS = {
    'logo-emblem': {
      src: '/assets/pp-logo-emblem.riv',
      autoplay: true,
      stateMachine: 'Main', // nome da state machine no Rive
      fit: Rive_PLACEHOLDER.Fit.Contain,
      alignment: Rive_PLACEHOLDER.Alignment.Center,
      // Interatividade: ao hover no hero, mudar estado
      hoverTrigger: 'hero-hover', // nome do input boolean na state machine
      scrollTrigger: null,
      onLoad: null,
    },
    'icon-speed': {
      src: '/assets/pp-icon-speed.riv',
      autoplay: false,
      animations: ['Idle'], // animação default
      hoverAnimation: 'Active',
      fit: 'contain',
      scrollAutoplay: true, // inicia quando entra no viewport
    },
    'icon-secure': {
      src: '/assets/pp-icon-secure.riv',
      autoplay: false,
      animations: ['Idle'],
      hoverAnimation: 'Active',
      fit: 'contain',
      scrollAutoplay: true,
    },
  };

  // Aguardar Rive SDK
  function init() {
    if (typeof rive === 'undefined') {
      console.warn('[PresençaPro] Rive SDK não encontrado. A verificar...');
      setTimeout(init, 200);
      return;
    }
    // Substituir placeholder pelo objeto real
    Object.keys(RIVE_ANIMATIONS).forEach(key => {
      RIVE_ANIMATIONS[key].fit = rive.Fit.Contain;
      RIVE_ANIMATIONS[key].alignment = rive.Alignment.Center;
    });
    setupRiveAnimations();
  }

  function setupRiveAnimations() {
    const canvases = document.querySelectorAll('[data-rive]');
    
    canvases.forEach((canvas) => {
      const key = canvas.getAttribute('data-rive');
      const config = RIVE_ANIMATIONS[key];
      if (!config) return;

      let riveInstance = null;

      // ── Criar instância Rive ──
      try {
        if (config.stateMachine) {
          // State Machine (animação interativa)
          riveInstance = new rive.Rive({
            src: config.src,
            canvas: canvas,
            autoplay: config.autoplay,
            stateMachines: config.stateMachine,
            layout: new rive.Layout({
              fit: rive.Fit.Contain,
              alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
              riveInstance.resizeDrawingSurfaceToCanvas();
              if (config.onLoad) config.onLoad(riveInstance);
              console.log(`[PresençaPro] Rive "${key}" carregado ✓`);
            },
            onLoadError: (e) => {
              console.warn(`[PresençaPro] Rive "${key}" erro:`, e);
              canvas.style.display = 'none'; // esconder canvas com erro
            }
          });
        } else {
          // Animação simples
          riveInstance = new rive.Rive({
            src: config.src,
            canvas: canvas,
            autoplay: config.autoplay,
            animations: config.animations || [],
            layout: new rive.Layout({
              fit: rive.Fit.Contain,
              alignment: rive.Alignment.Center,
            }),
            onLoad: () => {
              riveInstance.resizeDrawingSurfaceToCanvas();
              console.log(`[PresençaPro] Rive "${key}" carregado ✓`);
            },
          });
        }
      } catch(e) {
        console.warn('[PresençaPro] Erro ao criar Rive instance:', e);
        return;
      }

      // ── Hover triggers ──
      if (config.hoverTrigger && config.stateMachine) {
        // Gatilho pelo pai (ex: hover no hero completo)
        const triggerEl = config.hoverTrigger === 'hero-hover'
          ? document.querySelector('[data-hero-section]') || document.body
          : canvas;

        triggerEl.addEventListener('mouseenter', () => {
          try {
            const inputs = riveInstance.stateMachineInputs(config.stateMachine);
            const input = inputs.find(i => i.name === 'isHovered');
            if (input) input.value = true;
          } catch(e) {}
        });

        triggerEl.addEventListener('mouseleave', () => {
          try {
            const inputs = riveInstance.stateMachineInputs(config.stateMachine);
            const input = inputs.find(i => i.name === 'isHovered');
            if (input) input.value = false;
          } catch(e) {}
        });
      }

      // Hover simples (troca animação)
      if (config.hoverAnimation) {
        canvas.parentElement?.addEventListener('mouseenter', () => {
          if (riveInstance) {
            riveInstance.stop();
            riveInstance.play(config.hoverAnimation);
          }
        });
        canvas.parentElement?.addEventListener('mouseleave', () => {
          if (riveInstance) {
            riveInstance.stop();
            riveInstance.play(config.animations?.[0] || 'Idle');
          }
        });
      }

      // ── Scroll trigger (IntersectionObserver) ──
      if (config.scrollAutoplay) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (riveInstance) {
                riveInstance.play(config.hoverAnimation || config.animations?.[0] || 'Idle');
              }
              observer.unobserve(canvas);
            }
          });
        }, { threshold: 0.3 });

        observer.observe(canvas);
      }

      // Guardar referência para debug
      canvas._riveInstance = riveInstance;
    });
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100); // aguardar CDN carregar
  }

  // ─────────────────────────────────────────────────────────────────
  // INSTRUÇÕES DE CRIAÇÃO DOS ARQUIVOS .RIV
  // ─────────────────────────────────────────────────────────────────
  //
  // pp-logo-emblem.riv:
  //   - Artboard: 200x200
  //   - State Machine "Main" com:
  //     - Input Boolean: "isHovered"
  //     - Estado "Idle": rotação lenta do ícone (loop)
  //     - Estado "Hovered": pulso de glow laranja + aceleração
  //     - Transição: isHovered=true → Hovered; false → Idle
  //
  // pp-icon-speed.riv:
  //   - Artboard: 64x64
  //   - Animações: "Idle" (estático) e "Active" (raio a piscar)
  //   - Cores: laranja #FF6B00, fundo transparente
  //
  // pp-icon-secure.riv:
  //   - Artboard: 64x64
  //   - Animações: "Idle" e "Active" (cadeado a fechar)
  //   - Cores: mesmo design system
  //
  // Otimização:
  //   - Manter < 50KB por arquivo .riv
  //   - Preferir formas vetoriais a bitmaps
  //   - Máximo 2 artboards por arquivo
  //   - Exportar com Rive editor → File → Export → Web
  //   - Testar em: rive.app/viewer
  // ─────────────────────────────────────────────────────────────────

})();

// ─── Placeholder para evitar erro de referência antes do init ────────────────
var Rive_PLACEHOLDER = { Fit: { Contain: 'contain' }, Alignment: { Center: 'center' } };
