"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
              Returns & Cancellations
            </h1>
            <div className="elegant-divider w-64 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 tracking-wider">Return & Exchange Policy</h2>
              <p className="text-foreground/80 mb-6">
                At Vasthrika, we take immense pride in our craftsmanship and quality control. Each silk garment undergoes 
                rigorous quality checks before being shipped to ensure you receive nothing but the finest.
              </p>

              <div className="space-y-4 text-foreground/80">
                <h3 className="text-xl font-medium">Return Eligibility</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Returns are accepted within 48 hours of delivery only if the product is damaged or defective.</li>
                  <li>The product must be unused, unworn, and in its original packaging with all tags intact.</li>
                  <li>For valid returns, please email our customer care at support@vasthrika.com with clear photos of the issue.</li>
                  <li>The final decision on return acceptance rests with Vasthrika's quality assurance team.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Important Notes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Slight variations in color may occur due to photography and screen settings - these are not valid reasons for returns.</li>
                  <li>For approved returns, customers must use a reputable courier service. The return shipping cost and safe delivery responsibility lies with the customer.</li>
                  <li>Products damaged due to improper handling, wear and tear, or incorrect care are not eligible for returns.</li>
                  <li>Exchange requests are limited to one per order.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Processing Time</h3>
                <p>
                  For approved returns, refunds or exchanges will be processed within 7-10 business days after receiving 
                  the returned product in its original condition.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light mb-6 tracking-wider">Cancellation Policy</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Due to the artisanal nature of our products and our commitment to our craftsmen, orders cannot be 
                  cancelled once processing has begun.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders can only be cancelled within 2 hours of placement, subject to processing status.</li>
                  <li>For urgent cancellation requests, please contact our support team at +91 98765 43210 or email support@vasthrika.com</li>
                  <li>If the order has already been shipped, cancellation requests cannot be accommodated.</li>
                </ul>
              </div>
            </section>

            <section className="mt-12">
              <div className="bg-amber-50/30 border border-amber-100/30 p-6 rounded-sm">
                <h3 className="text-xl font-medium mb-4">Need Assistance?</h3>
                <p className="text-foreground/80">
                  Our customer service team is available Monday through Saturday, 9 AM to 6 PM IST to assist you with any 
                  questions regarding returns or cancellations.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-foreground/80">Email: support@vasthrika.com</p>
                  <p className="text-foreground/80">Phone: +91 98765 43210</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 