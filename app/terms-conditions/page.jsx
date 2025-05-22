export default function TermsConditionsPage() {
  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
              Terms & Conditions
            </h1>
            <div className="elegant-divider w-64 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="text-foreground/80">
                Welcome to Vasthrika. By accessing or using our website, you agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">1. General Terms</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li>By using our website, you confirm that you are at least 18 years of age or have the consent of a legal guardian.</li>
                <li>All information provided during registration or ordering must be accurate and complete.</li>
                <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
                <li>These Terms and Conditions may be modified at any time. Your continued use of the site constitutes acceptance of any changes.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">2. Products & Services</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li>All product descriptions, images, and specifications are as accurate as possible. However, we do not guarantee that all information is error-free.</li>
                <li>Handcrafted products may have slight variations in color, texture, or design, which are inherent to artisanal creations and not considered defects.</li>
                <li>We reserve the right to discontinue any product or modify its specifications without prior notice.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">3. Pricing & Payment</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li>All prices are listed in Indian Rupees (INR) unless otherwise specified.</li>
                <li>Prices are subject to change without notice.</li>
                <li>Payment information is encrypted and processed securely. We do not store your payment details.</li>
                <li>By placing an order, you warrant that you are authorized to use the specified payment method.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">4. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li>All content on this website, including text, graphics, logos, images, and software, is the property of Vasthrika and is protected by copyright laws.</li>
                <li>You may not reproduce, distribute, modify, or create derivative works from any material on our website without our explicit consent.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">5. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                <li>You agree to accept responsibility for all activities that occur under your account.</li>
                <li>We reserve the right to terminate accounts that violate our terms or for any other reason at our discretion.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">6. Limitation of Liability</h2>
              <p className="text-foreground/80 mb-4">
                Vasthrika shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-light mb-4 tracking-wider">7. Governing Law</h2>
              <p className="text-foreground/80">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section className="mb-8 text-center">
              <p className="text-lg font-medium text-primary italic">
                powered by VASAVI HANDLOOMS
              </p>
            </section>

            <section className="mt-12">
              <div className="bg-amber-50/30 border border-amber-100/30 p-6 rounded-sm">
                <h3 className="text-xl font-medium mb-4">Contact Us</h3>
                <p className="text-foreground/80">
                  If you have any questions about our Terms and Conditions, please contact us at:
                </p>
                <div className="mt-4">
                  <p className="text-foreground/80">Email: vasthrikabyvasavi@gmail.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
