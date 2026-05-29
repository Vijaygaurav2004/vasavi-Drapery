"use client"

import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/app/context/cart-context"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <main className="flex-1 py-24 bg-background">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
              <ShoppingBag size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl elegant-heading font-light mb-4 uppercase tracking-wider">Your Cart</h1>
            <p className="text-muted-foreground font-light mb-8 text-sm">
              Your cart is currently empty. Discover our exquisite collection.
            </p>
            <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-16 bg-background">
      <div className="container">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="section-eyebrow mb-1">Your Selection</p>
            <h1 className="text-3xl elegant-heading font-light uppercase tracking-wider">Shopping Cart</h1>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-light"
            style={{ letterSpacing: '0.15em' }}
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 p-5 bg-white border border-border hover:border-primary/20 transition-colors duration-300"
              >
                {/* Image */}
                <Link href={`/product/${item.id}`} className="relative w-24 h-28 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder-image.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-medium elegant-heading text-base leading-snug">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-primary font-medium mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted/50 transition-colors disabled:opacity-35"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted/50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-medium text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border p-7 sticky top-28">
              <h2 className="elegant-heading text-xl font-light uppercase tracking-wider mb-6">
                Order Summary
              </h2>
              <div className="elegant-divider mb-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">
                    Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)
                  </span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="font-medium text-emerald-700">
                    {cartTotal >= 2000 ? 'Free' : '₹150'}
                  </span>
                </div>
                {cartTotal < 2000 && (
                  <p className="text-xs text-muted-foreground font-light bg-muted/50 px-3 py-2">
                    Add ₹{(2000 - cartTotal).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-5 mb-7">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium tracking-wide">Total</span>
                  <span className="text-2xl font-light elegant-heading text-primary">
                    ₹{(cartTotal + (cartTotal >= 2000 ? 0 : 150)).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="luxury-button w-full flex items-center justify-center gap-2 py-4 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>

              {/* Trust signals */}
              <div className="space-y-3 pt-5 border-t border-border">
                {[
                  { icon: <ShieldCheck size={14} />, text: 'Secure & encrypted payment' },
                  { icon: <Truck size={14} />, text: 'Free shipping above ₹2,000' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground font-light">
                    <span className="text-primary flex-shrink-0">{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
