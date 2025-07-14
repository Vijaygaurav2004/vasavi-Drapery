import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderId, customerInfo } = body;

    // Razorpay API configuration - ensure environment variables are set for live mode
    const KEY_ID = process.env.RAZORPAY_KEY_ID;
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
    
    if (!KEY_ID || !KEY_SECRET) {
      console.error('Razorpay API keys not configured');
      return NextResponse.json({ 
        error: 'Payment gateway configuration error', 
        errorCode: 'config_error' 
      }, { status: 500 });
    }
    
    // Log which mode we're using (test or live) without exposing the full key
    const isLiveMode = KEY_ID.startsWith('rzp_live_');
    console.log(`Using Razorpay in ${isLiveMode ? 'LIVE' : 'TEST'} mode`);
    
    // Create order payload for Razorpay
    const payload = {
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency: 'INR',
      receipt: orderId,
      notes: {
        customerName: customerInfo?.name || '',
        customerEmail: customerInfo?.email || '',
        customerPhone: customerInfo?.phone || '',
      }
    };

    console.log("Creating Razorpay order with payload:", JSON.stringify(payload, null, 2));

    // Make request to Razorpay API to create order
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64')
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', data);
      
      // Return specific error information
      return NextResponse.json({ 
        error: data.error?.description || 'Failed to create Razorpay order',
        errorCode: data.error?.code || 'unknown_error'
      }, { status: response.status || 500 });
    }

    console.log("Razorpay order created successfully:", data.id);
    
    return NextResponse.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      receipt: data.receipt,
      key_id: KEY_ID
    }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ 
      error: 'Error creating Razorpay payment',
      errorCode: 'system_error'
    }, { status: 500 });
  }
} 