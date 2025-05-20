"use client"

import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <main className="flex-1 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl mb-6 uppercase tracking-wider font-light elegant-heading">Your Cart</h1>
            <p className="text-foreground/70 mb-8">Your cart is currently empty.</p>
            <Link 
              href="/collections"
              className="inline-flex items-center text-sm hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-4xl uppercase tracking-wider font-light elegant-heading">Your Cart</h1>
            <Link 
              href="/collections"
              className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-4 bg-white border border-amber-100/30 rounded-sm shadow-sm">
                <div className="relative w-24 h-24">
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
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-foreground/70 text-sm">₹{item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-foreground/50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex items-center border border-input rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="ml-auto font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-amber-100/30 rounded-sm shadow-sm">
            <div className="flex items-center justify-between text-lg font-medium mb-6">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full bg-black hover:bg-amber-900 text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

