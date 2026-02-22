'use client'

import { Check, X } from 'lucide-react'

const bad = [
  'Fails the “3-second trust test”.',
  'Hard to find on Google for real searches.',
  'Visitors leave without taking action.',
  'Competitors look more established online.',
  'Your offer feels expensive because the brand looks weak.',
  'No tracking = no clarity on what’s working.',
]

const good = [
  'Instantly premium first impression.',
  'Technical SEO foundation for EU markets.',
  'Clear CTAs + lead form built to convert.',
  'Fast performance targets (Lighthouse 90+).',
  'Higher perceived value — easier to charge more.',
  'Analytics ready (GTM/pixels) from day one.',
]

export function WhyDifferentSection() {
  return (
    <section data-reveal="fade-up" className="pp-compare" aria-labelledby="compare-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="pp-compare-kicker justify-center">The difference is clear</div>

        <h2 id="compare-title" className="section-title mt-3">
          What changes with <span className="pp-gradient-text">PresençaPro</span>
        </h2>

        <p className="pp-compare-lead">
          Your website is your first sales call. In most industries, that first impression decides whether you{' '}
          <strong>win the lead</strong> — or lose it to a competitor.
        </p>

        <div className="pp-compare__wrap">
          {/* WITHOUT */}
          <div className="pp-compare-card pp-compare-card--bad" data-reveal="fade-up" data-delay="0.05">
            <div className="pp-compare-card__head">
              <div className="pp-compare-pill">
                <span className="pp-compare-pill__dot pp-compare-pill__dot--bad" />
                <div>
                  <div className="pp-compare-card__title">Without PresençaPro</div>
                  <div className="pp-compare-card__sub">current situation</div>
                </div>
              </div>
            </div>

            <div className="pp-compare-list">
              {bad.map((t) => (
                <div key={t} className="pp-compare-item">
                  <div className="pp-compare-icon pp-compare-icon--bad">
                    <X size={14} />
                  </div>
                  <div>{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WITH */}
          <div className="pp-compare-card pp-compare-card--good" data-reveal="fade-up" data-delay="0.12">
            <div className="pp-compare-card__head">
              <div className="pp-compare-pill">
                <span className="pp-compare-pill__dot pp-compare-pill__dot--good" />
                <div>
                  <div className="pp-compare-card__title">With PresençaPro</div>
                  <div className="pp-compare-card__sub">what you get</div>
                </div>
              </div>
            </div>

            <div className="pp-compare-list">
              {good.map((t) => (
                <div key={t} className="pp-compare-item">
                  <div className="pp-compare-icon pp-compare-icon--good">
                    <Check size={14} />
                  </div>
                  <div>{t}</div>
                </div>
              ))}
            </div>

            {/* Extra micro-proof (opcional, mas converte bem) */}
            <div className="mt-6 pt-5 border-t border-white/10 text-sm text-gray-300/90 font-body">
              Included in every plan: domain (.com/.pt), managed hosting, maintenance, and an SEO-ready structure.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}