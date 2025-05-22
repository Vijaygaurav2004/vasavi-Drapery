// app/collections/[category]/page.tsx (in your main website)
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/types/product"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const { addToCart } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const productData = await getProducts(category.toLowerCase())
        setProducts(productData)
      } catch (error) {
        console.error("Error loading products:", error)
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category])

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id ?? null)
    
    // Simulate API request delay
    setTimeout(() => {
      // Add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      })
      
      // Show success toast
      toast({
        title: "Added to cart",
        description: "Item has been added to your shopping cart.",
      })
      
      // Dispatch custom event to update cart count
      window.dispatchEvent(new Event('cartUpdated'))
      
      setAddingToCart(null)
    }, 600)
  }
}