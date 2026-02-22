import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { faqs } from '@/data/faq'

export function FAQTeaser() {
  const teaserFaqs = faqs.slice(0, 5)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="label-tag mb-4 inline-flex justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          Frequently asked questions
        </div>

        <h2 className="section-title mb-4">
          Have questions? <span className="text-gradient">We’ve answered them.</span>
        </h2>

        <p className="text-sm text-gray-400 max-w-xl mx-auto font-body leading-relaxed">
          Everything you need to know about delivery time, subscription terms,
          domain ownership and ongoing support.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 mb-12">
        {teaserFaqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-[#FF6B00]/40"
            style={{ boxShadow: '0 16px 60px rgba(0,0,0,0.25)' }}
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-semibold text-sm text-ice">
              {faq.question}
              <ChevronDown
                size={16}
                className="text-gray-500 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>

            <p className="mt-5 pt-5 border-t border-white/10 text-sm text-gray-400 leading-relaxed font-body">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FF8C3A] transition-colors font-body group"
        >
          View all questions
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}