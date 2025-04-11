"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
// Fix #1: Update import to match your Firebase product service
import { getProducts, Product } from "@/lib/firebase/products"

// Categories for filtering (Women's categories only for this page)
const categories = [
  { id: "all", name: "All Products" },
  { id: "silk", name: "Silk" },
  { id: "tissue", name: "Tissue" },
  { id: "ethnic", name: "Ethnic" },
  { id: "fancy", name: "Fancy" },
  { id: "fabric", name: "Fabric" },
]

export default function WomensCollectionPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    // Fix #2 & #3: Replace subscription with standard fetch
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Get all products and filter client-side
        const allProducts = await getProducts()
        
       // Filter women's products
        const womensProducts = allProducts.filter(product => 
          product.category === "Silk" ||
          product.category === "Tissue" ||
          product.category === "Ethnic" ||
          product.category === "Fancy" ||
          product.category === "Fabric" ||
          product.category === "women"
        )
        
        setProducts(womensProducts)
      } catch (error) {
        console.error("Error loading products:", error)
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [toast])

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        // Fix #4: Use first image from images array
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
    <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center elegant-heading silk-text-gradient">
          Women's Collection
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-6 py-2 rounded-full border border-amber-200/30 hover:border-amber-300/50 hover:bg-amber-50/50 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted-foreground">No products found.</div>
        ) : (
          <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 stagger-animation">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Fix #5: Use first image from images array */}
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Fix #6: Use a property that exists in your product structure */}
                    {product.stock <= 3 && product.stock > 0 && (
                      <div className="absolute top-4 right-4 bg-amber-500 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                        Low Stock
                      </div>
                    )}
                    {product.stock <= 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                        Sold Out
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button 
                        className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Quick View clicked for:', product.id);
                        }}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-medium mb-2 hover:text-amber-800 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-foreground/70 text-sm mb-4">{product.description}</p>
                  <div className="text-lg font-medium mb-6">₹{product.price.toLocaleString()}</div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                    disabled={addingToCart === product.id || product.stock <= 0}
                  >
                    <ShoppingCart size={16} /> 
                    {addingToCart === product.id ? 'Adding...' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}