// app/context/cart-context.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { checkProductStock } from '@/lib/supabase/products'
import { useToast } from "@/components/ui/use-toast"

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: any) => {
    // First check if the product is still in stock
    try {
      const { inStock, stock } = await checkProductStock(product.id);
      
      if (!inStock) {
        toast({
          title: "Out of Stock",
          description: "Sorry, this product is currently out of stock.",
          variant: "destructive"
        });
        return;
      }
      
      // Continue with existing add to cart logic...
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (existingItem) {
          // Check if adding more would exceed available stock
          if (existingItem.quantity + 1 > stock) {
            toast({
              title: "Stock Limit Reached",
              description: `Sorry, only ${stock} items available in stock.`,
              variant: "destructive"
            });
            return currentItems;
          }
          
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        
        return [...currentItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      });
    } catch (error) {
      console.error('Error checking stock:', error);
      toast({
        title: "Error",
        description: "Could not add to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate cart count and total
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}