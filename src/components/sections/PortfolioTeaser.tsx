'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink, Clock } from 'lucide-react'
import { portfolioItems } from '@/data/portfolio'

function prettyUrl(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    return u.host.replace('www.', '')
  } catch {
    return url
  }
}

export function PortfolioTeaser() {
  const realProjects = portfolioItems.slice(0, 3)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="pp-eyebrow">Real work</div>

          <h2 className="section-title mt-3">
            Websites that <span className="pp-gradient-text">convert</span>
          </h2>

          <p className="text-sm text-gray-400 mt-3 max-w-xl font-body leading-relaxed">
            Published projects built for performance, SEO and conversion —
            <span className="text-ice"> delivered in up to 72 hours.</span>
          </p>

          {/* 72h highlight */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF8C3A]">
            <Clock size={12} />
            Typical delivery: 72h
          </div>
        </div>

        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FF8C3A] transition-colors font-body group"
        >
          View full portfolio
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {realProjects.map((item) => {
          const host = prettyUrl(item.url)
          const chips = item.tags?.slice(0, 3) ?? []

          return (
            <a
              key={item.id}
              href={item.url || '#'}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noreferrer' : undefined}
              className="group relative rounded-2xl border border-white/10 bg-white/3 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#FF6B00]/40"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.22) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Preview */}
              <div className="relative p-4">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#121212]">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#181818] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 text-center text-[11px] font-mono text-gray-500">
                      {host || 'project.presencapro.com'}
                    </div>
                  </div>

                  {/* Preview body */}
                  <div className="relative h-40 overflow-hidden">
                    {item.previewVideo ? (
                      <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        src={item.previewVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 opacity-90"
                        style={{
                          background: `radial-gradient(ellipse 70% 70% at 30% 10%, ${item.accent}22 0%, transparent 60%),
                                       linear-gradient(135deg, ${item.color}, #000)`,
                        }}
                      />
                    )}

                    <div className="absolute inset-0 bg-black/35" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    {item.nicheLabel}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    Lighthouse {item.metrics.lighthouse}
                  </div>
                </div>

                <h3 className="font-sans font-bold text-lg mb-2 text-ice">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {chips.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {item.metrics.loadTime} load
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm text-[#FF6B00] group-hover:text-[#FF8C3A] transition-colors">
                    Visit site <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}