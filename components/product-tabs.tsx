"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface ProductTabsProps {
  product: {
    id: string;
    description: string;
    material: string;
    careInstructions: string;
    dimensions: string;
    productDetails?: string[];
    artisanStory?: string;
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")
  
  const tabContent = {
    details: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading">Product Details</h3>
          <div className="w-16 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
          <div className="space-y-4">
            {product.productDetails ? (
              <ul className="space-y-4">
                {product.productDetails.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70">{detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground/70 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading">The Craftsmanship</h3>
          <div className="w-16 h-px bg-gradient-to-r from-primary/50 to-transparent mb-6"></div>
          
          {product.artisanStory ? (
            <p className="text-foreground/70 leading-relaxed mb-6">
              {product.artisanStory}
            </p>
          ) : (
            <p className="text-foreground/70 leading-relaxed mb-6">
              Each piece in our collection represents a legacy of artisanal excellence that has been preserved for centuries. Our artisans bring decades of experience to every creation, ensuring the highest quality and authenticity.
            </p>
          )}
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-primary/80 text-xs">1</span>
              </div>
              <p className="text-foreground/70">The thread is carefully dyed using natural, eco-friendly dyes to achieve vibrant, long-lasting colors.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-primary/80 text-xs">2</span>
              </div>
              <p className="text-foreground/70">The zari work involves interweaving silk with gold or silver threads to create intricate patterns that catch the light beautifully.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-primary/80 text-xs">3</span>
              </div>
              <p className="text-foreground/70">Traditional motifs are meticulously woven by hand, with each design element holding cultural and symbolic significance.</p>
            </li>
          </ul>
        </div>
      </div>
    ),
    
    care: (
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading text-center">Care Instructions</h3>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8"></div>
        
        <div className="space-y-6">
          <p className="text-foreground/70 leading-relaxed">
            {product.careInstructions}
          </p>
          
          <div className="bg-primary/5 p-6 rounded-sm border border-primary/10">
            <h4 className="font-medium mb-4 elegant-heading">Recommended Care</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Always dry clean your silk saree. Look for cleaners who specialize in handling delicate fabrics.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Store in a cool, dry place wrapped in a muslin cloth to prevent moisture damage.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Avoid prolonged exposure to direct sunlight which can fade the vibrant colors.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Refold your silk saree periodically to prevent permanent creasing along fold lines.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Use silica gel packets in your storage area to absorb excess moisture.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    
    shipping: (
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl mb-6 uppercase tracking-wider font-light elegant-heading text-center">Shipping & Returns</h3>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8"></div>
        
        <div className="space-y-8">
          <div>
            <h4 className="font-medium mb-4 elegant-heading">Shipping Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Free shipping on all orders over ₹15,000 within India.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Standard shipping (3-5 business days) is available for ₹250.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Express shipping (1-2 business days) is available for ₹500.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">International shipping is available to select countries. Rates calculated at checkout.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 elegant-heading">Return Policy</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Returns accepted within 48 hours of delivery only if the product is damaged or defective.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">The product must be unused, unworn, and in its original packaging with all tags intact.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">For approved returns, refunds will be processed within 7-10 business days.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  }
  
  return (
    <div className="mb-24">
      <div className="border-b border-primary/10 mb-8">
        <div className="flex flex-wrap -mb-px">
          <button 
            className={`inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 font-medium transition-colors ${
              activeTab === "details" 
                ? "border-primary text-foreground" 
                : "border-transparent text-foreground/70 hover:text-foreground hover:border-primary/20"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button 
            className={`inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 font-medium transition-colors ${
              activeTab === "care" 
                ? "border-primary text-foreground" 
                : "border-transparent text-foreground/70 hover:text-foreground hover:border-primary/20"
            }`}
            onClick={() => setActiveTab("care")}
          >
            Care Instructions
          </button>
          <button 
            className={`inline-block px-8 py-4 text-sm uppercase tracking-wider border-b-2 font-medium transition-colors ${
              activeTab === "shipping" 
                ? "border-primary text-foreground" 
                : "border-transparent text-foreground/70 hover:text-foreground hover:border-primary/20"
            }`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Returns
          </button>
        </div>
      </div>
      
      <div className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}