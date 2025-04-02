"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"

// Sample product data
const products = [
  {
    id: 1,
    name: "Royal Kanchipuram Silk Dhothi",
    description: "Handcrafted pure mulberry silk with gold zari border for ceremonial occasions",
    price: 18950,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "Best Seller",
    category: "Ceremonial"
  },
  {
    id: 2,
    name: "Heritage Silk Dhothi",
    description: "Premium silk with silver zari work, perfect for festivals and celebrations",
    price: 15850,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "Limited Edition",
    category: "Festival"
  },
  {
    id: 3,
    name: "Classic Mysore Silk Dhothi",
    description: "Lightweight pure silk with subtle gold border for everyday elegance",
    price: 12499,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "New Arrival",
    category: "Classic"
  },
  {
    id: 4,
    name: "Tussar Silk Dhothi",
    description: "Natural tussar silk with traditional motifs for a distinctive look",
    price: 14850,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "Popular",
    category: "Traditional"
  },
  {
    id: 5,
    name: "Wedding Silk Dhothi Set",
    description: "Complete set with matching angavastram, perfect for wedding ceremonies",
    price: 24750,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "Premium",
    category: "Wedding"
  },
  {
    id: 6,
    name: "Cotton Silk Blend Dhothi",
    description: "Comfortable cotton-silk blend with subtle zari border, ideal for daily wear",
    price: 9950,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    label: "Comfortable",
    category: "Daily Wear"
  }
]

// Categories for filtering
const categories = [
  { id: "all", name: "All Dhothis" },
  { id: "ceremonial", name: "Ceremonial" },
  { id: "festival", name: "Festival" },
  { id: "classic", name: "Classic" },
  { id: "traditional", name: "Traditional" },
  { id: "wedding", name: "Wedding" },
  { id: "dailywear", name: "Daily Wear" }
]

export default function MensCollectionPage() {
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const { addToCart } = useCart()

  const handleAddToCart = async (productId: number) => {
    setAddingToCart(productId)
    
    try {
      // Find the product
      const product = products.find(p => p.id === productId)
      if (!product) throw new Error('Product not found')
      
      // Add to cart
      addToCart(product)

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

  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-20 animate-fade-slide-up">
          <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">Men's Collection</h1>
          <div className="elegant-divider w-64 mx-auto mb-8"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover our distinguished collection of handcrafted silk dhothis, where tradition meets contemporary elegance for the modern gentleman.
          </p>
        </div>
        
        {/* Category Navigation */}
        <div className="mb-16 overflow-x-auto scrollbar-hidden">
          <div className="flex gap-2 md:gap-4 justify-center min-w-max p-1">
            <Link 
              href="/collections/men" 
              className="px-6 py-2 border border-amber-200/50 rounded-sm hover:border-amber-200/50 transition-all duration-300 text-sm uppercase tracking-wider"
            >
              All Dhothis
            </Link>
            {categories.slice(1).map((category) => (
              <Link 
                key={category.id} 
                href={`/collections/${category.id}`}
                className="px-6 py-2 border border-amber-100/30 rounded-sm hover:border-amber-200/50 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Products */}
        <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 stagger-animation">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-black text-xs uppercase tracking-wider font-medium">
                    {product.label}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <Link 
                      href={`/product/${product.id}`}
                      className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Quick View
                    </Link>
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
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart === product.id}
                  className="w-full bg-black hover:bg-amber-900 text-white py-3 font-medium uppercase tracking-wider text-sm relative overflow-hidden group border border-transparent transition-all duration-300 flex items-center justify-center"
                >
                  <span className={`flex items-center justify-center transition-all duration-300 ${addingToCart === product.id ? 'opacity-0' : 'opacity-100'}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    ADD TO CART
                  </span>
                  <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${addingToCart === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="loading-spinner"></span>
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-amber-700/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 