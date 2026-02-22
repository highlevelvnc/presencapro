# PresençaPro — Site Premium

Site completo de presença digital para vender serviços de criação de sites em Portugal.
Stack: **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion**

---

## 🚀 Deploy no Vercel (5 minutos)

### Opção 1 — Via GitHub (recomendado)

1. Faz push do projeto para um repositório GitHub
2. Acede a [vercel.com](https://vercel.com) e clica **"New Project"**
3. Importa o repositório
4. Clica **Deploy** — tudo configurado automaticamente

### Opção 2 — Via Vercel CLI

```bash
npm install -g vercel
cd presencapro
vercel deploy --prod
```

---

## ⚙️ Configuração antes do deploy

### 1. Número de WhatsApp
Edita `src/lib/utils.ts`:
```ts
export const WHATSAPP_NUMBER = '351912345678' // ← O teu número PT
```

### 2. Domínio
Após deploy no Vercel, vai a **Settings → Domains** e adiciona o teu domínio.
Actualiza também `src/app/layout.tsx`:
```ts
metadataBase: new URL('https://seudominio.pt'),
```

### 3. Google Analytics (opcional)
Adiciona o teu GA4 Measurement ID em `src/app/layout.tsx`.

---

## 📁 Estrutura do Projecto

```
src/
├── app/                    # Rotas (App Router)
│   ├── page.tsx            # Home
│   ├── planos/             # /planos
│   ├── portfolio/          # /portfolio
│   ├── como-funciona/      # /como-funciona
│   ├── faq/                # /faq
│   ├── contacto/           # /contacto
│   ├── blog/               # /blog e /blog/[slug]
│   └── legal/              # /legal/termos e /legal/privacidade
│
├── components/
│   ├── Navbar.tsx           # Navegação
│   ├── Footer.tsx           # Rodapé
│   ├── LoadingScreen.tsx    # Ecrã de carregamento
│   ├── ScrollProgress.tsx   # Barra de progresso
│   ├── StickyMobileCTA.tsx  # CTA fixo mobile
│   └── sections/            # Secções da homepage
│
├── data/                    # Conteúdo editável
│   ├── plans.ts             # Planos e extras
│   ├── portfolio.ts         # Casos de portfólio
│   ├── faq.ts               # Perguntas frequentes
│   └── blog.ts              # Posts do blog
│
└── lib/
    └── utils.ts             # Utilitários (WhatsApp URL, etc.)
```

---

## ✏️ Como editar o conteúdo

### Adicionar um cliente ao portfólio
Edita `src/data/portfolio.ts` e adiciona um item ao array `portfolioItems`.

### Adicionar um post ao blog
Edita `src/data/blog.ts` e adiciona um post ao array `blogPosts`.

### Editar preços ou planos
Edita `src/data/plans.ts`.

### Editar FAQ
Edita `src/data/faq.ts`.

---

## 🎨 Design System

**Paleta:**
- Fundo: `#0F0F0F`
- Laranja: `#FF6B00`
- Branco gelo: `#F5F5F5`
- Superfície: `#1A1A1A`

**Tipografia:**
- Display/Títulos: Syne (Google Fonts)
- Corpo: DM Sans (Google Fonts)
- Código: JetBrains Mono (Google Fonts)

**Classes CSS custom:**
- `.btn-primary` — botão laranja principal
- `.btn-secondary` — botão contorno
- `.glass` — efeito glassmorphism
- `.gradient-text` — texto gradiente laranja
- `.badge` — chip/etiqueta laranja
- `.label-tag` — indicador de secção monospace
- `.grid-bg` — fundo com grid tech
- `.section-divider` — divisor laranja subtil

---

## 📦 Dependências

```json
{
  "next": "^14",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "lucide-react": "^0.400"
}
```

---

## 🏆 Características

- ✅ 20 páginas estáticas optimizadas
- ✅ SEO completo (meta, OG, schema, sitemap, robots)
- ✅ Design system consistente "tech premium"
- ✅ Loading screen com animação
- ✅ Barra de progresso no scroll
- ✅ Navbar com blur e estados activos
- ✅ CTA fixo em mobile (WhatsApp)
- ✅ Portfólio com modais e filtros por nicho
- ✅ Blog com 6 posts iniciais
- ✅ FAQ com filtros por categoria
- ✅ Formulário multi-step em /como-funciona
- ✅ Página de planos com tabela comparativa
- ✅ Métricas animadas com contador
- ✅ Depoimentos com estrelas
- ✅ Termos e Privacidade
- ✅ Sitemap.xml e robots.txt automáticos
- ✅ TypeScript strict mode
- ✅ Build 100% limpo sem warnings

---

Desenvolvido pela PresençaPro 🇵🇹
