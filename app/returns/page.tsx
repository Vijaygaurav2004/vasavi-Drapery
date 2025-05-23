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
                  <li>For valid returns, please email our customer care at vasthrikabyvasavi@gmail.com with clear photos of the issue.</li>
                  <li>The final decision on return acceptance rests with Vasthrika's quality assurance team.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Important Notes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Slight variations in color may occur due to photography and screen settings - these are not valid reasons for returns.</li>
                  <li>For approved returns, customers must use a reputable courier service. The return shipping cost and safe delivery responsibility lies with the customer.</li>
                  <li>Products damaged due to improper handling, wear and tear, or incorrect care are not eligible for returns.</li>
                  <li>Exchange requests are limited to one per order.</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Delivery Time</h3>
                <p>
                  For approved returns, refunds or exchanges will be delivered within 7-10 business days after receiving 
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
                <li className="mb-2">We recommend carefully reviewing the product description and images before making a purchase. Slight color variations may occur due to screen settings or photography lighting.</li>
                <li className="mb-2">Our team performs a thorough quality check before dispatching any order.</li>
                <li className="mb-2">Return shipping costs are the responsibility of the customer unless the return is due to a manufacturing defect or an error on our part.</li>
                <li className="mb-2">We are not responsible for items damaged or lost during return transit. Please use a reliable courier service with tracking.</li>
                <li className="mb-2">Exchanges must be initiated within 7 days of receiving your order.</li>
                <li className="mb-2">The product must be unused, unwashed, and in its original condition with all tags attached.</li>
                <li className="mb-2">Products with fall and edging work done are considered customized and are not eligible for return or exchange unless there is a manufacturing defect.</li>
                <li className="mb-2">Products purchased during sale periods or with promotional discounts are final sale and cannot be returned or exchanged.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 