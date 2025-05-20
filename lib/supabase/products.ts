// lib/supabase/products.ts
import { supabase } from './config'
import { Product, ColorVariant } from '@/types/product'

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
    
    // Process each product to parse colorVariants
    const processedData = data.map(product => {
      if (product.colorVariants && typeof product.colorVariants === 'string') {
        try {
          product.colorVariants = JSON.parse(product.colorVariants);
        } catch (e) {
          console.error(`Error parsing colorVariants for product ${product.id}:`, e);
          product.colorVariants = [];
        }
      }
      return product;
    });
    
    return processedData || [];
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
    
    // Parse colorVariants from JSON string if they exist
    if (data.colorVariants && typeof data.colorVariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorVariants);
        console.log("Parsed colorVariants in getProduct function:", data.colorVariants);
      } catch (e) {
        console.error("Error parsing colorVariants in getProduct function:", e);
        data.colorVariants = [];
      }
    }
    
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
    // Remove colorVariants temporarily before insert if it exists
    // since we need to specially handle JSON serialization
    const { colorVariants, ...productData } = product;
    
    // Create a sanitized product object with properly formatted colorVariants
    const sanitizedProduct = {
      ...productData,
      // Only add colorVariants if hasColorVariants is true
      ...(product.hasColorVariants && { 
        colorVariants: JSON.stringify(colorVariants || []) 
      })
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([sanitizedProduct])
      .select()
      .single();
    
    if (error) throw error;
    
    // Parse colorVariants back to object if it exists
    if (data.colorVariants && typeof data.colorVariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorVariants);
      } catch (e) {
        console.error('Error parsing colorVariants:', e);
        data.colorVariants = [];
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Function to add a color variant to a product
export async function addColorVariant(productId: string, colorVariant: ColorVariant): Promise<Product> {
  try {
    // First get the current product
    const product = await getProduct(productId);
    
    // Ensure product has colorVariants array
    const currentVariants = Array.isArray(product.colorVariants) ? product.colorVariants : [];
    
    // Add the new color variant
    const updatedVariants = [...currentVariants, colorVariant];
    
    // Update the product
    const updatedProduct = await updateProduct(productId, {
      hasColorVariants: true,
      colorVariants: updatedVariants
    });
    
    return updatedProduct;
  } catch (error) {
    console.error("Error adding color variant:", error);
    throw error;
  }
}

// Function to update a specific color variant
export async function updateColorVariant(
  productId: string, 
  variantIndex: number, 
  updates: Partial<ColorVariant>
): Promise<Product> {
  try {
    // First get the current product
    const product = await getProduct(productId);
    
    // Ensure product has colorVariants array
    if (!Array.isArray(product.colorVariants) || !product.colorVariants[variantIndex]) {
      throw new Error("Color variant not found");
    }
    
    // Create a copy of the variants array
    const updatedVariants = [...product.colorVariants];
    
    // Update the specific variant
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      ...updates
    };
    
    // Update the product
    const updatedProduct = await updateProduct(productId, {
      colorVariants: updatedVariants
    });
    
    return updatedProduct;
  } catch (error) {
    console.error("Error updating color variant:", error);
    throw error;
  }
}

// Update a product (admin panel)
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  try {
    // Handle colorVariants separately for update
    const { colorVariants, ...updateData } = updates;
    
    // Create a sanitized update object
    const sanitizedUpdates = {
      ...updateData,
      updated_at: new Date().toISOString(),
      // Only include colorVariants if it exists and product has color variants
      ...(updates.hasColorVariants !== false && colorVariants && { 
        colorVariants: JSON.stringify(colorVariants) 
      })
    };
    
    const { data, error } = await supabase
      .from('products')
      .update(sanitizedUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Parse colorVariants back to object if it exists
    if (data.colorVariants && typeof data.colorVariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorVariants);
      } catch (e) {
        console.error('Error parsing colorVariants:', e);
        data.colorVariants = [];
      }
    }
    
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

// Get all featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('featured_products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting featured products:", error);
    throw error;
  }
}

// Get random products
export async function getRandomProducts(limit: number = 3, excludeId?: string): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*');
    
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    // Fetch products
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Shuffle the array to get random products
    const shuffled = data ? [...data].sort(() => 0.5 - Math.random()) : [];
    
    // Return limited number of products
    const randomProducts = shuffled.slice(0, limit);
    
    // Process each product to parse colorVariants
    const processedData = randomProducts.map(product => {
      if (product.colorVariants && typeof product.colorVariants === 'string') {
        try {
          product.colorVariants = JSON.parse(product.colorVariants);
        } catch (e) {
          console.error(`Error parsing colorVariants for product ${product.id}:`, e);
          product.colorVariants = [];
        }
      }
      return product;
    });
    
    return processedData;
  } catch (error) {
    console.error("Error getting random products:", error);
    throw error;
  }
}