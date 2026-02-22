# PresençaPro — Guia Rápido de Implementação Webflow

## CDN Scripts (adicionar no <head>)

```html
<!-- Fontes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>

<!-- Rive -->
<script src="https://unpkg.com/@rive-app/canvas@2.21.6/rive.js" defer></script>
```

## Scripts antes do </body> (Project Settings → Footer)

```html
<!-- Cole o conteúdo de: -->
<script>/* gsap-master.js */</script>
<script>/* rive-embed.js */</script>
<script>/* schema-and-form.js */</script>
```

## Three.js (apenas página Home — Page Settings → Footer)

```html
<script>/* threejs-hero.js */</script>
```

## CSS Global (Project Settings → Head)

```html
<style>/* conteúdo de styles/global.css */</style>
```

## Data Attributes Quick Reference

| Elemento | Attribute | Valor |
|----------|-----------|-------|
| Navbar | data-el | navbar |
| Hero section | data-hero-section | (vazio) |
| Qualquer elemento reveal | data-reveal | fade-up |
| Container stagger | data-stagger-group | (vazio) |
| Item stagger | data-stagger-item | (vazio) |
| Métrica/counter | data-counter | (vazio) |
| data-target | | ex: 47 |
| data-suffix | | ex: % |
| Card hover | data-hover-card | (vazio) |
| Progress bar | data-scroll-progress | (vazio) |
| Page overlay | data-page-overlay | (vazio) |
| Rive canvas | data-rive | logo-emblem |

## Ficheiros incluídos neste pacote

```
presencapro-webflow/
├── PresençaPro_Blueprint_Webflow.docx   ← Documento principal completo
├── scripts/
│   ├── gsap-master.js                   ← GSAP + ScrollTrigger master
│   ├── threejs-hero.js                  ← Three.js orb hero
│   ├── rive-embed.js                    ← Rive embed e triggers
│   └── schema-and-form.js              ← Schema JSON-LD + formulário multi-step
├── styles/
│   └── global.css                       ← Design system CSS completo
├── content/
│   └── blog-posts.md                    ← 6 posts iniciais em pt-PT
└── QUICK-START.md                       ← Este ficheiro
```

## Ordem de implementação recomendada

1. Setup Webflow → fontes, variáveis, styles
2. Criar CMS Collections (Blog, Portfolio, FAQ, Testimonials)
3. Criar Symbols: Navbar, Footer, Buttons, Cards
4. Construir Home / página a página
5. Construir restantes páginas
6. Adicionar CSS global no head
7. Adicionar scripts GSAP, Rive e Schema no footer
8. Adicionar Three.js apenas na Home
9. Adicionar data-attributes em todos os elementos
10. Testar em mobile, tablet e desktop
11. Configurar SEO (meta, OG, sitemap)
12. Publicar

## WhatsApp URL

```
https://wa.me/351XXXXXXXXX?text=Olá!%20Tenho%20interesse%20em%20saber%20mais%20sobre%20os%20vossos%20planos.
```

Substituir XXXXXXXXX pelo número real.
