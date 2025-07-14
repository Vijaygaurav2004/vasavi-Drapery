// lib/supabase/orders.ts
import { supabase } from './config';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  colorName?: string;
  colorCode?: string;
}

export interface Order {
  id?: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  items: OrderItem[];
  created_at?: string;
}

export interface UserPurchase {
  id?: string;
  user_email: string;
  user_name: string;
  user_phone?: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  color_name?: string;
  color_code?: string;
  order_id: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  purchase_date?: string;
  status?: string;
}

// Create a new order
export async function createOrder(orderData: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
  try {
    console.log('Creating order with data:', JSON.stringify(orderData, null, 2));
    
    // Convert items array to JSON string for storage
    const orderWithSerializedItems = {
      ...orderData,
      items: JSON.stringify(orderData.items)
    };
    
    const { data, error } = await supabase
      .from('orders')
      .insert([orderWithSerializedItems])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    
    // Parse items back to object
    const order = {
      ...data,
      items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items
    };
    
    console.log('Order created successfully:', order.id);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Update order status and payment ID
export async function updateOrderPayment(
  razorpayOrderId: string, 
  razorpayPaymentId: string, 
  status: 'paid' | 'failed' | 'cancelled'
): Promise<Order | null> {
  try {
    console.log(`Updating order ${razorpayOrderId} with payment ${razorpayPaymentId} and status ${status}`);
    
    const { data, error } = await supabase
      .from('orders')
      .update({
        razorpay_payment_id: razorpayPaymentId,
        status
      })
      .eq('razorpay_order_id', razorpayOrderId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating order payment:', error);
      throw error;
    }
    
    if (!data) {
      console.warn(`No order found with razorpay_order_id: ${razorpayOrderId}`);
      return null;
    }
    
    // Parse items back to object
    const order = {
      ...data,
      items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items
    };
    
    console.log('Order payment updated successfully');
    
    // If payment was successful, create user purchase records
    if (status === 'paid') {
      try {
        await createUserPurchasesFromOrder(order);
      } catch (purchaseError) {
        console.error('Error creating user purchase records:', purchaseError);
        // Don't throw error here, we still want to return the updated order
      }
    }
    
    return order;
  } catch (error) {
    console.error('Error updating order payment:', error);
    throw error;
  }
}

// Create user purchase records from an order
export async function createUserPurchasesFromOrder(order: Order): Promise<void> {
  try {
    if (!order.id) {
      throw new Error('Order ID is required');
    }
    
    console.log(`Creating user purchase records for order ${order.id}`);
    
    // Create a purchase record for each item in the order
    const purchaseRecords: Omit<UserPurchase, 'id'>[] = order.items.map(item => ({
      user_email: order.customer_email,
      user_name: order.customer_name,
      user_phone: order.customer_phone,
      product_id: item.id,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
      color_name: item.colorName,
      color_code: item.colorCode,
      order_id: order.id!,
      razorpay_order_id: order.razorpay_order_id,
      razorpay_payment_id: order.razorpay_payment_id,
      status: 'completed'
    }));
    
    const { error } = await supabase
      .from('user_purchases')
      .insert(purchaseRecords);
    
    if (error) {
      console.error('Error creating user purchase records:', error);
      throw error;
    }
    
    console.log(`Successfully created ${purchaseRecords.length} user purchase records`);
  } catch (error) {
    console.error('Error creating user purchase records:', error);
    throw error;
  }
}

// Get purchase history for a product
export async function getProductPurchaseHistory(productId: string): Promise<UserPurchase[]> {
  try {
    const { data, error } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('product_id', productId)
      .order('purchase_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching product purchase history:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching product purchase history:', error);
    throw error;
  }
}

// Get order by Razorpay order ID
export async function getOrderByRazorpayOrderId(razorpayOrderId: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpayOrderId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching order:', error);
      throw error;
    }
    
    if (!data) return null;
    
    // Parse items back to object
    const order = {
      ...data,
      items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items
    };
    
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching order:', error);
      throw error;
    }
    
    if (!data) return null;
    
    // Parse items back to object
    const order = {
      ...data,
      items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items
    };
    
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Get orders for a customer by email
export async function getOrdersByCustomerEmail(email: string): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
    
    // Parse items for each order
    const orders = data.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
    }));
    
    return orders;
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
} 