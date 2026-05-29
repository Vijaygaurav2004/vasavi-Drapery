import type { Metadata } from 'next'
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import { CartProvider } from './context/cart-context'
import { WishlistProvider } from './context/wishlist-context'
import SiteAnnouncement from '../components/site-announcement'
import ScrollHeader from '@/components/scroll-header'
import MobileBottomNav from '@/components/mobile-bottom-nav'
import SilkMarkBadge from '@/components/silk-mark-badge'

export const metadata: Metadata = {
  title: 'Vasthrika by Vasavi — Luxury Silk Sarees',
  description: 'Handcrafted silk sarees blending South Indian heritage with timeless elegance. Kanjivaram, Banarasi, Tissue & more.',
  keywords: 'silk sarees, Kanjivaram, Banarasi, handloom, luxury sarees, Indian silk, bridal saree',
  openGraph: {
    title: 'Vasthrika by Vasavi — Luxury Silk Sarees',
    description: 'Where Tradition Meets Timeless Elegance',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <WishlistProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <SiteAnnouncement />
              <ScrollHeader />

              <div className="flex-1">
                {children}
              </div>

              {/* ===== FOOTER ===== */}
              <footer style={{ background: "rgb(111, 32, 45)", color: "hsl(44 10% 82%)" }}>
                <div className="page-container py-16 md:py-20">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-2">
                      <div className="mb-6">
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "0.18em", color: "white" }} className="block uppercase">
                          Vasthrika
                        </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", letterSpacing: "0.4em", fontWeight: 500, color: "hsl(var(--gold-light))" }} className="block uppercase mt-0.5">
                          by Vasavi
                        </span>
                      </div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }} className="mb-6 max-w-[260px]">
                        Handcrafted silk sarees from the finest artisan communities across India. Heritage woven into every thread.
                      </p>
                      <a href="mailto:vasthrikabyvasavi@gmail.com" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }} className="hover:text-white transition-colors">
                        vasthrikabyvasavi@gmail.com
                      </a>
                    </div>

                    {/* Collections */}
                    <div>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "18px", color: "white", fontFamily: "'Inter', sans-serif" }} className="uppercase">
                        Shop
                      </p>
                      <ul className="space-y-3">
                        {[
                          { href: "/collections/women?cat=tissue", label: "Tissue Sarees" },
                          { href: "/collections/women?cat=silk",   label: "Silk Sarees" },
                          { href: "/collections/women?cat=fabric", label: "Fabrics" },
                          { href: "/collections/women?occ=bridal", label: "Bridal" },
                        ].map(l => (
                          <li key={l.href}>
                            <Link href={l.href} style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(255,255,255,0.65)" }} className="hover:text-white transition-colors">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Help */}
                    <div>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "18px", color: "white", fontFamily: "'Inter', sans-serif" }} className="uppercase">
                        Help
                      </p>
                      <ul className="space-y-3">
                        {[
                          { href: "/about",     label: "Our Story" },
                          { href: "/contact",   label: "Contact Us" },
                          { href: "/shipping",  label: "Shipping Info" },
                          { href: "/returns",   label: "Returns" },
                        ].map(l => (
                          <li key={l.href}>
                            <Link href={l.href} style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(255,255,255,0.65)" }} className="hover:text-white transition-colors">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Legal */}
                    <div>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "18px", color: "white", fontFamily: "'Inter', sans-serif" }} className="uppercase">
                        Legal
                      </p>
                      <ul className="space-y-3">
                        {[
                          { href: "/privacy-policy",    label: "Privacy Policy" },
                          { href: "/terms-conditions",  label: "Terms & Conditions" },
                          { href: "/refund-policy",     label: "Refund Policy" },
                        ].map(l => (
                          <li key={l.href}>
                            <Link href={l.href} style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(255,255,255,0.65)" }} className="hover:text-white transition-colors">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p style={{ fontSize: "0.68rem", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>
                      © {new Date().getFullYear()} Vasthrika by Vasavi. All rights reserved.
                    </p>
                    {/* Silk Mark Verified */}
                    <SilkMarkBadge variant="light" size="sm" />
                    <p style={{ fontSize: "0.68rem", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>
                      Crafting heritage, one thread at a time.
                    </p>
                  </div>
                </div>
              </footer>
            </div>

            {/* Mobile bottom nav */}
            <MobileBottomNav />

            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
