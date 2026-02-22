'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ricardo Sousa',
    role: 'Owner, Tasca do Avô',
    content:
      'In under two weeks we had a site that looked like a serious brand. Online enquiries improved immediately. Worth every euro.',
    rating: 5,
    city: 'Lisbon',
  },
  {
    name: 'Ana Ferreira',
    role: 'Dermatologist, BeautyMed Clinic',
    content:
      'I needed something professional that builds trust instantly. The final result exceeded expectations — clean, fast and easy to use.',
    rating: 5,
    city: 'Braga',
  },
  {
    name: 'Miguel Costa',
    role: 'CEO, OT Remodelações',
    content:
      'Our old site was holding us back. This one feels international and premium. We’re getting better quality leads.',
    rating: 5,
    city: 'Porto',
  },
]

const metrics = [
  { value: 90, suffix: '+', label: 'Lighthouse', description: 'Performance target' },
  { value: 72, suffix: 'h', label: 'Delivery', description: 'Typical turnaround' },
  { value: 6, suffix: ' mo', label: 'Commitment', description: 'Minimum (Pro: 12 mo)' },
  { value: 50, suffix: '+', label: 'Active clients', description: 'Across Portugal' },
]

function AnimatedCounter({
  value,
  suffix,
  duration = 1100,
}: {
  value: number
  suffix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const startTime = performance.now()
        const from = 0
        const to = value

        const tick = (now: number) => {
          const t = Math.min(1, (now - startTime) / duration)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3)
          const current = Math.round(from + (to - from) * eased)
          setCount(current)
          if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.45 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <div ref={ref} className="font-sans font-extrabold text-4xl md:text-5xl text-ice tracking-tight">
      {count}
      {suffix}
    </div>
  )
}

function InitialsBadge({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')

  return (
    <div className="w-10 h-10 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0">
      <span className="font-sans font-bold text-xs text-[#FF8C3A]">{initials}</span>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,107,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="text-center rounded-2xl border border-white/10 bg-white/3 p-6"
              style={{ boxShadow: '0 18px 60px rgba(0,0,0,0.25)' }}
            >
              <AnimatedCounter value={m.value} suffix={m.suffix} />
              <div className="font-sans font-semibold text-sm text-[#FF8C3A] mt-1">{m.label}</div>
              <div className="font-body text-xs text-gray-500 mt-1 leading-relaxed">{m.description}</div>
            </div>
          ))}
        </div>

        <div className="section-divider mb-20" />

        {/* Title */}
        <div className="text-center mb-12">
          <div className="pp-eyebrow justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Real clients
          </div>

          <h2 className="section-title mt-3">
            What people say about <span className="pp-gradient-text">PresençaPro</span>
          </h2>

          <p className="text-sm text-gray-400 mt-3 max-w-2xl mx-auto font-body leading-relaxed">
            Short, honest feedback from businesses that needed a website that looks premium, loads fast and converts.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-white/10 bg-white/3 p-7 overflow-hidden"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.30)' }}
            >
              {/* Glow */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.18) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />

              <div className="relative">
                <Quote size={26} className="text-[#FF6B00]/18 mb-4 fill-current" />

                <p className="text-gray-200/90 text-sm leading-relaxed font-body mb-6 italic">
                  “{t.content}”
                </p>

                <div className="flex items-center gap-3">
                  <InitialsBadge name={t.name} />
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-sm text-ice truncate">
                      {t.name}{' '}
                      <span className="text-gray-500 font-body font-normal">· {t.city}</span>
                    </div>
                    <div className="font-body text-xs text-gray-500 truncate">{t.role}</div>
                  </div>
                </div>

                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-[#FF6B00] fill-[#FF6B00]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center text-xs text-gray-500 font-body">
          Results vary by industry and offer. We build the foundation: speed, structure, SEO and conversion-focused design.
        </div>
      </div>
    </section>
  )
}