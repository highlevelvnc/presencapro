'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'

const steps = [
  { title: 'Business', description: 'Basic information' },
  { title: 'Goals', description: 'What you want to achieve' },
  { title: 'Contact', description: 'How we reach you' },
  { title: 'Preferences', description: 'Style and details' },
]

const niches = [
  'Restaurant / Food',
  'Healthcare / Clinic',
  'Beauty / Aesthetics',
  'Real Estate',
  'Construction / Renovation',
  'Consulting',
  'Education',
  'Fitness / Sports',
  'Local Commerce',
  'Professional Services',
  'Other',
]

const cities = [
  'Lisbon',
  'Porto',
  'Braga',
  'Coimbra',
  'Aveiro',
  'Setúbal',
  'Leiria',
  'Faro',
  'Évora',
  'Funchal',
  'Ponta Delgada',
  'Other',
]

const objectives = [
  { value: 'leads', label: 'Generate leads & enquiries' },
  { value: 'appointments', label: 'Book appointments / meetings' },
  { value: 'showcase', label: 'Showcase my work' },
  { value: 'credibility', label: 'Increase credibility' },
  { value: 'local', label: 'Rank on local Google searches' },
]

const styles = [
  { value: 'modern', label: 'Modern & minimal' },
  { value: 'professional', label: 'Professional & classic' },
  { value: 'bold', label: 'Bold & creative' },
  { value: 'warm', label: 'Warm & welcoming' },
]

