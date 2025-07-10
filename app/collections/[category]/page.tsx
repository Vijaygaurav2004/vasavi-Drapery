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
import { useRouter } from "next/navigation"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const { addToCart } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    // Redirect "fabric" to men's collection and "Fabrics" to women's collection
    if (params.category.toLowerCase() === "fabric") {
      router.push("/collections/men")
      return
    } else if (params.category === "Fabrics" || params.category === "fabrics") {
      router.push("/collections/women")
      return
    }

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
  }, [category, params.category, router, toast])

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

  // Add the missing render method
  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{category} Collection</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found in this category.</p>
          <Link href="/collections" className="text-primary hover:underline mt-4 inline-block">
            Browse all collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-primary font-semibold mt-1">₹{product.price?.toLocaleString()}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingToCart === product.id}
                  className="mt-3 w-full bg-primary text-white py-2 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  {addingToCart === product.id ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}