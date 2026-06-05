"use client"

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/lib/supabase/config'
import { getProducts } from '@/lib/supabase/products'
import { Product } from '@/types/product'
import ProductCard from '@/components/product-card'

export default function FeaturedProducts() {
  const { toast } = useToast()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  const scrollBy = (dir: number) => {
    const c = scrollRef.current
    if (c) c.scrollBy({ left: dir * c.offsetWidth * 0.8, behavior: 'smooth' })
  }

  // Auto-scroll the carousel, looping back to the start at the end
  useEffect(() => {
    if (loading || featuredProducts.length === 0) return
    const id = setInterval(() => {
      const c = scrollRef.current
      if (!c || pausedRef.current) return
      const card = c.firstElementChild as HTMLElement | null
      const step = card ? card.offsetWidth + 28 : c.offsetWidth * 0.8
      const atEnd = c.scrollLeft + c.offsetWidth >= c.scrollWidth - 8
      if (atEnd) {
        c.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        c.scrollBy({ left: step, behavior: 'smooth' })
      }
    }, 3000)
    return () => clearInterval(id)
  }, [loading, featuredProducts])

  useEffect(() => {
    async function loadFeaturedProducts() {
      setLoading(true)
      try {
        const productsData = await getProducts()
        const { data: featuredData, error } = await supabase
          .from("featured_products")
          .select("*, product_id")
          .order("order", { ascending: true })
        if (error) throw error
        const featuredItems = (featuredData || [])
          .map((item: any) => {
            const product = productsData.find((p) => p.id === item.product_id)
            return product ? { ...product, featured_id: item.id } : null
          })
          .filter(Boolean) as Product[]
        setFeaturedProducts(featuredItems)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load featured products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex gap-6 md:gap-8 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[70%] sm:w-[45%] lg:w-[calc(25%-1.5rem)]">
            <div className="skeleton aspect-product mb-3" />
            <div className="skeleton h-4 w-3/4 mb-2" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (featuredProducts.length === 0) return null

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scrollBy(-1)}
        className="hidden md:flex absolute -left-5 top-1/3 z-20 w-11 h-11 items-center justify-center bg-white shadow-md rounded-full text-foreground hover:bg-[hsl(var(--gold))] hover:text-white transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="hidden md:flex absolute -right-5 top-1/3 z-20 w-11 h-11 items-center justify-center bg-white shadow-md rounded-full text-foreground hover:bg-[hsl(var(--gold))] hover:text-white transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={scrollRef}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onTouchStart={() => { pausedRef.current = true }}
        className="flex gap-5 md:gap-7 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[68%] sm:w-[44%] lg:w-[calc(25%-1.4rem)] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
