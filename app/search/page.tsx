"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/types/product"
import { ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/app/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ""
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    async function searchProducts() {
      if (!query) {
        setProducts([])
        setLoading(false)
        return
      }
      
      setLoading(true)
      try {
        const allProducts = await getProducts()
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
        
        // Search in product name, description, and category
        const filteredProducts = allProducts.filter(product => {
          const name = product.name?.toLowerCase() || ""
          const description = product.description?.toLowerCase() || ""
          const category = product.category?.toLowerCase() || ""
          
          return searchTerms.some(term => 
            name.includes(term) || 
            description.includes(term) || 
            category.includes(term)
          )
        })
        
        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error searching products:", error)
        toast({
          title: "Error",
          description: "Failed to search products",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    searchProducts()
  }, [query, toast])

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
      })
      toast({
        title: "Success",
        description: "Added to cart",
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive"
      })
    } finally {
      setAddingToCart(null)
    }
  }

  return (
    <main className="flex-1 py-12 md:py-20">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {query ? `Search results for "${query}"` : "Search Products"}
        </h1>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600 mb-4"></div>
            <p>Searching products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">
              {query 
                ? `We couldn't find any products matching "${query}".` 
                : "Please enter a search term to find products."}
            </p>
            <Link href="/collections">
              <Button>Browse Collections</Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-gray-500">Found {products.length} products</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.stock <= 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                          Sold Out
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium mb-1 hover:text-amber-800 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">₹{product.price?.toLocaleString()}</div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart === product.id || product.stock <= 0}
                        className="flex items-center justify-center p-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors disabled:opacity-50"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    </div>
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