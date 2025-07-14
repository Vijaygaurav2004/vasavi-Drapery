import { NextRequest, NextResponse } from 'next/server';
import { getProductPurchaseHistory } from '@/lib/supabase/orders';

export async function GET(request: NextRequest) {
  try {
    // Get product ID from query parameter
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json({ error: 'Product ID parameter is required' }, { status: 400 });
    }
    
    // Get purchase history for the product
    const purchases = await getProductPurchaseHistory(productId);
    
    return NextResponse.json({ 
      success: true,
      purchases 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product purchase history:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error fetching product purchase history' 
    }, { status: 500 });
  }
} 