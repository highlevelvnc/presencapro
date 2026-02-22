'use client'

import { MousePointer, FileText, Rocket, MessageSquare, Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MousePointer,
    title: 'Choose your plan',
    description:
      'Select the plan that fits your business. If you’re unsure, we guide you based on your goal — leads, bookings or sales.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Complete onboarding',
    description:
      'We send a short onboarding form. You share text, logo, images and preferences — or we help you structure everything.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'First version in 72 hours',
    description:
      'We design and build your website with premium UI, technical SEO and performance optimisation. You review and approve before launch.',
    highlight: '72h',
  },
  {
    number: '04',
    icon: MessageSquare,
    title: 'Start receiving enquiries',
    description:
      'Your site goes live with lead forms, tracking (GTM / Pixels) and fast performance — ready to convert from day one.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(255,107,0,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-tag mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Simple process
          </div>

          <h2 className="section-title mb-4">
            From brief to launch in{' '}
            <span className="text-gradient">72 hours</span>
          </h2>

          <p className="section-subtitle max-w-2xl mx-auto">
            A clear, fast and structured workflow — so you can launch a professional website without delays.
          </p>

          {/* 72h highlight pill */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/10 text-[#FF8C3A]">
            <Clock size={12} />
            Typical first version: 72h
          </div>
        </div>

        {/* Steps grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative group"
                data-reveal="fade-up"
                data-delay={(i * 0.06).toFixed(2)}
              >
                {/* connector (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-9 left-full w-full h-px z-0"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(255,107,0,0.32), rgba(255,255,255,0.06), transparent)',
                    }}
                  />
                )}

                <div
                  className="card p-7 h-full relative overflow-hidden"
                  style={{
                    boxShadow: '0 18px 70px rgba(0,0,0,0.35)',
                  }}
                >
                  {/* subtle glow on hover */}
                  <div
                    className="absolute -top-20 -left-16 w-64 h-64 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 65%)',
                      filter: 'blur(6px)',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF6B00]/18 group-hover:border-[#FF6B00]/40">
                        <step.icon size={20} className="text-[#FF6B00]" />
                      </div>

                      <div className="font-mono text-3xl font-bold text-[#FF6B00]/18 leading-none">
                        {step.number}
                      </div>
                    </div>

                    <h3 className="font-sans font-semibold text-lg text-ice mb-2">
                      {step.title}{' '}
                      {step.highlight && (
                        <span className="ml-2 text-[11px] font-mono px-2 py-1 rounded-full border border-[#FF6B00]/25 bg-[#FF6B00]/10 text-[#FF8C3A] align-middle">
                          {step.highlight}
                        </span>
                      )}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed font-body">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}