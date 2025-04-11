// lib/firebase/products.ts (in your main website)
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { db } from "./config";

// Define types
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
};

// Get all products
export async function getProducts(category?: string) {
  try {
    let productsQuery;
    
    if (category) {
      productsQuery = query(
        collection(db, "products"),
        where("category", "==", category),
        where("stock", ">", 0), // Only display in-stock items
        orderBy("createdAt", "desc")
      );
    } else {
      productsQuery = query(
        collection(db, "products"),
        where("stock", ">", 0), // Only display in-stock items
        orderBy("createdAt", "desc")
      );
    }
    
    const querySnapshot = await getDocs(productsQuery);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}

// Get a single product
export async function getProduct(id: string) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
}

// Check if product is in stock
export async function checkProductStock(id: string) {
  try {
    const product = await getProduct(id);
    return { inStock: product.stock > 0, stock: product.stock };
  } catch (error) {
    console.error("Error checking product stock:", error);
    throw error;
  }
}