import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateProductStock } from '@/lib/supabase/products';
import { 
  getOrderByRazorpayOrderId, 
  updateOrderPayment, 
  createUserPurchasesFromOrder 
} from '@/lib/supabase/orders';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    console.log('Received webhook event:', body.event);
    
    // Get Razorpay webhook signature from headers
    const razorpaySignature = request.headers.get('x-razorpay-signature');
    
    if (!razorpaySignature) {
      console.error('Missing Razorpay signature in webhook request');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }
    
    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');
    
    const isSignatureValid = expectedSignature === razorpaySignature;
    
    if (!isSignatureValid) {
      console.error('Invalid webhook signature');
      console.error('Expected:', expectedSignature);
      console.error('Received:', razorpaySignature);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    // Process different webhook events
    const { event, payload } = body;
    
    console.log('Processing webhook event:', event);
    console.log('Event payload summary:', {
      event,
      paymentId: payload.payment?.entity?.id,
      orderId: payload.payment?.entity?.order_id || payload.order?.entity?.id
    });
    
    // Handle different event types
    switch (event) {
      case 'payment.authorized':
      case 'payment.captured':
      case 'order.paid':
        // Process successful payment
        await processSuccessfulPayment(payload);
        break;
        
      case 'payment.failed':
        // Process failed payment
        await processFailedPayment(payload);
        break;
        
      default:
        console.log('Unhandled webhook event:', event);
    }
    
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Process successful payment and update inventory
async function processSuccessfulPayment(payload: any) {
  try {
    // Get order ID from the payload
    const orderId = payload.payment?.entity?.order_id || 
                   payload.order?.entity?.id || 
                   '';
    
    const paymentId = payload.payment?.entity?.id || '';
    
    if (!orderId) {
      console.error('No order ID found in webhook payload');
      return;
    }
    
    console.log('Processing successful payment for order:', orderId);
    
    // Update order status in database
    const updatedOrder = await updateOrderPayment(orderId, paymentId, 'paid');
    
    if (!updatedOrder) {
      console.error('Order not found in database:', orderId);
      return;
    }
    
    console.log('Order updated successfully:', updatedOrder.id);
    
    // Create user purchase records
    try {
      await createUserPurchasesFromOrder(updatedOrder);
      console.log('User purchase records created successfully');
    } catch (error) {
      console.error('Error creating user purchase records:', error);
    }
    
    // Get order details from database
    const order = await getOrderByRazorpayOrderId(orderId);
    
    if (order && order.items && order.items.length > 0) {
      console.log(`Processing ${order.items.length} items for inventory update`);
      
      const updatePromises = order.items.map(item => {
        console.log(`Updating stock for item: ${item.id}, quantity: ${item.quantity}`);
        return updateProductStock(item.id, item.quantity || 1);
      });
      
      await Promise.all(updatePromises);
      console.log('Successfully updated inventory for all products in order:', orderId);
    } else {
      console.warn('No items found in order or order not found:', orderId);
    }
  } catch (error) {
    console.error('Error processing successful payment:', error);
  }
}

// Process failed payment
async function processFailedPayment(payload: any) {
  try {
    const orderId = payload.payment?.entity?.order_id || '';
    const paymentId = payload.payment?.entity?.id || '';
    
    if (!orderId) {
      console.error('No order ID found in failed payment payload');
      return;
    }
    
    console.log('Processing failed payment for order:', orderId);
    
    // Update order status to failed
    await updateOrderPayment(orderId, paymentId, 'failed');
    
    console.log('Order status updated to failed for order:', orderId);
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
} 