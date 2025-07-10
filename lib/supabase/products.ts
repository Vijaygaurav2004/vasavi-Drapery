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
      // Handle lowercase column names from database
      if (product.colorvariants && typeof product.colorvariants === 'string') {
        try {
          product.colorVariants = JSON.parse(product.colorvariants);
        } catch (e) {
          console.error(`Error parsing colorVariants for product ${product.id}:`, e);
          product.colorVariants = [];
        }
      }
      
      // Map hascolorvariants to hasColorVariants for consistency in the app
      if ('hascolorvariants' in product) {
        product.hasColorVariants = product.hascolorvariants;
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
    
    // Parse colorVariants from JSON string if they exist (handle lowercase column name)
    if (data.colorvariants && typeof data.colorvariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorvariants);
        console.log("Parsed colorVariants in getProduct function:", data.colorVariants);
      } catch (e) {
        console.error("Error parsing colorVariants in getProduct function:", e);
        data.colorVariants = [];
      }
    }
    
    // Map hascolorvariants to hasColorVariants for consistency in the app
    if ('hascolorvariants' in data) {
      data.hasColorVariants = data.hascolorvariants;
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

// Update product stock after purchase
export async function updateProductStock(id: string, quantity: number): Promise<void> {
  try {
    console.log(`Starting stock update for product ${id} with quantity ${quantity}`);
    
    // Ensure quantity is a valid number and greater than 0
    const qtyToDeduct = Math.max(1, Number(quantity) || 1);
    console.log(`Quantity to deduct (after validation): ${qtyToDeduct}`);
    
    // First get the current stock - only select the stock column to avoid case sensitivity issues
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error(`Error fetching product ${id}:`, fetchError);
      throw fetchError;
    }
    
    if (!data) {
      console.error(`Product ${id} not found`);
      throw new Error("Product not found");
    }
    
    console.log(`Current stock for product ${id}: ${data.stock}`);
    
    // Calculate new stock and ensure it's not negative
    let newStock = Math.max(0, data.stock - qtyToDeduct);
    console.log(`Calculated new stock: ${newStock}`);
    
    // Update the main product stock
    const { data: updateData, error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', id)
      .select();
    
    if (updateError) {
      console.error(`Error updating stock for product ${id}:`, updateError);
      throw updateError;
    }
    
    console.log(`Update response:`, updateData);
    
    // Verify the update was successful by fetching the product again
    const { data: verifyData, error: verifyError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', id)
      .single();
      
    if (verifyError) {
      console.error(`Error verifying stock update for product ${id}:`, verifyError);
    } else {
      console.log(`Verified stock after update for product ${id}: ${verifyData.stock}`);
    }
    
    console.log(`Successfully updated stock for product ${id}: ${data.stock} -> ${newStock}`);
  } catch (error) {
    console.error(`Error updating stock for product ${id}:`, error);
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
        colorvariants: JSON.stringify(colorVariants || []) // lowercase column name
      }),
      // Use lowercase column name
      hascolorvariants: product.hasColorVariants
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([sanitizedProduct])
      .select()
      .single();
    
    if (error) throw error;
    
    // Parse colorVariants back to object if it exists
    if (data.colorvariants && typeof data.colorvariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorvariants);
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
    const { colorVariants, hasColorVariants, ...updateData } = updates;
    
    // Create a sanitized update object
    const sanitizedUpdates = {
      ...updateData,
      updated_at: new Date().toISOString(),
      // Use lowercase column names for database
      ...(hasColorVariants !== undefined && { hascolorvariants: hasColorVariants }),
      // Only include colorVariants if it exists and product has color variants
      ...(updates.hasColorVariants !== false && colorVariants && { 
        colorvariants: JSON.stringify(colorVariants) 
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
    if (data.colorvariants && typeof data.colorvariants === 'string') {
      try {
        data.colorVariants = JSON.parse(data.colorvariants);
      } catch (e) {
        console.error('Error parsing colorVariants:', e);
        data.colorVariants = [];
      }
    }
    
    // Map hascolorvariants to hasColorVariants for consistency in the app
    if ('hascolorvariants' in data) {
      data.hasColorVariants = data.hascolorvariants;
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