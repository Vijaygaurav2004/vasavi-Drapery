"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingBag, X, ChevronDown, Menu } from "lucide-react"
import CartHeader from "@/components/cart-header"
import { WishlistHeader } from "@/components/wishlist-header"
import { SearchDialog } from "@/components/search-dialog"
import MobileMenu from "@/app/components/mobile-menu"

const MEGA_MENU = {
  Collections: [
    { href: "/collections/women?cat=tissue", label: "Tissue Sarees", sub: "Festive shimmer" },
    { href: "/collections/women?cat=silk",   label: "Silk Sarees",   sub: "Pure Kanjivaram" },
    { href: "/collections/women?cat=bridal", label: "Bridal",        sub: "Wedding masterpieces" },
    { href: "/collections/women?cat=office", label: "Office",        sub: "Everyday elegance" },
    { href: "/collections/women?cat=fabric", label: "Fabrics",       sub: "Pure weave by the metre" },
  ],
}

export default function ScrollHeader() {
  const [scrolled, setScrolled]     = useState(false)
  const [megaOpen, setMegaOpen]     = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(null)
      }
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="page-container">
        <div className="flex h-[68px] items-center justify-between gap-6">

          {/* ── Left nav ── */}
          <nav className="hidden lg:flex items-center gap-7 flex-1">
            {Object.keys(MEGA_MENU).map((key) => (
              <Link
                key={key}
                href="/collections"
                onMouseEnter={() => setMegaOpen(key)}
                onClick={() => setMegaOpen(null)}
                className={`nav-link flex items-center gap-1 ${megaOpen === key ? "text-foreground" : ""}`}
              >
                {key}
                <ChevronDown
                  size={11}
                  strokeWidth={2}
                  className={`transition-transform duration-200 ${megaOpen === key ? "rotate-180" : ""}`}
                />
              </Link>
            ))}
            <Link href="/collections/women" className="nav-link">Shop All</Link>
            <Link href="/about" className="nav-link">Our Story</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0 lg:flex-1 flex lg:justify-center">
            <div className="text-center leading-none select-none">
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.22em", fontSize: "1.45rem", fontWeight: 300 }}
                className="block uppercase tracking-widest"
              >
                Vasthrika
              </span>
              <span
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.4em", fontSize: "0.5rem", fontWeight: 500, color: "hsl(var(--gold))" }}
                className="block uppercase"
              >
                by Vasavi
              </span>
            </div>
          </Link>

          {/* ── Right actions ── */}
          <div className="flex items-center justify-end gap-4 flex-1">
            <SearchDialog>
              <button aria-label="Search" className="hidden sm:flex items-center justify-center w-9 h-9 text-foreground/60 hover:text-foreground transition-colors">
                <Search size={18} strokeWidth={1.5} />
              </button>
            </SearchDialog>

            <div className="hidden sm:flex">
              <WishlistHeader />
            </div>

            <CartHeader />
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* ── Mega menu panel ── */}
      {megaOpen && (
        <div
          className="absolute left-0 right-0 bg-white border-t border-[hsl(var(--border))] z-40"
          style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}
          onMouseLeave={() => setMegaOpen(null)}
        >
          <div className="page-container py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {(MEGA_MENU[megaOpen as keyof typeof MEGA_MENU] || []).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMegaOpen(null)}
                  className="group"
                >
                  <div className="text-sm font-medium text-foreground group-hover:text-[hsl(var(--gold))] transition-colors mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-light">{item.sub}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
