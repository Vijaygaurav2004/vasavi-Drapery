"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState({
    orderId: "",
    errorCode: "",
    errorMessage: ""
  });

  useEffect(() => {
    // Get error details from URL parameters
    const orderId = searchParams.get("orderId") || "";
    const errorCode = searchParams.get("errorCode") || "unknown";
    const errorMessage = searchParams.get("errorMessage") || "An error occurred during payment processing";
    
    setErrorDetails({
      orderId,
      errorCode,
      errorMessage
    });
  }, [searchParams]);

  return (
    <main className="flex-1 py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but your payment could not be processed at this time.
          </p>
          
          {errorDetails.errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{errorDetails.errorMessage}</p>
              {errorDetails.errorCode !== "unknown" && (
                <p className="text-sm text-red-500 mt-1">Error code: {errorDetails.errorCode}</p>
              )}
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-medium">What happened?</h2>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Your payment was declined by your bank or payment provider</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>There might be an issue with your payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>The payment gateway encountered a technical problem</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-medium">What can you do?</h2>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Try again with the same payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Use a different payment method</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>Contact your bank to ensure there are no issues with your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span>
                <span>If the problem persists, contact our customer support</span>
              </li>
            </ul>
          </div>
          
          {errorDetails.orderId && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500">Reference ID</p>
              <p className="font-medium break-all">{errorDetails.orderId}</p>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href="/checkout">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 