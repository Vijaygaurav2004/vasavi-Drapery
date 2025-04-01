"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function TestimonialCarousel() {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Ananya Patel",
      role: "Loyal Customer",
      location: "Mumbai",
      content: "The craftsmanship of Vasthrika's silk sarees is unparalleled. The attention to detail and the quality of the silk make each piece a true heirloom that I'm proud to pass down to my daughter.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
    },
    {
      id: 2,
      name: "Meera Sharma",
      role: "Fashion Designer",
      location: "Delhi",
      content: "As someone who works in fashion, I can attest to the exceptional quality of Vasthrika's silk sarees. The designs are contemporary yet rooted in tradition - exactly what today's women are looking for.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
    },
    {
      id: 3,
      name: "Priya Iyer",
      role: "Textile Enthusiast",
      location: "Bangalore",
      content: "Vasthrika's collection represents the best of Indian silk heritage. Their commitment to working directly with artisans ensures both authenticity and sustainability - values that are increasingly important.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      role: "Silk Merchant",
      location: "Chennai",
      content: "I've been a silk merchant for decades, and Vasthrika's sarees are a testament to the true craftsmanship of Indian silk. The attention to detail and the quality of the fabric make them a joy to work with.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
    } 
  ]

  return (
    <section className="py-28 bg-[#f4f3ef] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="relative mb-16 text-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/30 -z-10 rotate-45"></div>
          <h2 className="section-title">Client Testimonials</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Hear from our clients about their experience with Vasthrika's luxury silk sarees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 shadow-lg relative hover:shadow-xl transition-all duration-500 decorated-corners"
            >
              <div className="mb-6">
                <svg 
                  className="text-primary/20 w-12 h-12 absolute top-4 right-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.1.248-.73.168-1.29.3-1.71.393.43-1.4 1.09-2.58 1.97-3.525.91-.97 1.95-1.7 3.13-2.2v-2.04c-1.63.685-3.1 1.74-4.42 3.16-1.31 1.41-2.25 2.92-2.83 4.52-.57 1.6-.86 3.04-.86 4.33 0 2.27.72 4.07 2.17 5.4 1.45 1.33 3.3 2 5.54 2 1.9 0 3.5-.62 4.75-1.86 1.26-1.24 1.88-2.78 1.88-4.59 0-1.72-.57-3.15-1.71-4.29-1.15-1.15-2.57-1.73-4.25-1.73zm9.76 0c0-.88-.23-1.618-.69-2.217-.326-.41-.77-.682-1.327-.812-.55-.128-1.07-.136-1.54-.028-.16.032-.52.112-1.1.248-.73.167-1.29.3-1.71.39.43-1.39 1.09-2.58 1.97-3.523.91-.97 1.95-1.7 3.13-2.205v-2.04c-1.63.685-3.09 1.74-4.42 3.16-1.3 1.41-2.25 2.92-2.82 4.52-.57 1.6-.86 3.04-.86 4.33 0 2.27.72 4.07 2.17 5.4 1.45 1.33 3.3 2 5.54 2 1.9 0 3.5-.62 4.78-1.86 1.28-1.24 1.92-2.78 1.92-4.59 0-1.72-.58-3.15-1.73-4.29-1.16-1.15-2.58-1.73-4.25-1.73z" />
                </svg>
                <p className="text-foreground/80 italic leading-relaxed relative z-10">{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    fill
                    className="object-cover" 
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium elegant-heading text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">{testimonial.role}, {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-32 h-32 border border-primary/10 -z-0"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 border border-primary/10 -z-0"></div>
    </section>
  )
}

