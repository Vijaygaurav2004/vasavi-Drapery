"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from '@/app/context/cart-context'
import { useWishlist } from '@/app/context/wishlist-context'

// Sample related products - in a real app, this would come from an API based on the current product
const relatedProducts = [
  {
    id: "2",
    name: "Banarasi Silk in Crimson Red",
    description: "Opulent brocade with silver and gold threadwork",
    price: 38900,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    stock: 3
  },
  {
    id: "3",
    name: "Tussar Silk with Gold Embroidery",
    description: "Lightweight silk with handcrafted embroidery",
    price: 29500,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    stock: 8
  },
  {
    id: "4",
    name: "Patola Silk in Emerald Green",
    description: "Double ikat weaving with geometric patterns",
    price: 45200,
    images: ["https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"],
    stock: 2
  }
]

interface RelatedProductsProps {
  productId: string;
}

// QuickView Modal Component
function QuickView({ product, onClose }: { product: any, onClose: () => void }) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const handleAddToCart = () => {
    setAddingToCart(true);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    
    // Simulate API request delay
    setTimeout(() => {
      setAddingToCart(false);
      onClose();
    }, 800);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images
      });
    }, 0);
  };
  
  return (
    <div className="fixed inset-0 bg-foreground/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-background max-w-4xl w-full max-h-[90vh] overflow-auto p-6 relative rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center z-10 hover:bg-foreground/10 rounded-full transition-colors"
          aria-label="Close quick view"
        >
          <X size={20} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl elegant-heading">{product.name}</h2>
            <p className="text-foreground/70">{product.description}</p>
            
            <div className="text-xl font-medium">
              ₹{product.price.toLocaleString()}
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="luxury-button flex-1 inline-flex items-center justify-center gap-2"
                disabled={addingToCart || product.stock <= 0}
              >
                {addingToCart ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <ShoppingCart size={16} /> 
                    <span>{product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart 
                  size={18} 
                  className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}
                />
              </button>
              
              <Link 
                href={`/product/${product.id}`}
                className="secondary-button"
              >
                View Details
              </Link>
            </div>
            
            <div className="text-sm text-foreground/60">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  
  // In a real app, this would filter out the current product
  const filteredProducts = relatedProducts.filter(product => product.id !== productId);
  
  const handleAddToCart = (product: any) => {
    setAddingToCart(product.id);
    
    // Add to cart with the cart context
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    
    // Simulate API request delay
    setTimeout(() => {
      setAddingToCart(null);
    }, 800);
  }
  
  const handleAddToWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images
      });
    }, 0);
  }
  
  const handleQuickView = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  }
  
  const handleProductClick = (productId: string) => {
    window.location.href = `/product/${productId}`;
  }
  
  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="product-card luxury-card border border-primary/10 decorated-corners overflow-hidden group hover-lift"
            >
              <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button 
                    className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                    onClick={(e) => handleQuickView(e, product)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-medium mb-2 hover:text-primary transition-colors elegant-heading cursor-pointer" 
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.name}
                </h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-lg font-medium">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 luxury-button inline-flex items-center justify-center gap-2"
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
        </div>
      </div>
      
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <QuickView 
              product={quickViewProduct} 
              onClose={() => setQuickViewProduct(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}