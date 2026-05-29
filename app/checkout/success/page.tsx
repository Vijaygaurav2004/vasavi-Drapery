"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    paymentId: "",
  });

  useEffect(() => {
    // Get order details from URL parameters
    const orderId = searchParams.get("orderId") || "";
    const paymentId = searchParams.get("paymentId") || "";
    
    setOrderDetails({
      orderId,
      paymentId,
    });
  }, [searchParams]);

  return (
    <main className="flex-1 py-24 bg-background">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white border border-border p-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-7">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
          </div>

          <p className="section-eyebrow mb-3">Order Confirmed</p>
          <h1 className="text-3xl elegant-heading font-light mb-4 uppercase tracking-wider">
            Thank You!
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-muted-foreground font-light mb-8 text-sm leading-relaxed">
            Your order has been confirmed and will be processed shortly. You'll receive a
            confirmation email with the tracking details.
          </p>

          {/* Order details */}
          {(orderDetails.orderId || orderDetails.paymentId) && (
            <div className="bg-muted/30 border border-border p-5 mb-8 text-left">
              {orderDetails.orderId && (
                <div className="mb-3">
                  <p className="luxury-label mb-0.5">Order ID</p>
                  <p className="text-sm font-light text-foreground/80 break-all">{orderDetails.orderId}</p>
                </div>
              )}
              {orderDetails.paymentId && (
                <div>
                  <p className="luxury-label mb-0.5">Payment ID</p>
                  <p className="text-sm font-light text-foreground/80 break-all">{orderDetails.paymentId}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="secondary-button">
              Return to Home
            </Link>
            <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
              <ShoppingBag size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 