import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How PresençaPro collects, uses, and protects your personal data under the GDPR.',
}

const PRIVACY_EMAIL = 'privacy@presencapro.com'
const SALES_EMAIL = 'contact@presencapro.com'
const SUPPORT_PHONE = '+351 934 071 660'

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="label-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Legal
          </div>

          <h1 className="font-sans font-bold text-4xl text-ice mb-2">Privacy Policy</h1>
          <p className="text-gray-500 font-mono text-sm">Last updated: January 2026</p>
        </div>

        <div className="space-y-8 text-gray-400 font-body text-sm leading-relaxed">
          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">1. Data Controller</h2>
            <p>
              PresençaPro (Portugal). For privacy-related matters, contact:{' '}
              <a className="text-[#FF6B00] hover:text-[#FF8C3A] transition-colors" href={`mailto:${PRIVACY_EMAIL}`}>
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">2. Personal Data We Collect</h2>
            <p className="mb-3">We may collect the following categories of personal data:</p>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6B00] mt-1">•</span>
                <span>
                  <strong className="text-ice">Identification & contact:</strong> name, email address, phone number
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6B00] mt-1">•</span>
                <span>
                  <strong className="text-ice">Billing details:</strong> address, tax/VAT information (when applicable)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6B00] mt-1">•</span>
                <span>
                  <strong className="text-ice">Usage data:</strong> access logs, device/browser data, pages visited, and basic analytics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6B00] mt-1">•</span>
                <span>
                  <strong className="text-ice">Communications:</strong> emails or messages you send us and our responses
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">3. Why We Use Your Data</h2>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> To provide and deliver the contracted services</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Billing, invoicing, and financial administration</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Customer support and technical assistance</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Service communications (e.g., updates, operational notices)</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Marketing communications (only when permitted by law and/or with consent, where required)</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Legal and compliance obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">4. Legal Basis (GDPR)</h2>
            <p>
              We process personal data under one or more legal bases, including: performance of a contract, compliance
              with legal obligations, legitimate interests (e.g., service improvement and security), and consent (where required).
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">5. Sharing of Data</h2>
            <p>
              We do not sell your personal data. We may share data only with trusted service providers necessary to operate
              our services (e.g., hosting, analytics, payment processors). These providers are bound by confidentiality and
              appropriate data protection obligations.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">6. Data Retention</h2>
            <p>
              We retain personal data for the duration of the contractual relationship and, when required, for additional
              periods to comply with legal or tax obligations. Once no longer necessary, data is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">7. Your Rights</h2>
            <p className="mb-3">Under the GDPR, you may have the right to:</p>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Access your personal data</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Rectify inaccurate or incomplete data</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Request erasure (where applicable)</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Restrict or object to processing</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Data portability</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Withdraw consent (where processing is based on consent)</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, contact:{' '}
              <a className="text-[#FF6B00] hover:text-[#FF8C3A] transition-colors" href={`mailto:${PRIVACY_EMAIL}`}>
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">8. Cookies & Analytics</h2>
            <p>
              We use essential cookies required for the site to function. We may also use analytics cookies (e.g., Google Analytics)
              to understand site usage and improve performance. Where required, you can manage your cookie preferences via a consent banner.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">9. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">10. Contact</h2>
            <p className="mb-2">
              General enquiries:{' '}
              <a className="text-[#FF6B00] hover:text-[#FF8C3A] transition-colors" href={`mailto:${SALES_EMAIL}`}>
                {SALES_EMAIL}
              </a>
            </p>
            <p className="mb-2">
              Phone (business hours):{' '}
              <a className="text-[#FF6B00] hover:text-[#FF8C3A] transition-colors" href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}>
                {SUPPORT_PHONE}
              </a>
            </p>
          </section>

          <div className="pt-8 border-t border-white/5">
            <p className="text-gray-600 text-xs font-mono">
              Supervisory authority (Portugal): Comissão Nacional de Proteção de Dados (CNPD) — cnpd.pt
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}