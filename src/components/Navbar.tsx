'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/plans', label: 'Plans' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // helper: ativa item mesmo em subrotas (ex: /blog/post-1)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight">
              Presença<span className="text-[#FF6B00]">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                    : 'text-gray-400 hover:text-ice hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-secondary text-sm py-2.5 px-5">
              Get a quote
            </Link>
            <Link href="/plans" className="btn-primary text-sm py-2.5 px-5">
              View plans
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-ice hover:bg-white/5 transition-all"
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/5">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-body font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                      : 'text-gray-400 hover:text-ice hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-secondary text-sm text-center py-3"
                >
                  Get a quote
                </Link>
                <Link
                  href="/plans"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-primary text-sm text-center py-3"
                >
                  View plans
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}