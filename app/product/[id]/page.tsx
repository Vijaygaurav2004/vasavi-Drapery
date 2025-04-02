"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// This would normally come from a database or API
const getProductById = (id: string) => {
  // Mock product data
  return {
    id,
    name: "Royal Kanchipuram Silk Saree",
    description: "Handcrafted with pure mulberry silk and interwoven with real gold zari, this exquisite Kanchipuram silk saree embodies centuries of tradition. The rich burgundy base is complemented by intricate temple motifs and a contrasting gold border, making it perfect for weddings and special ceremonies.",
    price: 45850,
    discount: 5,
    originalPrice: 48250,
  images: [
      "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
      "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
      "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
      "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
    ],
    label: "Best Seller",
  category: "Kanjivaram",
    material: "Pure Mulberry Silk",
    careInstructions: "Dry clean only. Store in a muslin cloth in a cool, dry place.",
    dimensions: "6.3 meters (length) x 1.2 meters (width)",
    weight: "750 grams",
    colors: ["Burgundy", "Gold"],
    stock: 5,
    reviews: {
      average: 4.9,
      count: 36
    },
    related: [2, 3, 5]
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const discountedPrice = product.price
  const originalPrice = product.originalPrice || product.price

  // Calculate saving
  const saving = originalPrice - discountedPrice
  const savingPercentage = Math.round((saving / originalPrice) * 100)
  
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartItems, setCartItems] = useState<Array<{ id: string, quantity: number }>>([])

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0 && product.stock > 0) {
      setAddingToCart(true)
      
      // Simulate API request delay
      setTimeout(() => {
        // Check if item is already in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === params.id)
        
        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const updatedCart = [...cartItems]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity
          }
          setCartItems(updatedCart)
        } else {
          // Add new item to cart
          setCartItems([...cartItems, { id: params.id, quantity }])
        }
        
        // Show success toast
        toast({
          title: "Added to cart",
          description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your shopping cart.`,
        })
        
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event('cartUpdated'))
        
        setAddingToCart(false)
      }, 800)
    }
  }

  return (
    <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-foreground/70">
          <div className="flex items-center flex-wrap gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
            <span>/</span>
            <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Product Gallery */}
          <div className="relative">
            <div className="mb-4 overflow-hidden rounded-sm decorated-corners border border-amber-100/30 shadow-md">
              <div className="relative aspect-square gallery-effect">
            <Image
                  src={product.images[0]}
              alt={product.name}
              fill
                  priority
                  className="object-cover"
                />
                {product.label && (
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-white text-xs uppercase tracking-wider">
                    {product.label}
                  </div>
                )}
                {savingPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-amber-600/80 backdrop-blur-sm px-3 py-1 text-white text-xs uppercase tracking-wider">
                    Save {savingPercentage}%
                  </div>
                )}
              </div>
          </div>
            <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                  className="relative aspect-square overflow-hidden rounded-sm border border-amber-100/30 cursor-pointer hover:border-amber-300/50 transition-all duration-300"
              >
                <Image
                    src={image}
                  alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

          {/* Product Information */}
          <div className="space-y-8">
        <div>
              <h1 className="text-3xl md:text-4xl mb-4 elegant-heading">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill={i < Math.floor(product.reviews.average) ? "currentColor" : "none"} 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={i < Math.floor(product.reviews.average) ? "text-amber-500" : "text-foreground/20"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-foreground/60">
                  {product.reviews.average} ({product.reviews.count} reviews)
                </span>
                <span className="text-sm text-amber-600 border-l border-foreground/20 pl-4">
                  {product.stock > 0 ? 
                    `Only ${product.stock} left in stock` : 
                    "Out of stock"}
                </span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-medium text-foreground">₹{discountedPrice.toLocaleString()}</span>
                {originalPrice > discountedPrice && (
                  <span className="text-lg text-foreground/50 line-through">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>

              <p className="text-foreground/70 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/50 mb-1">Material</span>
                  <span>{product.material}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/50 mb-1">Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/50 mb-1">Weight</span>
                  <span>{product.weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-foreground/50 mb-1">Colors</span>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <span key={index}>{color}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-b border-foreground/10 py-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="quantity-selector flex border border-foreground/20 rounded-sm">
                <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= product.stock) {
                          setQuantity(value);
                        }
                      }}
                      className="w-12 text-center border-x border-foreground/20 bg-transparent"
                    />
                    <button 
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    className="luxury-button group flex-1 relative overflow-hidden"
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stock <= 0}
                  >
                    <span className={`flex items-center justify-center transition-all duration-300 ${addingToCart ? 'opacity-0' : 'opacity-100'}`}>
                      <span>Add to Cart</span>
                      <ShoppingCart className="w-4 h-4 ml-2" />
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${addingToCart ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="loading-spinner"></span>
                    </span>
                  </button>
                </div>
                
                <button className="secondary-button w-full hover:border-amber-600/30">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M18 8a6 6 0 0 0-9-5 6 6 0 0 0-4 10l7 7 7-7a5.99 5.99 0 0 0 .32-8.48"></path></svg>
                <span className="text-sm text-foreground/70">Crafted by artisans with over 30 years of experience</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="m7.5 4.27 9 5.15"></path><path d="M3.29 7 12 12l8.71-5"></path><path d="M12 22V12"></path><path d="m16 16 2 2 4-4"></path></svg>
                <span className="text-sm text-foreground/70">Free shipping on orders over ₹15,000</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M22 12H2"></path><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><path d="M6 16h.01"></path><path d="M10 16h.01"></path></svg>
                <span className="text-sm text-foreground/70">Secure packaging to preserve the delicate silk</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="m12 2-5.5 9.5L15 21l3.5-5L12 2z"></path><path d="m21 15-5.5-12-3.5 6 9 6z"></path></svg>
                <span className="text-sm text-foreground/70">Certificate of authenticity included</span>
          </div>
            </div>
          </div>
          </div>

        {/* Product Details */}
        <div className="mb-24">
          <div className="border-b border-foreground/10">
            <div className="flex flex-wrap -mb-px">
              <button className="inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 border-amber-600 font-medium">
                Details
              </button>
              <button className="inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-foreground/20 text-foreground/70 hover:text-foreground transition-colors duration-300">
                Care Instructions
              </button>
              <button className="inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-foreground/20 text-foreground/70 hover:text-foreground transition-colors duration-300">
                Shipping & Returns
              </button>
              <button className="inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-foreground/20 text-foreground/70 hover:text-foreground transition-colors duration-300">
                Reviews
              </button>
            </div>
          </div>
          
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading">Product Information</h3>
                <div className="w-16 h-px bg-gradient-to-r from-amber-300/50 to-transparent mb-6"></div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Kanchipuram silk sarees are renowned for their lustrous texture, vibrant colors, and intricate zari work, making them a prized possession in every wardrobe. This particular piece features:
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/70"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-foreground/70">Pure mulberry silk sourced from the finest sericulture farms</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/70"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-foreground/70">Handwoven with 24-karat gold zari thread in traditional motifs</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/70"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-foreground/70">Traditional temple border with peacock and floral motifs</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/70"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-foreground/70">Rich burgundy base with contrasting gold and maroon pallu</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/70"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-foreground/70">Takes approximately 5-7 days to weave by master craftsmen</p>
                  </li>
              </ul>
              </div>
              
              <div>
                <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading">The Craftsmanship</h3>
                <div className="w-16 h-px bg-gradient-to-r from-amber-300/50 to-transparent mb-6"></div>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Each Kanchipuram silk saree represents not just a garment but a legacy of artisanal excellence that has been preserved for centuries. Our artisans bring decades of experience to every piece they create:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-800/70">1</span>
                    </div>
                    <p className="text-foreground/70">The thread is carefully dyed using natural, eco-friendly dyes to achieve vibrant, long-lasting colors.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-800/70">2</span>
                    </div>
                    <p className="text-foreground/70">The zari work involves interweaving silk with gold or silver threads to create intricate patterns that catch the light beautifully.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-800/70">3</span>
                    </div>
                    <p className="text-foreground/70">Traditional motifs are meticulously woven by hand, with each design element holding cultural and symbolic significance.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-amber-800/70">4</span>
                    </div>
                    <p className="text-foreground/70">The finished saree undergoes multiple quality checks to ensure perfection in every thread and pattern.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-6 uppercase tracking-wider font-light elegant-heading">You May Also Like</h2>
            <div className="elegant-divider w-32 mx-auto"></div>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover">
                <Link href={`/product/${i}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                      alt="Related Product"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <Link 
                        href={`/product/${i}`}
                        className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium elegant-heading">Banarasi Silk Saree</h3>
                      <div className="text-amber-700 font-medium">₹38,750</div>
                    </div>
                    <p className="text-foreground/70 text-sm mb-4">Exquisite pure silk with intricate traditional motifs in fine silver zari</p>
                    <button className="luxury-button-sm group bg-gradient-to-r from-amber-50 to-transparent border border-amber-200/30 hover:border-amber-300/50">
                      <span>Add to Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certificate of Authenticity */}
        <div className="text-center py-12 px-8 bg-gradient-to-r from-[#f9f7f4] to-[#f5f1ea] animate-fade-slide-up decorated-corners">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-100/30 to-amber-100/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800/50">
                <path d="M12.5 21a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"></path>
                <path d="M5.5 7A2.5 2.5 0 1 0 8 4.5"></path>
                <path d="M19.5 7A2.5 2.5 0 1 1 17 4.5"></path>
                <path d="M9 13s.8 1 3.5 1 3.5-1 3.5-1"></path>
                <path d="M9 8h0"></path>
                <path d="M16 8h0"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl mb-6 uppercase tracking-wider font-light elegant-heading">Certificate of Authenticity</h2>
            <div className="silk-divider mx-auto"></div>
            <p className="text-foreground/70 my-8 leading-relaxed">
              Each of our silk products comes with a certificate of authenticity that verifies its origin, craftsmanship, and quality.
              This certificate includes details about the artisans who created the piece, the techniques used, and the heritage of the 
              specific style, ensuring that you own not just a product, but a piece of cultural significance.
            </p>
            <Link href="/authenticity" className="luxury-button group">
              <span>Learn More</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
    </div>
    </main>
  )
}

