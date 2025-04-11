"use client"

import React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  avatar: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-8 shadow-lg relative hover:shadow-xl transition-all duration-500 decorated-corners h-full flex flex-col">
              <svg 
                className="text-primary/10 w-12 h-12 absolute top-4 right-4 -z-10"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.1.248-.73.168-1.29.3-1.71.393.43-1.4 1.09-2.58 1.97-3.525.91-.97 1.95-1.7 3.13-2.2v-2.04c-1.63.685-3.1 1.74-4.42 3.16-1.31 1.41-2.25 2.92-2.83 4.52-.57 1.6-.86 3.04-.86 4.33 0 2.27.72 4.07 2.17 5.4 1.45 1.33 3.3 2 5.54 2 1.9 0 3.5-.62 4.75-1.86 1.26-1.24 1.88-2.78 1.88-4.59 0-1.72-.57-3.15-1.71-4.29-1.15-1.15-2.57-1.73-4.25-1.73zm9.76 0c0-.88-.23-1.618-.69-2.217-.326-.41-.77-.682-1.327-.812-.55-.128-1.07-.136-1.54-.028-.16.032-.52.112-1.1.248-.73.167-1.29.3-1.71.39.43-1.39 1.09-2.58 1.97-3.523.91-.97 1.95-1.7 3.13-2.205v-2.04c-1.63.685-3.09 1.74-4.42 3.16-1.3 1.41-2.25 2.92-2.82 4.52-.57 1.6-.86 3.04-.86 4.33 0 2.27.72 4.07 2.17 5.4 1.45 1.33 3.3 2 5.54 2 1.9 0 3.5-.62 4.78-1.86 1.28-1.24 1.92-2.78 1.92-4.59 0-1.72-.58-3.15-1.73-4.29-1.16-1.15-2.58-1.73-4.25-1.73z" />
              </svg>
              <div className="mb-6 flex-grow">
                <p className="text-foreground/80 italic leading-relaxed relative z-10">{testimonial.content}</p>
              </div>
              <div className="flex items-center mt-auto">
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}

