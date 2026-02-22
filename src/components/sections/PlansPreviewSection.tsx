import Link from 'next/link'
import { Check, ArrowRight, Star, CreditCard, Receipt, Globe } from 'lucide-react'
import { plans } from '@/data/plans'

export function PlansPreviewSection() {
  return (
    <section data-reveal="fade-up" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="pp-eyebrow justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          Transparent pricing
        </div>

        <h2 className="section-title mb-4">
          Choose the <span className="pp-gradient-text">right plan</span>
        </h2>

        <p className="section-subtitle max-w-2xl mx-auto">
          All plans include managed hosting + domain (.com or .pt) + maintenance.
          Cancel later with 30 days notice. Minimum commitment: <span className="text-ice">6 months</span> (Pro: <span className="text-ice">12 months</span>).
        </p>

        {/* Micro-proof row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 font-body">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <CreditCard size={14} className="text-[#FF6B00]" />
            Stripe + MB Way
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <Receipt size={14} className="text-[#FF6B00]" />
            Automatic invoices
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <Globe size={14} className="text-[#FF6B00]" />
            Built for EU businesses
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {plans.map((plan) => {
          const topFeatures = plan.features.slice(0, 5)

          return (
            <div
              key={plan.id}
              className={[
                'pp-pricing-card',
                'group',
                plan.popular ? 'pp-pricing-card--popular' : '',
              ].join(' ')}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="pp-badge pp-badge--popular inline-flex items-center gap-2">
                  <Star size={12} className="fill-white text-white" />
                  Most popular
                </div>
              )}

              {/* Plan head */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                      {plan.name}
                    </div>

                    <div className="flex items-end gap-1 mb-1">
                      <span className="font-sans font-bold text-4xl text-ice">{plan.price}€</span>
                      <span className="text-gray-500 font-body mb-1">/month</span>
                    </div>

                    <p className="text-sm text-gray-400 font-body leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* commitment pill */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.14em] border border-white/10 bg-white/5 text-gray-300">
                      {plan.price >= 120 ? '12 months' : '6 months'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 mb-8">
                {topFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <span className="w-5 h-5 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#FF6B00]" />
                    </span>
                    <span className="text-gray-300 font-body leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Footer: included line + CTA */}
              <div className="mt-auto">
                <div className="text-xs text-gray-500 font-body mb-4">
                  Included: hosting, domain, SSL, backups & maintenance.
                </div>

                <Link
                  href="/plans"
                  className={[
                    'pp-btn',
                    'pp-btn--lg',
                    'w-full',
                    'justify-center',
                    plan.popular ? 'pp-btn--primary' : 'pp-btn--ghost',
                  ].join(' ')}
                >
                  {plan.cta || 'See plan details'}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom link */}
      <div className="text-center">
        <Link
          href="/plans"
          className="inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FF8C3A] transition-colors font-body group"
        >
          View full comparison & details
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}