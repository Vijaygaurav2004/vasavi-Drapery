"use client"

import { useState } from 'react'
import { X } from 'lucide-react'

export default function SiteAnnouncement() {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
}