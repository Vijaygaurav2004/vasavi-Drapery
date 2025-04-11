import Link from "next/link"
import Image from "next/image"
import TestimonialCarousel from '@/components/testimonial-carousel'
import NewsletterSignup from "@/components/newsletter-signup"
import { Award, ShieldCheck, Truck } from "lucide-react"

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Patel",
      role: "Loyal Customer",
      location: "Mumbai",
      content: "The craftsmanship of Vasthrika&apos;s silk sarees is unparalleled. The attention to detail and the quality of the silk make each piece a true heirloom that I&apos;m proud to pass down to my daughter.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    },
    {
      id: 2,
      name: "Meera Sharma",
      role: "Fashion Designer",
      location: "Delhi",
      content: "As someone who works in fashion, I can attest to the exceptional quality of Vasthrika&apos;s silk sarees. The designs are contemporary yet rooted in tradition - exactly what today&apos;s women are looking for.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    },
    {
      id: 3,
      name: "Priya Iyer",
      role: "Textile Enthusiast",
      location: "Bangalore",
      content: "Vasthrika&apos;s collection represents the best of Indian silk heritage. Their commitment to working directly with artisans ensures both authenticity and sustainability - values that are increasingly important.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      role: "Silk Merchant",
      location: "Chennai",
      content: "I&apos;ve been a silk merchant for decades, and Vasthrika&apos;s sarees are a testament to the true craftsmanship of Indian silk. The attention to detail and the quality of the fabric make them a joy to work with.",
      avatar: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-white">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-20 w-1/2 h-2/3 bg-primary/5 -z-10"></div>
        <div className="absolute left-20 bottom-20 w-28 h-28 border border-primary/20 -z-10"></div>
        <div className="absolute left-1/4 top-28 w-16 h-16 border border-primary/10 -z-10 rotate-45"></div>
        <div className="absolute right-1/4 bottom-28 w-32 h-32 rounded-full bg-gradient-to-tr from-primary/5 to-transparent -z-10"></div>
        
        <div className="container h-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
            <div className="hidden md:block z-10">
              <h1 className="text-4xl md:text-5xl lg:text-7xl mb-8 uppercase tracking-widest font-light max-w-md leading-tight elegant-heading">
                <span className="text-foreground">THE ART OF</span> <span className="text-foreground/20">HANDCRAFTED SILK</span>
              </h1>
              <div className="w-20 h-px bg-primary mb-10"></div>
              <p className="text-foreground/70 mb-10 max-w-md leading-relaxed">
                Each piece is meticulously crafted by skilled artisans who have inherited generations of knowledge, 
                preserving traditional techniques while creating timeless masterpieces.
              </p>

              <Link href="/collections" className="cta-button group">
                <span>Explore Collection</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>
            <div className="h-full flex items-center justify-end">
              <div className="relative h-[90vh] md:h-[80vh] w-full md:w-auto aspect-[3/4] decorated-corners">
                {/* Hero image */}
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Luxury Silk Saree"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent md:bg-none"></div>
                <div className="absolute bottom-12 left-0 md:hidden w-full text-center">
                  <h1 className="text-3xl mb-6 uppercase tracking-widest font-light text-foreground drop-shadow-md px-4 elegant-heading">
                    <span className="text-foreground bg-white/80 px-2 py-1">THE ART OF</span> <br />
                    <span className="text-foreground/80 bg-white/60 px-2 py-1">HANDCRAFTED SILK</span>
                  </h1>
                  <Link href="/collections" className="cta-button group backdrop-blur-sm">
                    <span>Explore Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-28 bg-gradient-subtle section-shadow">
        <div className="container">
          <div className="relative mb-20 text-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/30 -z-10 rotate-45"></div>
            <h2 className="section-title">Featured Collection</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Discover our exquisite selection of handcrafted silk pieces, each representing the pinnacle of Indian craftsmanship and luxury.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Kanchipuram Silk Saree */}
            <div className="product-card group hover-lift">
              <Link href="/product/1" className="product-card-image-container block">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Kanchipuram Silk Saree in Royal Blue"
                  fill
                  className="product-card-image"
                />
                <div className="product-card-label">
                  Best Seller
                </div>
              </Link>
              <div className="product-card-content">
                <Link href="/product/1" className="product-card-title">
                  Kanchipuram Silk in Royal Blue
                </Link>
                <p className="product-card-price">
                  ₹42,750
                </p>
                <div className="product-card-divider"></div>
                <button className="product-card-button group">
                  <span>Add to Cart</span>
                </button>
          </div>
          </div>
            
            {/* Banarasi Silk Saree */}
            <div className="product-card group hover-lift">
              <Link href="/product/2" className="product-card-image-container block">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Banarasi Silk Saree in Crimson Red"
                  fill
                  className="product-card-image"
                />
                <div className="product-card-label">
                  Limited Edition
                </div>
              </Link>
              <div className="product-card-content">
                <Link href="/product/2" className="product-card-title">
                  Banarasi Silk in Crimson Red
                </Link>
                <p className="product-card-price">
                  ₹38,900
                </p>
                <div className="product-card-divider"></div>
                <button className="product-card-button group">
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
            
            {/* Tussar Silk Saree */}
            <div className="product-card group hover-lift">
              <Link href="/product/3" className="product-card-image-container block">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Tussar Silk with Traditional Motifs"
                  fill
                  className="product-card-image"
                />
                <div className="product-card-label">
                  New Arrival
                </div>
              </Link>
              <div className="product-card-content">
                <Link href="/product/3" className="product-card-title">
                  Tussar Silk with Gold Embroidery
                </Link>
                <p className="product-card-price">
                  ₹29,500
                </p>
                <div className="product-card-divider"></div>
                <button className="product-card-button group">
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/collections" className="cta-button group">
              <span>View All Products</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
          </div>
        </section>

      {/* Collections */}
      <section className="py-28 bg-gradient-warm">
          <div className="container">
          <div className="relative mb-20 text-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/30 -z-10 rotate-45"></div>
            <h2 className="section-title">Premium Collections</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Explore our curated collections of India's finest silk weaving traditions for both women and men.</p>
              </div>
              
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Women's Collection */}
            <div className="collection-card decorated-corners hover-lift">
              <Link href="/collections/women" className="block">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                    alt="Women's Collection"
                    fill
                    priority
                    className="collection-card-image"
                  />
                  <div className="collection-card-overlay"></div>
                  <div className="collection-card-content">
                    <h3 className="collection-card-title">Women</h3>
                    <div className="flex flex-col items-center gap-2">
                      <span className="collection-card-button pointer-events-none">
                        Sarees
                      </span>
                      <span className="collection-card-button pointer-events-none">
                        Fabric
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mt-4 text-center">
                <Link href="/collections/women" className="cta-button group">
                  <span>View Women's Collection</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
              </div>
              
            {/* Men's Collection */}
            <div className="collection-card decorated-corners hover-lift">
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
                    <div className="flex flex-col items-center gap-2">
                      <span className="collection-card-button pointer-events-none">
                        Dhothi
                      </span>
                      <span className="collection-card-button pointer-events-none">
                        Fabric
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mt-4 text-center">
                <Link href="/collections/men" className="cta-button group">
                  <span>View Men's Collection</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </section>

      {/* Luxury Banner */}
      <section className="py-28 bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317')] bg-no-repeat bg-cover blur-md"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 elegant-heading silk-text-gradient">
              Experience Timeless Elegance
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Indulge in the rich heritage of Indian silk. Our meticulously crafted sarees 
              blend traditional artistry with contemporary designs, perfect for every occasion.
            </p>
            <div>
              <Link href="/collections">
                <button className="luxury-button">Explore Collections</button>
              </Link>
              <Link href="/about" className="ml-4 text-sm font-medium text-primary hover:underline">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About/Story */}
      <section className="py-28 bg-[#fbfbf9] section-shadow">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative decorated-corners">
              <div className="relative overflow-hidden aspect-[4/5] z-10 shadow-xl">
                <Image
                  src="https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317"
                  alt="Our Story - Silk Weaving Tradition"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/10 to-transparent"></div>
            </div>
          </div>
          <div>
              <h2 className="section-title">Our Heritage</h2>
              <div className="w-16 h-px bg-primary mb-8"></div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                At Vasthrika by Vasavi, we celebrate the rich heritage of traditional Indian silk weaving. Our journey began with a passion for preserving centuries-old techniques while bringing them to the modern world.
              </p>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Each piece in our collection tells a story of skilled artisans, meticulous craftsmanship, and cultural significance. We work directly with weaver communities across India to ensure that every thread speaks of authenticity and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="cta-button group">
                  <span>Learn More</span>
                </Link>
                <Link href="/contact" className="cta-button group bg-transparent text-foreground border border-foreground/20 hover:border-foreground hover:bg-transparent">
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 elegant-heading silk-text-gradient">Why Choose Vasthrika</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              We don&apos;t just sell sarees; we offer an unparalleled experience rooted in authenticity and quality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-muted/40">
        <NewsletterSignup />
      </section>

      {/* Our Promise Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 elegant-heading silk-text-gradient">Our Promise</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              At Vasthrika by Vasavi, we are committed to delivering not just sarees, but an experience 
              steeped in authenticity, quality, and exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <Award className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-2">Authenticity</h3>
              <p className="text-foreground/70 max-w-xs text-center">
                We source our silk directly from weaver communities across India, ensuring that every thread speaks of authenticity and cultural significance.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-2">Quality</h3>
              <p className="text-foreground/70 max-w-xs text-center">
                Our artisans are trained in traditional techniques, ensuring that each piece is crafted with meticulous attention to detail.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-2">Exceptional Service</h3>
              <p className="text-foreground/70 max-w-xs text-center">
                We offer a seamless shopping experience, from initial consultation to after-sales service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

