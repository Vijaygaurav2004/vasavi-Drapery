"use client"

import React, { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  content: string
  avatar: string
}

interface Props {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = () => setActive(p => (p + 1) % testimonials.length)
  const prev = () => setActive(p => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active])

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            onClick={() => setActive(i)}
            className="testimonial-card cursor-pointer"
            style={{
              opacity: active === i ? 1 : 0.65,
              transform: active === i ? "translateY(-4px)" : "none",
              transition: "opacity 0.4s, transform 0.4s, box-shadow 0.4s",
              boxShadow: active === i ? "0 8px 32px rgba(160,120,50,0.1)" : undefined,
              borderColor: active === i ? "hsl(var(--gold))" : undefined,
            }}
          >
            <Quote
              size={28}
              className="mb-5"
              style={{ color: "hsl(var(--gold))", opacity: 0.3 }}
            />
            <p className="text-sm font-light leading-relaxed text-foreground/75 mb-6 italic">
              "{t.content}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-white text-sm font-medium"
                style={{ background: "hsl(var(--maroon))" }}
              >
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-light">{t.role}, {t.location}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              background: active === i ? "hsl(var(--foreground))" : "hsl(var(--border))",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  )
}
