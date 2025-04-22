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
              
              {/* Newsletter Section */}
              <section className="py-12 bg-gradient-subtle border-t border-primary/10">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-2xl font-light mb-4 elegant-heading">Join Our Community</h3>
                    <div className="silk-divider"></div>
                    <p className="text-foreground/70 mb-6">
                      Subscribe to receive updates on new collections, exclusive offers, and the stories behind our silk traditions.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-1 px-4 py-3 rounded-sm border border-primary/20 focus:border-primary/30 focus:ring focus:ring-primary/10 focus:outline-none"
                        required
                      />
                      <button className="luxury-button" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </section>
              
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
                      <div className="flex space-x-5">
                        <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Facebook">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Instagram">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                        <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Pinterest">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12l4 0v4q0 4 4 4q4 0.5 4 -3.5"/><circle cx="12" cy="12" r="10"/><path d="M9 15c-.736 2.067 -1.52 3.435 -2.5 3.5c-1 0 -1.5 -1 -1.5 -3q-0.5 -6 2 -9l2 -1l1 2q-0.5 7 3 7c3.5 0 0.5 -9 0.5 -9"/></svg>
                        </a>
                        <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Collections</h3>
                      <ul className="space-y-3">
                        <li><Link href="/collections/women" className="text-sm text-foreground/70 hover:text-primary transition-colors">Women</Link></li>
                        <li className="pl-4"><Link href="/collections/sarees" className="text-sm text-foreground/70 hover:text-primary transition-colors">Sarees</Link></li>
                        <li className="pl-4"><Link href="/collections/fabric" className="text-sm text-foreground/70 hover:text-primary transition-colors">Fabric</Link></li>
                        <li><Link href="/collections/men" className="text-sm text-foreground/70 hover:text-primary transition-colors">Men</Link></li>
                        <li className="pl-4"><Link href="/collections/dhothi" className="text-sm text-foreground/70 hover:text-primary transition-colors">Dhothi</Link></li>
                        <li className="pl-4"><Link href="/collections/fabric-men" className="text-sm text-foreground/70 hover:text-primary transition-colors">Fabric</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Information</h3>
                      <ul className="space-y-3">
                        <li><Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/shipping" className="text-sm text-foreground/70 hover:text-primary transition-colors">Shipping</Link></li>
                        <li><Link href="/returns" className="text-sm text-foreground/70 hover:text-primary transition-colors">Returns & Cancellations</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-medium mb-5 text-foreground/90">Contact</h3>
                      <address className="not-italic text-sm text-foreground/70 space-y-2 mb-4 leading-relaxed">
                        <p>Vasthrika Studio</p>
                        <p>42 Silk Market Road</p>
                        <p>Mumbai, 400001</p>
                        <p>India</p>
                      </address>
                      <p className="text-sm text-foreground/70">
                        <a href="mailto:info@vasthrika.com" className="hover:text-primary transition-colors">info@vasthrika.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-primary/10 mt-12 pt-8 text-center">
                    <p className="text-xs text-foreground/50">
                      © {new Date().getFullYear()} Vasthrika by Vasavi. All rights reserved.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                      <img src="/images/payments/visa.svg" alt="Visa" className="h-6" />
                      <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-6" />
                      <img src="/images/payments/amex.svg" alt="American Express" className="h-6" />
                      <img src="/images/payments/paypal.svg" alt="PayPal" className="h-6" />
                    </div>
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