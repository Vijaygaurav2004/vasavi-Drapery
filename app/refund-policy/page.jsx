export default function RefundPolicyPage() {
  return (
    <main className="flex-1 py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-slide-up">
            <h1 className="text-4xl md:text-5xl mb-6 uppercase tracking-wider font-light elegant-heading silk-text-gradient">
              Refund Policy
            </h1>
            <div className="elegant-divider w-64 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 tracking-wider">Refund Eligibility</h2>
              <p className="text-foreground/80 mb-6">
                At Vasthrika, we stand behind the quality of our handcrafted products. Our refund policy is designed to ensure your complete satisfaction.
              </p>

              <div className="space-y-4 text-foreground/80">
                <h3 className="text-xl font-medium">Eligible Scenarios</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Received damaged or defective products</li>
                  <li>Received incorrect items</li>
                </ul>

                <h3 className="text-xl font-medium mt-8">Non-Eligible Scenarios</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Minor color variations (due to screen settings or photography)</li>
                  <li>Changed mind after purchase</li>
                  <li>Improper handling or wear and tear by customer</li>
                  <li>Items purchased during sale period</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light mb-6 tracking-wider">Refund Process</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  If your return is approved, we will initiate a refund to your original payment method.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our customer service at vasthrikabyvasavi@gmail.com within 48 hours of delivery</li>
                  <li>Include order number and clear photos of the issue</li>
                  <li>Wait for approval from our quality assurance team</li>
                  <li>Return the product in its original packaging with all tags intact</li>
                  <li>Once received and inspected, your refund will be processed</li>
                </ol>

                <h3 className="text-xl font-medium mt-8">Refund Timeline</h3>
                <p>
                  Refunds are typically processed within 7-10 business days after we receive the returned item. The time for the refund to reflect in your account depends on your payment provider.
                </p>
              </div>
            </section>

            <section className="mt-12">
              <div className="bg-amber-50/30 border border-amber-100/30 p-6 rounded-sm">
                <h3 className="text-xl font-medium mb-4">Refund Methods</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Original payment method refund</li>
                  <li>Exchange for another product</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
