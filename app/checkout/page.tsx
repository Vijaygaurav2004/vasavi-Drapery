"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createOrder } from "@/lib/supabase/orders";
import type { OrderItem } from "@/lib/supabase/orders";
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

      // Prepare cart items with proper quantity values for database storage
      const processedCartItems: OrderItem[] = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: Number(item.quantity) || 1,
        image: item.image
      }));

      // Create shipping address string
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
      
      // Store order information in database
      try {
        const orderData = {
          razorpay_order_id: data.id,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: shippingAddress,
          amount: cartTotal,
          status: 'pending' as const,
          items: processedCartItems
        };
        
        console.log('Storing order in database:', orderData);
        await createOrder(orderData);
        console.log('Order stored successfully with ID:', data.id);
      } catch (orderError) {
        console.error('Error storing order in database:', orderError);
        // Continue with payment - we don't want to block the user
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
            // Debug log to check cart items structure
            console.log("Cart items structure:", items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity || 1,
              quantityType: typeof item.quantity
            })));
            
            // Prepare cart items with proper quantity values
            const processedCartItems = items.map(item => ({
              ...item,
              quantity: Number(item.quantity) || 1 // Ensure quantity is a number
            }));
            
            // Log cart items before sending to verification endpoint
            console.log("Cart items being sent to verification:", JSON.stringify(processedCartItems, null, 2));
            
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
                cartItems: processedCartItems // Send processed cart items for inventory update
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
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Empty cart check
  if (items.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center py-16">
          <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to proceed with checkout.</p>
          <Link href="/collections">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <h1 className="text-2xl font-medium mb-6">Checkout</h1>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Contact Information</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-medium">Shipping Address</h2>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full py-6" disabled={isLoading}>
                {isLoading ? "Processing..." : `Pay ₹${cartTotal.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm font-medium">₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm font-medium">Free</span>
            </div>
            <div className="flex justify-between font-medium text-lg mt-4">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 