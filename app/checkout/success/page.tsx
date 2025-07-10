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
    <main className="flex-1 py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-4">Payment Successful</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-gray-500 font-medium mb-1">Order ID</p>
                <p className="font-medium break-all">{orderDetails.orderId}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 font-medium mb-1">Payment ID</p>
                <p className="font-medium break-all">{orderDetails.paymentId}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
              <Button asChild>
                <Link href="/collections">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 