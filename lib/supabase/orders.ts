// lib/supabase/orders.ts
import { supabase } from './config';

// Type for order items
export interface OrderItem {
  id: string;
  product_id: string;
  order_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Type for orders
export interface Order {
  id?: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

// Create a new order
export async function createOrder(order: Omit<Order, 'id'>): Promise<Order> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Create order items
export async function createOrderItems(items: Omit<OrderItem, 'id'>[]): Promise<OrderItem[]> {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .insert(items)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order items:', error);
    throw error;
  }
}

// Get order by Razorpay order ID
export async function getOrderByRazorpayOrderId(razorpayOrderId: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('razorpay_order_id', razorpayOrderId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting order by Razorpay order ID:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string, 
  status: Order['status'], 
  paymentId?: string
): Promise<Order> {
  try {
    const updates: Partial<Order> = {
      status,
      updated_at: new Date().toISOString()
    };
    
    if (paymentId) {
      updates.razorpay_payment_id = paymentId;
    }
    
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Update order status by Razorpay order ID
export async function updateOrderStatusByRazorpayOrderId(
  razorpayOrderId: string, 
  status: Order['status'], 
  paymentId?: string
): Promise<Order> {
  try {
    const updates: Partial<Order> = {
      status,
      updated_at: new Date().toISOString()
    };
    
    if (paymentId) {
      updates.razorpay_payment_id = paymentId;
    }
    
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('razorpay_order_id', razorpayOrderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating order status by Razorpay order ID:', error);
    throw error;
  }
} 