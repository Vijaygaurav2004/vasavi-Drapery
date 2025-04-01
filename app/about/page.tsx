"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // In a real application, you would send this data to your backend
    setSubmitted(true)
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-subtle silk-texture">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="fade-in" style={{animationDelay: '0.2s'}}>
              <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading">Our Story</h1>
              <div className="w-20 h-px bg-primary mb-8"></div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                At Vasthrika by Vasavi, our journey began with a profound respect for India's rich textile heritage. 
                Founded with a mission to preserve traditional silk craftsmanship while making 
                these timeless treasures accessible to the modern world.
              </p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Each piece we create embodies generations of artisanal expertise, cultural significance, 
                and the subtle elegance that only handcrafted silk can provide.
              </p>
            </div>
            <div className="relative decorated-corners fade-in" style={{animationDelay: '0.4s'}}>
              <div className="relative overflow-hidden aspect-[4/5] shadow-xl gold-shimmer">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Silk artisans at work"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Values</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center luxury-card p-10 fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </div>
              <h3 className="text-xl mb-4 font-medium elegant-heading">Heritage</h3>
              <p className="text-foreground/70">
                We honor generations of craftsmanship and traditional techniques that have been passed down through families.
              </p>
            </div>
            
            <div className="text-center luxury-card p-10 fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><circle cx="12" cy="12" r="10"></circle><path d="M16 12h-6.5a2 2 0 1 0 0 4H11"></path><path d="M10 8h6.5a2 2 0 1 1 0 4H14"></path></svg>
              </div>
              <h3 className="text-xl mb-4 font-medium elegant-heading">Sustainability</h3>
              <p className="text-foreground/70">
                We work directly with artisans, ensuring fair wages and environmentally responsible practices throughout our supply chain.
              </p>
            </div>
            
            <div className="text-center luxury-card p-10 fade-in" style={{animationDelay: '0.6s'}}>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
              </div>
              <h3 className="text-xl mb-4 font-medium elegant-heading">Excellence</h3>
              <p className="text-foreground/70">
                We never compromise on quality. Each piece in our collection undergoes rigorous inspection to ensure the highest standards.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-28 bg-gradient-subtle silk-texture">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">Get in Touch</h2>
              <div className="section-divider"></div>
              <p className="section-subtitle">
                We'd love to hear from you. Whether you have a question about our products, custom orders, or anything else, our team is ready to answer all your questions.
              </p>
            </div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-12 shadow-xl border border-foreground/5 decorated-corners border-gradient">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm uppercase tracking-wider text-foreground/80">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-foreground/10 focus:border-primary focus:outline-none bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm uppercase tracking-wider text-foreground/80">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-foreground/10 focus:border-primary focus:outline-none bg-muted/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-8">
                  <label htmlFor="subject" className="text-sm uppercase tracking-wider text-foreground/80">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-foreground/10 focus:border-primary focus:outline-none bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2 mb-10">
                  <label htmlFor="message" className="text-sm uppercase tracking-wider text-foreground/80">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-foreground/10 focus:border-primary focus:outline-none bg-muted/50"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="cta-button group">
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white p-16 shadow-xl border border-primary/10 text-center decorated-corners">
                <svg className="w-16 h-16 text-primary/70 mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl mb-4 elegant-heading">Thank You</h3>
                <p className="text-foreground/70 mb-8">
                  Your message has been received. We'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="secondary-button"
                >
                  Send Another Message
                </button>
              </div>
            )}
            
            <div className="mt-20 text-center">
              <div className="inline-flex items-center justify-center">
                <div className="space-y-2">
                  <h4 className="text-lg uppercase tracking-wider mb-2 elegant-heading">Contact Information</h4>
                  <p className="text-foreground/70">
                    Email: <a href="mailto:info@vasthrika.com" className="hover:text-primary-foreground transition-colors">info@vasthrika.com</a>
                  </p>
                  <p className="text-foreground/70">
                    Phone: <a href="tel:+919876543210" className="hover:text-primary-foreground transition-colors">+91 98765 43210</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

