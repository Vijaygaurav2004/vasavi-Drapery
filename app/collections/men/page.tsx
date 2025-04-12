"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
import { getProducts, Product } from "@/lib/firebase/products"

// Categories for men's page
const categories = [
  { id: "all", name: "All Products" },
  { id: "dhothi", name: "Dhothi" },
  { id: "fabric", name: "Fabric" },
]

export default function MensCollectionPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { addToCart } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const allProducts = await getProducts()
        // Filter men's products
        const mensProducts = allProducts.filter(product => 
          product.category === "Dhothi" ||
          product.category === "Fabric" ||
          product.category === "men"
        )
        setProducts(mensProducts)
        setFilteredProducts(mensProducts)
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
  }, [toast])

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => {
        const productCategory = product.category || '';
        return productCategory.toLowerCase() === activeCategory.toLowerCase();
      });
      setFilteredProducts(filtered)
    }
  }, [activeCategory, products])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    // Scroll to products section with smooth behavior
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id)
    
    try {
      // Add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg",
      })

      // Show success message
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        duration: 2000
      })
      
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
        duration: 2000
      })
    } finally {
      setAddingToCart(null)
    }
  }

  const openQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(product)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }

  // Handle clicking outside the modal to close it
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeQuickView()
    }
  }

  return (
    <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center elegant-heading silk-text-gradient">
          Men's Collection
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full border transition-colors ${
                activeCategory === category.id 
                  ? 'border-primary bg-primary/10 text-primary font-medium' 
                  : 'border-amber-200/30 hover:border-amber-300/50 hover:bg-amber-50/50'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-muted-foreground">No products found in this category.</div>
        ) : (
          <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 stagger-animation">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Replaced product.label with stock status indicator */}
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
                        onClick={(e) => openQuickView(e, product)}
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 flex justify-end p-4 bg-white border-b">
              <button 
                onClick={closeQuickView}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close quick view"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={quickViewProduct.images && quickViewProduct.images.length > 0 ? quickViewProduct.images[0] : "/placeholder-image.jpg"}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-medium mb-2">{quickViewProduct.name}</h2>
                <div className="text-xl font-medium text-primary mb-4">₹{quickViewProduct.price.toLocaleString()}</div>
                <div className="text-foreground/70 mb-6">{quickViewProduct.description}</div>
                
                {quickViewProduct.material && (
                  <div className="mb-4">
                    <span className="font-medium">Material:</span> {quickViewProduct.material}
                  </div>
                )}
                
                {quickViewProduct.color && (
                  <div className="mb-4">
                    <span className="font-medium">Color:</span> {quickViewProduct.color}
                  </div>
                )}
                
                <div className="mb-6">
                  <span className="font-medium">Availability:</span> {quickViewProduct.stock > 0 ? `In Stock (${quickViewProduct.stock} available)` : 'Out of Stock'}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      if (quickViewProduct.stock > 0) {
                        setTimeout(() => closeQuickView(), 1000)
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                    disabled={addingToCart === quickViewProduct.id || quickViewProduct.stock <= 0}
                  >
                    <ShoppingCart size={18} /> 
                    {addingToCart === quickViewProduct.id ? 'Adding...' : quickViewProduct.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <Link
                    href={`/product/${quickViewProduct.id}`}
                    className="flex-1 py-3 border border-primary text-primary font-medium rounded-md text-center hover:bg-primary/10 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}