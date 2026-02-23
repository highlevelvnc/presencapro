'use client'

type Props = {
  priceId?: string
  className?: string
  children: React.ReactNode
}

export function StripeCheckoutButton({ priceId, className, children }: Props) {
  async function startCheckout() {
    if (!priceId) {
      alert('PriceId não configurado. Verifica NEXT_PUBLIC_PRICE_* nas env vars.')
      return
    }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      console.error('Checkout API error:', res.status, data)
      alert(`Erro ao criar checkout (${res.status}). Veja o console.`)
      return
    }

    if (data?.url) window.location.href = data.url
    else {
      console.error('Missing checkout url:', data)
      alert('Não foi possível abrir o checkout. Veja o console.')
    }
  }

  return (
    <button type="button" onClick={startCheckout} className={className}>
      {children}
    </button>
  )
}