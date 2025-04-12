"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/app/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export default function CartHeader() {
  const { cartCount } = useCart()

  return (
    <Link 
      href="/cart" 
      className="flex items-center text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors group relative"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <div className="relative">
        <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        <AnimatePresence mode="wait">
          {cartCount > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-medium"
            >
              {cartCount}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="hidden sm:inline-block">CART</span>
    </Link>
  )
}