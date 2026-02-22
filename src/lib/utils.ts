import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const WHATSAPP_NUMBER = '351912345678'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Tenho%20interesse%20em%20saber%20mais%20sobre%20os%20vossos%20planos.`
