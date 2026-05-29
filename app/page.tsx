"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight, Star, ShieldCheck, Truck, RefreshCw,
  Package, Sparkles, Flame, Award
} from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import TestimonialCarousel from "@/components/testimonial-carousel"
import SilkMarkBadge from "@/components/silk-mark-badge"

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: "easeOut" as const, delay },
})

const testimonials = [
  { id: 1, name: "Ananya Reddy",   role: "Bride",          location: "Hyderabad", content: "My Kanjivaram from Vasthrika was the most complimented piece at my wedding. Every thread radiates luxury.",                            avatar: "/placeholder-avatar.jpg" },
  { id: 2, name: "Priya Sharma",   role: "Fashion Blogger", location: "Mumbai",    content: "I've ordered from many saree brands — none come close to the quality and packaging of Vasthrika. Truly premium.",                     avatar: "/placeholder-avatar.jpg" },
  { id: 3, name: "Meera Krishnan", role: "Doctor",          location: "Chennai",   content: "Ordered for my daughter's reception. The saree arrived perfectly packed with a handwritten note. Absolutely loved it.", avatar: "/placeholder-avatar.jpg" },
]

/* Hero scroll slides */
const heroSlides = [
  { img: "/pink-saree.jpg", label: "Kanjivaram Silk" },
  { img: "/1.jpg",          label: "Tissue Sarees" },
  { img: "/men.jpeg",       label: "Handloom Fabrics" },
]

