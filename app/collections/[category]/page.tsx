"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Filter, X } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/product-card"

// This would typically come from an API based on the category
const products = [
  {
    id: "1",
    name: "Royal Kanjivaram Silk Saree",
    price: 12999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Kanjivaram",
    color: "red",
  },
  {
    id: "2",
    name: "Banarasi Silk Wedding Saree",
    price: 15999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Banarasi",
    color: "gold",
  },
  {
    id: "3",
    name: "Tussar Silk Festive Saree",
    price: 8999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Tussar",
    color: "green",
  },
  {
    id: "4",
    name: "Mysore Silk Traditional Saree",
    price: 9999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Mysore",
    color: "blue",
  },
  {
    id: "5",
    name: "Designer Patola Silk Saree",
    price: 18999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Patola",
    color: "purple",
  },
  {
    id: "6",
    name: "Embroidered Kanjivaram Silk",
    price: 14599,
    image: "/placeholder.svg?height=600&width=600",
    category: "Kanjivaram",
    color: "gold",
  },
  {
    id: "7",
    name: "Zari Work Banarasi Saree",
    price: 16999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Banarasi",
    color: "red",
  },
  {
    id: "8",
    name: "Handloom Tussar Silk Saree",
    price: 7999,
    image: "/placeholder.svg?height=600&width=600",
    category: "Tussar",
    color: "beige",
  },
]

const colors = [
  { id: "red", name: "Red", value: "red" },
  { id: "gold", name: "Gold", value: "gold" },
  { id: "green", name: "Green", value: "green" },
  { id: "blue", name: "Blue", value: "blue" },
  { id: "purple", name: "Purple", value: "purple" },
  { id: "beige", name: "Beige", value: "beige" },
]

const fabricTypes = [
  { id: "pure-silk", name: "Pure Silk" },
  { id: "art-silk", name: "Art Silk" },
  { id: "cotton-silk", name: "Cotton Silk" },
  { id: "organza", name: "Organza Silk" },
]

export default function CategoryPage({ params }: { params: { category: string } }) {
  const unwrappedParams = React.use(params);
  const category = unwrappedParams.category.charAt(0).toUpperCase() + unwrappedParams.category.slice(1)

  const [priceRange, setPriceRange] = useState([5000, 20000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => (prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]))
  }

  const toggleFabric = (fabricId: string) => {
    setSelectedFabrics((prev) => (prev.includes(fabricId) ? prev.filter((id) => id !== fabricId) : [...prev, fabricId]))
  }

  const clearFilters = () => {
    setPriceRange([5000, 20000])
    setSelectedColors([])
    setSelectedFabrics([])
  }

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (category.toLowerCase() !== "all" && product.category.toLowerCase() !== category.toLowerCase()) {
      return false
    }

    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by color
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false
    }

    return true
  })

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={5000}
          max={20000}
          step={1000}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Colors</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center">
              <Checkbox
                id={`color-${color.id}`}
                checked={selectedColors.includes(color.value)}
                onCheckedChange={() => toggleColor(color.value)}
              />
              <label
                htmlFor={`color-${color.id}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-4">Fabric Type</h3>
        <div className="space-y-2">
          {fabricTypes.map((fabric) => (
            <div key={fabric.id} className="flex items-center">
              <Checkbox
                id={`fabric-${fabric.id}`}
                checked={selectedFabrics.includes(fabric.id)}
                onCheckedChange={() => toggleFabric(fabric.id)}
              />
              <label
                htmlFor={`fabric-${fabric.id}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fabric.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/collections" className="text-muted-foreground hover:text-primary">
          Collections
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">{category}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <h2 className="text-lg font-bold mb-6">Filters</h2>
          <FilterContent />
        </div>

        {/* Filters - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterContent />
          </SheetContent>
        </Sheet>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{category} Collection</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

