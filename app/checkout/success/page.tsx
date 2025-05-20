"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Clear the cart on successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex-1 py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl mb-6 uppercase tracking-wider font-light elegant-heading">
            Payment Successful
          </h1>
          
          <div className="bg-white border border-amber-100/30 rounded-sm shadow-sm p-8 mb-8">
            <p className="text-foreground/70 mb-8">
              Thank you for your purchase! Your payment has been successfully processed.
              We will send you an email confirmation with your order details shortly.
            </p>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8"></div>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="font-medium">Order Status:</span>
                <span className="text-green-600">Confirmed</span>
              </div>
              
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="font-medium">Estimated Delivery:</span>
                <span>3-5 business days</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/collections">
              <Button className="bg-black hover:bg-amber-900 text-white w-full sm:w-auto">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 