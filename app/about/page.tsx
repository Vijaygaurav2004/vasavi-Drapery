"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Leaf, Award, ShieldCheck } from "lucide-react"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
})

const VALUES = [
  { icon: <Award size={22} />,      title: "Heritage",       desc: "Generations of craftsmanship and traditional techniques, passed down through families of master weavers." },
  { icon: <Leaf size={22} />,       title: "Sustainability", desc: "We work directly with artisans, ensuring fair wages and responsible practices across our supply chain." },
  { icon: <Sparkles size={22} />,   title: "Excellence",     desc: "Every saree undergoes rigorous inspection so only the finest pure silk reaches your wardrobe." },
]

const STATS = [
  { val: "27+",   label: "Years of Heritage" },
  { val: "50,000+", label: "Happy Customers" },
  { val: "100%",  label: "Pure Silk" },
]

export default function AboutPage() {
  return (
    <main className="flex-1 overflow-x-hidden">

      {/* Hero */}
      <section className="relative h-[320px] md:h-[420px] overflow-hidden bg-[hsl(var(--charcoal))]">
        <Image src="/1a.jpg" alt="Vasthrika by Vasavi" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="overline text-[hsl(var(--gold-light))] mb-4">Our Story</p>
          <h1 className="display-md text-white mb-4">Woven With Devotion</h1>
          <p className="text-white/60 font-light max-w-xl text-sm leading-relaxed">
            A celebration of India&apos;s timeless textile heritage — handcrafted, pure, and made to be treasured.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="section-gap bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp()} className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
              <Image src="/1a.jpg" alt="Handcrafted silk saree" fill className="object-cover" />
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="order-1 md:order-2">
              <p className="overline mb-3">Vasthrika by Vasavi</p>
              <h2 className="heading-lg mb-6">A Legacy of Authentic Silk</h2>
              <div className="gold-line mb-7" />
              <p className="text-muted-foreground font-light leading-relaxed mb-5">
                Our journey began with a profound respect for India&apos;s rich textile heritage. Founded with a
                mission to preserve traditional silk craftsmanship, we make these timeless treasures accessible
                to the modern world — without ever compromising their soul.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Each piece embodies generations of artisanal expertise, cultural significance, and the subtle
                elegance that only handcrafted silk can provide. From the loom to your wardrobe, every saree
                carries a story worth wearing.
              </p>
              <Link href="/collections" className="btn-primary inline-flex items-center gap-2">
                Explore the Collection <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-14" style={{ background: "rgb(111, 32, 45)" }}>
        <div className="page-container">
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            {STATS.map((s) => (
              <motion.div key={s.label} {...fadeUp()}>
                <p className="text-3xl md:text-5xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.val}</p>
                <p className="text-[0.65rem] md:text-xs uppercase tracking-widest text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gap bg-[hsl(var(--cream))]">
        <div className="page-container">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="overline mb-3">What We Stand For</p>
            <h2 className="heading-lg">Our Values</h2>
            <div className="gold-line mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="bg-white p-9 text-center"
                style={{ border: "1px solid hsl(var(--border))" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "hsl(var(--cream))", color: "hsl(var(--gold))" }}>
                  {v.icon}
                </div>
                <h3 className="heading-sm mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-white">
        <div className="page-container">
          <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center">
            <ShieldCheck size={28} className="mx-auto mb-5" style={{ color: "hsl(var(--gold))" }} />
            <h2 className="heading-lg mb-5">Silk Mark Certified, Always</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Every Vasthrika saree carries the Silk Mark assurance — your guarantee of 100% pure, authentic silk.
              We ship across India and worldwide, so heritage can travel wherever you do.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/collections" className="btn-primary inline-flex items-center gap-2">
                Shop Now <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn-ghost">Get in Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
