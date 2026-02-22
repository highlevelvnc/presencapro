import type { Metadata } from 'next'
import { faqs, faqCategories } from '@/data/faq'
import { FAQPageClient } from './client'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about pricing, delivery time, what’s included, domains & hosting, support, and how PresençaPro works across the EU.',
}

export default function FAQPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="label-tag mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Help Center
          </div>

          <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
            Frequently asked <span className="text-gradient">questions</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto font-body">
            Clear answers about how it works, what’s included, and what to expect. If you don’t find what you need, contact us.
          </p>
        </div>

        <FAQPageClient faqs={faqs} categories={faqCategories} />
      </div>
    </main>
  )
}