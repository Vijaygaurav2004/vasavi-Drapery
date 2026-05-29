"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

const messages = [
  "Free shipping on orders above ₹2,000",
  "COD available across India",
  "Use code VASAVI10 for 10% off your first order",
]

export default function SiteAnnouncement() {
  const [visible, setVisible]   = useState(true)
  const [msgIdx]                = useState(0)

  if (!visible) return null

  return (
    <div className="announcement-bar relative flex items-center justify-center">
      <p>
        {messages[msgIdx % messages.length]}&nbsp;·&nbsp;
        <Link href="/collections" className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
          Shop Now
        </Link>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  )
}
