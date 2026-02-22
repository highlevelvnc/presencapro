/**
 * PresençaPro — Webflow Implementation Blueprint
 * Gera documento Word completo com toda a documentação
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, ExternalHyperlink
} = require('docx');
const fs = require('fs');

// ─── ESTILOS ──────────────────────────────────────────────────────────────
const ORANGE = 'FF6B00';
const BLACK  = '0F0F0F';
const GRAY_LIGHT = 'F5F5F5';
const GRAY_MED   = 'E0E0E0';
const GRAY_DARK  = '4A4A4A';
const SURFACE = '1A1A1A';

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200 },
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 36, color: BLACK })],
  });
}

function heading2(text, color = BLACK) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 28, color })],
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 24, color: BLACK })],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [new TextRun({
      text,
      font: 'Arial',
      size: 22,
      color: opts.color || GRAY_DARK,
      bold: opts.bold || false,
      italics: opts.italic || false,
    })]
  });
}

function paraOrange(text) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: ORANGE, bold: true })],
  });
}

function bullet(text, level = 0, numbering) {
  return new Paragraph({
    numbering: { reference: numbering || 'bullets', level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: GRAY_DARK })],
  });
}

function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'numbers', level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: 'Arial', size: 22, color: GRAY_DARK })],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ORANGE, space: 1 } },
    children: []
  });
}

function codeBlock(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    shading: { type: ShadingType.CLEAR, fill: 'F0F0F0' },
    children: [new TextRun({
      text,
      font: 'Courier New',
      size: 18,
      color: '1A1A1A',
    })]
  });
}

function infoBox(title, content, color = ORANGE) {
  const borderObj = { style: BorderStyle.SINGLE, size: 6, color };
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [360, 9000],
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: 360, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: color === ORANGE ? 'FFF5EE' : 'EEF5FF' },
          borders: { top: borderObj, bottom: borderObj, left: borderObj, right: { style: BorderStyle.NONE, size: 0, color: 'ffffff' } },
          margins: { top: 120, bottom: 120, left: 120, right: 60 },
          children: [new Paragraph({ children: [new TextRun({ text: '→', bold: true, color, font: 'Arial', size: 22 })] })]
        }),
        new TableCell({
          width: { size: 9000, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: color === ORANGE ? 'FFF5EE' : 'EEF5FF' },
          borders: { top: borderObj, bottom: borderObj, right: borderObj, left: { style: BorderStyle.NONE, size: 0, color: 'ffffff' } },
          margins: { top: 120, bottom: 120, left: 60, right: 120 },
          children: [
            new Paragraph({ children: [new TextRun({ text: title, bold: true, font: 'Arial', size: 22, color })] }),
            new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: content, font: 'Arial', size: 20, color: GRAY_DARK })] }),
          ]
        }),
      ]
    })]
  });
}

function simpleTable(headers, rows, widths) {
  const totalWidth = 9360;
  const colWidths = widths || headers.map(() => Math.floor(totalWidth / headers.length));
  
  const headerBorder = { style: BorderStyle.SINGLE, size: 2, color: GRAY_MED };
  const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: GRAY_MED };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: 'F5F5F5' },
      borders: { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, font: 'Arial', size: 20, color: BLACK })] })]
    }))
  });

  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      width: { size: colWidths[i], type: WidthType.DXA },
      borders: { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: String(cell), font: 'Arial', size: 20, color: GRAY_DARK })] })]
    }))
  }));

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows]
  });
}

function spacer(points = 200) {
  return new Paragraph({ spacing: { before: points, after: 0 }, children: [] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ─── CONTEÚDO DO DOCUMENTO ────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }, {
          level: 1, format: LevelFormat.BULLET, text: '◦',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: 'numbers',
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: 'Arial', size: 22, color: GRAY_DARK } }
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: BLACK },
        paragraph: { spacing: { before: 480, after: 200 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: BLACK },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 1 }
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: BLACK },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [

      // ═══════════════════════════════════════════════════════════════
      // CAPA
      // ═══════════════════════════════════════════════════════════════
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 200 },
        children: [new TextRun({ text: 'PresençaPro', bold: true, font: 'Arial', size: 72, color: ORANGE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 200 },
        children: [new TextRun({ text: 'Blueprint de Implementação — Webflow', font: 'Arial', size: 32, color: GRAY_DARK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 1200 },
        children: [new TextRun({ text: 'Versão 1.0 | Portugal | 2026', font: 'Arial', size: 24, color: '888888' })]
      }),

      divider(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: 'Documento Técnico Completo', font: 'Arial', size: 26, bold: true, color: BLACK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 1440 },
        children: [new TextRun({
          text: 'Sitemap • Design System • Copy • Código Custom (GSAP, Three.js, Rive) • Plano de Implementação • Checklist QA',
          font: 'Arial', size: 22, color: GRAY_DARK, italics: true
        })]
      }),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // ÍNDICE
      // ═══════════════════════════════════════════════════════════════
      heading1('Índice'),
      para('1. Visão Geral e Estratégia'),
      para('2. Sitemap Completo'),
      para('3. Design System (Tokens, Componentes, Classes)'),
      para('4. Wireframes Textuais por Página'),
      para('5. Copy Completa em pt-PT'),
      para('6. Arquitetura Webflow (CMS, Classes, Componentes)'),
      para('7. Código Custom — GSAP + ScrollTrigger'),
      para('8. Código Custom — Three.js Hero 3D'),
      para('9. Código Custom — Rive Embed & Triggers'),
      para('10. Código Custom — Schema JSON-LD & Formulário Multi-Step'),
      para('11. Plano de Implementação Passo a Passo'),
      para('12. SEO: Metadata e Configurações por Página'),
      para('13. Checklist Final QA & Performance'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 1. VISÃO GERAL
      // ═══════════════════════════════════════════════════════════════
      heading1('1. Visão Geral e Estratégia'),

      heading2('1.1 Conceito'),
      para('A PresençaPro é uma marca de criação de sites profissionais por subscrição mensal, focada em negócios locais portugueses. O site tem um único objetivo primário: converter visitantes em leads via WhatsApp e formulário.'),
      para('O design deve comunicar instantaneamente: sofisticação técnica, confiança, e que a PresençaPro entrega um produto muito acima da média do mercado português.'),
      spacer(100),

      heading2('1.2 Princípios de Design'),
      bullet('Tech premium 2026 / Quiet luxury com toques neon laranja controlados'),
      bullet('Produto, não agência — o site parece um SaaS, não uma agência tradicional'),
      bullet('Negative space generoso: respirar é luxo'),
      bullet('Um único "momento WOW" 3D (hero), resto motion leve e propositado'),
      bullet('Mobile-first: 60%+ do tráfego virá de mobile'),
      spacer(100),

      heading2('1.3 Referência de Qualidade'),
      para('Nível de acabamento e atenção ao detalhe: landonorris.com (apenas como referência de motion/impacto — NÃO copiar layout, arte ou textos). Awwwards-worthy em execução técnica.'),
      spacer(100),

      heading2('1.4 KPIs do Site'),
      simpleTable(
        ['Métrica', 'Objetivo', 'Como Medir'],
        [
          ['Taxa de conversão (lead)', '≥ 3%', 'Google Analytics 4'],
          ['Tempo de carregamento', '< 1.5s LCP', 'PageSpeed Insights'],
          ['Lighthouse Performance', '90+', 'Lighthouse CLI'],
          ['Lighthouse SEO', '100', 'Lighthouse CLI'],
          ['Bounce rate', '< 55%', 'GA4'],
          ['WhatsApp CTR', '≥ 8%', 'UTM tracking'],
        ]
      ),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 2. SITEMAP
      // ═══════════════════════════════════════════════════════════════
      heading1('2. Sitemap Completo'),

      para('O site tem 10 páginas principais, organizadas em 3 níveis:'),
      spacer(100),

      heading2('Nível 1 — Raiz'),
      bullet('/ — Home (Landing Principal)'),
      bullet('/planos — Planos e Preços'),
      bullet('/portfolio — Portfólio / Casos'),
      bullet('/como-funciona — Processo e Onboarding'),
      bullet('/faq — Perguntas Frequentes'),
      bullet('/contacto — Contacto Directo'),
      spacer(100),

      heading2('Nível 2 — Blog (CMS)'),
      bullet('/blog — Listagem de Artigos'),
      bullet('/blog-post — Template de Post Individual'),
      spacer(100),

      heading2('Nível 3 — Legal'),
      bullet('/legal/termos — Termos de Serviço'),
      bullet('/legal/privacidade — Política de Privacidade'),
      spacer(100),

      heading2('Arquivos Especiais'),
      bullet('sitemap.xml — Gerado automaticamente pelo Webflow'),
      bullet('robots.txt — Configurado via Webflow SEO settings'),
      bullet('/404 — Página de erro personalizada'),
      bullet('/obrigado — Página de confirmação pós-formulário'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 3. DESIGN SYSTEM
      // ═══════════════════════════════════════════════════════════════
      heading1('3. Design System'),

      heading2('3.1 Tokens de Cor'),
      simpleTable(
        ['Token', 'Hex', 'Uso'],
        [
          ['--pp-black', '#0F0F0F', 'Fundo principal, backgrounds'],
          ['--pp-black-2', '#161616', 'Fundo alternativo sutil'],
          ['--pp-surface', '#1A1A1A', 'Cards, panels, superfícies'],
          ['--pp-surface-2', '#242424', 'Inputs, hover states'],
          ['--pp-surface-3', '#2E2E2E', 'Borders hover, focus'],
          ['--pp-orange', '#FF6B00', 'Cor primária de marca, CTAs, destaques'],
          ['--pp-orange-light', '#FF8533', 'Hover state do orange'],
          ['--pp-orange-dark', '#CC5500', 'Active state do orange'],
          ['--pp-ice', '#F5F5F5', 'Texto principal, headings'],
          ['--pp-gray-1', '#A0A0A0', 'Texto secundário, subtítulos'],
          ['--pp-gray-2', '#787878', 'Texto terciário, muted'],
          ['--pp-gray-3', '#505050', 'Elementos decorativos, dividers'],
          ['--pp-gray-4', '#383838', 'Borders, separadores'],
        ],
        [2400, 2000, 4960]
      ),

      spacer(200),
      heading2('3.2 Tokens Tipográficos'),
      simpleTable(
        ['Token', 'Família', 'CDN / Fonte', 'Uso'],
        [
          ['--pp-font-display', 'Syne', 'Google Fonts — Syne 400-800', 'Headlines, títulos, botões, logo'],
          ['--pp-font-body', 'DM Sans', 'Google Fonts — DM Sans 300-700', 'Corpo de texto, parágrafos, labels'],
          ['--pp-font-mono', 'JetBrains Mono', 'Google Fonts — JetBrains Mono 400-500', 'Badges, código, eyebrows, métricas'],
        ],
        [2000, 2000, 2800, 2560]
      ),

      spacer(100),
      para('Escala tipográfica (tamanhos):'),
      simpleTable(
        ['Nome', 'Tamanho', 'Uso'],
        [
          ['Display XL', 'clamp(56px, 8vw, 96px)', 'Hero headline principal'],
          ['Display L', 'clamp(40px, 6vw, 72px)', 'Section headlines principais'],
          ['Display M', 'clamp(28px, 4vw, 48px)', 'Sub-headlines de secção'],
          ['Heading', '24-32px', 'Títulos de cards, modalidades'],
          ['Body L', '18-20px', 'Lead text, subheadlines'],
          ['Body M', '15-16px', 'Corpo principal'],
          ['Body S', '13-14px', 'Captions, labels, notas'],
          ['Mono / Badge', '11-12px', 'Badges, eyebrows, código'],
        ]
      ),

      spacer(200),
      heading2('3.3 Spacing & Grid'),
      simpleTable(
        ['Token', 'Valor', 'Uso típico'],
        [
          ['--pp-space-xs', '4px', 'Gaps mínimos, icon-text'],
          ['--pp-space-sm', '8px', 'Padding pequeno, inline gaps'],
          ['--pp-space-md', '16px', 'Padding cards pequeno, gaps'],
          ['--pp-space-lg', '24px', 'Gaps de layout, padding médio'],
          ['--pp-space-xl', '40px', 'Padding cards, gaps de secção'],
          ['--pp-space-2xl', '64px', 'Espaçamento entre secções mobile'],
          ['--pp-space-3xl', '96px', 'Espaçamento entre secções tablet'],
          ['--pp-space-4xl', '128-160px', 'Espaçamento entre secções desktop'],
        ]
      ),

      spacer(100),
      para('Grid: max-width 1280px, 12 colunas, gutter 24px (mobile: 4 colunas, gutter 16px).'),

      spacer(200),
      heading2('3.4 Radius & Sombras'),
      simpleTable(
        ['Token', 'Valor'],
        [
          ['--pp-radius-sm', '8px — ícones, chips'],
          ['--pp-radius-md', '12px — inputs, badges'],
          ['--pp-radius-lg', '16px — cards principais'],
          ['--pp-radius-xl', '24px — pricing cards, modais'],
          ['--pp-radius-full', '9999px — pills, avatars'],
          ['--pp-glow-sm', '0 0 15px rgba(255,107,0,0.25)'],
          ['--pp-glow-md', '0 0 30px rgba(255,107,0,0.35)'],
          ['--pp-glow-lg', '0 0 60px rgba(255,107,0,0.45)'],
          ['--pp-shadow-card', '0 4px 24px rgba(0,0,0,0.5)'],
          ['--pp-shadow-hover', '0 20px 60px rgba(0,0,0,0.6)'],
        ]
      ),

      spacer(200),
      heading2('3.5 Componentes UI — Lista Completa'),
      para('Todos os componentes a criar no Webflow como Symbols (reutilizáveis):'),
      spacer(100),
      simpleTable(
        ['Componente', 'Variantes', 'Classe base Webflow'],
        [
          ['Button', 'primary, ghost, lg, sm, whatsapp', 'pp-btn'],
          ['Card', 'default, featured, hover-glow', 'pp-card'],
          ['Pricing Card', 'starter, pro (popular), premium', 'pp-pricing-card'],
          ['Badge', 'orange, green, gray, popular', 'pp-badge'],
          ['Navbar', 'default, scrolled, mobile-open', 'pp-navbar'],
          ['Footer', '— (single variant)', 'pp-footer'],
          ['FAQ Item', 'closed, open', 'pp-faq-item'],
          ['Portfolio Card', 'default, hover', 'pp-portfolio-card'],
          ['Portfolio Modal', 'open, closed', 'pp-modal'],
          ['Trust Strip', '— (single variant)', 'pp-trust-strip'],
          ['Before/After', '— (single variant)', 'pp-before-after'],
          ['Timeline Step', '— (single variant)', 'pp-timeline__step'],
          ['Testimonial', '— (single variant)', 'pp-testimonial'],
          ['Metric/Counter', '— (single variant)', 'pp-metric'],
          ['Browser Mockup', '— (single variant)', 'pp-browser'],
          ['Form Input', 'text, select, textarea', 'pp-input'],
          ['Form Label', '— (single variant)', 'pp-label'],
          ['Section Divider', '— (single variant)', 'pp-divider'],
          ['Eyebrow', '— (single variant)', 'pp-eyebrow'],
          ['Mobile CTA Bar', '— (single variant)', 'pp-mobile-cta'],
          ['Loading Screen', '— (single variant)', 'pp-loading'],
          ['Scroll Progress', '— (single variant)', 'pp-scroll-progress'],
          ['Page Overlay', '— (single variant)', 'pp-page-overlay'],
        ],
        [2800, 3000, 3560]
      ),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 4. WIREFRAMES TEXTUAIS
      // ═══════════════════════════════════════════════════════════════
      heading1('4. Wireframes Textuais por Página'),

      heading2('4.1 Home /'),
      simpleTable(
        ['Secção', 'Elementos Principais', 'Altura aprox.'],
        [
          ['[A] Hero', 'Badge eyebrow • Headline grande • Subheadline • 2 CTAs • Trust badges • Browser mockup animado • Canvas 3D (fundo) • Rive emblem', '100vh'],
          ['[B] Trust Strip', '5 chips: Rápido / Seguro / Mobile-first / SEO-ready / Manutenção incluída', '80px'],
          ['[C] Antes/Depois', 'Headline secção • 2 cards lado-a-lado com listas comparativas', '500px'],
          ['[D] Como Funciona', 'Headline • 4 passos em timeline com ícones e descrições', '600px'],
          ['[E] Planos (Teaser)', 'Headline • 3 pricing cards (Pro destacado) • Link "ver detalhes"', '700px'],
          ['[F] Diferenciais', 'Headline • 6 cards em grid com ícone + título + descrição', '500px'],
          ['[G] Portfólio Teaser', 'Headline • 6 thumbnails em grid com filtro por nicho • CTA', '600px'],
          ['[H] Depoimentos + Métricas', 'Headline • 4 métricas animadas • 3 depoimentos', '600px'],
          ['[I] FAQ Teaser', '5 perguntas accordion • Link "ver todas"', '500px'],
          ['[J] CTA Final', 'Headline forte • Subheadline • 2 CTAs (criar site / WhatsApp)', '300px'],
        ],
        [2000, 5000, 2360]
      ),

      spacer(200),
      heading2('4.2 /planos'),
      bullet('Hero de página: título + descrição breve + badge "Preços transparentes"'),
      bullet('3 pricing cards lado-a-lado (Starter / Pro / Premium)'),
      bullet('Toggle opcional mensal/anual (mostrar desconto 15% anual)'),
      bullet('Tabela comparativa completa: todas as features linha-a-linha'),
      bullet('Secção "O que está incluído em todos os planos" (ícones + textos)'),
      bullet('Secção Extras / Upsells: 4 cards (SEO Avançado, Tráfego Pago, Landing Extra, Email Pro)'),
      bullet('Secção Fidelização: explicar 12 meses de forma positiva e clara'),
      bullet('FAQ rápida: 3 perguntas sobre preços'),
      bullet('CTA final: botão WhatsApp + botão formulário'),

      spacer(200),
      heading2('4.3 /portfolio'),
      bullet('Hero: título + filtros de nicho (Todos / Restauração / Clínica / Serviços / Imobiliário / Beleza / Jurídico)'),
      bullet('Grid de 12 cards (3-4 por linha) com preview colorido, nome e nicho'),
      bullet('Modal ao clicar: preview maior, objetivo, secções, stack, métricas, CTA "Quero um assim"'),
      bullet('CTA no fundo: "Não encontrou o seu nicho? Fale connosco"'),

      spacer(200),
      heading2('4.4 /como-funciona'),
      bullet('Hero: título + descrição'),
      bullet('Processo em 4 passos com timeline visual (ícone + número + título + descrição)'),
      bullet('Checklist "O que precisamos de si": logo, textos, fotos, cores, referências'),
      bullet('Formulário multi-step com barra de progresso (5 passos):'),
      bullet('Passo 1: Nicho do negócio (select)', 1),
      bullet('Passo 2: Nome empresa + cidade + objetivo principal', 1),
      bullet('Passo 3: WhatsApp + Instagram', 1),
      bullet('Passo 4: Upload logo (ou link) + preferências de estilo', 1),
      bullet('Passo 5: Notas / informação adicional + submit', 1),
      bullet('Página /obrigado: animação de sucesso + CTA WhatsApp para acompanhar'),

      spacer(200),
      heading2('4.5 /faq'),
      bullet('Hero: título + descrição'),
      bullet('Filtros por categoria: Geral / Preços / Processo / Técnico / Suporte'),
      bullet('Lista completa de perguntas em accordion (15-20 perguntas)'),
      bullet('CTA lateral ou no fundo: "Não encontrou a resposta? Fale connosco"'),

      spacer(200),
      heading2('4.6 /contacto'),
      bullet('Informações de contacto: WhatsApp, email (se aplicável)'),
      bullet('Formulário simples: nome, empresa, email, mensagem, submit'),
      bullet('CTA WhatsApp destacado com número e mensagem pré-preenchida'),
      bullet('Mapa ou referência a Portugal (opcional)'),

      spacer(200),
      heading2('4.7 /blog'),
      bullet('Hero: título + campo de pesquisa + filtros por tag'),
      bullet('Post em destaque (featured) — maior, com imagem'),
      bullet('Grid de posts: 3 por linha (desktop), 1 por linha (mobile)'),
      bullet('Paginação ou "carregar mais"'),

      spacer(200),
      heading2('4.8 /blog-post (template)'),
      bullet('Breadcrumbs: Home > Blog > [Título]'),
      bullet('Título do post + metadata (data, tempo de leitura, tags)'),
      bullet('Imagem de capa'),
      bullet('Índice / ToC — sidebar (desktop) ou dropdown (mobile)'),
      bullet('Corpo do artigo com rich text styling'),
      bullet('CTA fixo/lateral: "Quer um site assim? Fale connosco"'),
      bullet('Artigos relacionados: 3 posts do mesmo tema'),
      bullet('CTA final: botão WhatsApp'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 5. COPY COMPLETA
      // ═══════════════════════════════════════════════════════════════
      heading1('5. Copy Completa em pt-PT'),

      heading2('5.1 Hero — Home'),
      para('Eyebrow:', { bold: true, color: ORANGE }),
      para('● Sites por assinatura em Portugal'),
      para('Headline:', { bold: true }),
      para('"Tenha um site que faz o seu negócio parecer grande."'),
      para('Subheadline:', { bold: true }),
      para('"Criação sem custo inicial. Pague apenas a infraestrutura mensal e mantenha a sua presença sempre profissional, segura e optimizada."'),
      para('CTA Primário:', { bold: true, color: ORANGE }),
      para('"Quero o meu site"'),
      para('CTA Secundário:', { bold: true }),
      para('"Ver exemplos"'),
      para('Trust badges:', { bold: true }),
      para('★★★★★ +50 clientes  ·  ⚡ Lighthouse 90+  ·  ● Online em 7 dias'),

      spacer(100),
      heading2('5.2 Trust Strip'),
      para('⚡ Rápido  •  🔒 Seguro  •  📱 Mobile-first  •  📈 SEO-ready  •  🛠️ Manutenção incluída'),

      spacer(100),
      heading2('5.3 Secção Antes/Depois'),
      para('Headline da secção:', { bold: true }),
      para('"A diferença é visível logo no primeiro mês."'),
      para('Coluna "Sem PresençaPro" (negativa):', { bold: true }),
      bullet('Site desatualizado ou inexistente'),
      bullet('Perda de clientes para concorrentes com presença online'),
      bullet('Dificuldade em ser encontrado no Google'),
      bullet('Imagem pouco profissional nas pesquisas'),
      bullet('Sem sistema de captação de leads'),
      para('Coluna "Com PresençaPro" (positiva):', { bold: true }),
      bullet('Site profissional e moderno, sempre actualizado'),
      bullet('Transmite confiança e credibilidade imediata'),
      bullet('Aparece no Google para clientes locais'),
      bullet('Sistema de contacto integrado (WhatsApp + formulário)'),
      bullet('Design que supera 90% dos concorrentes locais'),

      spacer(100),
      heading2('5.4 Como Funciona — 4 Passos'),
      para('Passo 1 — Escolhe o teu plano:', { bold: true }),
      para('Analisa as opções e escolhe o plano que melhor se adapta ao teu negócio. Starter, Pro ou Premium — todos sem custo inicial.'),
      para('Passo 2 — Envia o teu briefing:', { bold: true }),
      para('Preenchas um formulário rápido com as informações do teu negócio: nome, cidade, objetivo, logo e referências visuais. É tudo.'),
      para('Passo 3 — Publicamos em até 7 dias:', { bold: true }),
      para('A nossa equipa trata de tudo: design, desenvolvimento, domínio, SSL e configuração SEO. Tu não precisas saber nada de tecnologia.'),
      para('Passo 4 — Começas a receber contactos:', { bold: true }),
      para('O site fica online com botão WhatsApp, formulário de contacto e estrutura optimizada para converter visitantes em clientes.'),

      spacer(100),
      heading2('5.5 Planos — Copy Completa'),
      para('Headline:', { bold: true }),
      para('"Planos simples, sem surpresas."'),
      para('Subheadline:', { bold: true }),
      para('"Tudo o que o teu negócio precisa numa mensalidade fixa. Sem custos escondidos, sem letras pequenas."'),
      spacer(80),
      para('STARTER — 25€/mês:', { bold: true, color: ORANGE }),
      para('"Para quem quer começar a ter presença online sem complicações."'),
      para('PRO — 50€/mês — MAIS POPULAR:', { bold: true, color: ORANGE }),
      para('"O plano favorito dos nossos clientes. Design único, mais páginas e estrutura para crescer."'),
      para('PREMIUM — 100€/mês:', { bold: true, color: ORANGE }),
      para('"Para negócios que querem dominar o mercado local online. Tudo incluído, suporte prioritário."'),
      spacer(80),
      para('Nota sobre fidelização:', { bold: true }),
      para('"Os planos têm fidelização de 12 meses — o tempo necessário para construir presença real online. Investimento mensal previsível, sem surpresas."'),

      spacer(100),
      heading2('5.6 Diferenciais — 6 Cards'),
      bullet('Design UI/UX 2026: Sites com aparência de produto de tecnologia, não de template barato.'),
      bullet('Performance e Velocidade: Lighthouse 90+, carregamento < 1.5s, optimizado para todos os dispositivos.'),
      bullet('SEO Técnico: Estrutura correcta de headings, meta tags, schema markup e indexação no Google.'),
      bullet('Manutenção Incluída: Actualizações de segurança, backup e manutenção técnica sem custos extra.'),
      bullet('Estrutura para Crescer: Blog, páginas extra, landing pages — o site cresce com o teu negócio.'),
      bullet('Suporte Real: Equipa portuguesa, resposta em horas, não dias. Falamos a mesma língua.'),

      spacer(100),
      heading2('5.7 Depoimentos (exemplos realistas)'),
      para('"Em menos de 2 semanas tinha um site que parecia de empresa grande. As reservas online aumentaram logo no primeiro mês." — Ricardo Sousa, Restaurante, Lisboa'),
      para('"Precisava de algo profissional que transmitisse confiança aos meus pacientes. O resultado superou as expectativas." — Dra. Ana Ferreira, Clínica, Braga'),
      para('"O nosso site anterior era uma vergonha. Este parece de empresa internacional. Os leads de qualidade aumentaram notoriamente." — Miguel Costa, CEO, Porto'),

      spacer(100),
      heading2('5.8 CTA Final'),
      para('Headline:', { bold: true }),
      para('"Pode continuar sem site… ou começar a receber pedidos todos os dias."'),
      para('Sub:', { bold: true }),
      para('"Mais de 50 negócios portugueses já escolheram a PresençaPro. O próximo pode ser o teu."'),
      para('CTA:', { bold: true, color: ORANGE }),
      para('"Criar o meu site"  |  "Falar com a equipa"'),

      spacer(100),
      heading2('5.9 FAQ — 15 Perguntas e Respostas'),
      para('P1: Porque é que não há custo inicial?', { bold: true }),
      para('R: Optámos por um modelo de subscrição mensal para tornar o acesso a um site profissional justo e sem barreiras. Em vez de 1.500€+ de uma vez, pagas mensalmente e nós tratamos de tudo: domínio, alojamento, manutenção e suporte técnico.'),
      spacer(60),
      para('P2: Quanto tempo demora a criar o meu site?', { bold: true }),
      para('R: Em média 5 a 7 dias úteis. Planos Premium com mais páginas podem levar até 10 dias. Após aprovares o design, publicamos em 24 horas.'),
      spacer(60),
      para('P3: Posso cancelar a qualquer momento?', { bold: true }),
      para('R: Os planos têm fidelização de 12 meses. Após esse período, pode cancelar com 30 dias de aviso prévio. É o tempo necessário para construir presença real online.'),
      spacer(60),
      para('P4: O site fica optimizado para o Google (SEO)?', { bold: true }),
      para('R: Sim. Todos os planos incluem SEO base: headings correctos, meta descriptions, SSL, velocidade e indexação. Pro e Premium têm SEO mais avançado.'),
      spacer(60),
      para('P5: Posso ter o meu próprio domínio?', { bold: true }),
      para('R: Sim, o domínio está incluído em todos os planos (.pt, .com ou outra extensão). Se já tem um domínio, configuramos sem custo adicional.'),
      spacer(60),
      para('P6: Posso alterar o conteúdo do site depois?', { bold: true }),
      para('R: Sim. O Starter inclui 1 alteração por trimestre, o Pro 1 por mês, e o Premium alterações ilimitadas (razoáveis). Para alterações urgentes, há um serviço adicional.'),
      spacer(60),
      para('P7: O site funciona bem no telemóvel?', { bold: true }),
      para('R: Absolutamente. Todos os sites são desenvolvidos mobile-first — o design começa pelo ecrã mais pequeno e adapta-se perfeitamente a tablets e computadores.'),
      spacer(60),
      para('P8: Quem é responsável pela hospedagem e segurança?', { bold: true }),
      para('R: Nós. A hospedagem, os certificados SSL, os backups e as actualizações de segurança estão todos incluídos na mensalidade. Não precisas de te preocupar com nada técnico.'),
      spacer(60),
      para('P9: Posso ter uma loja online?', { bold: true }),
      para('R: Actualmente, os nossos planos focam-se em sites de presença e captação de leads. Para e-commerce completo, temos soluções à medida — fala connosco.'),
      spacer(60),
      para('P10: O que acontece ao site se cancelar o serviço?', { bold: true }),
      para('R: O site fica offline ao terminar o contrato. Recomendamos que, antes de cancelar, exporte os conteúdos ou migre para outra plataforma. Ajudamos nesse processo.'),
      spacer(60),
      para('P11: Trabalham com todo o tipo de negócios?', { bold: true }),
      para('R: Sim. Restaurantes, clínicas, advogados, construção, beleza, imobiliário, serviços locais — já desenvolvemos sites para dezenas de nichos em Portugal.'),
      spacer(60),
      para('P12: Posso ver exemplos de sites criados pela PresençaPro?', { bold: true }),
      para('R: Claro! Visita a nossa página de portfólio para ver exemplos por nicho, com detalhes de cada projecto.'),
      spacer(60),
      para('P13: O site aparece no Google Maps?', { bold: true }),
      para('R: Nos planos Pro e Premium, configuramos o Google Business Profile e integramos o mapa no site. No Starter, a integração de mapas é possível mediante custo adicional.'),
      spacer(60),
      para('P14: Posso ter blog e publicar artigos?', { bold: true }),
      para('R: Sim, nos planos Pro e Premium. Criamos a estrutura de blog e ensinamo-te a publicar artigos de forma simples, sem conhecimentos técnicos.'),
      spacer(60),
      para('P15: Como funciona o suporte técnico?', { bold: true }),
      para('R: Suporte por email e WhatsApp. Starter: resposta em 48h. Pro: 24h. Premium: resposta prioritária em poucas horas. A equipa está em Portugal, no teu fuso horário.'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 6. ARQUITETURA WEBFLOW
      // ═══════════════════════════════════════════════════════════════
      heading1('6. Arquitetura Webflow'),

      heading2('6.1 Configuração Inicial'),
      numbered('Criar novo projeto Webflow: "presencapro"'),
      numbered('Configurar Site Settings: título, description, favicon, língua pt-PT'),
      numbered('Ir a Project Settings → Custom Code e adicionar CDN fonts no <head>'),
      numbered('Configurar variáveis CSS globais (ver secção 3)'),
      numbered('Criar paleta de cores no Webflow Designer (Style Panel → Colors)'),
      numbered('Definir typography styles: Heading 1-4, Body, Label, Mono'),

      spacer(100),
      codeBlock("<!-- Adicionar no <head> — Project Settings -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<!-- GSAP -->\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\" defer></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js\" defer></script>\n<!-- Rive -->\n<script src=\"https://unpkg.com/@rive-app/canvas@2.21.6/rive.js\" defer></script>"),

      spacer(200),
      heading2('6.2 CMS Collections'),
      simpleTable(
        ['Collection', 'Campos', 'Usado em'],
        [
          ['Blog Posts', 'título, slug, descrição, conteúdo (rich text), data, tempo leitura, tags (multi-ref), imagem capa, author, featured (bool)', '/blog, /blog-post'],
          ['Portfolio Items', 'título, slug, nicho (option), descrição, objetivo, secções (text), stack (text), métricas (JSON), cor bg, acento', '/portfolio'],
          ['FAQ Items', 'pergunta, resposta, categoria (option), ordem', '/faq'],
          ['Testimonials', 'nome, cargo, empresa, conteúdo, estrelas, cidade', '/, /planos'],
        ],
        [2200, 4500, 2660]
      ),

      spacer(200),
      heading2('6.3 Nomenclatura de Classes'),
      para('Todas as classes seguem o prefixo pp- (PresençaPro) para evitar conflitos:'),
      bullet('Componentes: pp-navbar, pp-card, pp-btn, pp-badge, pp-modal, pp-footer'),
      bullet('Estados: is-scrolled, is-open, is-active, is-loading, is-hover'),
      bullet('Modificadores: --primary, --ghost, --lg, --sm, --popular, --featured'),
      bullet('Elementos: __logo, __links, __cta, __header, __body, __icon, __glow'),
      bullet('Utilitários: pp-text-orange, pp-text-muted, pp-gradient-text, pp-glass'),
      bullet('Dados (GSAP): data-el="navbar", data-hero-anim, data-reveal, data-counter'),

      spacer(200),
      heading2('6.4 Interações Webflow (nativas)'),
      para('Para elementos que não necessitam de GSAP:'),
      bullet('FAQ accordion: usar Webflow IX2 com toggle de altura (overflow hidden)'),
      bullet('Mobile menu: Webflow IX2 com slide/fade no drawer'),
      bullet('Filtros do portfolio: Webflow IX2 com show/hide por categoria'),
      bullet('Modal portfolio: Webflow IX2 com backdrop + scale do modal'),
      bullet('Hover cards simples: CSS transition (ver global.css)'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 7. GSAP — REFERÊNCIA RÁPIDA
      // ═══════════════════════════════════════════════════════════════
      heading1('7. GSAP — Referência de Implementação'),

      heading2('7.1 Data Attributes a Adicionar no Webflow'),
      para('No Webflow Designer, selecionar o elemento → Settings panel → Custom Attributes:'),
      spacer(60),
      simpleTable(
        ['Elemento Webflow', 'Attribute Name', 'Attribute Value', 'Efeito'],
        [
          ['Navbar Wrapper', 'data-el', 'navbar', 'Blur + bg ao scroll'],
          ['Hero Section', 'data-hero-section', '', 'Parallax trigger'],
          ['Badge/eyebrow hero', 'data-hero-badge', '', 'Fade in -16px Y'],
          ['Headline principal', 'data-hero-headline', '', 'Stagger por palavra'],
          ['Subheadline hero', 'data-hero-sub', '', 'Fade in 24px Y'],
          ['Botões hero', 'data-hero-cta', '', 'Stagger entrada'],
          ['Visual/mockup hero', 'data-hero-visual', '', 'Fade+scale + parallax'],
          ['Qualquer elemento de reveal', 'data-reveal', 'fade-up / fade-left / scale', 'Reveal ao scroll'],
          ['Delay personalizado', 'data-delay', '0.1 / 0.2 / 0.3', 'Delay do reveal'],
          ['Container de cards', 'data-stagger-group', '', 'Agrupa filhos'],
          ['Card dentro do grupo', 'data-stagger-item', '', 'Item do stagger'],
          ['Passo da timeline', 'data-timeline-item', '', 'Reveal alternado L/R'],
          ['Linha da timeline', 'data-timeline-line', '', 'scaleY desde 0'],
          ['Número/métrica', 'data-counter', 'target=47; suffix=%', 'Count-up animado'],
          ['Card com hover', 'data-hover-card', '', 'Hover elevação + glow'],
          ['Barra de progresso', 'data-scroll-progress', '', 'scaleX com scroll'],
          ['Overlay de transição', 'data-page-overlay', '', 'Slide ao navegar'],
        ],
        [2400, 2200, 1800, 2960]
      ),

      spacer(100),
      infoBox(
        'Dica de implementação',
        'O ficheiro gsap-master.js (incluído neste pacote) já contém toda a lógica. Basta inserir antes do </body> nas Project Settings → Custom Code → Footer. Os data attributes são adicionados em cada elemento no Webflow Designer.',
        ORANGE
      ),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 8. THREE.JS — IMPLEMENTAÇÃO
      // ═══════════════════════════════════════════════════════════════
      heading1('8. Three.js — Hero 3D'),

      heading2('8.1 Estrutura HTML no Webflow (hero)'),
      para('Criar a seguinte estrutura na secção Hero:'),
      spacer(60),
      codeBlock("<!-- Dentro da Hero Section -->\n<div class=\"pp-hero\">\n  <!-- Canvas 3D wrapper (position: absolute, inset: 0) -->\n  <div data-el=\"hero-canvas-wrapper\"\n       style=\"position:absolute;inset:0;pointer-events:none;z-index:0;\">\n    <canvas id=\"hero-canvas\"\n            style=\"width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s ease;\"\n            aria-hidden=\"true\"></canvas>\n  </div>\n  <!-- Conteúdo do hero (z-index: 1) -->\n  <div class=\"pp-hero__content\" style=\"position:relative;z-index:1;\">\n    <!-- Badge, headline, sub, CTAs -->\n  </div>\n</div>"),

      spacer(100),
      heading2('8.2 Onde Inserir o Script'),
      bullet('Ir a: Webflow → Page Settings (Home) → Before </body> tag'),
      bullet('Colar o conteúdo de threejs-hero.js (ficheiro incluído neste pacote)'),
      bullet('O script carrega Three.js de forma lazy (apenas quando necessário)'),
      bullet('Em mobile: canvas fica oculto, gradient CSS animado substitui'),
      bullet('Em prefers-reduced-motion: nenhuma animação é executada'),

      spacer(100),
      heading2('8.3 Fallback Mobile'),
      para('O script detecta automaticamente mobile e aplica:'),
      codeBlock("/* CSS automático no mobile (< 768px): */\n[data-el=\"hero-canvas-wrapper\"] {\n  background: radial-gradient(\n    ellipse 70% 60% at 50% 20%,\n    rgba(255,107,0,0.10) 0%, transparent 70%\n  );\n  animation: heroGradientPulse 6s ease-in-out infinite;\n}"),

      spacer(100),
      heading2('8.4 Performance'),
      bullet('Three.js carregado lazy (apenas depois do DOM ready)'),
      bullet('Pixel ratio máximo: 1.5x (evita sobrecarga em ecrãs 3x)'),
      bullet('powerPreference: "low-power" no renderer'),
      bullet('Geometria: SphereGeometry com 64 segmentos (equilíbrio qualidade/performance)'),
      bullet('Blending: AdditiveBlending com depthWrite: false (sem z-fighting)'),
      bullet('Partículas: apenas 400 pontos (< 1KB de dados de geometria)'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 9. RIVE — IMPLEMENTAÇÃO
      // ═══════════════════════════════════════════════════════════════
      heading1('9. Rive — Animações Vetoriais'),

      heading2('9.1 Ficheiros .riv a Criar'),
      simpleTable(
        ['Ficheiro', 'Artboard', 'State Machine / Anim', 'Onde Usar', 'Tamanho max'],
        [
          ['pp-logo-emblem.riv', '200×200', 'SM "Main": Idle (loop), Hovered (input bool)', 'Hero — elemento decorativo central', '< 50KB'],
          ['pp-icon-speed.riv', '64×64', 'Anim "Idle" + "Active" (raio pulsante)', 'Trust strip — ícone Rápido', '< 20KB'],
          ['pp-icon-secure.riv', '64×64', 'Anim "Idle" + "Active" (cadeado fechar)', 'Trust strip — ícone Seguro', '< 20KB'],
        ],
        [2600, 1600, 2800, 2200, 1960]
      ),

      spacer(100),
      heading2('9.2 HTML no Webflow'),
      codeBlock("<!-- Para cada animação Rive: -->\n<!-- Logo emblem (hero) -->\n<canvas data-rive=\"logo-emblem\" width=\"200\" height=\"200\"\n        style=\"display:block;\" aria-hidden=\"true\"></canvas>\n\n<!-- Ícone speed (trust strip) -->\n<canvas data-rive=\"icon-speed\" width=\"64\" height=\"64\"\n        style=\"display:block;\" aria-hidden=\"true\"></canvas>\n\n<!-- Ícone secure (trust strip) -->\n<canvas data-rive=\"icon-secure\" width=\"64\" height=\"64\"\n        style=\"display:block;\" aria-hidden=\"true\"></canvas>"),

      spacer(100),
      heading2('9.3 Onde Inserir o Script Rive'),
      bullet('Project Settings → Custom Code → Footer (antes do </body>)'),
      bullet('O CDN do Rive já está no <head> (adicionar na secção 6.1)'),
      bullet('Hospedar os ficheiros .riv no Webflow Assets (Assets panel → Upload)'),
      bullet('Actualizar os caminhos /assets/pp-logo-emblem.riv com o URL gerado pelo Webflow'),

      spacer(100),
      heading2('9.4 Especificações de Criação no Rive Editor'),
      bullet('Usar rive.app/editor para criar as animações'),
      bullet('Cores: usar o hexadecimal exacto #FF6B00 para laranja; fundo transparente'),
      bullet('Não usar bitmaps — apenas formas e caminhos vetoriais'),
      bullet('Estado Idle: loop infinito, suave, 2-3 segundos por ciclo'),
      bullet('Estado Active/Hovered: mais rápido, com pulso ou brilho laranja'),
      bullet('Exportar: File → Export → Web (.riv format)'),
      bullet('Testar em: rive.app/viewer antes de integrar'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 10. SCHEMA JSON-LD
      // ═══════════════════════════════════════════════════════════════
      heading1('10. Schema JSON-LD & Formulário Multi-Step'),

      heading2('10.1 Schema Organization (todas as páginas)'),
      para('Adicionar em Project Settings → Custom Code → Head (script já incluído no ficheiro schema-and-form.js):'),
      spacer(60),
      codeBlock('{\n  "@context": "https://schema.org",\n  "@type": "ProfessionalService",\n  "name": "PresençaPro",\n  "url": "https://presencapro.pt",\n  "description": "Criação de sites profissionais...",\n  "areaServed": { "@type": "Country", "name": "Portugal" },\n  "priceRange": "25-100€/mês"\n}'),

      spacer(100),
      heading2('10.2 FAQ Schema (/faq)'),
      para('Adicionar apenas na página /faq em Page Settings → Before </body>:'),
      para('(Incluído automaticamente no ficheiro schema-and-form.js — detecta URL /faq)'),

      spacer(100),
      heading2('10.3 Formulário Multi-Step — Estrutura Webflow'),
      para('Criar em /como-funciona um Form Block com:'),
      bullet('Wrapper: class="pp-multistep-form", data-multistep-form'),
      bullet('Progress track: class="pp-form-progress-track" com filho class="pp-form-progress-bar", data-form-progress'),
      bullet('Label progresso: data-form-progress-label'),
      bullet('5 step divs: data-step="1/2/3/4/5", inicialmente display:none exceto o 1'),
      bullet('Em cada step: campos relevantes + botão Next (data-step-next) + botão Back (data-step-prev)'),
      bullet('Botão final submit: data-step-submit'),
      bullet('Ecrã sucesso: data-form-success, inicialmente display:none'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 11. PLANO DE IMPLEMENTAÇÃO
      // ═══════════════════════════════════════════════════════════════
      heading1('11. Plano de Implementação Passo a Passo'),

      heading2('FASE 1 — Setup e Design System (Dias 1-2)'),
      numbered('Criar projeto Webflow e configurar domínio presencapro.pt'),
      numbered('Adicionar Google Fonts no <head> (Syne + DM Sans + JetBrains Mono)'),
      numbered('Criar todas as variáveis de cor no Webflow (Colors panel)'),
      numbered('Definir Styles: headings H1-H4, Body, Caption, Mono, Button'),
      numbered('Criar Navbar Symbol com logo, links e CTA'),
      numbered('Criar Footer Symbol com links, contacto e copyright'),
      numbered('Criar componentes básicos: Buttons (3 variantes), Badges, Cards'),
      numbered('Adicionar global.css nas Project Settings (Custom Code → Head)'),

      spacer(100),
      heading2('FASE 2 — CMS e Dados (Dia 2-3)'),
      numbered('Criar CMS Collection: Blog Posts (campos da secção 6.2)'),
      numbered('Criar CMS Collection: Portfolio Items'),
      numbered('Criar CMS Collection: FAQ Items'),
      numbered('Criar CMS Collection: Testimonials'),
      numbered('Criar template de blog post (/blog-post)'),
      numbered('Criar template de portfolio (se necessário, ou usar modal)'),
      numbered('Inserir os 6 posts iniciais no CMS (conteúdo na secção 5.9)'),
      numbered('Inserir 12 itens de portfolio no CMS'),
      numbered('Inserir 15 FAQs no CMS'),
      numbered('Inserir 3 depoimentos no CMS'),

      spacer(100),
      heading2('FASE 3 — Páginas Principais (Dias 3-6)'),
      numbered('Home (/): construir todas as 10 secções com Symbols e CMS'),
      numbered('/planos: pricing cards, tabela comparativa, extras'),
      numbered('/portfolio: grid com filtros + modais'),
      numbered('/como-funciona: timeline + formulário multi-step'),
      numbered('/faq: accordion com categorias + schema'),
      numbered('/contacto: formulário simples + WhatsApp CTA'),
      numbered('/blog: listagem CMS com search e filtros'),
      numbered('/legal/termos e /legal/privacidade: conteúdo estático'),

      spacer(100),
      heading2('FASE 4 — Animações e Scripts (Dias 6-8)'),
      numbered('Adicionar gsap-master.js no Project Settings → Footer'),
      numbered('Adicionar data-attributes em todos os elementos do Webflow'),
      numbered('Adicionar threejs-hero.js na Home Page → Before </body>'),
      numbered('Criar canvas element na hero section'),
      numbered('Criar ficheiros .riv no Rive editor'),
      numbered('Hospedar .riv no Webflow Assets e actualizar caminhos'),
      numbered('Adicionar rive-embed.js no Project Settings → Footer'),
      numbered('Adicionar schema-and-form.js no Project Settings → Footer'),
      numbered('Testar todas as animações em desktop e mobile'),
      numbered('Ajustar timings conforme necessário'),

      spacer(100),
      heading2('FASE 5 — SEO e Performance (Dias 8-9)'),
      numbered('Configurar Open Graph em todas as páginas'),
      numbered('Adicionar meta descriptions únicas por página'),
      numbered('Verificar estrutura de headings (1 H1 por página)'),
      numbered('Configurar Webflow SEO: sitemap.xml e robots.txt'),
      numbered('Testar com Google PageSpeed Insights'),
      numbered('Optimizar imagens: WebP, dimensões correctas'),
      numbered('Verificar funcionalidade de todos os links'),
      numbered('Testar formulários (envio e confirmação)'),

      spacer(100),
      heading2('FASE 6 — QA e Launch (Dias 9-10)'),
      numbered('Executar checklist completo (ver secção 13)'),
      numbered('Testar em: Chrome, Firefox, Safari, Edge'),
      numbered('Testar em: iOS Safari, Android Chrome'),
      numbered('Verificar acessibilidade (contraste, navegação teclado)'),
      numbered('Configurar domínio e DNS'),
      numbered('Publicar site no Webflow'),
      numbered('Verificar indexação no Google Search Console'),
      numbered('Configurar Google Analytics 4'),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 12. SEO POR PÁGINA
      // ═══════════════════════════════════════════════════════════════
      heading1('12. SEO — Metadata por Página'),

      simpleTable(
        ['Página', 'Title', 'Description', 'OG Image'],
        [
          ['/', 'PresençaPro — Sites Profissionais em Portugal | Desde 25€/mês', 'Criação de sites profissionais para negócios portugueses. Sem custo inicial. Design premium, SEO e manutenção incluídos. A partir de 25€/mês.', 'og-home.jpg'],
          ['/planos', 'Planos e Preços | PresençaPro', 'Starter 25€, Pro 50€ e Premium 100€/mês. Sites profissionais por subscrição, sem custo inicial. Ver comparativo completo de planos.', 'og-planos.jpg'],
          ['/portfolio', 'Portfólio de Sites | PresençaPro', 'Exemplos de sites profissionais criados pela PresençaPro para restaurantes, clínicas, advogados, imobiliário e mais nichos em Portugal.', 'og-portfolio.jpg'],
          ['/como-funciona', 'Como Funciona | PresençaPro', 'Processo simples em 4 passos. Enviamos o briefing, criamos o site em 7 dias e publicamos. Zero complicações técnicas para si.', 'og-como-funciona.jpg'],
          ['/faq', 'FAQ — Perguntas Frequentes | PresençaPro', 'Respostas às dúvidas mais comuns sobre criação de sites, preços, processo, SEO, domínios e suporte da PresençaPro.', 'og-faq.jpg'],
          ['/contacto', 'Contacto | PresençaPro', 'Fale connosco via WhatsApp ou formulário. Equipa portuguesa, resposta rápida. Solicite o seu site profissional hoje.', 'og-contact.jpg'],
          ['/blog', 'Blog — Marketing Digital e Websites em Portugal | PresençaPro', 'Artigos sobre criação de sites, SEO local, marketing digital e presença online para negócios portugueses.', 'og-blog.jpg'],
        ],
        [1000, 3000, 3800, 1560]
      ),

      pageBreak(),

      // ═══════════════════════════════════════════════════════════════
      // 13. CHECKLIST QA
      // ═══════════════════════════════════════════════════════════════
      heading1('13. Checklist Final QA & Performance'),

      heading2('Design & Visual'),
      bullet('[ ] Paleta de cores consistente em todas as páginas'),
      bullet('[ ] Tipografia: Syne nos headings, DM Sans no corpo'),
      bullet('[ ] Spacing consistente (usar tokens CSS)'),
      bullet('[ ] Hover states em todos os botões e links'),
      bullet('[ ] Focus states visíveis (acessibilidade)'),
      bullet('[ ] Mobile: testar em 375px, 414px e 768px de largura'),
      bullet('[ ] Tablet: testar em 768px e 1024px'),
      bullet('[ ] Desktop: testar em 1280px, 1440px e 1920px'),

      spacer(100),
      heading2('Performance'),
      bullet('[ ] Lighthouse Performance: ≥ 90 (mobile e desktop)'),
      bullet('[ ] LCP (Largest Contentful Paint): < 2.5s'),
      bullet('[ ] CLS (Cumulative Layout Shift): < 0.1'),
      bullet('[ ] FID / INP: < 200ms'),
      bullet('[ ] Imagens: todas em WebP, tamanhos adequados'),
      bullet('[ ] Google Fonts: preconnect adicionado'),
      bullet('[ ] Three.js: só carrega em desktop (confirmar)'),
      bullet('[ ] Rive: ficheiros < 50KB por artboard'),
      bullet('[ ] GSAP: não bloqueia scroll (confirmed com profiler)'),

      spacer(100),
      heading2('SEO'),
      bullet('[ ] 1 H1 por página, hierarquia H2-H4 correta'),
      bullet('[ ] Meta title único em todas as páginas (< 60 caracteres)'),
      bullet('[ ] Meta description única (120-160 caracteres)'),
      bullet('[ ] Open Graph: og:title, og:description, og:image, og:url'),
      bullet('[ ] Twitter card configurada'),
      bullet('[ ] Schema Organization no <head> de todas as páginas'),
      bullet('[ ] Schema FAQPage na página /faq'),
      bullet('[ ] sitemap.xml publicado e acessível'),
      bullet('[ ] robots.txt correcto (sem bloqueio indevido)'),
      bullet('[ ] Canonical URLs configurados'),
      bullet('[ ] SSL/HTTPS activo (certificado Webflow incluído)'),
      bullet('[ ] Google Search Console: site adicionado e verificado'),
      bullet('[ ] Google Analytics 4: tracking ID configurado'),

      spacer(100),
      heading2('Funcionalidades'),
      bullet('[ ] Navbar: link activo correcto em todas as páginas'),
      bullet('[ ] Navbar: blur/bg ao scroll funcional'),
      bullet('[ ] Mobile menu: abre e fecha correctamente'),
      bullet('[ ] Footer: todos os links funcionam'),
      bullet('[ ] Formulário contacto: envia e mostra confirmação'),
      bullet('[ ] Formulário multi-step: progresso e validação OK'),
      bullet('[ ] FAQ accordion: abre e fecha suavemente'),
      bullet('[ ] Portfolio filtros: filtram correctamente por nicho'),
      bullet('[ ] Portfolio modal: abre com dados corretos, fecha ao clicar fora'),
      bullet('[ ] WhatsApp CTA: número correcto e mensagem pré-preenchida'),
      bullet('[ ] Scroll progress bar: funcional em todas as páginas'),
      bullet('[ ] Contadores animados: disparam ao entrar no viewport'),
      bullet('[ ] Animações hero: stagger correcto ao carregar'),
      bullet('[ ] Three.js: orb visível em desktop, fallback em mobile'),
      bullet('[ ] Rive: animações carregam e respondem a hover/scroll'),
      bullet('[ ] Blog: listagem, pesquisa e posts individuais funcionam'),
      bullet('[ ] CMS: conteúdo correcto em todas as collections'),
      bullet('[ ] Página 404: personalizada e com CTA'),
      bullet('[ ] Página /obrigado: acessível após submit de formulário'),

      spacer(100),
      heading2('Acessibilidade'),
      bullet('[ ] Contraste de cor: ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande'),
      bullet('[ ] Imagens: alt text descritivo em todas'),
      bullet('[ ] Ícones decorativos: aria-hidden="true"'),
      bullet('[ ] Formulários: labels associadas a inputs'),
      bullet('[ ] Navegação por teclado: Tab order lógico'),
      bullet('[ ] Focus trap no modal (portfolio)'),
      bullet('[ ] Skip link "Ir para conteúdo principal"'),
      bullet('[ ] Webflow Accessibility checker: 0 erros críticos'),

      spacer(100),
      heading2('Cross-browser'),
      bullet('[ ] Chrome (latest) — desktop e mobile'),
      bullet('[ ] Firefox (latest) — desktop'),
      bullet('[ ] Safari 16+ — desktop e iOS'),
      bullet('[ ] Edge (latest) — desktop'),
      bullet('[ ] Samsung Internet — Android'),

      spacer(200),
      divider(),
      spacer(200),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: 'PresençaPro — Blueprint de Implementação v1.0', font: 'Arial', size: 20, color: '888888' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: 'Documento confidencial | Portugal 2026', font: 'Arial', size: 18, color: 'AAAAAA', italics: true })]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/presencapro-webflow/PresençaPro_Blueprint_Webflow.docx', buffer);
  console.log('✅ Documento criado com sucesso!');
}).catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
