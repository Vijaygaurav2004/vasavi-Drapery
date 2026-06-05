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
    details?: string; // Add details field from Supabase
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
            {product.details ? (
              <div className="text-foreground/70 leading-relaxed space-y-4">
                {product.details.split(/\n+/).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : product.productDetails ? (
              <ul className="space-y-4">
                {product.productDetails.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70">{detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-foreground/70 leading-relaxed space-y-4">
                {product.description.split(/\n+/).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
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
          {product.careInstructions ? (
            <div className="text-foreground/70 leading-relaxed space-y-4">
              {product.careInstructions.split(/\n+/).map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
          <div className="bg-primary/5 p-6 rounded-sm border border-primary/10">
            <h4 className="font-medium mb-4 elegant-heading">Recommended Care</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">Dry Clean Only – To maintain the shine, texture, and longevity of the silk, we strongly recommend professional dry cleaning.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">Avoid Machine Wash – Do not wash in a washing machine.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">Store with Care – Keep the saree in a muslin cloth to allow the fabric to breathe. Avoid plastic covers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">Ironing – Use only a low-heat iron or steam press from the reverse side.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">These steps will help preserve the natural beauty and elegance of your pure silk saree for years to come.</span>
              </li>
            </ul>
          </div>
          )}
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
                <span className="text-foreground/70">No returns &amp; no exchange. All sales are final.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">Each saree is quality-checked and carefully packed before dispatch.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">For damaged or defective items, please contact us within 48 hours of delivery with photos.</span>
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