import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/plans', label: 'Plans & Pricing' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/contact', label: 'Request a proposal' },
  ],
  resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/legal/terms', label: 'Terms of Service' },
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/cookies', label: 'Cookie Policy' },
  ],
}

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_PHONE_DISPLAY = '+351 934 071 660'
const SALES_PHONE_TEL = '+351934071660'

const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('PresençaPro — Website proposal')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI would like a professional website.\nBusiness name:\nCountry/City:\nGoal (leads / bookings / sales):\nPreferred domain (.com or .pt):\nNotes:\n\nThank you!'
  )}`

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_22px_rgba(255,107,0,0.45)]">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight">
                Presença<span className="text-[#FF6B00]">Pro</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md font-body mb-6">
              Premium websites for businesses across the EU — built for conversion, speed and SEO.
              Hosting + domain included (.com or .pt), with managed maintenance and ongoing support.
            </p>

            {/* Quick bullets */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                Typical delivery: 72h
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                Stripe + MBWay
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                Automatic invoicing
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                GTM & Pixel ready
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              <a
                href={SALES_MAILTO}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF6B00] transition-colors"
              >
                <Mail size={14} />
                {SALES_EMAIL}
              </a>

              <a
                href={`tel:${SALES_PHONE_TEL}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#FF6B00] transition-colors"
              >
                <Phone size={14} />
                {SALES_PHONE_DISPLAY}
              </a>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} />
                Serving the European Union
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <a
                href={SALES_MAILTO}
                className="inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FF8C3A] transition-colors font-body group"
              >
                Request a proposal
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-sans font-semibold text-ice mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ice transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-sans font-semibold text-ice mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ice transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-sans font-semibold text-ice mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ice transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-gray-600 font-body leading-relaxed">
              *Plans include hosting + domain (.com or .pt). Minimum term may apply depending on plan.
            </p>
          </div>
        </div>

        <div className="section-divider my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © {new Date().getFullYear()} PresençaPro. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-600 font-mono">
              Status: operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}