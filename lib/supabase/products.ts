// lib/supabase/products.ts
import { supabase } from './config'

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  material?: string;
  color?: string;
  dimensions?: string;
  weight?: string;
  images: string[];
  created_at?: string;
  updated_at?: string;
};

// Get all products
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

// Get a single product
export async function getProduct(id: string): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) throw new Error("Product not found");
    
    return data;
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
}

// Check if product is in stock
export async function checkProductStock(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('stock')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { 
      inStock: data.stock > 0, 
      stock: data.stock 
    };
  } catch (error) {
    console.error("Error checking product stock:", error);
    throw error;
  }
}

// Add a new product (admin panel)
export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Update a product (admin panel)
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product (admin panel)
export async function deleteProduct(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}