export default function HowItWorksPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    niche: '',
    city: '',
    instagram: '',
    objective: [] as string[],
    whatsapp: '',
    email: '',
    style: '',
    plan: '',
    notes: '',
  })

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleObjective = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      objective: prev.objective.includes(val)
        ? prev.objective.filter((o) => o !== val)
        : [...prev.objective, val],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-[#FF6B00]" />
          </div>

          <h2 className="font-sans font-bold text-3xl text-ice mb-4">
            We’ve received your request.
          </h2>

          <p className="text-gray-400 font-body mb-8 leading-relaxed">
            Our team will review your details and reply in under <span className="text-ice">24 hours</span> to confirm the scope and kick off your project.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4 inline-flex"
          >
            <MessageCircle size={18} />
            Message us on WhatsApp
          </a>

          <p className="mt-4 text-xs text-gray-600 font-mono">
            Prefer email? No problem — we’ll contact you there too.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-tag mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Simple process
          </div>

          <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
            How it <span className="text-gradient">works</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
            From first contact to a live website in <span className="text-ice">up to 72 hours</span>. We handle everything end-to-end.
          </p>
        </div>

        {/* Process timeline */}
        <div className="grid md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
          {[
            { n: '01', title: 'Choose a plan', desc: 'Pick the plan that fits your business and growth goals.' },
            { n: '02', title: 'Fill the onboarding form', desc: 'A short, guided form — fast to complete and crystal clear.' },
            { n: '03', title: 'We build & optimise', desc: 'Premium design, technical SEO, and conversion-first structure.' },
            { n: '04', title: 'Go live (72h)', desc: 'We publish after your approval. Your site is ready to convert.' },
          ].map((step, i) => (
            <div key={step.n} className="card relative p-6">
              <div className="font-mono text-2xl font-bold text-[#FF6B00]/20 mb-3">{step.n}</div>
              <h3 className="font-sans font-semibold text-sm text-ice mb-2">{step.title}</h3>
              <p className="text-xs text-gray-500 font-body leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[#FF6B00]/20 z-10"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="rounded-2xl p-8 glass border border-white/5">
            <h2 className="font-sans font-bold text-xl text-ice mb-2">What we need from you</h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              The more you share, the better the result — but we can start simple and refine as we go.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Business name and a short description',
                'Logo (or we create a simple one)',
                'Photos of your space/services (if available)',
                'Services list (what you sell/do)',
                'WhatsApp number and email',
                '2–3 websites you like (references)',
                'Preferred colors / style (optional)',
                'Instagram profile (optional)',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-gray-300 font-body">
                  <div className="w-4 h-4 rounded bg-[#FF6B00]/15 border border-[#FF6B00]/25 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-[#FF6B00]" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <div className="max-w-2xl mx-auto" id="onboarding">
          <div className="text-center mb-10">
            <h2 className="font-sans font-bold text-3xl text-ice mb-2">Start your project</h2>
            <p className="text-gray-500 font-body text-sm">
              Fill the form — we’ll reply within <span className="text-ice">24 hours</span>.
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-sans font-bold transition-all ${
                    i <= currentStep
                      ? 'bg-[#FF6B00] text-white'
                      : 'bg-white/5 border border-white/10 text-gray-500'
                  }`}
                >
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-px mx-1 transition-all ${
                      i < currentStep ? 'bg-[#FF6B00]/50' : 'bg-white/10'
                    }`}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="font-sans font-semibold text-ice">{steps[currentStep].title}</div>
            <div className="font-body text-xs text-gray-500">{steps[currentStep].description}</div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl p-8 glass border border-white/5 space-y-5">
            {/* Step 0: Business info */}
            {currentStep === 0 && (
              <>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Business name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="e.g., Latina Grill"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.niche}
                    onChange={(e) => updateField('niche', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select your industry</option>
                    {niches.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select your city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Instagram (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                    placeholder="@yourbusiness"
                    className="input-field"
                  />
                </div>
              </>
            )}

            {/* Step 1: Objective */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
                    What’s your main goal? *
                  </label>

                  <div className="grid gap-2">
                    {objectives.map((obj) => (
                      <button
                        key={obj.value}
                        type="button"
                        onClick={() => toggleObjective(obj.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all text-sm font-body ${
                          formData.objective.includes(obj.value)
                            ? 'border-[#FF6B00]/50 bg-[#FF6B00]/5 text-ice'
                            : 'border-white/8 bg-transparent text-gray-400 hover:border-white/15'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            formData.objective.includes(obj.value)
                              ? 'border-[#FF6B00] bg-[#FF6B00]'
                              : 'border-white/20'
                          }`}
                        >
                          {formData.objective.includes(obj.value) && (
                            <Check size={10} className="text-white" />
                          )}
                        </div>
                        {obj.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Plan (optional)
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => updateField('plan', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Not sure yet</option>
                    <option value="starter">Starter — 25€/month</option>
                    <option value="pro">Pro — 50€/month</option>
                    <option value="premium">Premium — 100€/month</option>
                  </select>

                  <p className="mt-2 text-xs text-gray-600 font-body">
                    You can choose later — we’ll recommend the best option after reviewing your goals.
                  </p>
                </div>
              </>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    WhatsApp number *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="+351 9XX XXX XXX"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="name@company.com"
                    className="input-field"
                    required
                  />
                </div>
              </>
            )}

            {/* Step 3: Style preferences */}
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
                    Preferred style (optional)
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => updateField('style', s.value)}
                        className={`p-4 rounded-xl border text-left transition-all text-sm font-body ${
                          formData.style === s.value
                            ? 'border-[#FF6B00]/50 bg-[#FF6B00]/5 text-ice'
                            : 'border-white/8 text-gray-400 hover:border-white/15'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Extra notes (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="References, pages you need, content notes, competitors, preferred sections..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </>
            )}

            {/* Navigation */}
            <div className={`flex gap-3 pt-2 ${currentStep === 0 ? 'justify-end' : 'justify-between'}`}>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="btn-secondary py-3 px-6 text-sm"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="btn-primary py-3 px-6 text-sm ml-auto"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" className="btn-primary py-3 px-8 text-sm ml-auto">
                  Submit request
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-xs text-gray-600 font-mono mt-4">
            Your data is confidential and never sold. We use it only to scope your project.
          </p>
        </div>
      </div>
    </main>
  )
}