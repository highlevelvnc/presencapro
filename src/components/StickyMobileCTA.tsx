'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <div className="flex gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 flex-1 bg-[#25D366] text-white font-sans font-semibold py-3.5 rounded-xl transition-all active:scale-95"
          style={{ boxShadow: '0 8px 30px rgba(37, 211, 102, 0.3)' }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

        <Link
          href="/plans"
          className="flex items-center justify-center gap-2 flex-1 bg-[#FF6B00] text-white font-sans font-semibold py-3.5 rounded-xl transition-all active:scale-95"
          style={{ boxShadow: '0 8px 30px rgba(255, 107, 0, 0.3)' }}
        >
          Get My Website
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}