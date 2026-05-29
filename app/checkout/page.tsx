"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock, Truck, Award, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createOrder } from "@/lib/supabase/orders";
import type { OrderItem } from "@/lib/supabase/orders";

declare global {
  interface Window { Razorpay: any }
}

const STEPS = ['Cart', 'Shipping', 'Payment'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const orderId = `ORDER_${Date.now()}`;
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal, orderId,
          customerInfo: { name: formData.name, email: formData.email, phone: formData.phone },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment");

      const processedCartItems: OrderItem[] = items.map(item => ({
        id: item.id, name: item.name, price: item.price,
        quantity: Number(item.quantity) || 1, image: item.image,
      }));

      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
      try {
        await createOrder({
          razorpay_order_id: data.id, customer_name: formData.name,
          customer_email: formData.email, customer_phone: formData.phone,
          shipping_address: shippingAddress, amount: cartTotal,
          status: 'pending' as const, items: processedCartItems,
        });
      } catch {}

      const options = {
        key: data.key_id, amount: data.amount, currency: data.currency,
        name: "Vasthrika by Vasavi", description: "Luxury Silk Purchase",
        order_id: data.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: items.map(item => ({ ...item, quantity: Number(item.quantity) || 1 })),
              }),
            });
            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              clearCart();
              router.push(`/checkout/success?orderId=${data.id}&paymentId=${response.razorpay_payment_id}`);
            } else {
              router.push(`/checkout/failed?orderId=${data.id}&errorCode=verification_failed`);
            }
          } catch {
            router.push(`/checkout/failed?orderId=${data.id}&errorCode=system_error`);
          } finally { setIsLoading(false); }
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        notes: { address: shippingAddress },
        theme: { color: "#a67c52" },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            router.push(`/checkout/failed?errorCode=user_cancelled`);
          },
        },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast({ title: "Payment failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container max-w-2xl mx-auto py-24 text-center">
        <p className="section-eyebrow mb-4">Checkout</p>
        <h1 className="text-3xl elegant-heading font-light mb-4 uppercase tracking-wider">Cart is Empty</h1>
        <p className="text-muted-foreground font-light mb-8 text-sm">Add some products before proceeding to checkout.</p>
        <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1 py-12 bg-background">
      <div className="container max-w-6xl mx-auto">
        {/* Back link */}
        <Link href="/cart" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-light mb-8" style={{ letterSpacing: '0.15em' }}>
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-10 max-w-sm">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-light ${i <= 1 ? 'text-primary' : 'text-muted-foreground'}`} style={{ letterSpacing: '0.15em' }}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${i <= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </span>
                {step}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={12} className="mx-2 text-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-border p-8">
              <h2 className="elegant-heading text-xl font-light uppercase tracking-wider mb-7">
                Contact & Shipping
              </h2>

              <form onSubmit={handlePayment} className="space-y-5">
                {/* Contact Info */}
                <div>
                  <p className="text-xs uppercase tracking-widest font-medium text-foreground/50 mb-4" style={{ letterSpacing: '0.2em' }}>
                    Contact Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="luxury-label" htmlFor="name">Full Name</label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleInputChange}
                        className="luxury-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="luxury-label" htmlFor="email">Email Address</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleInputChange}
                        className="luxury-input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="luxury-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      value={formData.phone} onChange={handleInputChange}
                      className="luxury-input"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest font-medium text-foreground/50 mb-4" style={{ letterSpacing: '0.2em' }}>
                    Shipping Address
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="luxury-label" htmlFor="address">Street Address</label>
                      <input
                        id="address" name="address" type="text" required
                        value={formData.address} onChange={handleInputChange}
                        className="luxury-input"
                        placeholder="House no., Street, Area"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="luxury-label" htmlFor="city">City</label>
                        <input
                          id="city" name="city" type="text" required
                          value={formData.city} onChange={handleInputChange}
                          className="luxury-input"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="luxury-label" htmlFor="state">State</label>
                        <input
                          id="state" name="state" type="text" required
                          value={formData.state} onChange={handleInputChange}
                          className="luxury-input"
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="luxury-label" htmlFor="pincode">PIN Code</label>
                      <input
                        id="pincode" name="pincode" type="text" required
                        value={formData.pincode} onChange={handleInputChange}
                        className="luxury-input w-40"
                        placeholder="110001"
                      />
                    </div>
                  </div>
                </div>

                {/* Pay button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="luxury-button w-full flex items-center justify-center gap-2 py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Pay ₹{cartTotal.toLocaleString()} Securely</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-light pt-1">
                  <ShieldCheck size={13} className="text-primary" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border p-7 sticky top-28">
              <h2 className="elegant-heading text-lg font-light uppercase tracking-wider mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-16 flex-shrink-0 overflow-hidden border border-border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {/* Quantity badge */}
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-light elegant-heading leading-snug line-clamp-2">{item.name}</p>
                    </div>
                    <p className="text-sm font-medium flex-shrink-0">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className={`font-medium ${cartTotal >= 2000 ? 'text-emerald-700' : ''}`}>
                    {cartTotal >= 2000 ? 'Free' : '₹150'}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-baseline">
                  <span className="font-medium">Total</span>
                  <span className="text-xl elegant-heading font-light text-primary">
                    ₹{(cartTotal + (cartTotal >= 2000 ? 0 : 150)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-5 border-t border-border space-y-3">
                {[
                  { icon: <ShieldCheck size={14} />, text: 'Secure payment by Razorpay' },
                  { icon: <Truck size={14} />, text: 'Fast & tracked delivery' },
                  { icon: <Award size={14} />, text: 'Authenticity guaranteed' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground font-light">
                    <span className="text-primary flex-shrink-0">{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
