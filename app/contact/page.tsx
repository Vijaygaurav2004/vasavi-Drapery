"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Check, ArrowRight, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { submitContactForm } from "@/lib/supabase/contact"

const CONTACT_INFO = [
  { icon: <Mail size={18} />,  label: "Email",   value: "vasthrikabyvasavi@gmail.com", href: "mailto:vasthrikabyvasavi@gmail.com" },
  { icon: <Clock size={18} />, label: "Hours",   value: "Mon–Sat · 9 AM – 6 PM IST" },
  { icon: <MapPin size={18} />, label: "Based in", value: "India · Shipping worldwide" },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitted) setSubmitted(false)
    if (submitError) setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const success = await submitContactForm(formData)
      if (success) {
        toast({ title: "Message Sent", description: "Thank you for contacting us. We'll get back to you soon!" })
        setFormData({ name: "", email: "", subject: "", message: "" })
        setSubmitted(true)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error(error)
      setSubmitError("There was a problem sending your message. Please try again.")
      toast({ title: "Error", description: "There was a problem sending your message. Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="relative h-[220px] md:h-[280px] overflow-hidden bg-[hsl(var(--charcoal))]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 120%, hsl(var(--gold) / 0.18), transparent 60%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="overline text-[hsl(var(--gold-light))] mb-3">We&apos;re Here to Help</p>
          <h1 className="display-md text-white">Contact Us</h1>
        </div>
      </section>

      <div className="page-container section-gap-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* Left: info */}
          <div className="lg:col-span-2">
            <h2 className="heading-md mb-4">Let&apos;s talk silk</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-9 text-sm">
              Have a question about a saree, your order, or a custom request? Reach out and our team will
              get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(var(--cream))", color: "hsl(var(--gold))" }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium hover:text-[hsl(var(--gold))] transition-colors break-all">{c.value}</a>
                    ) : (
                      <p className="text-sm font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-7 md:p-9" style={{ border: "1px solid hsl(var(--border))" }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "hsl(var(--cream))", color: "hsl(var(--gold))" }}>
                    <Check size={28} />
                  </div>
                  <h3 className="heading-md mb-3">Message sent successfully</h3>
                  <p className="text-muted-foreground font-light text-sm mb-7">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="px-4 py-3 text-sm" style={{ background: "hsl(0 70% 97%)", border: "1px solid hsl(0 70% 88%)", color: "hsl(0 65% 40%)" }}>
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="form-label mb-2 block">Your Name</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} required
                        className="form-input" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label mb-2 block">Email Address</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                        className="form-input" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="form-label mb-2 block">Subject</label>
                    <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="form-input" placeholder="What is your message about?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label mb-2 block">Your Message</label>
                    <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required
                      className="form-input resize-none" placeholder="Type your message here..." />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center gap-2">
                    {isSubmitting ? "Sending..." : <>Send Message <Send size={14} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Help link */}
        <div className="text-center mt-14">
          <p className="text-sm text-muted-foreground font-light">
            Looking for something to wear?{" "}
            <Link href="/collections" className="text-[hsl(var(--gold))] hover:underline inline-flex items-center gap-1">
              Browse the collection <ArrowRight size={12} />
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
