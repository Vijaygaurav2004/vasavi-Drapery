"use client"

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { getRandomProducts } from '@/lib/supabase/products'
import { Product } from '@/types/product'
import ProductCard from '@/components/product-card'

interface RelatedProductsProps {
  productId: string;
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRandomProducts() {
      try {
        setLoading(true)
        const randomProducts = await getRandomProducts(4, productId)
        setProducts(randomProducts)
      } catch (error) {
        console.error("Error loading random products:", error)
        toast({
          title: "Error",
          description: "Failed to load related products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadRandomProducts()
  }, [productId, toast])

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-product mb-3" />
            <div className="skeleton h-4 w-3/4 mb-2" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
          viewport={{ once: true }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}
