import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateProductStock } from '@/lib/supabase/products';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      cartItems // Added to receive cart items for inventory update
    } = body;
    
    console.log('Received payment verification request with cart items:', JSON.stringify(cartItems, null, 2));
    
    // Razorpay API configuration
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'mWRFUf74wBj2iLroh8Pk6nqZ';
    
    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
    
    const isAuthentic = generatedSignature === razorpay_signature;
    
    if (!isAuthentic) {
      console.error('Payment signature verification failed');
      return NextResponse.json({ 
        success: false,
        message: 'Payment verification failed' 
      }, { status: 400 });
    }
    
    console.log('Payment signature verified successfully');
    
    // If payment is authentic, update product inventory
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      try {
        console.log(`Processing ${cartItems.length} items for inventory update`);
        
        // Process each cart item to update inventory
        const updatePromises = cartItems.map(item => {
          console.log(`Updating stock for product ID: ${item.id}, quantity: ${item.quantity}`);
          return updateProductStock(item.id, item.quantity);
        });
        
        // Wait for all inventory updates to complete
        await Promise.all(updatePromises);
        
        console.log('Successfully updated inventory for all products');
      } catch (error) {
        console.error('Error updating inventory:', error);
        // We still want to consider the payment successful even if inventory update fails
        // But we log the error for debugging
      }
    } else {
      console.warn('No cart items provided for inventory update or invalid cart items format');
    }
    
    // Payment verification successful
    return NextResponse.json({
      success: true,
      message: 'Payment verification successful',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    }, { status: 200 });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Error verifying payment' 
    }, { status: 500 });
  }
} 