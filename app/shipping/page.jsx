export default function ShippingPage() {
  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
              Our Delivery Promise
            </h1>
            <div className="elegant-divider w-64 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12 bg-amber-50/20 p-8 border-l-4 border-amber-200">
              <h2 className="text-2xl font-light mb-4 tracking-wider text-amber-800">Journey of Your Treasured Silk</h2>
              <p className="text-foreground/80 mb-6">
                At Vasthrika, we take immense pride in delivering our exquisite silk creations directly to your doorstep. Every saree begins its journey from our artisan workshops to your home with care and attention to detail.
              </p>
              <p className="text-foreground/80">
                We partner with trusted courier services across India and worldwide to ensure your precious silks arrive safely. We work with premium delivery partners including DTDC, The Professional Courier, FedEx, and DHL to provide reliable service. For destinations that are difficult to reach, we make special arrangements with alternative delivery partners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light mb-4 tracking-wider">Making Your Experience Seamless</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-b md:border-b-0 md:border-r border-foreground/10 pb-6 md:pb-0 md:pr-8">
                  <h3 className="text-xl mb-3 font-medium">Delivery Timeframes</h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span><strong>Within India:</strong> 7-10 business days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span><strong>International:</strong> 15-30 business days</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm italic text-foreground/70">
                    While we strive to meet these timeframes, occasional delays may occur due to weather conditions, customs processing, or local transportation challenges.
                  </p>
                </div>
                <div className="pt-6 md:pt-0 md:pl-8">
                  <h3 className="text-xl mb-3 font-medium">Order Tracking</h3>
                  <p className="text-foreground/80 mb-4">
                    Your excitement matters to us! We'll send you:
                  </p>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>A confirmation when your order is processed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>A tracking number when your package begins its journey</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Follow-up support throughout delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 tracking-wider">Cost & Customs</h2>
              <div className="bg-foreground/5 p-6 rounded-md">
                <div className="space-y-4 text-foreground/80">
                  <p><strong>Domestic Orders:</strong> All listed prices include GST. What you see is what you pay – no hidden costs or surprises.</p>
                  
                  <p><strong>International Orders:</strong> Our shipping rates vary based on destination, weight, and package dimensions. Please note that your country may apply import duties, taxes, or customs fees that are collected separately upon delivery. These charges follow your local regulations and are not within our control.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 tracking-wider">The Authentic Silk Experience</h2>
              <div className="space-y-4 text-foreground/80">
                <p>Each Vasthrika creation captures the essence of traditional Indian craftsmanship. The nature of handwoven silk means that colors may appear slightly different in person than in digital images. These subtle variations are the hallmark of authentic handcrafted silks – a testament to their uniqueness and artisanal quality.</p>
                
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 tracking-wider">Product Appearance</h2>
              <div className="space-y-4 text-foreground/80">
                <p>Please note that there may be slight variations between the colors of our sarees as they appear online and their actual appearance. This is due to differences in screen settings, lighting conditions during photography, and the natural characteristics of silk and other fabrics. Each saree is unique and may have subtle variations in shade and texture which are inherent to handcrafted products.</p>
              </div>

              <div className="flex items-start mt-4 bg-amber-50/30 p-4 rounded-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-amber-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-sm">Screen settings, natural lighting variations during photography, and the rich texture of silk fabrics contribute to these differences. We recommend viewing our products in natural daylight when they arrive.</p>
                </div>
            </section>

            <section className="mt-12">
              <div className="bg-gradient-to-r from-amber-50/40 to-amber-100/20 border border-amber-100/50 p-8 rounded-md">
                <h3 className="text-xl font-medium mb-4">Connect With Us</h3>
                <p className="text-foreground/80 mb-4">
                  Our dedicated team is ready to assist with any shipping inquiries. Your satisfaction is our priority.
                </p>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="ml-2 text-foreground/80">vasthrikabyvasavi@gmail.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
