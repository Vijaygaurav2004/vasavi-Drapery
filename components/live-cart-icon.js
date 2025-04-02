"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LiveCartIcon() {
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    // Function to get cart count from localStorage
    const getCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
        const count = cartItems.reduce((total, item) => 
          total + item.quantity, 0)
        setCartCount(count)
      } catch (error) {
        console.error('Error getting cart count:', error)
        setCartCount(0)
      }
    }
    
    // Initial count
    getCartCount()
    
    // Event listeners for cart updates
    window.addEventListener('storage', getCartCount)
    window.addEventListener('cartUpdated', getCartCount)
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', getCartCount)
      window.removeEventListener('cartUpdated', getCartCount)
    }
  }, [])
  
  return (
    <Link href="/cart" className="text-sm uppercase tracking-wider text-[#333333] hover:text-[#000000] transition-colors relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline-block"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
      <span className="hidden sm:inline-block">CART{cartCount > 0 ? ` (${cartCount})` : ' (0)'}</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 sm:hidden bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </Link>
  )
} 