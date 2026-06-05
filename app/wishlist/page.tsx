"use client"

import { useState, useEffect } from "react"
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/app/context/wishlist-context"
import { useCart } from "@/app/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleAddToCart = (item: any) => {
    setTimeout(() => {
      addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 })
      toast({ description: `${item.name} added to cart`, duration: 2000 })
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading-spinner" style={{ borderTopColor: "hsl(var(--gold))", width: "2rem", height: "2rem" }} />
      </div>
    )
  }

  return (
    <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="relative h-[240px] md:h-[300px] overflow-hidden bg-[hsl(var(--charcoal))]">
        <Image src="/1.jpg" alt="Wishlist" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="overline text-[hsl(var(--gold-light))] mb-3">Saved Items</p>
          <h1 className="display-md text-white">My Wishlist</h1>
        </div>
      </section>

      <div className="page-container section-gap-sm">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7" style={{ background: "hsl(var(--cream))" }}>
              <Heart size={28} style={{ color: "hsl(var(--gold))" }} />
            </div>
            <h2 className="heading-lg mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground font-light mb-8 text-sm">
              Save the pieces you love and revisit them anytime.
            </p>
            <Link href="/collections" className="btn-primary inline-flex items-center gap-2">
              Browse Collection <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
              <button
                onClick={clearWishlist}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {items.map((item) => (
                <div key={item.id} className="product-card block group">
                  <div className="product-card-img">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      <Image
                        src={item.image || "/pink-saree.jpg"}
                        alt={item.name}
                        fill
                        className="img-cover"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-destructive"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={15} className="text-foreground/60" />
                    </button>
                  </div>

                  <div className="product-card-info">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="product-card-name line-clamp-2">{item.name}</h3>
                    </Link>
                    <p className="product-card-price mt-1.5 mb-3">₹{item.price.toLocaleString("en-IN")}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest py-3 transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:text-white"
                      style={{ border: "1px solid hsl(var(--border))" }}
                    >
                      <ShoppingBag size={14} /> Add to Cart
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
