"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    // Function to get cart count from localStorage
    const getCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
        const count = cartItems.reduce((total: number, item: { quantity: number }) => 
          total + item.quantity, 0)
        setCartCount(count)
      } catch (error) {
        console.error('Error getting cart count:', error)
        setCartCount(0)
      }
    }
    
    // Initial count
    getCartCount()
    
    // Add event listener for storage events
    const handleStorageChange = () => {
      getCartCount()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Custom event for cart updates within the same window
    const handleCustomEvent = () => {
      getCartCount()
    }
    
    window.addEventListener('cartUpdated', handleCustomEvent)
    
    // Check for changes every 2 seconds as a fallback
    const interval = setInterval(getCartCount, 2000)
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCustomEvent)
      clearInterval(interval)
    }
  }, [])
  
  return (
    <Link href="/cart" className="text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors relative">
      <ShoppingCart className="w-[18px] h-[18px] mr-1 inline-block" />
      <span className="hidden sm:inline-block">Cart{cartCount > 0 ? ` (${cartCount})` : ''}</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 sm:hidden bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </Link>
  )
} 