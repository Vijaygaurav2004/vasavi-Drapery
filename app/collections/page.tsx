import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CollectionsPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-24 bg-gradient-subtle text-center relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-50 pointer-events-none" />
        <div className="container relative z-10">
          <p className="section-eyebrow mb-4">Explore</p>
          <h1 className="section-title">Our Collections</h1>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Discover the epitome of Indian textile artistry. Our curated collections showcase the finest
            silk sarees, each telling a unique story of tradition and craftsmanship.
          </p>
        </div>
      </section>

      {/* Collection Cards */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto mb-20">
            {[
              {
                href: '/collections/women',
                src: '/1.jpg',
                alt: "Women's Collection",
                label: 'Women',
                desc: "Timeless silk sarees and fabrics with exquisite craftsmanship, blending tradition with contemporary elegance.",
                delay: '0.1s',
              },
              {
                href: '/collections/men',
                src: '/men.jpeg',
                alt: "Men's Collection",
                label: 'Men',
                desc: "Sophisticated dhothis and premium fabrics crafted with precision, offering comfort and refined elegance.",
                delay: '0.25s',
              },
            ].map((col) => (
              <div key={col.href} className="group fade-in" style={{ animationDelay: col.delay }}>
                {/* Image card */}
                <div className="collection-card mb-7">
                  <Link href={col.href} className="block">
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <Image
                        src={col.src}
                        alt={col.alt}
                        fill
                        priority
                        className="collection-card-image object-cover"
                      />
                      <div className="collection-card-overlay" />
                      <div className="collection-card-content">
                        <h2 className="collection-card-title">{col.label}</h2>
                        <span className="collection-card-button">Explore Collection</span>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Text below image */}
                <div>
                  <h3 className="text-xl elegant-heading font-light mb-2 tracking-wider">{col.label}'s Collection</h3>
                  <div className="gold-divider-left mb-4" style={{ width: '40px' }} />
                  <p className="text-sm text-foreground/60 font-light leading-relaxed mb-5">{col.desc}</p>
                  <Link
                    href={col.href}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors font-light group"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    Explore
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Craft Banner */}
          <div className="bg-gradient-subtle border border-primary/10 p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 silk-texture opacity-40 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="section-eyebrow mb-4">Our Heritage</p>
              <h2 className="section-title">Crafted With Pride</h2>
              <div className="gold-divider" />
              <p className="text-foreground/60 leading-relaxed font-light text-sm mb-8">
                Each piece represents generations of artisanal expertise. We work directly with skilled weavers
                across India, ensuring both the preservation of traditional techniques and the livelihood of
                the craftspeople who create these masterpieces.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/about" className="luxury-button inline-flex items-center gap-2">
                  <span>Our Story</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="secondary-button">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
