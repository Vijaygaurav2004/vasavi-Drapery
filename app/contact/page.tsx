"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { submitContactForm } from "@/lib/supabase/contact"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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
      // Submit to Supabase
      const success = await submitContactForm(formData);
      
      if (success) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });
        
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(true)
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("There was a problem sending your message. Please try again.");
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex-1 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center elegant-heading silk-text-gradient">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Have questions about our products or need assistance with your order? We're here to help.
          </p>

          <div className="mb-12">
            <Card className="hover-lift">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we&apos;ll get back to you within 24 hours.
                </p>
                <a 
                  href="mailto:vasthrikabyvasavi@gmail.com" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  vasthrikabyvasavi@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg decorated-corners border-gradient animate-fade-slide-up">
            <CardContent className="p-8">
              <h2 className="text-2xl font-medium mb-8 text-center elegant-heading">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 mb-4">Thank you for contacting us. We'll get back to you soon!</p>
                  <Button 
                    onClick={() => setSubmitted(false)} 
                    className="bg-white border border-green-300 text-green-700 hover:bg-green-50"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="glass" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="glass" 
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="glass" 
                    placeholder="What is your message about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="glass resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full luxury-button py-6" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

