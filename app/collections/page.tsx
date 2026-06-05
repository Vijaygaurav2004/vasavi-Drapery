"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
})

const collections = [
  { label: "Tissue Sarees", sub: "Festive Shimmer",         img: "/1.jpg",          href: "/collections/women?cat=tissue" },
  { label: "Silk Sarees",   sub: "Pure Kanjivaram",         img: "/pink-saree.jpg", href: "/collections/women?cat=silk" },
  { label: "Bridal",        sub: "Wedding Masterpieces",    img: "/pink-saree.jpg", href: "/collections/women?cat=bridal" },
  { label: "Office",        sub: "Everyday Elegance",       img: "/1.jpg",          href: "/collections/women?cat=office" },
  { label: "Fabrics",       sub: "Pure Weave by the Metre", img: "/men.jpeg",       href: "/collections/women?cat=fabric" },
]

export default function CollectionsPage() {
  return (
    <main className="flex-1 overflow-x-hidden">

      {/* Hero */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-[hsl(var(--charcoal))]">
        <Image src="/pink-saree.jpg" alt="Our Collections" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="overline text-[hsl(var(--gold-light))] mb-4">Explore</p>
          <h1 className="display-md text-white mb-4">Our Collections</h1>
          <p className="text-white/60 font-light max-w-xl text-sm leading-relaxed">
            Handwoven silk sarees and pure fabrics — each piece a testament to heritage,
            craft, and timeless elegance.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="section-gap bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {collections.map((col, i) => (
              <motion.div key={col.label} {...fadeUp(i * 0.1)}>
                <Link href={col.href} className="editorial-card block" style={{ height: "520px" }}>
                  <Image src={col.img} alt={col.label} fill className="img-cover" />
                  <div className="editorial-card-overlay" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{col.sub}</p>
                    <h2 className="heading-md text-white mb-4">{col.label}</h2>
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

      {/* Heritage banner */}
      <section className="section-gap bg-[hsl(var(--cream))]">
        <div className="page-container">
          <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center">
            <p className="overline mb-3">Our Heritage</p>
            <h2 className="heading-lg mb-5">Crafted With Pride</h2>
            <div className="gold-line mx-auto mb-7" />
            <p className="text-muted-foreground font-light leading-relaxed mb-9">
              Each piece represents generations of artisanal expertise. We work directly with skilled
              weavers across India, preserving traditional techniques and supporting the craftspeople
              who create these masterpieces.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Our Story <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn-ghost">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
