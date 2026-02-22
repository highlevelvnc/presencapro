'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MessageCircle } from 'lucide-react'
import type { FAQItem } from '@/data/faq'
import { WHATSAPP_URL } from '@/lib/utils'

type Category = { id: string; label: string }

export function FAQPageClient({ faqs, categories }: { faqs: FAQItem[]; categories: Category[] }) {
  const [selected, setSelected] = useState('all')

  const filtered = selected === 'all' ? faqs : faqs.filter((f) => f.category === selected)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
              selected === cat.id ? 'bg-[#FF6B00] text-white' : 'glass text-gray-400 hover:text-ice'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3 mb-14">
        {filtered.map((faq, i) => (
          <details key={i} className="group card cursor-pointer">
            <summary className="flex items-center justify-between gap-4 py-1 cursor-pointer list-none font-sans font-semibold text-sm text-ice">
              {faq.question}
              <ChevronDown
                size={16}
                className="text-gray-500 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <p className="mt-4 pt-4 border-t border-white/5 text-sm text-gray-400 leading-relaxed font-body">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Didn't find answer */}
      <div className="rounded-2xl p-8 glass-orange text-center">
        <h3 className="font-sans font-bold text-lg text-ice mb-2">Didn’t find your answer?</h3>
        <p className="text-gray-400 font-body text-sm mb-5">
          Talk to us directly — we reply in under 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-3 px-6"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>

          <Link href="/contact" className="btn-secondary text-sm py-3 px-6">
            Send an email
          </Link>
        </div>
      </div>
    </>
  )
}