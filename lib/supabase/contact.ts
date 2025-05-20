import { supabase } from './config'

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};

// Submit contact form to Supabase
export async function submitContactForm(formData: Omit<ContactMessage, 'created_at'>): Promise<boolean> {
  try {
    // First try the contact_messages table
    let { error } = await supabase
      .from('contact_messages')
      .insert([{
        ...formData,
        created_at: new Date().toISOString()
      }]);
    
    // If contact_messages doesn't exist, try using the products table as a fallback
    // with a special category to identify it as a contact message
    if (error) {
      console.log("Falling back to products table");
      const { error: fallbackError } = await supabase
        .from('products')
        .insert([{
          name: `Contact from: ${formData.name}`,
          description: formData.message,
          category: 'contact_message',
          price: 0,
          stock: 0,
          images: [],
          email: formData.email, // Store email in a metadata field if available
          subject: formData.subject,
          created_at: new Date().toISOString()
        }]);
      
      if (fallbackError) throw fallbackError;
    }
    
    return true;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return false;
  }
} 