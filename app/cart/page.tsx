"use client"

import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/app/context/cart-context"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <main className="flex-1 section-gap bg-background">
        <div className="page-container">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "hsl(var(--cream))" }}>
              <ShoppingBag size={30} style={{ color: "hsl(var(--gold))" }} />
            </div>
            <p className="overline mb-3">Your Cart</p>
            <h1 className="heading-lg mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground font-light mb-8 text-sm">
              Discover our exquisite handwoven collection and find your next heirloom.
            </p>
            <Link href="/collections" className="btn-primary inline-flex items-center gap-2">
              Explore Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const shipping = cartTotal >= 5000 ? 0 : 150
  const total = cartTotal + shipping

  return (
    <main className="flex-1 section-gap-sm bg-background">
      <div className="page-container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="overline mb-2">Your Selection</p>
            <h1 className="heading-lg">Shopping Cart</h1>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-medium"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 p-4 sm:p-5 bg-white transition-colors duration-300"
                style={{ border: "1px solid hsl(var(--border))" }}
              >
                <Link href={`/product/${item.id}`} className="relative w-24 h-32 flex-shrink-0 overflow-hidden bg-[hsl(var(--muted))]">
                  <Image
                    src={item.image || "/pink-saree.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <Link href={`/product/${item.id}`} className="hover:text-[hsl(var(--gold))] transition-colors">
                        <h3 className="heading-sm leading-snug">{item.name}</h3>
                      </Link>
                      <p className="text-sm font-medium mt-1.5" style={{ color: "hsl(var(--gold))" }}>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center" style={{ border: "1px solid hsl(var(--border))" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors disabled:opacity-35"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-medium text-sm">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-7 sticky top-28" style={{ border: "1px solid hsl(var(--border))" }}>
              <h2 className="heading-md mb-6">Order Summary</h2>
              <div className="divider mb-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">
                    Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)
                  </span>
                  <span className="font-medium">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="font-medium" style={{ color: shipping === 0 ? "hsl(145 50% 35%)" : undefined }}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground font-light px-3 py-2" style={{ background: "hsl(var(--cream))" }}>
                    Add ₹{(5000 - cartTotal).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
              </div>

              <div className="pt-5 mb-7" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium tracking-wide">Total</span>
                  <span className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--gold))" }}>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center gap-2 mb-5">
                Proceed to Checkout <ArrowRight size={14} />
              </Link>

              <div className="space-y-3 pt-5" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                {[
                  { icon: <Lock size={14} />,        text: "Secure & encrypted payment" },
                  { icon: <ShieldCheck size={14} />, text: "100% authentic Silk Mark silk" },
                  { icon: <Truck size={14} />,       text: "Free shipping above ₹5,000" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground font-light">
                    <span style={{ color: "hsl(var(--gold))" }} className="flex-shrink-0">{t.icon}</span>
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
