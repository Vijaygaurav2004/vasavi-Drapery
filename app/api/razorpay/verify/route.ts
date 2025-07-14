import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateProductStock } from '@/lib/supabase/products';
import { updateOrderPayment } from '@/lib/supabase/orders';

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
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
    
    if (!KEY_SECRET) {
      console.error('Razorpay API key secret not configured');
      return NextResponse.json({ 
        success: false,
        message: 'Payment gateway configuration error' 
      }, { status: 500 });
    }
    
    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
    
    const isAuthentic = generatedSignature === razorpay_signature;
    
    if (!isAuthentic) {
      console.error('Payment signature verification failed');
      console.error('Generated signature:', generatedSignature);
      console.error('Received signature:', razorpay_signature);
      return NextResponse.json({ 
        success: false,
        message: 'Payment verification failed' 
      }, { status: 400 });
    }
    
    console.log('Payment signature verified successfully');
    
    // Update order status in database
    try {
      await updateOrderPayment(razorpay_order_id, razorpay_payment_id, 'paid');
      console.log('Order payment status updated to paid');
    } catch (error) {
      console.error('Error updating order payment status:', error);
      // Continue processing - we don't want to fail the payment confirmation
    }
    
    // If payment is authentic, update product inventory
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      try {
        console.log(`Processing ${cartItems.length} items for inventory update`);
        
        // Add detailed logging for each cart item
        cartItems.forEach(item => {
          console.log(`Cart item details - ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity || 1}, Type: ${typeof item.quantity}`);
          
          // Check if quantity is properly formatted
          if (item.quantity === undefined || item.quantity === null) {
            console.warn(`Cart item ${item.id} has no quantity defined, defaulting to 1`);
          } else if (typeof item.quantity !== 'number') {
            console.warn(`Cart item ${item.id} has non-numeric quantity: ${item.quantity} (${typeof item.quantity}), attempting to convert`);
          }
        });
        
        // Process each cart item to update inventory
        const updatePromises = cartItems.map(item => {
          // Ensure quantity is a valid number
          const qty = Number(item.quantity) || 1;
          console.log(`Updating stock for product ID: ${item.id}, quantity: ${qty} (original: ${item.quantity})`);
          return updateProductStock(item.id, qty);
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