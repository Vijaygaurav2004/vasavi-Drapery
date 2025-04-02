"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/app/context/cart-context"

export default function CartHeader() {
  const { cartCount } = useCart()

  return (
    <Link 
      href="/cart" 
      className="flex items-center text-sm uppercase tracking-wider text-[#333333] hover:text-[#000000] transition-colors"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      <span>CART ({cartCount})</span>
    </Link>
  )
} 