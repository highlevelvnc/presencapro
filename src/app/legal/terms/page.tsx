import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Serviço',
  description: 'Termos e condições de utilização dos serviços PresençaPro.',
}

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="label-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            Legal
          </div>
          <h1 className="font-sans font-bold text-4xl text-ice mb-2">Termos de Serviço</h1>
          <p className="text-gray-500 font-mono text-sm">Última atualização: Janeiro de 2026</p>
        </div>

        <div className="space-y-8 text-gray-400 font-body text-sm leading-relaxed">
          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">1. Aceitação dos Termos</h2>
            <p>Ao contratar os serviços da PresençaPro, declara ter lido, compreendido e aceite integralmente os presentes Termos de Serviço. Se não concordar com algum dos termos aqui estabelecidos, não deverá utilizar os nossos serviços.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">2. Descrição dos Serviços</h2>
            <p className="mb-3">A PresençaPro presta serviços de criação, desenvolvimento e manutenção de sites profissionais, incluindo:</p>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Design e desenvolvimento de sites web</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Alojamento e gestão de infraestrutura</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Registo e gestão de domínio</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Manutenção e atualizações técnicas</li>
              <li className="flex items-start gap-2"><span className="text-[#FF6B00] mt-1">•</span> Suporte técnico conforme o plano contratado</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">3. Condições de Pagamento</h2>
            <p className="mb-3">Os serviços são faturados mensalmente, antecipadamente. O pagamento deverá ser efetuado até ao dia 5 de cada mês através dos métodos disponibilizados.</p>
            <p>Em caso de atraso no pagamento superior a 15 dias, a PresençaPro reserva-se o direito de suspender os serviços até regularização da situação.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">4. Período de Fidelização</h2>
            <p>Os contratos têm uma duração mínima de 12 (doze) meses. Após este período, o contrato renova-se automaticamente por períodos de 1 mês, podendo ser rescindido com 30 dias de aviso prévio.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">5. Propriedade Intelectual</h2>
            <p className="mb-3">Os designs criados pela PresençaPro são propriedade da empresa até ao pagamento integral das mensalidades do período contratado. O cliente mantém a propriedade dos seus conteúdos (textos, imagens, logos).</p>
            <p>Em caso de cancelamento, o cliente recebe uma exportação estática do site. O domínio, se registado em nome do cliente, pertence-lhe.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">6. Limitação de Responsabilidade</h2>
            <p>A PresençaPro não se responsabiliza por perdas de negócio ou lucros cessantes resultantes de indisponibilidade do site por razões fora do seu controlo, incluindo falhas de terceiros fornecedores de infraestrutura.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">7. Alterações aos Termos</h2>
            <p>A PresençaPro reserva-se o direito de alterar os presentes termos, notificando os clientes com 30 dias de antecedência.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-lg text-ice mb-3">8. Lei Aplicável e Jurisdição</h2>
            <p>Os presentes termos são regidos pela lei portuguesa. Para a resolução de quaisquer litígios, as partes acordam na submissão aos Tribunais de Lisboa.</p>
          </section>

          <div className="pt-8 border-t border-white/5">
            <p className="text-gray-600 text-xs font-mono">Para esclarecimentos, contacte: hello@presencapro.pt</p>
          </div>
        </div>
      </div>
    </main>
  )
}
