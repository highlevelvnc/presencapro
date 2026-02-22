import { X, Check } from 'lucide-react'

const withoutItems = [
  'Looks untrustworthy in the first 3 seconds',
  'Doesn’t show up on Google for real searches',
  'Visitors leave without contacting you',
  'Slow pages that kill conversions',
  'Brand feels “small” or inconsistent',
  'No tracking, no data, no growth decisions',
]

const withItems = [
  'Premium design that builds instant trust',
  'Technical SEO ready for EU markets',
  'Lead form + clear CTAs that convert',
  'Lighthouse 90+ performance targets',
  'Managed hosting, SSL & automated backups',
  'Analytics-ready (GTM/pixels) from day one',
]

export function BeforeAfterSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="before-after-title">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="label-tag mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          The difference is real
        </div>

        <h2 id="before-after-title" className="section-title mb-4">
          What changes with <span className="text-gradient">PresençaPro</span>
        </h2>

        <p className="section-subtitle max-w-2xl mx-auto">
          Your website is your first sales call. Make it feel premium, fast, and easy to contact you.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Without */}
        <div
          data-reveal="fade-up"
          className="rounded-2xl p-8 border border-white/10 bg-white/[0.03] overflow-hidden relative"
        >
          {/* subtle red wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 30% 0%, rgba(255,60,60,0.10) 0%, transparent 70%)',
            }}
          />

          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-400/20 flex items-center justify-center">
              <X size={16} className="text-red-300" />
            </div>
            <div>
              <div className="font-sans font-semibold text-sm text-red-200">Without PresençaPro</div>
              <div className="font-mono text-xs text-gray-400">Current situation</div>
            </div>
          </div>

          <ul className="relative space-y-3">
            {withoutItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-red-500/10 border border-red-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X size={12} className="text-red-300" />
                </div>
                <span className="text-sm text-gray-300/90 font-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* With */}
        <div
          data-reveal="fade-up"
          className="rounded-2xl p-8 relative overflow-hidden border border-[#FF6B00]/20 bg-[#FF6B00]/[0.04]"
          style={{ boxShadow: '0 0 60px rgba(255,107,0,0.08)' }}
        >
          {/* glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.22) 0%, transparent 70%)',
              filter: 'blur(10px)',
              opacity: 0.55,
            }}
          />

          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center">
              <Check size={16} className="text-[#FF6B00]" />
            </div>
            <div>
              <div className="font-sans font-semibold text-sm text-[#FF8C3A]">With PresençaPro</div>
              <div className="font-mono text-xs text-gray-400">What you get</div>
            </div>
          </div>

          <ul className="relative space-y-3">
            {withItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-[#FF6B00]" />
                </div>
                <span className="text-sm text-gray-200 font-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* mini CTA line */}
          <div className="relative mt-6 pt-6 border-t border-white/10 text-sm text-gray-300/90 font-body">
            Plans include hosting + domain (.com / .pt) + maintenance. Delivery typically <span className="text-ice">72h</span>.
          </div>
        </div>
      </div>
    </section>
  )
}