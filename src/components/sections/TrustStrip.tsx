'use client'

import { Zap, Shield, TrendingUp, Search, Smartphone, Receipt, CreditCard } from 'lucide-react'

const trustItems = [
  { icon: Zap, label: 'Fast', desc: 'Sub-second load targets' },
  { icon: Shield, label: 'Secure', desc: 'SSL + automated backups' },
  { icon: Search, label: 'SEO-ready', desc: 'Built to index & rank' },
  { icon: TrendingUp, label: 'Conversion-first', desc: 'Clear CTAs + lead forms' },
  { icon: Smartphone, label: 'Mobile-first', desc: 'Optimised for every device' },
  { icon: CreditCard, label: 'Payments', desc: 'Stripe + MB Way ready' },
  { icon: Receipt, label: 'Invoices', desc: 'Automatic billing' },
]

export function TrustStrip() {
  return (
    <section data-reveal="fade-up" className="relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(255,107,0,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container */}
        <div className="pp-trust-strip">
          {trustItems.map((item) => (
            <div key={item.label} className="pp-trust-item">
              <item.icon size={16} />
              <span className="text-ice">{item.label}</span>
              <span className="text-gray-500 font-body text-xs">•</span>
              <span className="text-gray-500 font-body text-xs">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Small note (optional, feels more “real”) */}
        <p className="mt-4 text-center text-xs text-gray-500 font-body">
          All plans include managed hosting + domain (.com / .pt) + maintenance.
        </p>
      </div>
    </section>
  )
}