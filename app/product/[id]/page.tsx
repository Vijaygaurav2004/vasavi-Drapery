"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Minus, Plus, ShoppingBag, Heart, Share2, ChevronRight,
  Truck, ShieldCheck, RotateCcw, Package, Star, ZoomIn,
  Check, MapPin, Clock, Eye, Award
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import RelatedProducts from "@/components/related-products"
import { getProduct } from "@/lib/supabase/products"
import { useCart } from "@/app/context/cart-context"
import { useWishlist } from "@/app/context/wishlist-context"
import SilkMarkBadge from "@/components/silk-mark-badge"

const TRUST = [
  { icon: <ShieldCheck size={18} />, label: "100% Authentic",   sub: "GI certified silk" },
  { icon: <Truck size={18} />,       label: "Free Shipping",    sub: "On orders ₹2000+" },
  { icon: <RotateCcw size={18} />,   label: "7-Day Returns",    sub: "Hassle-free" },
  { icon: <Package size={18} />,     label: "COD Available",    sub: "Pay on delivery" },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct]                   = useState<any>(null)
  const [loading, setLoading]                   = useState(true)
  const [qty, setQty]                           = useState(1)
  const [adding, setAdding]                     = useState(false)
  const [activeImg, setActiveImg]               = useState(0)
  const [zoomed, setZoomed]                     = useState(false)
  const [zoomPos, setZoomPos]                   = useState({ x: 50, y: 50 })
  const [selectedVariant, setSelectedVariant]   = useState<number | null>(null)
  const [pincode, setPincode]                   = useState("")
  const [pincodeResult, setPincodeResult]       = useState<string | null>(null)
  const [activeTab, setActiveTab]               = useState("details")
  const [viewingNow]                            = useState(Math.floor(Math.random() * 18) + 6)
  const imgRef = useRef<HTMLDivElement>(null)

  const inWish = product ? isInWishlist(product.id) : false

  const images = useMemo(() => {
    if (!product) return []
    if (product.hasColorVariants && product.colorVariants?.length && selectedVariant !== null) {
      const varImgs = product.colorVariants[selectedVariant]?.images
      if (Array.isArray(varImgs) && varImgs.length > 0) return varImgs
    }
    return Array.isArray(product.images) ? product.images : [product.image]
  }, [product, selectedVariant])

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  async function handleAddToCart() {
    if (!product) return
    setAdding(true)
    addToCart({ ...product, quantity: qty })
    toast({ title: "Added to cart", description: `${qty} × ${product.name}` })
    setTimeout(() => setAdding(false), 800)
  }

  function handleWishlist() {
    if (!product) return
    if (inWish) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from wishlist" })
    } else {
      addToWishlist(product)
      toast({ title: "Added to wishlist" })
    }
  }

  function checkPincode() {
    if (pincode.length !== 6) return
    setTimeout(() => {
      const deliverable = parseInt(pincode) % 2 === 0
      setPincodeResult(
        deliverable
          ? `Delivers to ${pincode} in 3–5 business days · COD available`
          : `Standard delivery to ${pincode} in 5–7 days`
      )
    }, 500)
  }

  if (loading) return (
    <div className="page-container section-gap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div className="skeleton aspect-product" />
        <div className="space-y-5">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-5 w-1/2" />
          <div className="skeleton h-12 w-1/3" />
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="page-container section-gap text-center">
      <p className="heading-md text-muted-foreground mb-4">Product not found</p>
      <Link href="/collections/women" className="btn-primary">Back to Collection</Link>
    </div>
  )

  const discount  = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const stock     = product.stock ?? 8
  const isLow     = stock <= 5
  const soldToday = Math.floor(Math.random() * 60) + 30

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
        <div className="page-container py-3 flex items-center gap-2 text-xs text-muted-foreground font-light">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/collections/women" className="hover:text-foreground transition-colors">Women's</Link>
          <ChevronRight size={11} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="page-container section-gap-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ══ GALLERY ══ */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
              {images.slice(0, 6).map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="flex-shrink-0 w-[64px] h-[80px] md:w-[72px] md:h-[90px] overflow-hidden transition-all"
                  style={{
                    outline: activeImg === i ? "2px solid hsl(var(--foreground))" : "1px solid hsl(var(--border))",
                    outlineOffset: activeImg === i ? "-2px" : "0",
                    opacity: activeImg === i ? 1 : 0.65,
                  }}
                >
                  <Image src={img || "/pink-saree.jpg"} alt="" width={72} height={90} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div
                ref={imgRef}
                className="relative overflow-hidden cursor-zoom-in select-none"
                style={{ aspectRatio: "3/4" }}
                onMouseEnter={() => setZoomed(true)}
                onMouseLeave={() => setZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={images[activeImg] || "/pink-saree.jpg"}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500"
                  style={{
                    transform: zoomed ? "scale(1.8)" : "scale(1)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && <span className="badge-new">New</span>}
                  {discount >= 10 && <span className="badge-sale">-{discount}%</span>}
                  {isLow && <span className="badge-urgency">Only {stock} left</span>}
                </div>

                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5">
                  <ZoomIn size={12} />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Zoom</span>
                </div>

                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center z-10 hover:bg-white transition-colors"
                      onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    >
                      ‹
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center z-10 hover:bg-white transition-colors"
                      onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ══ PRODUCT INFO ══ */}
          <div>

            {/* Viewing now */}
            <div className="viewing-now mb-4">
              <span className="viewing-dot" />
              <span>{viewingNow} people viewing this right now</span>
            </div>

            {/* Name + brand */}
            <h1 className="heading-lg mb-2">{product.name}</h1>
            <p className="overline text-muted-foreground mb-4">{product.category || "Silk Saree"}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-light">4.9 · 47 reviews</span>
              <span className="text-[hsl(var(--maroon))] text-xs font-medium">🔥 {soldToday} sold today</span>
            </div>

            {/* Divider */}
            <div className="divider mb-6" />

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg font-light text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="badge-sale px-2 py-1 text-sm">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Stock indicator */}
            {isLow && (
              <p className="badge-urgency mb-5 inline-flex">
                ⚡ Only {stock} left in stock — order soon
              </p>
            )}

            {/* Color variants */}
            {product.hasColorVariants && (product.colorVariants?.length ?? 0) > 0 && (
              <div className="mb-6">
                <p className="form-label mb-2">
                  Color: <span className="font-normal text-muted-foreground normal-case tracking-normal">{selectedVariant !== null ? product.colorVariants[selectedVariant]?.name : "Select a color"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colorVariants.map((v: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedVariant(i); setActiveImg(0) }}
                      title={v.name}
                      className="w-8 h-8 transition-all"
                      style={{
                        background: v.color || "#888",
                        outline: selectedVariant === i ? "2px solid hsl(var(--foreground))" : "1px solid hsl(var(--border))",
                        outlineOffset: selectedVariant === i ? "2px" : "1px",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-7">
              <p className="form-label mb-3">Quantity</p>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center border border-r-0 border-[hsl(var(--border))] hover:bg-muted transition-colors"
                >
                  <Minus size={14} />
                </button>
                <div className="w-16 h-12 flex items-center justify-center border border-[hsl(var(--border))] text-sm font-medium">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(q => Math.min(stock, q + 1))}
                  className="w-12 h-12 flex items-center justify-center border border-l-0 border-[hsl(var(--border))] hover:bg-muted transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary flex-1 justify-center"
              >
                {adding ? (
                  <><span className="loading-spinner" /> Adding...</>
                ) : (
                  <><ShoppingBag size={16} /> Add to Cart</>
                )}
              </button>
              <button
                onClick={handleWishlist}
                className="btn-icon flex-shrink-0"
                aria-label="Wishlist"
                style={{
                  color: inWish ? "hsl(var(--maroon))" : undefined,
                  borderColor: inWish ? "hsl(var(--maroon))" : undefined,
                }}
              >
                <Heart size={18} strokeWidth={1.5} fill={inWish ? "hsl(var(--maroon))" : "transparent"} />
              </button>
              <button className="btn-icon flex-shrink-0" aria-label="Share">
                <Share2 size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Pincode checker */}
            <div className="p-4 bg-[hsl(var(--muted))] mb-6" style={{ border: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={15} style={{ color: "hsl(var(--gold))" }} />
                <p className="text-sm font-medium">Check Delivery</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit pincode"
                  className="form-input flex-1 py-2.5 text-sm bg-white"
                />
                <button
                  onClick={checkPincode}
                  className="btn-ghost px-4 py-2.5 text-xs"
                >
                  Check
                </button>
              </div>
              {pincodeResult && (
                <p className="mt-2 text-xs font-light" style={{ color: "hsl(var(--gold))" }}>
                  <Check size={12} className="inline mr-1" />
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {TRUST.map(t => (
                <div key={t.label} className="flex items-center gap-3 p-3" style={{ border: "1px solid hsl(var(--border))" }}>
                  <span style={{ color: "hsl(var(--gold))" }}>{t.icon}</span>
                  <div>
                    <p className="text-xs font-medium">{t.label}</p>
                    <p className="text-[0.65rem] text-muted-foreground font-light">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Silk Mark Verified */}
            <div className="mb-6 p-4 bg-[hsl(var(--muted))]" style={{ border: "1px solid hsl(var(--border))" }}>
              <SilkMarkBadge variant="dark" showText />
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}
          </div>
        </div>

        {/* ══ PRODUCT TABS ══ */}
        <div className="mt-16 md:mt-24">
          <div className="flex gap-0" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            {["details", "care", "delivery", "reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-xs uppercase tracking-widest font-medium px-6 py-4 transition-all capitalize"
                style={{
                  borderBottom: activeTab === tab ? "2px solid hsl(var(--foreground))" : "2px solid transparent",
                  color: activeTab === tab ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-8 md:py-10 max-w-2xl"
            >
              {activeTab === "details" && (
                <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed">
                  <p>{product.description || "A timeless masterpiece crafted with the finest silk threads, this saree embodies the rich cultural heritage of South India."}</p>
                  {product.material && (
                    <div>
                      <p className="font-medium text-foreground mb-2">Fabric Details</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Material: {product.material}</li>
                        {product.weight && <li>Weight: {product.weight}</li>}
                        {product.length && <li>Length: {product.length}</li>}
                      </ul>
                    </div>
                  )}
                  <div className="pt-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                    <SilkMarkBadge variant="dark" showText />
                  </div>
                </div>
              )}
              {activeTab === "care" && (
                <div className="space-y-3 text-sm font-light text-muted-foreground">
                  {["Dry clean recommended", "Do not wring or twist", "Store folded in a breathable muslin cloth", "Keep away from direct sunlight", "Iron on low heat, inside out"].map(tip => (
                    <div key={tip} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: "hsl(var(--gold))", borderRadius: "50%" }} />
                      {tip}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "delivery" && (
                <div className="space-y-5 text-sm font-light">
                  {[
                    { label: "Standard Delivery", val: "3–5 business days · Free above ₹2,000" },
                    { label: "Express Delivery",  val: "1–2 business days · ₹99" },
                    { label: "COD",               val: "Available across 22,000+ pin codes" },
                    { label: "Returns",           val: "7-day easy returns on unworn items" },
                  ].map(r => (
                    <div key={r.label} className="flex gap-4">
                      <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--gold))" }} />
                      <div>
                        <p className="font-medium text-foreground">{r.label}</p>
                        <p className="text-muted-foreground">{r.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                    <div className="text-center">
                      <p className="text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>4.9</p>
                      <div className="flex gap-0.5 justify-center my-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />)}
                      </div>
                      <p className="text-xs text-muted-foreground">47 reviews</p>
                    </div>
                  </div>
                  {[
                    { name: "Priya S.", stars: 5, text: "Absolutely stunning saree. The quality exceeded all my expectations." },
                    { name: "Meena R.", stars: 5, text: "Perfect for my daughter's wedding. Delivered beautifully packaged." },
                  ].map(r => (
                    <div key={r.name} className="py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 flex items-center justify-center text-white text-xs font-medium" style={{ background: "hsl(var(--maroon))" }}>
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{r.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(r.stars)].map((_, i) => <Star key={i} size={10} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-light text-muted-foreground">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ RELATED PRODUCTS ══ */}
        <div className="mt-12 pb-4">
          <h2 className="heading-md mb-8">You May Also Like</h2>
          <RelatedProducts productId={product.id ?? id} />
        </div>
      </div>

      {/* ══ STICKY ATC (mobile/tablet) ══ */}
      <div className="sticky-atc" style={{ bottom: "70px" }}>
        <div className="flex-1">
          <p className="text-xs font-medium truncate">{product.name}</p>
          <p className="text-sm font-medium">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="btn-primary flex-shrink-0 px-8 py-3"
        >
          {adding ? <span className="loading-spinner" /> : <><ShoppingBag size={15} /> Add to Cart</>}
        </button>
      </div>
    </div>
  )
}
