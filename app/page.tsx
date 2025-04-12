import Link from "next/link"
import Image from "next/image"
import TestimonialCarousel from '@/components/testimonial-carousel'
import { Award, ShieldCheck, Truck, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import FeaturedProducts from "../components/featured-products"
import ImageGallery from "../components/image-gallery"

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-gradient-subtle">
        {/* Decorative Elements */}
        <div className="silky-decor-1"></div>
        <div className="silky-decor-2"></div>
        <div className="silk-overlay"></div>
        
        <div className="container h-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
            <div className="fade-in" style={{animationDelay: '0.2s'}}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest font-light leading-tight elegant-heading">
                <span className="text-foreground block">THE ART OF</span> 
                <span className="hero-silk-text block">HANDCRAFTED SILK</span>
              </h1>
              <div className="w-20 h-px bg-primary mb-8"></div>
              <p className="text-foreground/70 mb-10 max-w-md leading-relaxed">
                Each piece is meticulously crafted by skilled artisans who have inherited generations of knowledge, 
                preserving traditional techniques while creating timeless masterpieces.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/collections" className="luxury-button group inline-flex items-center">
                  <span>Explore Collection</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/about" className="secondary-button">
                  Our Story
                </Link>
              </div>
            </div>
            <div className="hidden md:block h-full flex items-center justify-end">
              <div className="relative h-[80vh] w-full max-w-md decorated-corners gold-shimmer">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Luxury Silk Saree"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero Image (visible only on mobile) */}
      <div className="md:hidden -mt-16 relative z-20 px-4">
        <div className="relative aspect-[4/5] overflow-hidden decorated-corners shadow-lg">
          <Image
            src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
            alt="Luxury Silk Saree"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-0 w-full text-center">
            <Link href="/collections" className="luxury-button inline-flex items-center group">
              <span>Shop Now</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Showcase */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16 animate-fade-slide-up">
            <h2 className="text-3xl md:text-4xl elegant-heading uppercase tracking-wider">Our Collections</h2>
            <div className="w-20 h-px bg-primary mx-auto my-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Discover the epitome of Indian textile artistry through our carefully curated collections for women and men.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
            {/* Women's Collection */}
            <div className="collection-card decorated-corners hover-lift fade-in" style={{animationDelay: '0.2s'}}>
              <Link href="/collections/women" className="block">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                    alt="Women's Collection"
                    fill
                    className="collection-card-image"
                  />
                  <div className="collection-card-overlay"></div>
                  <div className="collection-card-content">
                    <h3 className="collection-card-title">Women</h3>
                    <Link href="/collections/women" className="collection-card-button">
                      Explore
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Men's Collection */}
            <div className="collection-card decorated-corners hover-lift fade-in" style={{animationDelay: '0.4s'}}>
              <Link href="/collections/men" className="block">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                    alt="Men's Collection"
                    fill
                    className="collection-card-image"
                  />
                  <div className="collection-card-overlay"></div>
                  <div className="collection-card-content">
                    <h3 className="collection-card-title">Men</h3>
                    <Link href="/collections/men" className="collection-card-button">
                      Explore
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl elegant-heading uppercase tracking-wider">Featured Collection</h2>
            <div className="w-20 h-px bg-primary mx-auto my-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Discover our exquisite selection of handcrafted silk pieces, each representing the pinnacle of Indian craftsmanship and luxury.
            </p>
          </div>
          
          <FeaturedProducts />
          
          <div className="text-center mt-12">
            <Link href="/collections" className="luxury-button inline-flex items-center group">
              <span>View All Products</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className="py-28 bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 z-0 silk-pattern"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl elegant-heading mb-6">The Art of Craftsmanship</h2>
              <div className="w-16 h-px bg-primary mb-8"></div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                At Vasthrika, we celebrate the rich heritage of traditional Indian silk weaving. Our journey began with a passion for preserving centuries-old techniques while bringing them to the modern world.
              </p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Each piece in our collection tells a story of skilled artisans, meticulous craftsmanship, and cultural significance. We work directly with weaver communities across India to ensure that every thread speaks of authenticity and excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="luxury-button inline-flex items-center group">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/contact" className="secondary-button">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative overflow-hidden aspect-[4/5] decorated-corners shadow-xl gold-shimmer">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Silk Artisans at Work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl elegant-heading uppercase tracking-wider">Our Process</h2>
            <div className="w-20 h-px bg-primary mx-auto my-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              The journey from raw silk to finished masterpiece involves multiple stages of meticulous craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger-animation">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">01</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Material Selection</h3>
              <p className="text-foreground/70">
                We carefully select the finest quality raw silk from trusted sources, ensuring each thread meets our rigorous standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">02</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Master Craftsmanship</h3>
              <p className="text-foreground/70">
                Our skilled artisans transform the raw materials into luxurious fabrics using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">03</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Quality Assurance</h3>
              <p className="text-foreground/70">
                Each piece undergoes thorough inspection to ensure it meets our exacting standards before being presented in our collection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl elegant-heading">04</span>
              </div>
              <h3 className="text-xl mb-4 elegant-heading">Final Touches</h3>
              <p className="text-foreground/70">
                The finished pieces are carefully packaged with authentic certification, ready to become part of your personal collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl elegant-heading uppercase tracking-wider">Follow Our Journey</h2>
            <div className="w-20 h-px bg-primary mx-auto my-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Join us on Instagram and discover the artistry behind our collections and the stories of our artisans.
            </p>
          </div>
          
          <ImageGallery />
          
          <div className="text-center mt-12">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="luxury-button inline-flex items-center group"
            >
              <span>Follow @vasthrikasilks</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl elegant-heading uppercase tracking-wider">Our Promise</h2>
            <div className="w-20 h-px bg-primary mx-auto my-6"></div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              At Vasthrika, we are committed to delivering not just sarees, but an experience 
              steeped in authenticity, quality, and exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-animation">
            <div className="flex flex-col items-center text-center p-8 bg-white border border-primary/10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
              <Award className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-medium mb-2 elegant-heading">Authenticity</h3>
              <p className="text-foreground/70">
                We source our silk directly from weaver communities across India, ensuring that every thread speaks of authenticity and cultural significance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white border border-primary/10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
              <ShieldCheck className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-medium mb-2 elegant-heading">Quality</h3>
              <p className="text-foreground/70">
                Our artisans are trained in traditional techniques, ensuring that each piece is crafted with meticulous attention to detail.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white border border-primary/10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
              <Truck className="text-primary mb-4" size={40} />
              <h3 className="text-xl font-medium mb-2 elegant-heading">Service</h3>
              <p className="text-foreground/70">
                We offer a seamless shopping experience, from initial consultation to secure delivery and dedicated after-sales service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}