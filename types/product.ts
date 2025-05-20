export interface ColorVariant {
  color: string;
  images: string[];
  stock: number;
}

export type Product = {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  material?: string;
  color?: string; // Main color (for backward compatibility)
  dimensions?: string;
  weight?: string;
  images: string[];
  colorVariants?: ColorVariant[]; // Color variants with separate images
  created_at?: string;
  updated_at?: string;
  discountedPrice?: number;
  label?: string;
  featured_id?: string;  // ID when product is in featured collection
  hasColorVariants?: boolean; // Flag to indicate if product has color variants
}; 