import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { PlansPreviewSection } from '@/components/sections/PlansPreviewSection'
import { WhyDifferentSection } from '@/components/sections/WhyDifferentSection'
import { PortfolioTeaser } from '@/components/sections/PortfolioTeaser'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQTeaser } from '@/components/sections/FAQTeaser'
import { FinalCTA } from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'PresençaPro — Sites Profissionais em Portugal',
  description: 'O site que faz o teu negócio parecer grande. Criação sem custo inicial, a partir de 25€/mês. Design premium, SEO, e manutenção incluídos.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <HowItWorksSection />
      <PlansPreviewSection />
      <WhyDifferentSection />
      <PortfolioTeaser />
      <TestimonialsSection />
      <FAQTeaser />
      <FinalCTA />
    </>
  )
}
