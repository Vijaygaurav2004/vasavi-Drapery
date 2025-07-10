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
    try {
    const savedCart = localStorage.getItem('cart');
      console.log("Loading cart from localStorage:", savedCart);
      
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log("Parsed cart:", parsedCart);
        setItems(parsedCart);
      }
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", items);
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product: any) => {
    // First check if the product is still in stock
    try {
      console.log("Cart context addToCart called with:", product);
      console.log("Product quantity type:", typeof product.quantity);
      
      const { inStock, stock } = await checkProductStock(product.id);
      console.log("Stock check result:", { inStock, stock });
      
      if (!inStock) {
        toast({
          title: "Out of Stock",
          description: "Sorry, this product is currently out of stock.",
          variant: "destructive"
        });
        return;
      }
      
      // Get the quantity to add (default to 1 if not provided)
      const quantityToAdd = Number(product.quantity) || 1;
      console.log("Quantity to add (after conversion):", quantityToAdd, "Original:", product.quantity);
      
      // Continue with existing add to cart logic...
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        console.log("Existing item in cart:", existingItem);
        
        if (existingItem) {
          // Check if adding more would exceed available stock
          if (existingItem.quantity + quantityToAdd > stock) {
            toast({
              title: "Stock Limit Reached",
              description: `Sorry, only ${stock} items available in stock.`,
              variant: "destructive"
            });
            return currentItems;
          }
          
          const updatedItems = currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
          console.log("Updated cart items:", updatedItems);
          return updatedItems;
        }
        
        const newItems = [...currentItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantityToAdd
        }];
        console.log("New cart items:", newItems);
        return newItems;
      });
      
      // Dispatch custom event to update cart count in real-time
      if (typeof window !== 'undefined') {
        console.log("Dispatching cartUpdated event");
        window.dispatchEvent(new Event('cartUpdated'));
      }
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