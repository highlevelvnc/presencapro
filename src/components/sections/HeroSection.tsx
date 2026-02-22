'use client'

import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, Timer, Sparkles, CreditCard, Receipt } from 'lucide-react'

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('PresençaPro — Website subscription')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI want a website subscription.\n\nBusiness name:\nCountry/City:\nIndustry:\nGoal (leads/bookings/sales):\nPreferred domain (.com or .pt):\nLanguages needed:\n\nThanks!'
  )}`

export function HeroSection() {
  return (
    <section
      data-hero-section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
        />

        {/* Dark overlay + color wash */}
        <div className="absolute inset-0 bg-[#0F0F0F]/78" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,107,0,0.14) 0%, transparent 72%)',
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 pp-grid-bg opacity-30" />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0F0F0F)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Eyebrow */}
        <div
          data-hero-badge
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-200 text-[11px] tracking-[0.16em] uppercase font-mono mb-8"
        >
          <Sparkles size={14} className="opacity-90 text-[#FF6B00]" />
          Website subscription for EU businesses
        </div>

        {/* Headline */}
        <h1
          data-hero-headline
          className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight"
        >
          A complete digital presence.
          <br />
          <span className="text-gradient">Hosted. Maintained.</span> Optimized.
        </h1>

        {/* Subheadline */}
        <p
          data-hero-sub
          className="text-lg sm:text-xl text-gray-300/90 max-w-3xl mx-auto mb-10 leading-relaxed font-body"
        >
          Domain (.com or .pt), managed hosting, technical SEO and continuous maintenance —
          <span className="text-gray-400"> with a fixed monthly plan.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link data-hero-cta href="/plans" className="btn-primary text-base px-8 py-4">
            Start subscription
            <ArrowRight size={18} />
          </Link>

          <Link data-hero-cta href="/portfolio" className="btn-secondary text-base px-8 py-4">
            <Play size={16} className="fill-current" />
            View portfolio
          </Link>

          {/* Optional: softer alternative CTA */}
          <a
            data-hero-cta
            href={SALES_MAILTO}
            className="text-sm text-gray-400 hover:text-ice transition-colors font-body underline underline-offset-4"
          >
            Prefer email? contact@presencapro.com
          </a>
        </div>

        {/* Micro-proof (mais “produto”) */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 font-body">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#FF6B00]" />
            <span>SSL + backups + monitoring</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Timer size={16} className="text-[#FF6B00]" />
            <span>Typical delivery: 72 hours</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-[#FF6B00]" />
            <span>Stripe + MB Way</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Receipt size={16} className="text-[#FF6B00]" />
            <span>Automatic invoicing</span>
          </div>
        </div>
      </div>
    </section>
  )
}