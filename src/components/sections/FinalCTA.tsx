import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('Website subscription — request proposal')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI’d like a professional website.\n\nBusiness name:\nCountry/City:\nGoal (leads/bookings/sales):\nPreferred domain (.com or .pt):\nLanguage(s) needed:\n\nThank you!'
  )}`

export function FinalCTA() {
  return (
    <section className="py-28 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,107,0,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="label-tag mb-6 justify-center inline-flex">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          Ready to launch?
        </div>

        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">
          Launch a website that looks premium
          <br />
          <span className="text-gradient">and converts from day one.</span>
        </h2>

        <p className="text-lg text-gray-400 mb-10 leading-relaxed font-body">
          Subscription-based websites for EU businesses — fast delivery, managed hosting, technical SEO, and ongoing support.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/plans" className="btn-primary text-base px-8 py-4">
            See plans & start
            <ArrowRight size={18} />
          </Link>

          <a href={SALES_MAILTO} className="btn-secondary text-base px-8 py-4">
            <Mail size={18} />
            Request a proposal by email
          </a>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-xs text-gray-600 font-mono">
          No upfront cost · Typical first version in 72h · Minimum term: 6 months (12 months on Premium)
        </p>
      </div>
    </section>
  )
}