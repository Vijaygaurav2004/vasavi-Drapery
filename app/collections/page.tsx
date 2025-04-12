import Link from "next/link"
import Image from "next/image"

export default function CollectionsPage() {
  return (
    <main className="flex-1 py-20">
      <div className="container">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading">Our Collections</h1>
          <div className="w-20 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Discover the epitome of Indian textile artistry. 
            Our curated collections showcase the finest silk sarees, each telling a unique story of tradition 
            and craftsmanship. Find the perfect drape that resonates with your style.
        </p>
      </div>

        <div id="categories" className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-28">
          {/* Women's Collection */}
          <div className="relative group">
            <div className="collection-card decorated-corners hover-lift">
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Women's Collection"
                  fill
                  priority
                  className="collection-card-image"
                />
                <div className="collection-card-overlay"></div>
                <div className="collection-card-content p-10">
                  <h2 className="collection-card-title">Women</h2>
                  <p className="text-white mb-8 text-center max-w-sm mx-auto">
                    Discover our exquisite range of handcrafted silk sarees and premium fabrics
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <Link href="/collections/women" className="collection-card-button">
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl mb-3 tracking-wider font-light elegant-heading">Women's Collection</h3>
              <p className="text-foreground/70 mb-4">
                Timeless silk sarees and fabric with exquisite craftsmanship, blending tradition with contemporary elegance.
              </p>
              <div className="flex gap-4">
                <Link href="/collections/kanjivaram" className="drapery-link text-sm uppercase tracking-wider">
                  Kanjivaram
                </Link>
                <Link href="/collections/banarasi" className="drapery-link text-sm uppercase tracking-wider">
                  Banarasi
                </Link>
              </div>
            </div>
          </div>
          
          {/* Men's Collection */}
          <div className="relative group">
            <div className="collection-card decorated-corners hover-lift">
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Men's Collection"
                  fill
                  className="collection-card-image"
                />
                <div className="collection-card-overlay"></div>
                <div className="collection-card-content p-10">
                  <h2 className="collection-card-title">Men</h2>
                  <p className="text-white mb-8 text-center max-w-sm mx-auto">
                    Explore our collection of traditional dhothis and premium silk fabrics
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <Link href="/collections/men" className="collection-card-button">
                      Explore Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl mb-3 tracking-wider font-light elegant-heading">Men's Collection</h3>
              <p className="text-foreground/70 mb-4">
                Sophisticated dhothis and premium fabrics crafted with precision, offering both comfort and elegance.
              </p>
              <div className="flex gap-4">
                <Link href="/collections/ceremonial" className="drapery-link text-sm uppercase tracking-wider">
                  Ceremonial
                </Link>
                <Link href="/collections/wedding" className="drapery-link text-sm uppercase tracking-wider">
                  Wedding
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Artisanal Process */}
        <div className="relative py-20 px-12 bg-gradient-subtle mb-28 decorated-corners border-gradient">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mb-6 uppercase tracking-wider font-light elegant-heading">Crafted With Pride</h2>
            <div className="silk-divider mx-auto"></div>
            <p className="text-foreground/70 my-8 leading-relaxed">
              Each piece in our collection represents generations of artisanal expertise. We work directly with skilled 
              weavers across India, ensuring both the preservation of traditional techniques and the livelihood of the 
              craftspeople who create these masterpieces.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/about" className="cta-button group">
                <span>Learn More About Our Process</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
              <Link href="/contact" className="cta-button group bg-transparent text-foreground border border-foreground/20 hover:border-foreground">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Process</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">The journey from raw silk to finished masterpiece</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center luxury-card p-10 gold-shimmer fade-in" style={{animationDelay: '0.2s'}}>
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">01</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Material Selection</h3>
              <p className="text-foreground/70">
                We carefully select the finest quality raw silk from trusted sources, ensuring each thread meets our rigorous standards.
              </p>
            </div>
            
            <div className="text-center luxury-card p-10 gold-shimmer fade-in" style={{animationDelay: '0.4s'}}>
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">02</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Master Craftsmanship</h3>
              <p className="text-foreground/70">
                Our skilled artisans transform the raw materials into luxurious fabrics using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="text-center luxury-card p-10 gold-shimmer fade-in" style={{animationDelay: '0.6s'}}>
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">03</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Quality Assurance</h3>
              <p className="text-foreground/70">
                Each piece undergoes thorough inspection to ensure it meets our exacting standards before being presented in our collection.
              </p>
            </div>
          </div>
        </div>
        
        {/* Customer Care */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl mb-6 uppercase tracking-wider font-light elegant-heading">Customer Care</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            We&apos;re here to help you find the perfect piece. If you need assistance with your selection or 
            have questions about our collections, please don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="cta-button group">
              <span>Contact Us</span>
            </Link>
            <Link href="/shipping" className="secondary-button">
              <span>Shipping Information</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

