import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Minus, Star, ArrowRight, Zap, Search, Mail, TrendingUp, Layout } from 'lucide-react'
import { plans, extras, comparisonTable } from '@/data/plans'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Professional websites with hosting, SSL, and maintenance included. No upfront cost. EU-ready setup with fast delivery.',
}

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_PHONE = '+351 934 071 660'

const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('PresençaPro — Website proposal')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI would like a professional website.\nBusiness name:\nCountry/City:\nGoal (leads / bookings / sales):\nPreferred domain (.com or .pt):\nAny references:\n\nThank you!'
  )}`

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  'trending-up': TrendingUp,
  layout: Layout,
  mail: Mail,
}

function ComparisonValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={16} className="text-[#FF6B00] mx-auto" />
  if (value === false) return <X size={14} className="text-gray-700 mx-auto" />
  if (value === '-') return <Minus size={14} className="text-gray-700 mx-auto" />
  return <span className="text-xs text-gray-400 font-body">{value}</span>
}

export default function PlansPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="label-tag mb-4 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          Transparent pricing
        </div>

        <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
          Plans & <span className="text-gradient">Pricing</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
          No upfront cost. Hosting + SSL + maintenance included. Delivery in{' '}
          <span className="text-ice">up to 72 hours</span>. Domains available: <span className="text-ice">.com</span> or{' '}
          <span className="text-ice">.pt</span>.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={SALES_MAILTO} className="btn-primary text-base px-8 py-4">
            Request a proposal
            <ArrowRight size={18} />
          </a>
          <a
            href={`mailto:${SALES_EMAIL}`}
            className="btn-secondary text-base px-8 py-4"
            title="Send us an email"
          >
            Email support
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-600 font-mono">
          Payments: Stripe + MB WAY · Automatic invoices · Support: {SALES_EMAIL} · {SALES_PHONE}
        </p>
      </div>

      {/* Plans grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                plan.popular ? 'border-[#FF6B00]/30 bg-[#FF6B00]/5' : 'border-white/6 bg-white/2'
              } border`}
              style={plan.popular ? { boxShadow: '0 0 80px rgba(255,107,0,0.08)' } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="badge flex items-center gap-1.5">
                    <Star size={11} className="fill-[#FF6B00] text-[#FF6B00]" />
                    Most popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">{plan.name}</div>

                <div className="flex items-end gap-1 mb-2">
                  <span className="font-sans font-bold text-5xl text-ice">{plan.price}€</span>
                  <span className="text-gray-500 font-body mb-2">/month</span>
                </div>

                <p className="text-sm text-gray-500 font-body">{plan.tagline}</p>

                {/* Commitment note (EN) */}
                <div className="mt-3 text-[12px] text-gray-400 font-body">
                  Minimum commitment:{' '}
                  <span className="text-ice font-semibold">
                    {plan.id === 'premium' ? '12 months' : '6 months'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-body">{feature}</span>
                  </li>
                ))}

                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm opacity-40">
                    <X size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 font-body line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/how-it-works"
                className={`w-full text-center py-4 rounded-xl font-sans font-semibold transition-all duration-200 ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Included in all plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl p-8 md:p-10 glass border border-white/5">
          <h2 className="font-sans font-bold text-2xl text-ice mb-6">Included in every plan</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Domain (.com or .pt) included',
              'SSL certificate',
              'Managed hosting',
              'Mobile-first design',
              'Contact form',
              'Speed optimized',
              'Email support',
              'EU-ready SEO foundation',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-gray-300 font-body">
                <div className="w-4 h-4 rounded bg-[#FF6B00]/15 border border-[#FF6B00]/25 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#FF6B00]" />
                </div>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-gray-500 font-body leading-relaxed">
            Payments via <span className="text-ice">Stripe</span> and <span className="text-ice">MB WAY</span>. Automatic
            invoices available. We can also prepare the site for GTM + pixels (Meta/Google) on request.
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-sans font-bold text-2xl text-ice mb-8 text-center">Full comparison</h2>

        <div className="rounded-2xl overflow-hidden border border-white/6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-white/5">
                <th className="text-left p-4 font-body text-gray-400 font-medium">Feature</th>

                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`p-4 font-sans font-semibold text-center ${
                      plan.popular ? 'text-[#FF8C3A]' : 'text-ice'
                    }`}
                  >
                    {plan.name}
                    <div className="font-body font-normal text-xs text-gray-500">{plan.price}€/month</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonTable.map((row, i) => (
                <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/1' : ''}`}>
                  <td className="p-4 text-gray-400 font-body">{row.feature}</td>

                  <td className="p-4 text-center">
                    <ComparisonValue value={row.starter} />
                  </td>

                  <td className="p-4 text-center bg-[#FF6B00]/2">
                    <ComparisonValue value={row.pro} />
                  </td>

                  <td className="p-4 text-center">
                    <ComparisonValue value={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-gray-600 font-mono text-center">
          Tip: translate <code>@/data/plans</code> to show this table fully in English.
        </p>
      </div>

      {/* Extras */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="font-sans font-bold text-2xl text-ice mb-2">Add-ons</h2>
          <p className="text-gray-500 font-body text-sm">Enhance your website with optional services</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {extras.map((extra) => {
            const IconComponent = iconMap[extra.icon] || Zap
            return (
              <div key={extra.name} className="card p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/15 flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={18} className="text-[#FF6B00]" />
                </div>

                <div className="font-sans font-semibold text-ice mb-1">{extra.name}</div>
                <div className="text-[#FF8C3A] font-bold font-sans mb-3">+{extra.price}€/month</div>
                <p className="text-xs text-gray-500 font-body leading-relaxed">{extra.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Commitment note */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div
          className="rounded-2xl p-8 text-center border border-[#FF6B00]/15"
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,255,255,0.02))',
            boxShadow: '0 0 60px rgba(255,107,0,0.06)',
          }}
        >
          <h3 className="font-sans font-bold text-xl text-ice mb-3">Commitment terms</h3>

          <p className="text-gray-400 font-body text-sm leading-relaxed">
            Starter and Pro plans have a minimum commitment of{' '}
            <strong className="text-ice">6 months</strong>. Premium has a minimum commitment of{' '}
            <strong className="text-ice">12 months</strong>.
            <br />
            After the minimum period, you can continue or cancel with{' '}
            <strong className="text-ice">30 days notice</strong>.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/how-it-works" className="btn-primary text-base px-8 py-4">
            Start now
            <ArrowRight size={18} />
          </Link>

          <a href={SALES_MAILTO} className="btn-secondary text-base px-8 py-4">
            Email us first
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-600 font-mono">
          No upfront cost · Typical delivery: 72h · Payments: Stripe + MB WAY
        </p>
      </div>
    </main>
  )
}