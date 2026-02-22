export type FAQItem = {
  question: string
  answer: string
  category: string
}

export const faqCategories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'pricing', label: 'Pricing & Plans' },
  { id: 'process', label: 'Process' },
  { id: 'technical', label: 'Technical' },
  { id: 'support', label: 'Support' },
]

export const faqs: FAQItem[] = [
  // ===== PRICING =====
  {
    category: 'pricing',
    question: 'Why is there no upfront fee?',
    answer:
      'We run on a subscription model so you can get a premium website without paying a large upfront cost. Instead of investing €1,500+ upfront, you pay a monthly plan that includes domain (.com or .pt), managed hosting, maintenance, and support. It’s our way of lowering the barrier while keeping quality high.',
  },
  {
    category: 'pricing',
    question: 'Can I cancel anytime?',
    answer:
      'Plans have a minimum commitment: Starter and Pro require 6 months, and Premium requires 12 months. After the minimum term, you can cancel with 30 days’ notice. This commitment allows us to deliver fast (up to 72 hours) and still invest properly in your setup and quality.',
  },
  {
    category: 'pricing',
    question: 'What happens if I cancel — do I keep the website?',
    answer:
      'You can request a static export of your website. If the domain is registered under your name, it stays with you. Managed hosting, updates, and ongoing maintenance are part of the subscription, so the live service is discontinued when the plan ends.',
  },
  {
    category: 'pricing',
    question: 'What payment methods do you accept?',
    answer:
      'We accept Stripe (cards) and MB WAY. Invoicing can be automated, and you’ll receive an invoice for every payment.',
  },
  {
    category: 'pricing',
    question: 'Which domains are included?',
    answer:
      'We include one domain per plan, limited to .com or .pt. If you need another extension or additional domains, we can quote it as an add-on.',
  },

  // ===== PROCESS =====
  {
    category: 'process',
    question: 'How fast can you deliver?',
    answer:
      'Most projects are delivered within 72 hours after we receive your onboarding information (content, brand details, and preferences). If a project needs extra content production or complex requirements, we’ll confirm the timeline before starting.',
  },
  {
    category: 'process',
    question: 'What do you need from me to start?',
    answer:
      'We’ll ask for: business name, a short description, services, location/coverage area, logo (optional), photos (optional), and any references you like. If you don’t have photos, we can use high-quality licensed stock assets that match your niche.',
  },
  {
    category: 'process',
    question: 'Can I request changes after delivery?',
    answer:
      'Yes. Each plan includes a set number of monthly updates (Starter: quarterly, Pro: 1/month, Premium: up to 2/month). Additional changes outside the plan can be handled as extra work if needed.',
  },
  {
    category: 'process',
    question: 'Do you work with businesses across the EU?',
    answer:
      'Yes. We work remotely with clients across the European Union. Your site can be prepared for multi-language expansion (EN/PT/ES/FR) and structured for EU-wide SEO.',
  },

  // ===== TECHNICAL =====
  {
    category: 'technical',
    question: 'Will my website be fast and Google-ready?',
    answer:
      'Performance is a core requirement. We build for strong Lighthouse scores and fast load times. We include technical SEO foundations (clean structure, headings, metadata). Premium includes advanced SEO + schema markup.',
  },
  {
    category: 'technical',
    question: 'Is the website mobile-first?',
    answer:
      'Always. Every site is designed mobile-first and then optimised for larger screens. This ensures conversions stay high on phones — where most traffic happens.',
  },
  {
    category: 'technical',
    question: 'What technology do you use?',
    answer:
      'We build with modern frameworks (Next.js/React + Tailwind). This delivers high performance, clean UX, and a strong base if you want to scale later.',
  },
  {
    category: 'technical',
    question: 'Can you prepare GTM, Meta Pixel, and analytics?',
    answer:
      'Yes. We can prepare the structure for Google Tag Manager and pixels, and set up GA4 depending on your plan. If you already have tracking IDs, you can share them during onboarding.',
  },
  {
    category: 'technical',
    question: 'Is it GDPR-friendly?',
    answer:
      'We can structure the site to be GDPR-friendly and include cookie consent if you use analytics/marketing tools. Final compliance depends on your business practices and the tools you enable.',
  },

  // ===== SUPPORT =====
  {
    category: 'support',
    question: 'How does support work?',
    answer:
      'Support is available via email and WhatsApp. Starter and Pro typically reply within 48–72 business hours. Premium has priority support with a 24h response target (business days).',
  },
  {
    category: 'support',
    question: 'What if the website has a technical issue?',
    answer:
      'We monitor sites and fix technical issues as quickly as possible. If something breaks on our side, we treat it as a priority and work to restore service fast during business days.',
  },
  {
    category: 'support',
    question: 'How can I contact you?',
    answer:
      'Email: contact@presencapro.com | WhatsApp: +351 934 071 660',
  },

  // ===== GENERAL =====
  {
    category: 'general',
    question: 'Can I request a fully custom website?',
    answer:
      'Yes. Pro and Premium are designed for custom layouts and brand-specific design. If you need something beyond a marketing site (e-commerce, portals, web apps), we can review and provide a custom proposal.',
  },
  {
    category: 'general',
    question: 'Do you offer content writing and visuals?',
    answer:
      'We can help with structure, messaging, and selecting strong visuals. If you need professional copywriting or a full content package, we can offer it as an add-on depending on your niche and goals.',
  },
]