"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useToast } from "@/components/ui/use-toast"

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
}

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [items, setItems] = useState<WishlistItem[]>([]);
  
  // Use refs to track actions that need toasts
  const toastActionRef = useRef<{
    type: 'add' | 'remove' | 'clear' | 'exists',
    data?: any
  } | null>(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage:', e);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  // Handle toast notifications separately from state updates
  useEffect(() => {
    if (toastActionRef.current) {
      const { type, data } = toastActionRef.current;
      
      switch (type) {
        case 'add':
          toast({
            title: "Added to Wishlist",
            description: "Item has been added to your wishlist.",
          });
          break;
        case 'remove':
          toast({
            title: "Removed from Wishlist",
            description: "Item has been removed from your wishlist."
          });
          break;
        case 'clear':
          toast({
            title: "Wishlist Cleared",
            description: "All items have been removed from your wishlist."
          });
          break;
        case 'exists':
          toast({
            title: "Already in Wishlist",
            description: "This item is already in your wishlist."
          });
          break;
      }
      
      // Reset the ref after showing toast
      toastActionRef.current = null;
    }
  }, [items, toast]);

  const addToWishlist = (product: any) => {
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Item already exists, just set the toast ref without changing state
      toastActionRef.current = { type: 'exists' };
      return;
    }
    
    // Add the item and set toast ref
    setItems(currentItems => [
      ...currentItems, 
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder-image.jpg"
      }
    ]);
    toastActionRef.current = { type: 'add', data: product };
  };

  const removeFromWishlist = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
    toastActionRef.current = { type: 'remove', data: productId };
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toastActionRef.current = { type: 'clear' };
  };

  // Calculate wishlist count
  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
}