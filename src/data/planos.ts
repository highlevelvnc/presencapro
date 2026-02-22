export interface Plano {
  id: string;
  nome: string;
  preco: number;
  popular: boolean;
  descricao: string;
  features: string[];
  naoInclui?: string[];
  cta: string;
}

export const planos: Plano[] = [
  {
    id: "starter",
    nome: "Starter",
    preco: 25,
    popular: false,
    descricao: "Para quem quer começar com presença online sem complicações.",
    features: [
      "1 página (landing page)",
      "Domínio .pt ou .com incluído",
      "Certificado SSL (https)",
      "Hospedagem gerida",
      "Botão WhatsApp integrado",
      "Formulário de contacto",
      "Template fixo optimizado",
      "1 alteração por trimestre",
      "Suporte por email",
    ],
    naoInclui: [
      "Personalização de design",
      "Blog ou páginas extra",
      "SEO avançado",
    ],
    cta: "Começar agora",
  },
  {
    id: "pro",
    nome: "Pro",
    preco: 50,
    popular: true,
    descricao: "O plano mais escolhido. Design único e estrutura para crescer.",
    features: [
      "Até 5 páginas personalizadas",
      "Design completamente personalizado",
      "SEO base + estrutura de headings",
      "Google Maps integrado",
      "CTAs estratégicos",
      "Blog com artigos",
      "1 alteração mensal",
      "Backup mensal automático",
      "Relatório semestral",
      "Suporte prioritário",
    ],
    cta: "Escolher Pro",
  },
  {
    id: "premium",
    nome: "Premium",
    preco: 100,
    popular: false,
    descricao: "Para negócios que querem dominar o mercado local online.",
    features: [
      "Tudo do plano Pro",
      "Landing page extra (campanhas)",
      "SEO avançado + schema markup",
      "Optimização de conversão (CRO)",
      "A/B testing de CTAs",
      "Relatório trimestral detalhado",
      "Google Analytics 4 configurado",
      "Alterações ilimitadas*",
      "Suporte prioritário VIP",
      "Consulta mensal (30 min)",
    ],
    cta: "Ir Premium",
  },
];

export const extras = [
  {
    id: "seo-avancado",
    nome: "SEO Avançado",
    preco: 29,
    descricao: "Auditoria técnica, palavras-chave, linkbuilding local.",
    icone: "Search",
  },
  {
    id: "trafego-pago",
    nome: "Gestão de Tráfego Pago",
    preco: 149,
    descricao: "Campanhas Google Ads e Meta Ads optimizadas para conversão.",
    icone: "TrendingUp",
  },
  {
    id: "landing-extra",
    nome: "Landing Page Extra",
    preco: 200,
    descricao: "Página adicional para campanha, produto ou serviço específico.",
    icone: "Layout",
  },
  {
    id: "email-profissional",
    nome: "Email Profissional",
    preco: 5,
    descricao: "Email @seudominio.pt com interface profissional e 10GB.",
    icone: "Mail",
  },
];

export const comparativoFeatures = [
  { feature: "Design personalizado", starter: false, pro: true, premium: true },
  { feature: "Número de páginas", starter: "1", pro: "5", premium: "5+" },
  { feature: "Blog integrado", starter: false, pro: true, premium: true },
  { feature: "SEO optimizado", starter: "Básico", pro: "Intermédio", premium: "Avançado" },
  { feature: "Alterações mensais", starter: "Trimestral", pro: "1x mês", premium: "Ilimitadas*" },
  { feature: "Backup automático", starter: false, pro: true, premium: true },
  { feature: "Relatório de performance", starter: false, pro: "Semestral", premium: "Trimestral" },
  { feature: "Landing page extra", starter: false, pro: false, premium: true },
  { feature: "Optimização conversão", starter: false, pro: false, premium: true },
  { feature: "Consulta mensal", starter: false, pro: false, premium: "30 min" },
  { feature: "Suporte", starter: "Email", pro: "Prioritário", premium: "VIP" },
];
