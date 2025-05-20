import type { Metadata } from 'next'
import Link from "next/link"
import Image from "next/image"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import CartHeader from '@/components/cart-header'
import { CartProvider } from './context/cart-context'
import { WishlistProvider } from './context/wishlist-context'
import MobileMenu from './components/mobile-menu'
import SiteAnnouncement from '../components/site-announcement'
import { Heart, Search } from 'lucide-react'
import { WishlistHeader } from "@/components/wishlist-header"
import { SearchDialog } from '@/components/search-dialog'

export const metadata: Metadata = {
  title: 'Vasthrika - Luxury Silk Sarees and Fabrics',
  description: 'Discover Vasthrika\'s exclusive collection of handcrafted silk sarees and fabrics, representing the finest traditions of Indian craftsmanship.',
  keywords: 'silk sarees, handloom, Kanjivaram, Banarasi, Indian silk, luxury fabric, handcrafted sarees',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <WishlistProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              {/* Announcement Bar */}
              <SiteAnnouncement />
              
              {/* Header */}
              <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-primary/10 shadow-sm transition-all duration-300">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
                  <Link href="/" className="flex items-center group">
                    <span className="text-xl md:text-2xl uppercase tracking-widest font-light elegant-heading group-hover:text-primary transition-colors duration-300">Vasthrika</span>
                    <span className="text-[10px] md:text-xs uppercase ml-1 tracking-wider text-primary/80">by Vasavi</span>
                  </Link>
                  
                  <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                    <Link href="/" className="nav-link text-foreground hover:text-primary uppercase text-sm tracking-wider transition-colors">HOME</Link>
                    <Link href="/collections" className="nav-link text-foreground hover:text-primary uppercase text-sm tracking-wider transition-colors">COLLECTIONS</Link>
                    <Link href="/about" className="nav-link text-foreground hover:text-primary uppercase text-sm tracking-wider transition-colors">OUR STORY</Link>
                    <Link href="/contact" className="nav-link text-foreground hover:text-primary uppercase text-sm tracking-wider transition-colors">CONTACT</Link>
                  </nav>
                  
                  <div className="flex items-center gap-4 md:gap-6">
                    <SearchDialog>
                      <button className="text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                        <Search className="h-[18px] w-[18px] group-hover:text-primary transition-colors" />
                        <span className="hidden sm:inline-block">SEARCH</span>
                      </button>
                    </SearchDialog>
                    
                    <WishlistHeader />
                    
                    <CartHeader />
                    <MobileMenu />
                  </div>
                </div>
              </header>

              {children}
              
              
              {/* Footer */}
              <footer className="bg-gradient-subtle border-t border-primary/10 py-16">
                <div className="container">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                      <div className="flex items-center mb-6">
                        <h3 className="text-xl uppercase tracking-widest font-light elegant-heading">Vasthrika</h3>
                        <span className="text-xs uppercase ml-1 tracking-wider text-primary/80">by Vasavi</span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-8 leading-relaxed">
                        Bringing the finest silk traditions from across India to connoisseurs worldwide. Crafting elegance through heritage.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Collections</h3>
                      <ul className="space-y-3">
                        <li><Link href="/collections/women" className="text-sm text-foreground/70 hover:text-primary transition-colors">Women</Link></li>
                        <li><Link href="/collections/men" className="text-sm text-foreground/70 hover:text-primary transition-colors">Men</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Information</h3>
                      <ul className="space-y-3">
                        <li><Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/shipping" className="text-sm text-foreground/70 hover:text-primary transition-colors">Shipping</Link></li>
                        <li><Link href="/refund-policy" className="text-sm text-foreground/70 hover:text-primary transition-colors">Refund Policy</Link></li>
                        <li><Link href="/terms-conditions" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/privacy-policy" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/returns" className="text-sm text-foreground/70 hover:text-primary transition-colors">Returns & Cancellations</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Contact</h3>
                      <p className="text-sm text-foreground/70">
                        <a href="mailto:vasthrikabyvasavi@gmail.com" className="hover:text-primary transition-colors">vasthrikabyvasavi@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-primary/10 mt-12 pt-8 text-center">
                    <p className="text-xs text-foreground/50">
                      © {new Date().getFullYear()} Vasthrika by Vasavi. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}