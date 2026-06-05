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
                <h3 className="text-xl font-medium">No Returns &amp; No Exchange</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We follow a strict <strong>no returns &amp; no exchange</strong> policy. All sales are final.</li>
                  <li>Every saree is inspected through a rigorous quality check and carefully packed before it is dispatched to you.</li>
                  <li>Slight variations in colour may occur due to photography and screen settings — these are a natural part of handcrafted silk and are not considered defects.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Damaged or Defective Items</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In the rare event that you receive a damaged or defective product, please email us at vasthrikabyvasavi@gmail.com within 48 hours of delivery with clear photos of the issue.</li>
                  <li>An unboxing video (without any pause or cut) is required for any damage claim to be considered.</li>
                  <li>The final decision rests with Vasthrika's quality assurance team.</li>
                </ul>
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
                  <li>For urgent cancellation requests, please contact our support team at email vasthrikabyvasavi@gmail.com</li>
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
                  <p className="text-foreground/80">Email: vasthrikabyvasavi@gmail.com</p>
                </div>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 elegant-heading silk-text-gradient">Important Notes</h2>
              <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                <li className="mb-2">We recommend carefully reviewing the product description and images before making a purchase. Slight colour variations may occur due to screen settings or photography lighting.</li>
                <li className="mb-2">Our team performs a thorough quality check before dispatching any order.</li>
                <li className="mb-2">As all sales are final, products cannot be returned or exchanged once an order is placed.</li>
                <li className="mb-2">Products with fall and edging work done are considered customised and are final sale.</li>
                <li className="mb-2">Products purchased during sale periods or with promotional discounts are final sale and cannot be returned or exchanged.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 