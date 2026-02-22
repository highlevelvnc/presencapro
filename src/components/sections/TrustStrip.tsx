'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Zap,
  Shield,
  TrendingUp,
  Search,
  Smartphone,
  Receipt,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

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
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)

  const getStep = () => {
    const el = scrollerRef.current
    if (!el) return 300
    const firstCard = el.querySelector<HTMLElement>('[data-card="trust"]')
    const cardW = firstCard?.offsetWidth ?? 280
    const gap = 14
    return cardW + gap
  }

  const scrollByCards = (dir: 'prev' | 'next') => {
    const el = scrollerRef.current
    if (!el) return

    const delta = getStep() * (dir === 'next' ? 1 : -1)
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const goNextOrLoop = () => {
    const el = scrollerRef.current
    if (!el) return

    const step = getStep()

    const maxLeft = el.scrollWidth - el.clientWidth
    const nextLeft = el.scrollLeft + step

    // se chegou no fim -> volta pro início
    if (nextLeft >= maxLeft - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    el.scrollBy({ left: step, behavior: 'smooth' })
  }

  // Auto slide
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) return

    if (paused) return

    const id = window.setInterval(() => {
      // só roda se o componente estiver montado e não pausado
      goNextOrLoop()
    }, 2600) // velocidade do auto-slide (ms)

    return () => window.clearInterval(id)
  }, [paused])

  // Pause quando o usuário interage (drag/scroll manual)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let resumeTimeout: number | undefined

    const pauseNow = () => {
      setPaused(true)
      if (resumeTimeout) window.clearTimeout(resumeTimeout)
      resumeTimeout = window.setTimeout(() => setPaused(false), 2500) // volta depois de 2.5s sem interação
    }

    el.addEventListener('wheel', pauseNow, { passive: true })
    el.addEventListener('touchstart', pauseNow, { passive: true })
    el.addEventListener('pointerdown', pauseNow, { passive: true })
    el.addEventListener('scroll', pauseNow, { passive: true })

    return () => {
      el.removeEventListener('wheel', pauseNow)
      el.removeEventListener('touchstart', pauseNow)
      el.removeEventListener('pointerdown', pauseNow)
      el.removeEventListener('scroll', pauseNow)
      if (resumeTimeout) window.clearTimeout(resumeTimeout)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="pp-trust-slider-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Buttons */}
          <button
            type="button"
            onClick={() => scrollByCards('prev')}
            className="pp-trust-nav pp-trust-nav-left"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCards('next')}
            className="pp-trust-nav pp-trust-nav-right"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          {/* Slider */}
          <div ref={scrollerRef} className="pp-trust-slider" role="region" aria-label="Trust highlights">
            {trustItems.map((item) => (
              <div key={item.label} data-card="trust" className="pp-trust-card">
                <div className="pp-trust-icon">
                  <item.icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="pp-trust-title">{item.label}</div>
                  <div className="pp-trust-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 font-body">
          All plans include managed hosting + domain (.com / .pt) + maintenance.
        </p>
      </div>
    </section>
  )
}