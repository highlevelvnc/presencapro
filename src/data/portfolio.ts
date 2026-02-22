export type PortfolioItem = {
  id: string
  name: string
  niche: string
  nicheLabel: string
  description: string
  objective: string
  sections: string[]
  stack: string[]
  performance: number
  color: string
  accent: string
  tags: string[]
  url?: string
  previewVideo?: string
  metrics: {
    lighthouse: number
    loadTime: string
    conversion?: string
  }
}

export const niches = [
  { id: 'all', label: 'All' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'clinic', label: 'Healthcare' },
  { id: 'services', label: 'Services' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'beauty', label: 'Beauty & Aesthetics' },
  { id: 'consulting', label: 'Consulting' },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'latina-grill-cascais',
    name: 'Latina Grill',
    niche: 'restaurant',
    nicheLabel: 'Restaurant',
    description: 'Conversion-focused restaurant website for a premium dining experience in Cascais.',
    objective: 'Increase table reservations and WhatsApp orders.',
    sections: ['Hero', 'Menu', 'Location', 'Contact'],
    stack: ['Next.js', 'TailwindCSS'],
    performance: 95,
    color: '#15110F',
    accent: '#FF6B00',
    tags: ['Restaurant', 'Cascais', 'WhatsApp'],
    url: 'https://latinagrill-g9ri.vercel.app/pt',
    previewVideo: '/videos/latinasite.mp4',
    metrics: { lighthouse: 95, loadTime: '0.9s' },
  },

  {
    id: 'ot-remodelacoes',
    name: 'OT Renovations',
    niche: 'services',
    nicheLabel: 'Construction Services',
    description: 'International-ready website for a renovation company focused on high-quality leads.',
    objective: 'Generate qualified quotation requests.',
    sections: ['Hero', 'Services', 'Process', 'Contact'],
    stack: ['Next.js', 'TailwindCSS'],
    performance: 96,
    color: '#0F0F0F',
    accent: '#FF6B00',
    tags: ['Renovation', 'Leads', 'EU'],
    url: 'https://otnew.vercel.app/en',
    previewVideo: '/videos/otsite.mp4',
    metrics: { lighthouse: 96, loadTime: '0.8s' },
  },

  {
    id: 'faunos-emeritos',
    name: 'Faunos Eméritos',
    niche: 'services',
    nicheLabel: 'Construction Services',
    description: 'Institutional website designed for credibility and brand positioning.',
    objective: 'Strengthen branding and drive quote requests.',
    sections: ['Hero', 'Services', 'Gallery', 'Contact'],
    stack: ['Next.js', 'TailwindCSS'],
    performance: 94,
    color: '#121212',
    accent: '#FF6B00',
    tags: ['Renovation', 'Portugal'],
    url: 'https://faunosemeritos.pt',
    previewVideo: '/videos/faunossite.mp4',
    metrics: { lighthouse: 94, loadTime: '1.0s' },
  },

  {
    id: 'dj-clean',
    name: 'DJ Clean',
    niche: 'services',
    nicheLabel: 'Cleaning Services',
    description: 'Lead-generation website for a professional cleaning company.',
    objective: 'Drive direct WhatsApp enquiries.',
    sections: ['Hero', 'Services', 'Contact'],
    stack: ['Next.js', 'TailwindCSS'],
    performance: 93,
    color: '#0B0F14',
    accent: '#FF6B00',
    tags: ['Cleaning', 'Leads'],
    url: 'https://djcleanrj.com.br/',
    metrics: { lighthouse: 93, loadTime: '1.1s' },
  },

  {
    id: 'hatschek-law',
    name: 'Anderson Hatschek',
    niche: 'consulting',
    nicheLabel: 'Legal Consulting',
    description: 'Authority-focused landing page for a legal professional.',
    objective: 'Capture high-quality legal enquiries.',
    sections: ['Hero', 'Practice Areas', 'Contact'],
    stack: ['Next.js', 'TailwindCSS'],
    performance: 95,
    color: '#0E0E10',
    accent: '#FF6B00',
    tags: ['Law', 'Conversion'],
    url: 'https://hatschekadv-znjv.vercel.app/',
    metrics: { lighthouse: 95, loadTime: '0.9s' },
  },

  // ===== DEMO PROJECTS =====

  {
    id: 'solar-remodel',
    name: 'Solar & Remodel',
    niche: 'services',
    nicheLabel: 'Construction & Solar',
    description: 'High-performance website for renovation and solar energy services.',
    objective: 'Generate quotation leads and establish technical credibility.',
    sections: ['Video Hero', 'Services', 'Process', 'Testimonials', 'Quote Form'],
    stack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    performance: 97,
    color: '#1A1A2E',
    accent: '#FF6B00',
    tags: ['Solar', 'Renovation', 'Leads'],
    metrics: { lighthouse: 97, loadTime: '0.8s', conversion: '+34%' },
  },

  {
    id: 'tasca-do-avo',
    name: 'Tasca do Avô',
    niche: 'restaurant',
    nicheLabel: 'Restaurant',
    description: 'Premium restaurant landing page with immersive presentation.',
    objective: 'Increase online reservations and menu visibility.',
    sections: ['Hero', 'Digital Menu', 'Location', 'Booking', 'Gallery'],
    stack: ['Next.js', 'TailwindCSS', 'Google Maps API'],
    performance: 94,
    color: '#2D1B00',
    accent: '#F5A623',
    tags: ['Restaurant', 'Bookings', 'Lisbon'],
    metrics: { lighthouse: 94, loadTime: '1.0s', conversion: '+52%' },
  },

  {
    id: 'dra-ana-martins',
    name: 'Dr. Ana Martins',
    niche: 'clinic',
    nicheLabel: 'Healthcare',
    description: 'Medical website designed for trust and appointment booking.',
    objective: 'Drive online consultation bookings.',
    sections: ['Hero', 'Treatments', 'About', 'Testimonials', 'Booking'],
    stack: ['Next.js', 'TailwindCSS', 'Calendly'],
    performance: 98,
    color: '#0D1B2A',
    accent: '#5BBFBA',
    tags: ['Clinic', 'Healthcare', 'Appointments'],
    metrics: { lighthouse: 98, loadTime: '0.7s', conversion: '+41%' },
  },

  {
    id: 'casa-nova-imoveis',
    name: 'Casa Nova Real Estate',
    niche: 'real-estate',
    nicheLabel: 'Real Estate',
    description: 'Boutique real estate website focused on premium listings.',
    objective: 'Present luxury properties and capture buyer enquiries.',
    sections: ['Immersive Hero', 'Property Listings', 'Agency', 'Testimonials', 'Contact'],
    stack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Mapbox'],
    performance: 92,
    color: '#1C1C1C',
    accent: '#C9A96E',
    tags: ['Real Estate', 'Luxury', 'Cascais'],
    metrics: { lighthouse: 92, loadTime: '1.1s' },
  },

  {
    id: 'studio-glow',
    name: 'Studio Glow',
    niche: 'beauty',
    nicheLabel: 'Beauty & Aesthetics',
    description: 'High-conversion aesthetic clinic website with premium feel.',
    objective: 'Drive treatment bookings and premium positioning.',
    sections: ['Hero', 'Treatments', 'Before/After', 'Testimonials', 'Booking'],
    stack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    performance: 96,
    color: '#1A1016',
    accent: '#D4A0C8',
    tags: ['Beauty', 'Aesthetics', 'Porto'],
    metrics: { lighthouse: 96, loadTime: '0.9s', conversion: '+67%' },
  },

  {
    id: 'paulo-mendes-consulting',
    name: 'Paulo Mendes Consulting',
    niche: 'consulting',
    nicheLabel: 'Financial Consulting',
    description: 'Professional website for an independent financial consultant.',
    objective: 'Build authority and attract corporate clients.',
    sections: ['Hero', 'Services', 'Methodology', 'Case Studies', 'Contact'],
    stack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    performance: 99,
    color: '#0A0F1E',
    accent: '#4A90D9',
    tags: ['Consulting', 'Finance', 'Lisbon'],
    metrics: { lighthouse: 99, loadTime: '0.6s' },
  },
]