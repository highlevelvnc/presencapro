/**
 * PresençaPro — Schema FAQ + Formulário Multi-Step
 * Inserir antes do </body> na página /faq e /como-funciona respectivamente
 */

// ═══════════════════════════════════════════════════════════════════
// PARTE 1 — SCHEMA FAQ (inserir no <head> da página /faq)
// ═══════════════════════════════════════════════════════════════════

(function injectFAQSchema() {
  // Só activar na página /faq
  if (!window.location.pathname.includes('/faq')) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Porque é que não há custo inicial para criar o site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Optámos por um modelo de subscrição mensal para tornar o acesso a um site profissional justo e sem barreiras financeiras. Em vez de um investimento inicial de 1.500€ ou mais, paga apenas a mensalidade — e nela está incluído o domínio, o alojamento, a manutenção e o suporte técnico."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo demora a criar o meu site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O processo completo, desde o preenchimento do formulário até ao site online, demora normalmente entre 5 a 7 dias úteis. Planos Premium com mais páginas e funcionalidades podem levar até 10 dias."
        }
      },
      {
        "@type": "Question",
        "name": "Posso cancelar a qualquer momento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os planos têm uma fidelização de 12 meses. Após esse período, pode cancelar com 30 dias de aviso prévio. Se cancelar antes dos 12 meses, aplica-se uma taxa de rescisão equivalente aos meses em falta."
        }
      },
      {
        "@type": "Question",
        "name": "O site fica optimizado para Google (SEO)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Todos os planos incluem optimização SEO base: headings correctos, meta descriptions, SSL, velocidade de carregamento e indexação no Google. Os planos Pro e Premium incluem SEO mais avançado com schema markup e optimização local."
        }
      },
      {
        "@type": "Question",
        "name": "Posso ter o meu próprio domínio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, o domínio está incluído em todos os planos. Pode escolher um domínio .pt, .com ou outra extensão. Se já tem um domínio registado, tratamos da configuração sem custo adicional."
        }
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
})();


// ═══════════════════════════════════════════════════════════════════
// PARTE 2 — SCHEMA ORGANIZAÇÃO (inserir no <head> de TODAS as páginas)
// ═══════════════════════════════════════════════════════════════════

(function injectOrgSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PresençaPro",
    "url": "https://presencapro.pt",
    "logo": "https://presencapro.pt/assets/logo.png",
    "description": "Criação de sites profissionais para negócios portugueses por subscrição mensal. Design premium, SEO e manutenção incluídos.",
    "areaServed": {
      "@type": "Country",
      "name": "Portugal"
    },
    "serviceType": "Web Design e Desenvolvimento",
    "priceRange": "25€ - 100€/mês",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.instagram.com/presencapro",
      "https://www.linkedin.com/company/presencapro"
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
})();


// ═══════════════════════════════════════════════════════════════════
// PARTE 3 — FORMULÁRIO MULTI-STEP (/como-funciona)
// ═══════════════════════════════════════════════════════════════════

(function setupMultiStepForm() {
  if (!window.location.pathname.includes('/como-funciona')) return;

  const form = document.querySelector('[data-multistep-form]');
  if (!form) return;

  const steps = form.querySelectorAll('[data-step]');
  const progressBar = document.querySelector('[data-form-progress]');
  const progressLabel = document.querySelector('[data-form-progress-label]');
  const totalSteps = steps.length;
  let currentStep = 0;

  // ── Inicializar ──
  function init() {
    showStep(0);
    updateProgress(0);
    
    // Botões Avançar
    form.querySelectorAll('[data-step-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateCurrentStep()) goToStep(currentStep + 1);
      });
    });

    // Botões Anterior
    form.querySelectorAll('[data-step-prev]').forEach(btn => {
      btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    // Submit final
    const submitBtn = form.querySelector('[data-step-submit]');
    if (submitBtn) {
      submitBtn.addEventListener('click', handleSubmit);
    }
  }

  function showStep(index) {
    steps.forEach((step, i) => {
      const isActive = i === index;
      step.style.display = isActive ? 'block' : 'none';
      step.setAttribute('aria-hidden', String(!isActive));
      
      if (isActive) {
        // Animação de entrada
        step.style.opacity = '0';
        step.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        });
      }
    });
    currentStep = index;
    updateProgress(index);
  }

  function goToStep(index) {
    if (index < 0 || index >= totalSteps) return;
    showStep(index);
    // Scroll para o topo do formulário
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateProgress(index) {
    const pct = Math.round(((index) / (totalSteps - 1)) * 100);
    if (progressBar) {
      progressBar.style.width = pct + '%';
      progressBar.setAttribute('aria-valuenow', pct);
    }
    if (progressLabel) {
      progressLabel.textContent = `Passo ${index + 1} de ${totalSteps}`;
    }
  }

  function validateCurrentStep() {
    const step = steps[currentStep];
    const requiredFields = step.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      const errorEl = step.querySelector(`[data-error-for="${field.name || field.id}"]`);
      
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#FF4444';
        if (errorEl) errorEl.style.display = 'block';
      } else {
        field.style.borderColor = '';
        if (errorEl) errorEl.style.display = 'none';
      }
    });

    if (!valid) {
      // Shake animation no step
      const step_el = steps[currentStep];
      step_el.style.animation = 'shake 0.4s ease';
      setTimeout(() => { step_el.style.animation = ''; }, 400);
    }

    return valid;
  }

  function handleSubmit() {
    if (!validateCurrentStep()) return;

    // Recolher todos os dados
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // URL do WhatsApp com dados pré-preenchidos
    const whatsappMsg = buildWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/351912345678?text=${encodeURIComponent(whatsappMsg)}`;

    // Mostrar ecrã de sucesso
    const successScreen = document.querySelector('[data-form-success]');
    if (successScreen) {
      form.style.display = 'none';
      successScreen.style.display = 'block';
      
      // Atualizar link do WhatsApp
      const waLink = successScreen.querySelector('[data-wa-link]');
      if (waLink) waLink.href = whatsappUrl;
    }

    // Também pode fazer POST para Webflow Forms (se configurado)
    // fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) });
  }

  function buildWhatsAppMessage(data) {
    return `Olá! Tenho interesse na PresençaPro.

📌 Empresa: ${data.empresa || '-'}
🏙️ Cidade: ${data.cidade || '-'}
🏢 Nicho: ${data.nicho || '-'}
🎯 Objetivo: ${data.objetivo || '-'}
📱 Instagram: ${data.instagram || '-'}
📝 Notas: ${data.notas || '-'}

Gostaria de saber mais sobre os vossos planos.`;
  }

  // Inject shake keyframe
  if (!document.getElementById('pp-shake-style')) {
    const style = document.createElement('style');
    style.id = 'pp-shake-style';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(style);
  }

  init();
})();
