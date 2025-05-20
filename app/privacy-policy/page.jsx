// app/privacy-policy/page.tsx
export default function PrivacyPolicyPage() {
    return (
      <main className="flex-1 py-20 relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-10"></div>
        <div className="silk-wave absolute inset-0"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-slide-up">
              <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
                Privacy Policy
              </h1>
              <div className="elegant-divider w-64 mx-auto mb-8"></div>
            </div>
  
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="text-foreground/80">
                  At Vasthrika, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                </p>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">1. Information We Collect</h2>
                <div className="space-y-4 text-foreground/80">
                  <h3 className="text-xl font-medium">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, phone number, and billing/shipping addresses</li>
                    <li>Payment information (processed securely through our payment processors)</li>
                    <li>Account login credentials (if you create an account)</li>
                    <li>Purchase history and preferences</li>
                  </ul>
  
                  <h3 className="text-xl font-medium mt-4">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referral sources and browsing patterns</li>
                  </ul>
                </div>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about orders, products, and services</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve our website, products, and services</li>
                  <li>Send promotional emails about new products, special offers, or other information (if you opt in)</li>
                  <li>Prevent fraudulent transactions and enhance website security</li>
                </ul>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">3. Data Protection</h2>
                <p className="text-foreground/80 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>All payment transactions are encrypted using SSL technology</li>
                  <li>We regularly review our information collection, storage, and processing practices</li>
                  <li>Access to personal information is restricted to authorized personnel only</li>
                </ul>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">4. Cookies and Tracking Technologies</h2>
                <p className="text-foreground/80 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website.
                </p>
                <p className="text-foreground/80">
                  You can choose to disable cookies through your browser settings, although this may affect certain functionalities of our website.
                </p>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">5. Third-Party Sharing</h2>
                <p className="text-foreground/80 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Trusted third parties who assist us in operating our website or serving our customers</li>
                  <li>Payment processors to complete transactions</li>
                  <li>Shipping partners to deliver your orders</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">6. Your Rights</h2>
                <p className="text-foreground/80 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to the processing of your information</li>
                </ul>
              </section>
  
              <section className="mb-8">
                <h2 className="text-2xl font-light mb-4 tracking-wider">7. Changes to This Policy</h2>
                <p className="text-foreground/80">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 20-May-2025 date.
                </p>
              </section>
  
              <section className="mt-12">
                <div className="bg-amber-50/30 border border-amber-100/30 p-6 rounded-sm">
                  <h3 className="text-xl font-medium mb-4">Contact Us</h3>
                  <p className="text-foreground/80">
                    If you have any questions about our Privacy Policy, please contact us at:
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