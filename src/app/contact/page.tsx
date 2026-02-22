'use client'

import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Check, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'

const SALES_EMAIL = 'contact@presencapro.com'
const PHONE_DISPLAY = '+351 934 071 660'
const PHONE_TEL = '+351934071660'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // TODO: connect to email provider / webhook (Resend, SendGrid, Make, Zapier, etc.)
  }

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="label-tag mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Contact
          </div>

          <h1 className="font-sans font-bold text-5xl md:text-6xl mb-4 tracking-tight">
            Let’s <span className="text-gradient">talk</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-body">
            Tell us what you need and we’ll point you to the best plan for your business — fast, clear and no pressure.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="font-sans font-semibold text-ice mb-5">Direct contacts</h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${SALES_EMAIL}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#FF6B00] transition-colors font-body group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center">
                    <Mail size={16} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-mono">Email</div>
                    <div className="text-ice/90 group-hover:text-[#FF8C3A] transition-colors">
                      {SALES_EMAIL}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-ice transition-colors font-body group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="font-mono text-xs text-gray-500">+</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-mono">Phone</div>
                    <div className="text-ice/90">{PHONE_DISPLAY}</div>
                  </div>
                </a>

                {/* WhatsApp (optional, more “corporate”) */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-ice transition-colors font-body group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MessageCircle size={16} className="text-gray-500 group-hover:text-[#FF6B00] transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-mono">WhatsApp</div>
                    <div className="text-ice/90">Message our team</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 text-sm text-gray-400 font-body">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MapPin size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-mono">EU coverage</div>
                    <div className="text-ice/90">Remote-first (all EU)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-sans font-semibold text-ice mb-3">Response time</h3>

              <div className="space-y-2">
                {[
                  { day: 'Mon–Fri', time: '09:00 — 18:00 (Lisbon time)' },
                  { day: 'Email', time: 'Reply within 24h (business hours)' },
                  { day: 'Support', time: 'Monitored & escalated when needed' },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="text-gray-500 font-body">{item.day}</span>
                    <span className="text-ice font-mono text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 glass-orange">
              <div className="font-sans font-semibold text-ice mb-1">What happens next</div>
              <p className="text-sm text-gray-400 font-body leading-relaxed">
                We’ll confirm your goals, collect assets (logo/photos/text), and start production.
                Typical delivery: up to <span className="text-ice font-semibold">72 hours</span> after onboarding is complete.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="card p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-4">
                  <Check size={24} className="text-[#FF6B00]" />
                </div>
                <h3 className="font-sans font-bold text-xl text-ice mb-2">Message received</h3>
                <p className="text-gray-400 font-body text-sm max-w-md">
                  Thanks — we’ll reply within 24 hours (business hours). If it’s urgent, email us at{' '}
                  <span className="text-ice">{SALES_EMAIL}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <h3 className="font-sans font-semibold text-ice mb-2">Send a message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="name@company.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+351 …"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select a topic</option>
                    <option>New website</option>
                    <option>Plans & pricing</option>
                    <option>Technical support</option>
                    <option>Partnership / other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us what you do and what you want the website to achieve (leads, bookings, sales)…"
                    className="input-field resize-none"
                  />
                  <div className="mt-2 text-xs text-gray-600 font-mono">
                    Tip: include your country/city + niche + deadline.
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-sm">
                  Send message
                  <ArrowRight size={16} />
                </button>

                <p className="text-center text-xs text-gray-600 font-mono">
                  We only use your details to reply. No spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}