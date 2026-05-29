"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X, ChevronDown, CheckIcon, ArrowUpDown, Filter, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/app/context/cart-context"
import { getProducts } from "@/lib/supabase/products"
import { Product } from "@/types/product"
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
          product.category === "fabric" || // lowercase "fabric" for men's collection
          product.category === "Fabric" || // uppercase "Fabric" for men's collection
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
    setAddingToCart(product.id || null)
    
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
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="py-16 bg-gradient-subtle text-center relative overflow-hidden">
          <div className="absolute inset-0 silk-pattern opacity-40 pointer-events-none" />
          <div className="container relative z-10">
            <p className="section-eyebrow mb-3">Refined for Him</p>
            <h1 className="section-title">Men's Collection</h1>
            <div className="gold-divider" />
            <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
              Sophisticated dhothis and premium silk fabrics crafted with precision and tradition.
            </p>
          </div>
        </div>

        <div className="container py-10">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest font-light transition-all duration-200 border ${
                    activeCategory === category.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-foreground/60 hover:border-primary/40 hover:text-primary'
                  }`}
                  style={{ letterSpacing: '0.15em' }}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 text-xs border-border">
                    <ArrowUpDown size={13} />
                    <span className="hidden sm:inline">{sortOptions.find(o => o.id === sortOption)?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-sm">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      className={`cursor-pointer ${sortOption === option.id ? 'text-primary font-medium' : ''}`}
                      onClick={() => setSortOption(option.id)}
                    >
                      {option.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 text-xs border-border relative">
                    <Filter size={13} />
                    <span>Filters</span>
                    {activeFilters > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                        {activeFilters}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="elegant-heading font-light uppercase tracking-wider">Filter Products</SheetTitle>
                    <SheetDescription className="text-sm font-light">Refine your selection</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-8">
                    <div>
                      <p className="luxury-label mb-2">Search</p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="luxury-input pl-9" />
                      </div>
                    </div>
                    <div>
                      <p className="luxury-label mb-3">Price Range</p>
                      <Slider value={priceRange} min={0} max={maxPrice} step={100} onValueChange={setPriceRange} className="mb-3" />
                      <div className="flex justify-between text-xs text-muted-foreground font-light">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                    <div>
                      <p className="luxury-label mb-3">Color</p>
                      <div className="flex flex-wrap gap-2.5">
                        {colors.map((color) => (
                          <button key={color.id} className={`w-8 h-8 rounded-full transition-all ${color.id === 'white' || color.id === 'cream' || color.id === 'beige' ? 'border border-border' : ''}`}
                            style={{ backgroundColor: color.hex, boxShadow: selectedColors.includes(color.id) ? `0 0 0 2px white, 0 0 0 3.5px hsl(var(--primary))` : 'none' }}
                            onClick={() => toggleColorSelection(color.id)} title={color.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="mt-8">
                    <div className="flex gap-3 w-full">
                      <Button variant="outline" className="flex-1 text-xs tracking-widest uppercase" onClick={resetFilters}>Reset</Button>
                      <SheetClose asChild>
                        <Button className="flex-1 text-xs tracking-widest uppercase bg-primary hover:bg-primary/90">Apply</Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-light mb-7 uppercase tracking-widest" style={{ letterSpacing: '0.15em' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => <div key={i} className="skeleton aspect-[3/4]" />)}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-xl elegant-heading font-light mb-3">No products found</h3>
              <p className="text-muted-foreground text-sm font-light mb-6">Try adjusting your filters.</p>
              <button onClick={resetFilters} className="luxury-button-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card group">
                  <div className="product-card-image-container">
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <Image src={product.images?.[0] || "/placeholder.svg"} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="product-card-image" />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/40">
                        <span className="bg-white/90 px-4 py-1.5 text-xs uppercase tracking-widest text-foreground/60 font-medium" style={{ letterSpacing: '0.18em' }}>Sold Out</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                      <button onClick={(e) => openQuickView(e, product)} className="w-full py-3 bg-white/92 backdrop-blur-sm text-xs uppercase tracking-widest font-medium hover:bg-primary hover:text-white transition-all duration-300" style={{ letterSpacing: '0.18em' }}>
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="product-card-content">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="product-card-title">{product.name}</h3>
                    </Link>
                    <div className="product-card-divider" />
                    <p className="product-card-price">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleModalBackdropClick}>
          <div className="bg-white max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-border z-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-light" style={{ letterSpacing: '0.2em' }}>Quick View</p>
              <button onClick={closeQuickView} className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative aspect-square overflow-hidden">
                <Image src={quickViewProduct.images?.[0] || "/placeholder-image.jpg"} alt={quickViewProduct.name} fill className="object-cover" />
              </div>
              <div className="p-7 flex flex-col">
                <p className="section-eyebrow mb-2">{quickViewProduct.category || 'Men\'s Collection'}</p>
                <h2 className="text-2xl elegant-heading font-light mb-3">{quickViewProduct.name}</h2>
                <p className="text-2xl font-light text-primary mb-5">₹{quickViewProduct.price.toLocaleString()}</p>
                <p className="text-sm text-foreground/65 font-light leading-relaxed mb-6 flex-1">{quickViewProduct.description.split(/\n+/)[0]}</p>
                <div className="flex gap-3 mt-auto">
                  <button onClick={() => { handleAddToCart(quickViewProduct); if (quickViewProduct.stock > 0) setTimeout(() => closeQuickView(), 800); }}
                    disabled={addingToCart === quickViewProduct.id || quickViewProduct.stock <= 0}
                    className="flex-1 luxury-button flex items-center justify-center gap-2 py-3.5 disabled:opacity-50">
                    <ShoppingCart size={15} /><span>{quickViewProduct.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </button>
                  <Link href={`/product/${quickViewProduct.id}`} className="flex-1 secondary-button text-center py-3.5 text-xs">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}