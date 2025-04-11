import type { Metadata } from 'next'
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import CartHeader from '@/components/cart-header'
import { CartProvider } from './context/cart-context'
import MobileMenu from './components/mobile-menu'

export const metadata: Metadata = {
  title: 'Vasthrika - Luxury Silk Sarees',
  description: 'The finest silk sarees crafted with generations of artisanal expertise',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full bg-rose-50 border-b border-rose-100 shadow-md">
              <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
                <Link href="/" className="flex items-center">
                  <span className="text-xl md:text-2xl uppercase tracking-widest font-light text-rose-900 elegant-heading">Vasthrika</span>
                  <span className="text-[10px] md:text-xs uppercase ml-1 tracking-wider text-rose-600">by Vasavi</span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                  <Link href="/" className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider transition-colors">HOME</Link>
                  <Link href="/collections" className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider transition-colors">COLLECTIONS</Link>
                  <Link href="/about" className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider transition-colors">OUR STORY</Link>
                  <Link href="/contact" className="nav-link text-rose-700 hover:text-rose-900 uppercase text-sm tracking-wider transition-colors">CONTACT</Link>
                </nav>
                
                <div className="flex items-center gap-4 md:gap-6">
                  <button className="text-sm uppercase tracking-wider text-rose-700 hover:text-rose-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline-block"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <span className="hidden sm:inline-block">SEARCH</span>
                  </button>
                  <CartHeader />
                  <MobileMenu />
                </div>
              </div>
            </header>

            {children}
            
            <footer className="bg-background border-t border-foreground/5 py-20">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <h3 className="text-xl uppercase tracking-widest font-light elegant-heading">Vasthrika</h3>
                      <span className="text-xs uppercase ml-1 tracking-wider text-foreground/70">by Vasavi</span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-8 leading-relaxed">
                      Bringing the finest silk traditions from across India to connoisseurs worldwide. Crafting elegance through heritage.
                    </p>
                    <div className="flex space-x-5">
                      <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                      <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </a>
                      <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                      </a>
                      <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
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
                    <p className="text-sm text-foreground/70 mb-2">
                      <a href="mailto:info@vasthrika.com" className="hover:text-primary transition-colors">info@vasthrika.com</a>
                    </p>
                    <p className="text-sm text-foreground/70">
                      <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
                    </p>
                  </div>
                </div>
                <div className="border-t border-foreground/5 mt-16 pt-8 text-center">
                  <p className="text-xs text-foreground/50">
                    © {new Date().getFullYear()} Vasthrika by Vasavi. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
