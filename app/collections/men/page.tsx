"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X, ChevronDown, CheckIcon, ArrowUpDown, Filter, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
import { getProducts, Product } from "@/lib/supabase/products"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Categories for men's page
const categories = [
  { id: "all", name: "All Products" },
  { id: "dhothi", name: "Dhothi" },
  { id: "fabric", name: "Fabric" },
  { id: "kurta", name: "Kurta" },
  { id: "accessories", name: "Accessories" },
]

// Colors for filtering
const colors = [
  { id: "white", name: "White", hex: "#f8fafc" },
  { id: "cream", name: "Cream", hex: "#f5f5dc" },
  { id: "beige", name: "Beige", hex: "#f5f5dc" },
  { id: "gold", name: "Gold", hex: "#d4af37" },
  { id: "brown", name: "Brown", hex: "#92400e" },
  { id: "black", name: "Black", hex: "#171717" },
  { id: "gray", name: "Gray", hex: "#6b7280" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "maroon", name: "Maroon", hex: "#800000" },
  { id: "green", name: "Green", hex: "#22c55e" },
]

// Sorting options
const sortOptions = [
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "newest", name: "Newest" },
  { id: "popular", name: "Popular" }
]

export default function MensCollectionPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sortOption, setSortOption] = useState("newest")
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const { addToCart } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [activeFilters, setActiveFilters] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const allProducts = await getProducts()
        // Filter men's products
        const mensProducts = allProducts.filter(product => 
          product.category === "Dhothi" ||
          product.category === "Fabric" ||
          product.category === "men" ||
          product.category === "Kurta" ||
          product.category === "Accessories" ||
          product.category?.toLowerCase().includes("men")
        )
        setProducts(mensProducts)
        setFilteredProducts(mensProducts)
        
        // Find the highest price for the price range filter
        const highestPrice = Math.max(...mensProducts.map(p => p.price || 0))
        setMaxPrice(highestPrice > 0 ? highestPrice : 100000)
        setPriceRange([0, highestPrice > 0 ? highestPrice : 100000])
      } catch (error) {
        console.error("Error loading products:", error)
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [toast])

  // Apply all filters, search and sorting
  useEffect(() => {
    let result = [...products]
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(product => 
        product.name?.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter(product => {
        const productCategory = product.category || '';
        return productCategory.toLowerCase() === activeCategory.toLowerCase();
      });
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        selectedColors.some(color => 
          product.color?.toLowerCase().includes(color.toLowerCase())
        )
      )
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case "newest":
        result.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
          return dateB - dateA
        })
        break
      case "popular":
        // This would ideally use a popularity metric like sales count
        // For now just keep default order
        break
    }
    
    setFilteredProducts(result)
    
    // Count active filters for badge
    let filterCount = 0
    if (searchQuery.trim() !== "") filterCount++
    if (activeCategory !== "all") filterCount++
    if (selectedColors.length > 0) filterCount++
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) filterCount++
    setActiveFilters(filterCount)
    
  }, [products, activeCategory, selectedColors, priceRange, sortOption, maxPrice, searchQuery])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    // Scroll to products section with smooth behavior
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id)
    
    try {
      // Add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg",
      })

      // Show success message
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        duration: 2000
      })
      
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
        duration: 2000
      })
    } finally {
      setAddingToCart(null)
    }
  }

  const openQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewProduct(product)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }

  // Handle clicking outside the modal to close it
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeQuickView()
    }
  }
  
  const toggleColorSelection = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    )
  }

  const resetFilters = () => {
    setActiveCategory("all")
    setSelectedColors([])
    setPriceRange([0, maxPrice])
    setSortOption("newest")
    setSearchQuery("")
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  return (
    <>
      <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 silk-pattern opacity-10"></div>
        <div className="silk-wave absolute inset-0"></div>
        
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center elegant-heading silk-text-gradient">
            Men's Collection
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-amber-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-3 w-full rounded-md border border-amber-200/50 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-r-md transition-colors"
                onClick={() => {
                  // This will trigger the search via the useEffect dependency
                  const currentQuery = searchQuery.trim();
                  setSearchQuery(currentQuery);
                }}
              >
                SEARCH
              </button>
            </form>
          </div>

          {/* Filter and Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Desktop Category Filters */}
            <div className="hidden md:flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    activeCategory === category.id 
                      ? 'border-primary bg-primary/10 text-primary font-medium' 
                      : 'border-amber-200/30 hover:border-amber-300/50 hover:bg-amber-50/50'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center ml-auto gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown size={16} />
                    <span className="hidden sm:inline">Sort</span>
                    <span className="hidden sm:inline font-normal opacity-60">
                      {sortOptions.find(o => o.id === sortOption)?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      className={`flex items-center gap-2 ${sortOption === option.id ? 'font-medium bg-amber-50' : ''}`}
                      onClick={() => setSortOption(option.id)}
                    >
                      {sortOption === option.id && <CheckIcon size={16} />}
                      <span className={sortOption === option.id ? 'ml-4' : 'ml-6'}>
                        {option.name}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 relative">
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filters</span>
                    {activeFilters > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                        {activeFilters}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Apply filters to find exactly what you're looking for
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="px-3">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={maxPrice}
                          step={100}
                          onValueChange={setPriceRange}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Colors */}
                    <div>
                      <h3 className="font-medium mb-3">Colors</h3>
                      <div className="flex flex-wrap gap-2 px-3">
                        {colors.map((color) => (
                          <div
                            key={color.id}
                            className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center
                              ${color.id === 'white' ? 'border border-gray-300' : ''}
                              ${selectedColors.includes(color.id) ? 'ring-2 ring-offset-2 ring-primary' : ''}
                            `}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => toggleColorSelection(color.id)}
                            title={color.name}
                          >
                            {selectedColors.includes(color.id) && (
                              <CheckIcon size={14} className={`${['white', 'cream', 'beige'].includes(color.id) ? 'text-black' : 'text-white'}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <SheetFooter>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1" onClick={resetFilters}>
                        Reset All
                      </Button>
                      <SheetClose asChild>
                        <Button className="flex-1">Apply Filters</Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8 text-sm text-gray-500">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-16">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any products matching your current filters.
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 stagger-animation">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Replaced product.label with stock status indicator */}
                      {product.stock <= 3 && product.stock > 0 && (
                        <div className="absolute top-4 right-4 bg-amber-500 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                          Low Stock
                        </div>
                      )}
                      {product.stock <= 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 text-white text-xs uppercase tracking-wider font-medium">
                          Sold Out
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <button 
                          className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                          onClick={(e) => openQuickView(e, product)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xl font-medium mb-2 hover:text-amber-800 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-foreground/70 text-sm mb-4">{product.description}</p>
                    <div className="text-lg font-medium mb-6">₹{product.price.toLocaleString()}</div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                      disabled={addingToCart === product.id || product.stock <= 0}
                    >
                      <ShoppingCart size={16} /> 
                      {addingToCart === product.id ? 'Adding...' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 flex justify-end p-4 bg-white border-b">
              <button 
                onClick={closeQuickView}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close quick view"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={quickViewProduct.images && quickViewProduct.images.length > 0 ? quickViewProduct.images[0] : "/placeholder-image.jpg"}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-medium mb-2">{quickViewProduct.name}</h2>
                <div className="text-xl font-medium text-primary mb-4">₹{quickViewProduct.price.toLocaleString()}</div>
                <div className="text-foreground/70 mb-6">{quickViewProduct.description}</div>
                
                {quickViewProduct.material && (
                  <div className="mb-4">
                    <span className="font-medium">Material:</span> {quickViewProduct.material}
                  </div>
                )}
                
                {quickViewProduct.color && (
                  <div className="mb-4">
                    <span className="font-medium">Color:</span> {quickViewProduct.color}
                  </div>
                )}
                
                <div className="mb-6">
                  <span className="font-medium">Availability:</span> {quickViewProduct.stock > 0 ? `In Stock (${quickViewProduct.stock} available)` : 'Out of Stock'}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      if (quickViewProduct.stock > 0) {
                        setTimeout(() => closeQuickView(), 1000);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                    disabled={addingToCart === quickViewProduct.id || quickViewProduct.stock <= 0}
                  >
                    <ShoppingCart size={18} /> 
                    {addingToCart === quickViewProduct.id ? 'Adding...' : quickViewProduct.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  
                  <Link
                    href={`/product/${quickViewProduct.id}`}
                    className="flex-1 py-3 border border-primary text-primary font-medium rounded-md text-center hover:bg-primary/10 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}