/* Collections */
const collections = [
  { label: "Tissue Sarees", sub: "Lightweight Luxury",  img: "/1.jpg",          href: "/collections/women?cat=tissue" },
  { label: "Silk Sarees",   sub: "Kanjivaram & Mysore", img: "/pink-saree.jpg", href: "/collections/women?cat=silk" },
  { label: "Fabrics",       sub: "Pure Weave by the Metre", img: "/men.jpeg",   href: "/collections/women?cat=fabric" },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO — Cinematic fullscreen
          ══════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[hsl(20_15%_8%)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pink-saree.jpg"
            alt="Vasthrika Silk Saree"
            fill priority
            className="object-cover object-center animate-ken-burns"
            style={{ opacity: 0.55 }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(10,6,4,0.88) 0%, rgba(10,6,4,0.45) 55%, rgba(10,6,4,0.15) 100%)"
          }} />
        </div>

        <div className="page-container relative z-10 py-32">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="overline text-[hsl(var(--gold-light))] mb-6"
            >
              Handcrafted South Indian Silk · Silk Mark Verified
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="display-xl text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Where Tradition<br />Meets Timeless<br />
              <em style={{ color: "hsl(var(--gold-light))", fontStyle: "italic" }}>Elegance</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.65 }}
              className="text-white/60 font-light text-base leading-relaxed mb-10 max-w-md"
            >
              Every saree is a love letter to Indian heritage — woven by master artisans,
              draped with stories, and made to be passed down generations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/collections/women" className="btn-gold">
                Shop Collection <ArrowRight size={14} />
              </Link>
              <Link href="/collections/women?occ=bridal" className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
                Bridal Sarees
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-5 mt-12"
            >
              {[
                { icon: <Truck size={13} />,      label: "Free Shipping" },
                { icon: <Package size={13} />,    label: "COD Available" },
                { icon: <Sparkles size={13} />,   label: "Premium Silk" },
                { icon: <RefreshCw size={13} />,  label: "Easy Returns" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[hsl(var(--gold-light))]">{b.icon}</span>
                  <span className="text-white/55 text-xs font-light tracking-wider">{b.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Silk Mark badge in hero */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              className="mt-8"
            >
              <SilkMarkBadge variant="light" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-10 animate-pulse-soft" style={{ background: "rgba(255,255,255,0.25)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          TRUST STRIP
          ══════════════════════════════════════ */}
      <div className="trust-strip">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-[hsl(var(--border))]">
            {[
              { icon: <ShieldCheck size={18} />, label: "100% Authentic Silk",   sub: "Certified by GI" },
              { icon: <Truck size={18} />,       label: "Free Shipping ₹2,000+", sub: "Pan India delivery" },
              { icon: <Package size={18} />,     label: "COD Available",         sub: "Pay on delivery" },
              { icon: <RefreshCw size={18} />,   label: "7-Day Returns",         sub: "Hassle-free" },
            ].map(item => (
              <div key={item.label} className="trust-item justify-center md:justify-start md:px-8 py-2">
                <span className="trust-icon">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                  <p className="text-[0.68rem] text-muted-foreground font-light">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TICKER
          ══════════════════════════════════════ */}
      <div className="overflow-hidden py-3 bg-[hsl(var(--foreground))]">
        <div className="animate-ticker">
          {[...Array(3)].map((_, gi) => (
            <span key={gi} className="flex gap-0">
              {["Trusted by 50,000+ women", "₹1 Cr+ worth of sarees delivered", "4.9★ average rating", "Silk Mark Verified", "Ships in 24 hours"].map(t => (
                <span key={t} className="inline-flex items-center gap-4 px-10 text-white/70 text-xs uppercase tracking-widest font-light whitespace-nowrap">
                  <span className="text-[hsl(var(--gold-light))]">✦</span>
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PHOTO SCROLL — 3 editorial cards
          ══════════════════════════════════════ */}
      <section className="section-gap bg-white">
        <div className="page-container">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="overline mb-3">The Collection</p>
            <h2 className="heading-lg">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {collections.map((col, i) => (
              <motion.div key={col.label} {...fadeUp(i * 0.1)}>
                <Link href={col.href} className="editorial-card block" style={{ height: "520px" }}>
                  <Image src={col.img} alt={col.label} fill className="img-cover" />
                  <div className="editorial-card-overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{col.sub}</p>
                    <h3 className="heading-md text-white mb-4">{col.label}</h3>
                    <span className="inline-flex items-center gap-2 text-white/80 text-xs uppercase tracking-widest font-medium">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BESTSELLERS / FEATURED SAREES
          ══════════════════════════════════════ */}
      <section className="section-gap bg-[hsl(var(--cream))]">
        <div className="page-container">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-12">
            <div>
              <p className="overline mb-2">Handpicked</p>
              <h2 className="heading-lg">Featured Sarees</h2>
            </div>
            <Link href="/collections/women" className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest font-medium hover:text-[hsl(var(--gold))] transition-colors">
              View All <ArrowRight size={12} />
            </Link>
          </motion.div>

          <FeaturedProducts />

          <div className="text-center mt-10 sm:hidden">
            <Link href="/collections/women" className="btn-ghost">View All Sarees</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR STORY GLIMPSE
          ══════════════════════════════════════ */}
      <section className="section-gap bg-[hsl(var(--ivory))] overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <Image src="/pink-saree.jpg" alt="Artisan weaving" fill className="img-cover" />
              </div>
              <div
                className="absolute -bottom-4 -right-4 lg:-right-8 bg-white px-7 py-5 shadow-lg"
                style={{ border: "1px solid hsl(var(--border))" }}
              >
                <p className="text-3xl font-light mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--gold))" }}>500+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Master Artisans</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div {...fadeUp(0.2)}>
              <p className="overline mb-4">Our Story</p>
              <h2 className="heading-lg mb-6">The Art Behind<br />Every Saree</h2>
              <div className="gold-line mb-8" />
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Behind every Vasthrika saree is a story — of a weaver who spent months threading a single masterpiece,
                of a tradition passed from grandmother to granddaughter, of culture kept alive through craft.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                We work directly with weaver families in Kanchipuram, Dharmavaram, and Varanasi to ensure every piece
                you receive carries genuine heritage and uncompromising quality.
              </p>

              {/* Silk Mark mention */}
              <div className="mb-8 p-4 bg-white border border-[hsl(var(--border))]">
                <SilkMarkBadge variant="dark" showText />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-7 mb-10" style={{ borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))" }}>
                {[
                  { val: "15+", label: "Years" },
                  { val: "5K+", label: "Customers" },
                  { val: "100%", label: "Authentic" },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-light mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--gold))" }}>{s.val}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════ */}
      <section className="section-gap bg-[hsl(var(--cream))]">
        <div className="page-container">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="overline mb-3">Real Women, Real Stories</p>
            <h2 className="heading-lg">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 mt-5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />)}
              <span className="ml-2 text-sm text-muted-foreground font-light">4.9 · 200+ reviews</span>
            </div>
          </motion.div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ARRIVALS — Burgundy band
          ══════════════════════════════════════ */}
      <section className="py-14" style={{ background: "rgb(111, 32, 45)" }}>
        <div className="page-container text-center">
          <motion.div {...fadeUp()}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame size={18} className="text-[hsl(var(--gold-light))]" />
              <span className="text-xs uppercase tracking-widest font-medium text-white/70">Limited Time Offer</span>
              <Flame size={18} className="text-[hsl(var(--gold-light))]" />
            </div>
            <h2 className="heading-lg text-white mb-4">New Arrivals Every Week</h2>
            <p className="text-white/55 font-light mb-8 max-w-md mx-auto text-sm">
              Be the first to discover handcrafted pieces. Subscribe and receive ₹500 off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 form-input bg-white/10 border-white/25 text-white placeholder:text-white/40"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                Claim ₹500 Off
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4 font-light">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
