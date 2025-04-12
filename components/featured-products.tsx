"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

// Sample featured products - in a real app, this would come from an API
const featuredProducts = [
  {
    id: "1",
    name: "Kanchipuram Silk in Royal Blue",
    description: "Traditional temple border with intricate gold zari work",
    price: 42750,
    discountedPrice: 38500,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    label: "Best Seller",
    stock: 5
  },
  {
    id: "2",
    name: "Banarasi Silk in Crimson Red",
    description: "Opulent brocade with silver and gold threadwork",
    price: 38900,
    discountedPrice: null,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    label: "Limited Edition",
    stock: 3
  },
  {
    id: "3",
    name: "Tussar Silk with Gold Embroidery",
    description: "Lightweight silk with handcrafted embroidery",
    price: 29500,
    discountedPrice: null,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    label: "New Arrival",
    stock: 8
  }
]

export default function FeaturedProducts() {
  const { toast } = useToast()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  
  const handleAddToCart = (product: any) => {
    setAddingToCart(product.id)
    
    // Simulate API request delay
    setTimeout(() => {
      // In a real app, this would add to the cart context/state
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your shopping cart.`,
      })
      
      setAddingToCart(null)
    }, 800)
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {featuredProducts.map((product) => (
        <motion.div 
          key={product.id} 
          className="product-card luxury-card border border-primary/10 decorated-corners overflow-hidden group hover-lift"
          variants={item}
        >
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {product.label && (
                <div className="absolute top-4 left-4 bg-primary/90 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                  {product.label}
                </div>
              )}
              {product.discountedPrice && (
                <div className="absolute top-4 right-4 bg-accent/80 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                  Save {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <Link 
                  href={`/product/${product.id}`}
                  className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                >
                  Quick View
                </Link>
              </div>
            </div>
          </Link>
          <div className="p-6">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-xl font-medium mb-2 hover:text-primary transition-colors elegant-heading">{product.name}</h3>
            </Link>
            <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-lg font-medium">
                ₹{product.discountedPrice ? product.discountedPrice.toLocaleString() : product.price.toLocaleString()}
              </span>
              {product.discountedPrice && (
                <span className="text-sm text-foreground/50 line-through">₹{product.price.toLocaleString()}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 luxury-button inline-flex items-center justify-center gap-2 px-4 py-2"
                disabled={addingToCart === product.id || product.stock <= 0}
              >
                {addingToCart === product.id ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <ShoppingCart size={16} /> 
                    <span>{product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
              <button 
                className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}