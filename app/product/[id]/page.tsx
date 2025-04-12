"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight, Truck, ShieldCheck, Award } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ProductTabs from "@/components/product-tabs"
import RelatedProducts from "@/components/related-products"
import { motion } from "framer-motion"

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
    related: [2, 3, 5],
    productDetails: [
      "100% pure mulberry silk",
      "Traditional handloom weaving technique",
      "Real gold zari work (24 karat)",
      "Contrast pallu with temple border design",
      "Blouse piece included (0.8 meters)"
    ],
    artisanStory: "This saree was crafted by skilled artisans from the Kanchipuram region with over 25 years of experience in traditional silk weaving. Each piece takes approximately 15-20 days to complete, involving meticulous attention to detail."
  }
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { toast } = useToast();
  const product = getProductById(id);
  const discountedPrice = product.price;
  const originalPrice = product.originalPrice || product.price;
  
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Calculate saving
  const saving = originalPrice - discountedPrice;
  const savingPercentage = Math.round((saving / originalPrice) * 100);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0 && product.stock > 0) {
      setAddingToCart(true);
      
      // Simulate API request delay
      setTimeout(() => {
        // In a real app, this would add to a cart context/state
        
        // Show success toast
        toast({
          title: "Added to cart",
          description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your shopping cart.`,
        });
        
        setAddingToCart(false);
      }, 800);
    }
  }
  
  const handleAddToWishlist = () => {
    setAddingToWishlist(true);
    
    // Simulate API request delay
    setTimeout(() => {
      toast({
        title: "Added to wishlist",
        description: "This item has been added to your wishlist.",
      });
      
      setAddingToWishlist(false);
    }, 500);
  }
  
  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setZoomPosition({ x, y });
  }
  
  const handleImageMouseEnter = () => {
    setIsZoomed(true);
  }
  
  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  }
  
  // Prevent scroll when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isZoomed]);

  return (
    <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-foreground/70">
          <div className="flex items-center flex-wrap gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Gallery */}
          <div className="sticky top-28">
            <div 
              className="mb-4 overflow-hidden rounded-sm decorated-corners border border-primary/10 shadow-lg"
              ref={imageRef}
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            >
              <div className="relative aspect-square gallery-effect cursor-zoom-in">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  className={`object-cover transition-all duration-300 ${isZoomed ? 'scale-125' : ''}`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                        }
                      : undefined
                  }
                />
                {product.label && (
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 text-white text-xs uppercase tracking-wider">
                    {product.label}
                  </div>
                )}
                {savingPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-sm px-3 py-1 text-white text-xs uppercase tracking-wider">
                    Save {savingPercentage}%
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-sm border transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-primary shadow-md' 
                      : 'border-primary/10 hover:border-primary/30'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
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
                      className={i < Math.floor(product.reviews.average) ? "text-primary" : "text-foreground/20"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-foreground/60">
                  {product.reviews.average} ({product.reviews.count} reviews)
                </span>
                <span className="text-sm text-primary border-l border-foreground/20 pl-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
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
            
            <div className="border-t border-b border-primary/10 py-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="quantity-selector flex border border-primary/20 rounded-sm">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors disabled:opacity-50"
                      aria-label="Decrease quantity"
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
                      className="w-12 text-center border-x border-primary/20 bg-transparent"
                      aria-label="Quantity"
                    />
                    <button 
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    className="luxury-button flex-1 relative overflow-hidden"
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stock <= 0}
                    aria-label="Add to cart"
                  >
                    <span className={`flex items-center justify-center transition-all duration-300 ${addingToCart ? 'opacity-0' : 'opacity-100'}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      <span>Add to Cart</span>
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${addingToCart ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="loading-spinner"></span>
                    </span>
                  </button>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    className="secondary-button flex-1 hover:border-primary/30 inline-flex items-center justify-center"
                    onClick={handleAddToWishlist}
                    disabled={addingToWishlist}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    <span>Add to Wishlist</span>
                  </button>
                  
                  <button 
                    className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <Award className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm text-foreground/70">Handcrafted by artisans with over 30 years of experience</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm text-foreground/70">Authentic certification and quality guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm text-foreground/70">Free shipping on orders over ₹15,000</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Tabs */}
        <ProductTabs product={product} />
        
        {/* Related Products */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4 uppercase tracking-wider font-light elegant-heading">You May Also Like</h2>
            <div className="elegant-divider w-32 mx-auto"></div>
          </div>
          
          <RelatedProducts productId={id} />
        </div>
        
        {/* Certificate of Authenticity */}
        <div className="text-center py-12 px-8 bg-gradient-subtle animate-fade-slide-up decorated-corners mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="certificate-stamp mx-auto mb-8"></div>
            <h2 className="text-2xl md:text-3xl mb-6 uppercase tracking-wider font-light elegant-heading">Certificate of Authenticity</h2>
            <div className="silk-divider mx-auto"></div>
            <p className="text-foreground/70 my-8 leading-relaxed">
              Each of our silk products comes with a certificate of authenticity that verifies its origin, craftsmanship, and quality.
              This certificate includes details about the artisans who created the piece, the techniques used, and the heritage of the 
              specific style, ensuring that you own not just a product, but a piece of cultural significance.
            </p>
            <Link href="/authenticity" className="luxury-button inline-flex items-center group">
              <span>Learn More</span>
              <ChevronRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}