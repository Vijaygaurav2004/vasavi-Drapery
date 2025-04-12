"use client"

import { useState } from 'react'
import { X } from 'lucide-react'

export default function SiteAnnouncement() {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  return (
    <div className="bg-gradient-to-r from-secondary via-primary to-accent text-white py-2 px-4 text-center relative">
      <p className="text-xs md:text-sm font-medium">
        Free shipping on orders over ₹10,000 • Use code <span className="font-semibold">WELCOME10</span> for 10% off your first order
      </p>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  )
}