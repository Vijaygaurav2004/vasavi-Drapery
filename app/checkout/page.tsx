"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Declare Razorpay as a global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Process payment using Razorpay
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}`;
      
      // Create order on server
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cartTotal,
          orderId,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      // Initialize Razorpay payment
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Vasavi Drapery",
        description: "Purchase of silk sarees",
        order_id: data.id,
        handler: async function (response: any) {
          try {
            // Log cart items before sending to verification endpoint
            console.log("Cart items being sent to verification:", JSON.stringify(items, null, 2));
            
            // Verify payment
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: items // Send cart items for inventory update
              }),
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              // Payment successful
              toast({
                title: "Payment successful",
                description: "Your order has been placed successfully.",
              });
              
              // Clear cart and redirect to success page
              clearCart();
              router.push(`/checkout/success?orderId=${data.id}&paymentId=${response.razorpay_payment_id}`);
            } else {
              // Payment verification failed
              toast({
                title: "Payment verification failed",
                description: "Your payment could not be verified.",
                variant: "destructive"
              });
              
              // Redirect to failed page with error details
              router.push(`/checkout/failed?orderId=${data.id}&errorCode=verification_failed&errorMessage=${encodeURIComponent("Your payment could not be verified.")}`);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              title: "Payment verification failed",
              description: "Please contact support with your order ID.",
              variant: "destructive"
            });
            
            // Redirect to failed page with error details
            router.push(`/checkout/failed?orderId=${data.id}&errorCode=system_error&errorMessage=${encodeURIComponent("An error occurred during payment processing.")}`);
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`
        },
        theme: {
          color: "#9c6f44"
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed by user");
            setIsLoading(false);
            
            // Redirect to failed page with user cancellation message
            router.push(`/checkout/failed?errorCode=user_cancelled&errorMessage=${encodeURIComponent("Payment was cancelled.")}`);
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Payment initiation failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex-1 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl mb-6 uppercase tracking-wider font-light elegant-heading">Checkout</h1>
            <p className="text-foreground/70 mb-8">Your cart is empty. Please add items to proceed with checkout.</p>
            <Link 
              href="/collections"
              className="inline-flex items-center text-sm hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Collections
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-4xl uppercase tracking-wider font-light elegant-heading">Checkout</h1>
            <Link 
              href="/cart"
              className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Customer Information Form */}
            <div className="md:col-span-2">
              <div className="p-6 bg-white border border-amber-100/30 rounded-sm shadow-sm">
                <h2 className="text-xl mb-6 font-medium">Contact Information</h2>
                
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <h2 className="text-xl mt-8 mb-6 font-medium">Shipping Address</h2>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground/70 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground/70 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-foreground/70 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-foreground/70 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-8 bg-black hover:bg-amber-900 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 
                      <span className="loading-spinner mr-2"></span> : null}
                    {isLoading ? "Processing..." : "Pay with Razorpay"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="p-6 bg-white border border-amber-100/30 rounded-sm shadow-sm">
                <h2 className="text-xl mb-6 font-medium">Order Summary</h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-sm"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-foreground/70">Quantity: {item.quantity}</p>
                        <p className="text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-foreground/70">Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-foreground/70">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between py-2 font-medium text-lg border-t border-primary/10 mt-2 pt-2">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 