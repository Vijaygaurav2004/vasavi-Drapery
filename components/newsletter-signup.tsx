"use client"

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    // In a real application, you would send this data to your backend
    setSubmitted(true)
  }
  
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-accent/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-primary/5 to-transparent"></div>
      <div className="absolute top-20 right-20 w-28 h-28 border border-primary/10 rotate-12"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border border-accent/10 -rotate-12"></div>
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto border-gradient luxury-card p-16 shadow-xl gold-shimmer">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-6 uppercase tracking-wider font-light elegant-heading">Join Our Community</h2>
            <div className="silk-divider mx-auto"></div>
            <p className="text-foreground/70 mt-8 max-w-xl mx-auto leading-relaxed">
              Subscribe to our newsletter to receive updates on new collections, special events, and exclusive offers.
            </p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-grow p-4 border border-foreground/10 focus:border-primary focus:outline-none shadow-sm bg-muted/50"
                />
                <button type="submit" className="cta-button group">
                  <span>Subscribe</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
              <p className="text-xs text-foreground/50 mt-4 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from Vasthrika.
              </p>
            </form>
          ) : (
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl mb-4 elegant-heading">Thank You for Subscribing</h3>
              <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                We've added your email to our list. Look out for our next newsletter featuring our latest collections and exclusive offers.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="secondary-button"
              >
                Subscribe Another Email
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-foreground/50">
            Questions? Contact us at <a href="mailto:info@vasthrika.com" className="hover:text-primary-foreground transition-colors">info@vasthrika.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}

