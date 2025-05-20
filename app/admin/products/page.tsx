"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProducts, deleteProduct } from '@/lib/supabase/products'
import { Product } from '@/types/product'
import { useToast } from "@/components/ui/use-toast"

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [toast])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeleting(id)
    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => router.push('/admin/products/new')}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading products...</div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-4">No products found.</p>
            <Button onClick={() => router.push('/admin/products/new')}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex items-center p-4 border-b">
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ₹{product.price.toLocaleString()} • {product.category}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {product.hasColorVariants && (
                    <div className="flex space-x-1 mr-4">
                      {product.colorVariants && product.colorVariants.map((variant, index) => (
                        <div 
                          key={index}
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: variant.color }}
                          title={variant.color}
                        />
                      ))}
                    </div>
                  )}
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => product.id && handleDelete(product.id)}
                    disabled={deleting === product.id}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> 
                    {deleting === product.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 