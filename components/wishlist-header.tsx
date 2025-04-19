"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/app/context/wishlist-context"
import { AnimatePresence, motion } from "framer-motion"

export function WishlistHeader() {
  const { wishlistCount } = useWishlist()
  
  return (
    <Link 
      href="/wishlist" 
      className="flex items-center text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors relative"
      aria-label="Wishlist"
    >
      <Heart className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />
      <span className="hidden sm:inline-block">WISHLIST</span>
      
      <AnimatePresence>
        {wishlistCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 sm:right-auto sm:left-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {wishlistCount}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  )
} 