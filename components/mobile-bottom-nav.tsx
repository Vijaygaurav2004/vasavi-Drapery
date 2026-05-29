"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, Heart, ShoppingBag, User } from "lucide-react"
import { useCart } from "@/app/context/cart-context"
import { useWishlist } from "@/app/context/wishlist-context"

const items = [
  { href: "/",            icon: Home,       label: "Home" },
  { href: "/collections", icon: Grid3X3,    label: "Browse" },
  { href: "/wishlist",    icon: Heart,      label: "Wishlist" },
  { href: "/cart",        icon: ShoppingBag, label: "Cart" },
]

export default function MobileBottomNav() {
  const pathname   = usePathname()
  const { cartCount } = useCart()
  const { items: wishItems } = useWishlist()

  return (
    <nav className="mobile-bottom-nav">
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        const count = href === "/cart" ? cartCount : href === "/wishlist" ? wishItems.length : 0

        return (
          <Link key={href} href={href} className={`mobile-bottom-nav-item ${active ? "active" : ""}`}>
            <div className="relative">
              <Icon size={22} strokeWidth={active ? 2 : 1.5} />
              {count > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center text-white text-[9px] font-bold px-0.5"
                  style={{ background: "hsl(var(--gold))", borderRadius: "8px" }}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </div>
            <span className={active ? "font-medium" : ""}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
