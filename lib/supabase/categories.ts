import { supabase } from './config'

// Define category type
export type Category = {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error("Error getting categories:", error);
      // Return default categories if DB table doesn't exist
      return [
        { id: '1', name: 'Kanchipuram Silk' },
        { id: '2', name: 'Banarasi Silk' },
        { id: '3', name: 'Tussar Silk' },
        { id: '4', name: 'Patola Silk' },
        { id: '5', name: 'Wedding Collection' },
        { id: '6', name: 'Festive Collection' }
      ];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

// Get a single category
export async function getCategory(id: string): Promise<Category> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) throw new Error("Category not found");
    
    return data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
}

// Add a new category (admin panel)
export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}

// Update a category (admin panel)
export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  try {
    const { data, error } = await supabase
      .from('categories')
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
    console.error("Error updating category:", error);
    throw error;
  }
}

// Delete a category (admin panel)
export async function deleteCategory(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
