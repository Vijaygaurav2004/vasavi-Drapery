"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

import React from "react"

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = React.use(params)
  const { toast } = useToast()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)
  const { addToCart } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    if (resolvedParams.category.toLowerCase() === "fabric") {
      router.push("/collections/men")
      return
    } else if (resolvedParams.category === "Fabrics" || resolvedParams.category === "fabrics") {
      router.push("/collections/women")
      return
    }

    async function loadProducts() {
      try {
        setLoading(true)
        const productData = await getProducts(category.toLowerCase())
        setProducts(productData)
      } catch (error) {
        toast({ title: "Error", description: "Failed to load products.", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [category, resolvedParams.category, router, toast])

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id ?? null)
    setTimeout(() => {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] })
      toast({ title: "Added to cart", description: "Item added to your shopping cart." })
      window.dispatchEvent(new Event('cartUpdated'))
      setAddingToCart(null)
    }, 600)
  }

  return (
    <main className="flex-1 bg-background">
      {/* Header */}
      <div className="py-16 bg-gradient-subtle text-center relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-40 pointer-events-none" />
        <div className="container relative z-10">
          <p className="section-eyebrow mb-3">Collection</p>
          <h1 className="section-title">{category}</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="container py-10">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-light mb-8"
          style={{ letterSpacing: '0.15em' }}
        >
          <ArrowLeft size={13} />
          All Collections
        </Link>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton aspect-[3/4]" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-xl elegant-heading font-light mb-3">No products found</h3>
            <p className="text-muted-foreground text-sm font-light mb-6">
              This collection is empty. Check back soon.
            </p>
            <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
              Browse All Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
            {products.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="product-card-image-container">
                  <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name || "Product"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="product-card-image"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white/92 backdrop-blur-sm text-xs uppercase tracking-widest font-medium hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-60"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      {addingToCart === product.id ? (
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="product-card-content">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="product-card-title">{product.name}</h3>
                  </Link>
                  <div className="product-card-divider" />
                  <p className="product-card-price">₹{product.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
