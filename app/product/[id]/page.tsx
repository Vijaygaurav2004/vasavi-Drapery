"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight, Truck, ShieldCheck, Award } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ProductTabs from "@/components/product-tabs"
import RelatedProducts from "@/components/related-products"
import { motion } from "framer-motion"
import { getProduct } from "@/lib/supabase/products"
import { useCart } from '@/app/context/cart-context'
import { useWishlist } from '@/app/context/wishlist-context'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorVariant } from "@/types/product"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { toast } = useToast();
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  
  // State declarations - keep all useState hooks together at the top
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [selectedColorVariant, setSelectedColorVariant] = useState<number | null>(null);
  
  // Refs after state declarations
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Move the useMemo hook up here with the other hooks to maintain consistent hook order
  // Get the current images to display based on whether we're using color variants
  const displayImages = useMemo(() => {
    if (!product) return [];
    
    if (product.hasColorVariants && product.colorVariants && product.colorVariants.length > 0 && selectedColorVariant !== null) {
      const variantImages = product.colorVariants[selectedColorVariant]?.images;
      
      // Make sure variant images is an array and not empty
      if (Array.isArray(variantImages) && variantImages.length > 0) {
        console.log("Using variant images:", variantImages);
        return variantImages;
      }
    }
    
    // Fallback to product images or empty array
    console.log("Using default product images:", product.images);
    return Array.isArray(product.images) ? product.images : [];
  }, [product, selectedColorVariant]);
  
  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await getProduct(id);
        
        // Handle colorVariants if they exist but are in string format
        if (productData.colorVariants && typeof productData.colorVariants === 'string') {
          try {
            productData.colorVariants = JSON.parse(productData.colorVariants);
            console.log("Parsed colorVariants from string:", productData.colorVariants);
          } catch (e) {
            console.error("Error parsing colorVariants:", e);
            productData.colorVariants = [];
          }
        }
        
        console.log("Product data:", productData);
        console.log("Has color variants:", productData.hasColorVariants);
        console.log("Color variants:", productData.colorVariants);
        
        setProduct(productData);
        
        // Initialize selected color variant if product has color variants
        if (productData.hasColorVariants && productData.colorVariants && productData.colorVariants.length > 0) {
          console.log("Setting initial color variant");
          setSelectedColorVariant(0);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [id, toast]);
  
  // Handle zoom scrolling behavior
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
  
  // Early return for loading state
  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Get the current stock based on whether we're using color variants
  const currentStock = product.hasColorVariants && product.colorVariants && selectedColorVariant !== null
    ? product.colorVariants[selectedColorVariant].stock
    : product.stock;
  
  // Calculate prices and discounts
  const discountedPrice = product.discountedPrice || product.price;
  const originalPrice = product.originalPrice || product.price;
  const saving = originalPrice - discountedPrice;
  const savingPercentage = Math.round((saving / originalPrice) * 100);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const increaseQuantity = () => {
    if (quantity < currentStock) {
      setQuantity(quantity + 1);
    }
  }
  
  const handleColorVariantChange = (index: number) => {
    setSelectedColorVariant(index);
    setSelectedImage(0); // Reset selected image when changing color variant
  }

  const handleAddToCart = () => {
    if (quantity > 0 && currentStock > 0) {
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
    
    try {
      // Use setTimeout to avoid state updates during render
      setTimeout(() => {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images
        });
      }, 0);
      
      // The toast is now handled in the wishlist context
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add to wishlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setAddingToWishlist(false);
      }, 300);
    }
  }
  
  const handleShareProduct = () => {
    try {
      // Check if running on client-side
      if (typeof window !== 'undefined') {
        // Check if navigator.share is available (mobile devices)
        if (navigator.share) {
          navigator.share({
            title: product.name,
            text: `Check out this beautiful ${product.name} on Drapery`,
            url: window.location.href,
          })
          .then(() => {
            toast({
              title: "Shared successfully",
              description: "Thank you for sharing!",
            });
          })
          .catch((error) => {
            console.error('Error sharing:', error);
            // Don't show error toast if user canceled the share operation
            if (error.name === 'AbortError') {
              console.log('User canceled the share operation');
              return; // Exit early without showing error toast
            }
            
            // For other errors, fall back to clipboard
            copyToClipboard();
          });
        } else {
          // Fallback for browsers that don't support navigator.share
          copyToClipboard();
        }
      } else {
        // Fallback for SSR context
        toast({
          title: "Share unavailable",
          description: "Sharing is not available in this context.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error in share functionality:', error);
      toast({
        title: "Error",
        description: "Failed to share product. Please try again.",
        variant: "destructive"
      });
    }
  }
  
  const copyToClipboard = () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            toast({
              title: "Link copied",
              description: "Product link copied to clipboard!",
            });
          })
          .catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard();
          });
      } else {
        fallbackCopyToClipboard();
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Error",
        description: "Could not copy link. Please try again.",
        variant: "destructive"
      });
    }
  }
  
  const fallbackCopyToClipboard = () => {
    try {
      // Create temporary input element
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard!",
        });
      } else {
        toast({
          title: "Copy failed",
          description: "Please manually copy the URL from the address bar.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Fallback copy failed:', error);
      toast({
        title: "Copy failed",
        description: "Please manually copy the URL from the address bar.",
        variant: "destructive"
      });
    }
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
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
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
                  src={displayImages && displayImages.length > 0 && displayImages[selectedImage] 
                    ? displayImages[selectedImage] 
                    : "/placeholder-image.jpg"}
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
              {displayImages && displayImages.length > 0 ? displayImages.map((image: string, index: number) => (
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
                    src={image || "/placeholder-image.jpg"}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              )) : (
                <div className="col-span-4 text-center py-4 text-foreground/60">
                  No product images available
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl mb-4 elegant-heading">{product.name}</h1>
              
              <p className="text-foreground/70 leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl font-medium text-primary">₹{discountedPrice.toLocaleString()}</span>
                {savingPercentage > 0 && (
                  <span className="text-lg text-foreground/50 line-through">₹{originalPrice.toLocaleString()}</span>
                )}
              </div>
              
              {/* Color Variants */}
              {product.hasColorVariants && product.colorVariants && product.colorVariants.length > 0 && (
                <div className="mb-8">
                  <span className="font-medium mb-3 block text-sm uppercase tracking-wide">
                    Colors
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.colorVariants.map((variant: ColorVariant, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleColorVariantChange(index)}
                        className={`w-12 h-12 rounded-full transition-all ${
                          selectedColorVariant === index 
                            ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                            : 'ring-1 ring-foreground/10 hover:ring-foreground/30'
                        }`}
                        style={{ backgroundColor: variant.color }}
                        title={variant.color}
                        aria-label={`Select ${variant.color} color`}
                      >
                        {selectedColorVariant === index && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-2 h-2 bg-white rounded-full shadow-sm"></span>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Show current selected variant info */}
                  {selectedColorVariant !== null && (
                    <div className="mt-2 text-sm text-foreground/70">
                      Selected: {product.colorVariants[selectedColorVariant]?.color || 'Unknown'}
                    </div>
                  )}
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex gap-6 flex-wrap">
                  <div>
                    <span className="font-medium mb-2 block text-sm uppercase tracking-wide">Material</span>
                    <span className="text-foreground/70">{product.material || "Pure Silk"}</span>
                  </div>
                  
                  {product.dimensions && (
                    <div>
                      <span className="font-medium mb-2 block text-sm uppercase tracking-wide">Dimensions</span>
                      <span className="text-foreground/70">{product.dimensions}</span>
                    </div>
                  )}
                  
                  {product.weight && (
                    <div>
                      <span className="font-medium mb-2 block text-sm uppercase tracking-wide">Weight</span>
                      <span className="text-foreground/70">{product.weight}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="w-full md:w-1/3">
                  <span className="font-medium mb-3 block text-sm uppercase tracking-wide">Quantity</span>
                  <div className="flex border border-primary/20 rounded-sm">
                    <button 
                      onClick={decreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border-r border-primary/20 text-foreground/50 hover:text-foreground transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0 && val <= currentStock) {
                          setQuantity(val);
                        }
                      }}
                      className="w-full h-10 text-center bg-transparent border-0 focus:outline-none focus:ring-0"
                    />
                    <button 
                      onClick={increaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border-l border-primary/20 text-foreground/50 hover:text-foreground transition-colors disabled:opacity-50"
                      disabled={quantity >= currentStock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <span className="font-medium mb-3 block text-sm uppercase tracking-wide">Availability</span>
                  {currentStock > 0 ? (
                    <div className="text-emerald-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block"></span>
                      <span>In Stock</span>
                    </div>
                  ) : (
                    <div className="text-red-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full inline-block"></span>
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 luxury-button px-6 py-3 flex items-center justify-center gap-2"
                  disabled={addingToCart || currentStock <= 0}
                >
                  {addingToCart ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>{currentStock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>
                
                <Button 
                  className="flex-1 rounded-none px-4 py-6 border border-foreground shadow-none bg-white text-foreground hover:bg-foreground/5"
                  onClick={handleAddToWishlist}
                  disabled={addingToWishlist}
                >
                  {addingToWishlist ? (
                    <span className="flex items-center gap-2"><span className="loading loading-spinner loading-xs"></span>Adding...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} />
                      <span>Add to Wishlist</span>
                    </span>
                  )}
                </Button>
                
                <button
                  onClick={handleShareProduct}
                  className="flex-1 sm:flex-none w-12 h-12 border border-primary/20 rounded-sm flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label="Share product"
                >
                  <Share2 size={18} />
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 border-t border-primary/10 pt-8">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block mb-1">Free Shipping</span>
                    <span className="text-sm text-foreground/70">For orders over ₹15,000</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block mb-1">Secure Payment</span>
                    <span className="text-sm text-foreground/70">Encrypted data protection</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block mb-1">Authenticity Certificate</span>
                    <span className="text-sm text-foreground/70">With every purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Product Tabs */}
        <div className="mb-24">
          <ProductTabs product={product} />
        </div>
        
        {/* Debug information - remove in production */}
        {product.hasColorVariants && (
          <div className="mb-12 p-4 border border-red-300 bg-red-50 rounded-md">
            <h3 className="font-medium mb-2">Debug Information (Remove in Production)</h3>
            <div>Has color variants: {product.hasColorVariants ? 'Yes' : 'No'}</div>
            <div>Selected variant index: {selectedColorVariant !== null ? selectedColorVariant : 'None'}</div>
            <div>Variants count: {product.colorVariants ? product.colorVariants.length : 0}</div>
            <div>Selected image index: {selectedImage}</div>
            <div className="mt-2">
              <strong>Variants data:</strong>
              <pre className="mt-1 p-2 bg-white/50 overflow-auto text-xs">
                {JSON.stringify(product.colorVariants, null, 2)}
              </pre>
            </div>
            <div className="mt-2">
              <strong>DisplayImages array:</strong>
              <div>Length: {displayImages ? displayImages.length : 0}</div>
              <pre className="mt-1 p-2 bg-white/50 overflow-auto text-xs">
                {JSON.stringify(displayImages, null, 2)}
              </pre>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <strong className="col-span-4 mb-1">Actual images:</strong>
              {displayImages && displayImages.map((src: string, i: number) => (
                <div key={i} className="border p-1 text-xs">
                  <div className="relative aspect-square mb-1">
                    <Image src={src || "/placeholder-image.jpg"} alt={`Debug ${i}`} fill className="object-contain" />
                  </div>
                  <div className="truncate">{src ? src.substring(0, 20) + '...' : 'undefined'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Products */}
        <div>
          <RelatedProducts productId={id} />
        </div>
      </div>
    </main>
  )
}