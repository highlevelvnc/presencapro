'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsVisible(false), 300)
          return 100
        }
        return prev + Math.random() * 20 + 10
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#0F0F0F] flex items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-[0_0_40px_rgba(255,107,0,0.5)]">
            <Zap size={24} className="text-white fill-white" />
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight">
            Presença<span className="text-[#FF6B00]">Pro</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF6B00] rounded-full transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="font-mono text-xs text-gray-600">
          {Math.min(Math.floor(progress), 100)}%
        </span>
      </div>
    </div>
  )
}
