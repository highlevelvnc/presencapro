'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Zap, Clock, ArrowRight, ExternalLink, Mail } from 'lucide-react'
import { portfolioItems, niches, type PortfolioItem } from '@/data/portfolio'

const SALES_EMAIL = 'contact@presencapro.com'
const SALES_MAILTO =
  `mailto:${SALES_EMAIL}` +
  `?subject=${encodeURIComponent('PresençaPro — Website proposal')}` +
  `&body=${encodeURIComponent(
    'Hi PresençaPro,\n\nI would like a professional website.\nBusiness name:\nCountry/City:\nGoal (leads / bookings / sales):\nPreferred domain (.com or .pt):\nNotes:\n\nThank you!'
  )}`

// quick label map (não precisa mexer no data agora)
const nicheLabelEN: Record<string, string> = {
  all: 'All',
  restaurante: 'Restaurants',
  clinica: 'Clinics',
  servicos: 'Services',
  imobiliario: 'Real Estate',
  estetica: 'Beauty',
  consultoria: 'Consulting',
}

function PortfolioModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const canVisit = Boolean((item as any).url)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-white/10"
        style={{ background: '#1A1A1A' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview */}
        <div className="aspect-video relative overflow-hidden" style={{ background: (item as any).color }}>
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* If you later add item.previewVideo, it will auto render here */}
          {(item as any).previewVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              src={(item as any).previewVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
            />
          ) : null}

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="badge text-xs">
                {nicheLabelEN[item.niche] ?? item.nicheLabel}
              </div>

              <div className="px-2 py-1 rounded-lg text-xs font-mono font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/10">
                Lighthouse {(item as any).metrics?.lighthouse}
              </div>
            </div>

            <h3 className="font-sans font-bold text-2xl text-ice mt-3">{item.name}</h3>
            <p className="text-gray-300/80 text-sm font-body mt-2 max-w-xl">
              {item.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-gray-400 hover:text-ice"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Goal</div>
              <p className="text-sm text-gray-300 font-body">{item.objective}</p>
            </div>

            <div>
              <div className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-2">Sections</div>
              <ul className="space-y-1">
                {(item.sections ?? []).map((s) => (
                  <li key={s} className="text-xs text-gray-400 font-body">• {s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-6 py-4 border-y border-white/5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#FF6B00]" />
              <span className="text-sm font-mono text-[#FF8C3A]">
                {(item as any).metrics?.lighthouse} Lighthouse
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#FF6B00]" />
              <span className="text-sm font-mono text-[#FF8C3A]">
                {(item as any).metrics?.loadTime} load
              </span>
            </div>

            {(item as any).metrics?.conversion ? (
              <div className="badge text-xs">{(item as any).metrics.conversion} conversion</div>
            ) : null}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={SALES_MAILTO}
              className="btn-primary flex-1 text-center text-sm py-3"
            >
              Request a proposal
              <ArrowRight size={15} />
            </a>

            {canVisit ? (
              <a
                href={(item as any).url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center text-sm py-3 inline-flex items-center justify-center gap-2"
              >
                Visit website
                <ExternalLink size={15} />
              </a>
            ) : (
              <button
                disabled
                className="btn-secondary flex-1 text-center text-sm py-3 opacity-50 cursor-not-allowed"
                title="Link not available"
              >
                Visit website
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-600 font-mono">
            Typical delivery: 72h · Domain (.com/.pt) + hosting included
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [selectedNiche, setSelectedNiche] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filtered =
    selectedNiche === 'all'
      ? portfolioItems
      : portfolioItems.filter((p) => p.niche === selectedNiche)

  return (
    <main className="pt-24 pb-20">
      {selectedItem && <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="label-tag mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Real work
          </div>

          <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
            Our <span className="text-gradient">portfolio</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
            Published websites built for conversion, speed and SEO — with clean structure and premium UI.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href={SALES_MAILTO}
              className="inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:text-[#FF8C3A] transition-colors font-body"
            >
              <Mail size={16} />
              {SALES_EMAIL}
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {niches.map((niche) => (
            <button
              key={niche.id}
              onClick={() => setSelectedNiche(niche.id)}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                selectedNiche === niche.id
                  ? 'bg-[#FF6B00] text-white'
                  : 'glass text-gray-400 hover:text-ice hover:border-[#FF6B00]/30'
              }`}
            >
              {nicheLabelEN[niche.id] ?? niche.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const hasVideo = Boolean((item as any).previewVideo)

            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
              >
                {/* Preview */}
                <div className="aspect-video relative overflow-hidden" style={{ background: (item as any).color }}>
                  <div className="absolute inset-0 grid-bg opacity-20" />

                  {/* Video preview if available */}
                  {hasVideo ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                      src={(item as any).previewVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black/10" />
                  )}

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute inset-0 flex flex-col justify-center p-8">
                    <div className="w-16 h-1.5 rounded mb-4" style={{ background: (item as any).accent }} />
                    <div className="w-3/4 h-2 bg-white/10 rounded mb-2" />
                    <div className="w-1/2 h-2 bg-white/6 rounded mb-5" />
                    <div className="w-20 h-6 rounded-lg" style={{ background: ((item as any).accent ?? '#FF6B00') + 'CC' }} />
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-sans font-semibold text-sm">
                      <ExternalLink size={15} />
                      View details
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 badge text-xs">
                    {nicheLabelEN[item.niche] ?? item.nicheLabel}
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-mono font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/10">
                    {(item as any).metrics?.lighthouse}
                  </div>
                </div>

                <div className="p-5 bg-[#1A1A1A] border-t border-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sans font-semibold text-sm text-ice">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-body mt-0.5 line-clamp-1">{item.description}</p>
                    </div>

                    {(item as any).metrics?.conversion ? (
                      <div className="badge text-xs flex-shrink-0">
                        {(item as any).metrics.conversion}
                      </div>
                    ) : null}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 font-body mb-6">
            Don’t see your niche? We build across industries — from local services to multi-location brands.
          </p>

          <a href={SALES_MAILTO} className="btn-primary text-base px-8 py-4">
            Request a proposal
            <ArrowRight size={18} />
          </a>

          <p className="mt-5 text-xs text-gray-600 font-mono">
            Typical delivery: 72h · EU-ready · Domain (.com/.pt) + hosting included
          </p>
        </div>
      </div>
    </main>
  )
}