"use client"

import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Gift, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const shippingCost = cartTotal > 25000 ? 0 : 250
  const tax = Math.round(cartTotal * 0.18) // 18% GST
  const finalTotal = cartTotal + shippingCost + tax

  const handleCheckout = async () => {
    try {
      setIsProcessing(true)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
      
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="flex-1 py-20 relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-6 uppercase tracking-wider font-light elegant-heading">Your Cart is Empty</h1>
            <p className="text-foreground/70 mb-8">Discover our exquisite collection of handcrafted silk products.</p>
            <Link 
              href="/collections"
              className="luxury-button inline-flex items-center px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-4xl uppercase tracking-wider font-light elegant-heading silk-text-gradient">Shopping Cart</h1>
            <Link 
              href="/collections"
              className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-amber-100/30 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex gap-6 p-6">
                    <div className="relative w-32 h-32">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium mb-1 hover:text-amber-800 transition-colors">
                            <Link href={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="text-foreground/70">₹{item.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-foreground/50 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center mt-6">
                        <div className="flex items-center border border-amber-200/30 rounded-sm bg-amber-50/30">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-amber-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-amber-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="ml-auto font-medium text-lg">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-amber-100/30 rounded-sm shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Shipping</span>
                    <span className="font-medium">{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">GST (18%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Gift className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </div>

                <div className="border-t border-amber-100/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-medium">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-black hover:bg-amber-900 text-white h-12"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="loading-spinner mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-foreground/70">
                    Secure payment powered by Stripe. Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

