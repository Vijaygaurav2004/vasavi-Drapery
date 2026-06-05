"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Heart, ShoppingBag, Eye, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/app/context/cart-context"
import { useWishlist } from "@/app/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/types/product"
import SilkMarkBadge from "@/components/silk-mark-badge"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [adding, setAdding] = useState(false)
  const [wished, setWished] = useState(isInWishlist(product.id ?? ""))

  const inWish   = isInWishlist(product.id ?? "")
  const discount = product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0
  const effectivePrice = product.discountedPrice ?? product.price
  const stock    = product.stock ?? 12
  const seed     = [...(product.id ?? product.name ?? "x")].reduce((a, c) => a + c.charCodeAt(0), 0)
  const sold     = (seed % 80) + 20
  const views    = (seed % 18) + 5
  const reviews  = (seed % 40) + 5
  const isLow    = stock <= 5

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    setAdding(true)
    try {
      addToCart({ ...product, quantity: 1 })
      toast({ title: "Added to cart", description: product.name })
    } finally {
      setTimeout(() => setAdding(false), 800)
    }
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    if (inWish) {
      removeFromWishlist(product.id ?? "")
      setWished(false)
    } else {
      addToWishlist(product)
      setWished(true)
    }
    toast({ title: inWish ? "Removed from wishlist" : "Added to wishlist" })
  }

  return (
    <Link href={`/product/${product.id}`} className="product-card block group">

      {/* Image container */}
      <div className="product-card-img">
        <Image
          src={(product.images?.[0]) || "/pink-saree.jpg"}
          alt={product.name}
          fill
          className="img-cover"
          sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.label && <span className="badge-new">{product.label}</span>}
          {discount >= 10 && <span className="badge-sale">-{discount}%</span>}
          {isLow && <span className="badge-urgency">Only {stock} left</span>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white"
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className="transition-all duration-200"
            style={{
              fill: inWish ? "hsl(var(--maroon))" : "transparent",
              color: inWish ? "hsl(var(--maroon))" : "hsl(var(--foreground))",
              transform: wished ? "scale(1.25)" : "scale(1)",
            }}
          />
        </button>

        {/* Hover CTA */}
        <div className="product-card-cta">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full flex items-center justify-center gap-2 bg-white text-foreground text-xs font-medium uppercase tracking-widest py-3 hover:bg-[hsl(var(--gold))] hover:text-white transition-all duration-200"
          >
            {adding ? (
              <span className="loading-spinner" style={{ borderTopColor: "hsl(var(--foreground))" }} />
            ) : (
              <><ShoppingBag size={14} /> Add to Cart</>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card-info">
        {/* Viewing now */}
        <div className="viewing-now mb-2">
          <span className="viewing-dot" />
          <span>{views} viewing now</span>
        </div>

        <h3 className="product-card-name line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 my-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]"
            />
          ))}
          <span className="text-[0.65rem] text-muted-foreground ml-1">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="product-card-price">
            ₹{effectivePrice.toLocaleString("en-IN")}
          </span>
          {product.discountedPrice && (
            <span className="product-card-price-old">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Sold count */}
        {sold > 40 && (
          <p className="text-[0.62rem] text-[hsl(var(--maroon))] font-medium mt-1 uppercase tracking-wide">
            🔥 {sold} sold today
          </p>
        )}

        {/* Silk Mark badge */}
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <SilkMarkBadge variant="dark" size="sm" />
        </div>
      </div>
    </Link>
  )
}
