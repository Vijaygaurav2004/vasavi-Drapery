"use client"

import React, { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from '@/app/context/cart-context'
import { useWishlist } from '@/app/context/wishlist-context'

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
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<typeof featuredProducts[0] | null>(null)
  
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

  const handleAddToWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images
      })
    }, 0)
  }

  const openQuickView = (e: React.MouseEvent, product: typeof featuredProducts[0]) => {
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
    <>
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
                  onClick={(e) => handleAddToWishlist(e, product)}
                >
                  <Heart 
                    size={18} 
                    className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-medium mb-2">{quickViewProduct.name}</h2>
                <div className="text-xl font-medium text-primary mb-4">
                  ₹{quickViewProduct.discountedPrice ? quickViewProduct.discountedPrice.toLocaleString() : quickViewProduct.price.toLocaleString()}
                  {quickViewProduct.discountedPrice && (
                    <span className="text-sm text-foreground/50 line-through ml-2">₹{quickViewProduct.price.toLocaleString()}</span>
                  )}
                </div>
                <div className="text-foreground/70 mb-6">{quickViewProduct.description}</div>
                
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
    </>
  )
}