"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/app/context/wishlist-context"
import { useCart } from "@/app/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading to ensure client-side hydration
    setIsLoading(false)
  }, [])

  const handleAddToCart = (item: any) => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      })
      toast({
        description: `${item.name} added to cart`,
        duration: 2000,
      })
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    )
  }

  return (
    <main className="flex-1 bg-background">
      <div className="py-16 bg-gradient-subtle text-center relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-40 pointer-events-none" />
        <div className="container relative z-10">
          <p className="section-eyebrow mb-3">Saved Items</p>
          <h1 className="section-title">My Wishlist</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="container py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'hsl(var(--primary) / 0.08)' }}>
              <Trash2 size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl elegant-heading font-light mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground font-light mb-8 text-sm">
              Save items you love to revisit them later.
            </p>
            <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-light" style={{ letterSpacing: '0.15em' }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
              <button
                onClick={clearWishlist}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest font-light"
                style={{ letterSpacing: '0.15em' }}
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item) => (
                <div key={item.id} className="product-card group">
                  <div className="product-card-image-container">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      <Image
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.name}
                        fill
                        className="product-card-image"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center transition-all duration-300 hover:text-destructive"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} className="text-foreground/60" />
                    </button>
                  </div>
                  <div className="product-card-content">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="product-card-title">{item.name}</h3>
                    </Link>
                    <div className="product-card-divider" />
                    <p className="product-card-price mb-4">₹{item.price.toLocaleString()}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full luxury-button-sm py-2.5 flex items-center justify-center gap-1.5"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
} 