"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl mb-4 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
            Thank You for Your Order
          </h1>
          
          <p className="text-foreground/70 mb-8">
            Your order has been successfully placed. We will send you an email confirmation with your order details shortly.
          </p>

          <div className="bg-white border border-amber-100/30 rounded-sm shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">Order Information</h2>
            <p className="text-sm text-foreground/70 mb-2">Order ID: {sessionId}</p>
            <p className="text-sm text-foreground/70">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>

          <Link 
            href="/collections"
            className="luxury-button inline-flex items-center px-8 py-3"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </main>
  )
} 