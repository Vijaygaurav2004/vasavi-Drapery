"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { addProduct, updateProduct, getProduct } from '@/lib/supabase/products'
import { getCategories } from '@/lib/supabase/categories'
import { Product, ColorVariant } from '@/types/product'

interface ProductFormProps {
  productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  
  // Product state
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    material: "",
    color: "",
    dimensions: "",
    weight: "",
    images: [],
    hasColorVariants: false,
    colorVariants: []
  })
  
  // Form state for image uploads
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([])
  
  // Load product data if editing
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load categories
        const categoriesData = await getCategories()
        setCategories(categoriesData)
        
        // If editing existing product, load its data
        if (productId) {
          const productData = await getProduct(productId)
          setProduct(productData)
          setImageUrls(productData.images || [])
          
          // Parse colorVariants if it's a string (could happen from database)
          if (typeof productData.colorVariants === 'string') {
            try {
              productData.colorVariants = JSON.parse(productData.colorVariants)
            } catch (e) {
              console.error('Error parsing colorVariants:', e)
              productData.colorVariants = []
            }
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        toast({
          title: "Error",
          description: "Failed to load product data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [productId, toast])
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  
  // Handle number inputs
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: parseFloat(value) || 0 })
  }
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setProduct({ ...product, category: value })
  }
  
  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files)
    // Create preview URLs
    const newImageUrls = newFiles.map(file => URL.createObjectURL(file))
    
    setImageUrls([...imageUrls, ...newImageUrls])
    setImagesToUpload([...imagesToUpload, ...newFiles])
  }
  
  // Remove image
  const removeImage = (index: number) => {
    const newImageUrls = [...imageUrls]
    newImageUrls.splice(index, 1)
    setImageUrls(newImageUrls)
    
    // If it's a new image to upload
    if (index < imagesToUpload.length) {
      const newImagesToUpload = [...imagesToUpload]
      newImagesToUpload.splice(index, 1)
      setImagesToUpload(newImagesToUpload)
    } else {
      // It's an existing image
      const newImages = [...product.images]
      newImages.splice(index - imagesToUpload.length, 1)
      setProduct({ ...product, images: newImages })
    }
  }
  
  // Toggle color variants
  const handleToggleColorVariants = (checked: boolean) => {
    setProduct({ 
      ...product, 
      hasColorVariants: checked,
      // Initialize with an empty variant if enabling
      colorVariants: checked && (!product.colorVariants || product.colorVariants.length === 0) 
        ? [{ color: '', images: [], stock: 0 }] 
        : product.colorVariants 
    })
  }
  
  // Add a new color variant
  const addColorVariant = () => {
    const newVariants = [...(product.colorVariants || [])]
    newVariants.push({ color: '', images: [], stock: 0 })
    setProduct({ ...product, colorVariants: newVariants })
  }
  
  // Remove a color variant
  const removeColorVariant = (index: number) => {
    const newVariants = [...(product.colorVariants || [])]
    newVariants.splice(index, 1)
    setProduct({ ...product, colorVariants: newVariants })
  }
  
  // Update a color variant
  const updateColorVariant = (index: number, field: keyof ColorVariant, value: any) => {
    const newVariants = [...(product.colorVariants || [])]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setProduct({ ...product, colorVariants: newVariants })
  }
  
  // Handle variant image upload
  const handleVariantImageUpload = (variantIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files)
    // Create image URLs (for demonstration, would need actual image handling in production)
    const newImageUrls = newFiles.map(file => URL.createObjectURL(file))
    
    const newVariants = [...(product.colorVariants || [])]
    newVariants[variantIndex] = { 
      ...newVariants[variantIndex], 
      images: [...newVariants[variantIndex].images, ...newImageUrls] 
    }
    
    setProduct({ ...product, colorVariants: newVariants })
  }
  
  // Remove variant image
  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const newVariants = [...(product.colorVariants || [])]
    const newImages = [...newVariants[variantIndex].images]
    newImages.splice(imageIndex, 1)
    
    newVariants[variantIndex] = { ...newVariants[variantIndex], images: newImages }
    setProduct({ ...product, colorVariants: newVariants })
  }
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // In a real application, you would upload images to storage here
      // For now, we'll just use the image URLs directly
      
      // Prepare the product data
      const productData: Product = {
        ...product,
        images: imageUrls,
      }
      
      // Add or update the product
      if (productId) {
        await updateProduct(productId, productData)
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
      } else {
        await addProduct(productData)
        toast({
          title: "Success",
          description: "Product added successfully",
        })
      }
      
      // Navigate back to products page
      router.push('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return <div className="text-center py-10">Loading product data...</div>
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name*</Label>
            <Input 
              id="name" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              rows={5} 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category*</Label>
            <Select 
              value={product.category} 
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)*</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                min="0" 
                step="0.01" 
                value={product.price} 
                onChange={handleNumberChange} 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="stock">Stock*</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                min="0" 
                value={product.stock} 
                onChange={handleNumberChange} 
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="material">Material</Label>
            <Input 
              id="material" 
              name="material" 
              value={product.material || ''} 
              onChange={handleChange} 
            />
          </div>
          
          <div>
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input 
              id="dimensions" 
              name="dimensions" 
              value={product.dimensions || ''} 
              onChange={handleChange} 
              placeholder="e.g. 5.5 meters" 
            />
          </div>
          
          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input 
              id="weight" 
              name="weight" 
              value={product.weight || ''} 
              onChange={handleChange} 
              placeholder="e.g. 800g" 
            />
          </div>
          
          <div>
            <Label htmlFor="color">Primary Color</Label>
            <Input 
              id="color" 
              name="color" 
              value={product.color || ''} 
              onChange={handleChange} 
              placeholder="e.g. Royal Blue" 
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="hasColorVariants" 
            checked={product.hasColorVariants} 
            onCheckedChange={handleToggleColorVariants} 
          />
          <Label htmlFor="hasColorVariants">This product has color variants</Label>
        </div>
        
        {product.hasColorVariants ? (
          <div className="space-y-6 border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Color Variants</h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addColorVariant}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Variant
              </Button>
            </div>
            
            {product.colorVariants && product.colorVariants.map((variant, index) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Variant {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeColorVariant(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`variant-${index}-color`}>Color Name*</Label>
                    <Input 
                      id={`variant-${index}-color`} 
                      value={variant.color} 
                      onChange={(e) => updateColorVariant(index, 'color', e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`variant-${index}-stock`}>Stock*</Label>
                    <Input 
                      id={`variant-${index}-stock`} 
                      type="number" 
                      min="0" 
                      value={variant.stock} 
                      onChange={(e) => updateColorVariant(index, 'stock', parseInt(e.target.value) || 0)} 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Variant Images</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
                    {variant.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative aspect-square rounded-md overflow-hidden border">
                        <img 
                          src={image} 
                          alt={`${variant.color} variant ${imageIndex + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        <button 
                          type="button" 
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                          onClick={() => removeVariantImage(index, imageIndex)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    
                    <label className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                      <Upload className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleVariantImageUpload(index, e)}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Label className="block mb-2">Product Images</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-2">
              {imageUrls.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button" 
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Add Images</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin/products')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? 'Saving...' : productId ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  )
} 