"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Filter, X, Minus, Plus, ShoppingCart } from "lucide-react"
import React from "react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

// This would typically come from an API based on the category
const products = [
  // Women's Products
  {
    id: "1",
    name: "Kanchipuram Silk in Royal Blue",
    description: "Handcrafted with pure mulberry silk and interwoven with real gold zari",
    price: 42750,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Kanjivaram",
    color: "blue",
    label: "BEST SELLER",
    gender: "women"
  },
  {
    id: "2",
    name: "Banarasi Silk Wedding Saree",
    description: "Exquisite pure silk with intricate traditional motifs in fine silver zari",
    price: 45999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Banarasi",
    color: "red",
    label: "LIMITED EDITION",
    gender: "women"
  },
  {
    id: "3",
    name: "Tussar Silk Festive Saree",
    description: "Natural tussar silk with hand-painted traditional motifs",
    price: 38999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Tussar",
    color: "beige",
    label: "NEW ARRIVAL",
    gender: "women"
  },
  {
    id: "4",
    name: "Mysore Silk Traditional Saree",
    description: "Lightweight pure silk with gold border and subtle embroidery",
    price: 39999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Mysore",
    color: "purple",
    label: "POPULAR",
    gender: "women"
  },
  {
    id: "5",
    name: "Designer Patola Silk Saree",
    description: "Double ikat weave with geometric patterns in vibrant colors",
    price: 58999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Patola",
    color: "green",
    label: "EXCLUSIVE",
    gender: "women"
  },
  {
    id: "6",
    name: "Embroidered Kanchipuram Silk",
    description: "Luxurious silk with intricate hand embroidery and temple borders",
    price: 44599,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Kanjivaram",
    color: "gold",
    label: "HANDCRAFTED",
    gender: "women"
  },
  {
    id: "7",
    name: "Zari Work Banarasi Saree",
    description: "Opulent silk with rich gold and silver brocade from Varanasi",
    price: 46999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Banarasi",
    color: "gold",
    label: "PREMIUM",
    gender: "women"
  },
  {
    id: "8",
    name: "Handloom Tussar Silk Saree",
    description: "Handwoven natural silk with traditional tribal motifs",
    price: 37999,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Tussar",
    color: "beige",
    label: "ARTISANAL",
    gender: "women"
  },
  
  // Men's Products
  {
    id: "m1",
    name: "Royal Kanchipuram Silk Dhothi",
    description: "Handcrafted pure mulberry silk with gold zari border for ceremonial occasions",
    price: 18950,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Ceremonial",
    color: "gold",
    label: "BEST SELLER",
    gender: "men"
  },
  {
    id: "m2",
    name: "Heritage Silk Dhothi",
    description: "Premium silk with silver zari work, perfect for festivals and celebrations",
    price: 15850,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Festival",
    color: "beige",
    label: "LIMITED EDITION",
    gender: "men"
  },
  {
    id: "m3",
    name: "Classic Mysore Silk Dhothi",
    description: "Lightweight pure silk with subtle gold border for everyday elegance",
    price: 12499,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Classic",
    color: "white",
    label: "NEW ARRIVAL",
    gender: "men"
  },
  {
    id: "m4",
    name: "Tussar Silk Dhothi",
    description: "Natural tussar silk with traditional motifs for a distinctive look",
    price: 14850,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Traditional",
    color: "beige",
    label: "POPULAR",
    gender: "men"
  },
  {
    id: "m5",
    name: "Wedding Silk Dhothi Set",
    description: "Complete set with matching angavastram, perfect for wedding ceremonies",
    price: 24750,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Wedding",
    color: "gold",
    label: "PREMIUM",
    gender: "men"
  },
  {
    id: "m6",
    name: "Cotton Silk Blend Dhothi",
    description: "Comfortable cotton-silk blend with subtle zari border, ideal for daily wear",
    price: 9950,
    image: "https://www.drapery-silk.com/cdn/shop/files/DIa-Horizontal-Banner1.jpg?v=1728374317",
    category: "Daily Wear",
    color: "white",
    label: "COMFORTABLE",
    gender: "men"
  }
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

// Women's categories
const womenCategories = [
  { id: "women", name: "All Sarees" },
  { id: "kanjivaram", name: "Kanjivaram" },
  { id: "banarasi", name: "Banarasi" },
  { id: "tussar", name: "Tussar" },
  { id: "mysore", name: "Mysore" },
  { id: "patola", name: "Patola" },
]

// Men's categories
const menCategories = [
  { id: "men", name: "All Dhothis" },
  { id: "ceremonial", name: "Ceremonial" },
  { id: "festival", name: "Festival" },
  { id: "classic", name: "Classic" },
  { id: "traditional", name: "Traditional" },
  { id: "wedding", name: "Wedding" },
  { id: "daily-wear", name: "Daily Wear" },
]

// Get parameters from URL
export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const [priceRange, setPriceRange] = useState([5000, 60000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<Array<{ id: string, quantity: number }>>([])

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => (prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]))
  }

  const toggleFabric = (fabricId: string) => {
    setSelectedFabrics((prev) => (prev.includes(fabricId) ? prev.filter((id) => id !== fabricId) : [...prev, fabricId]))
  }

  const clearFilters = () => {
    setPriceRange([5000, 60000])
    setSelectedColors([])
    setSelectedFabrics([])
  }

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Special categories handling
    if (params.category.toLowerCase() === "men") {
      // Show only men's products for the men's collection
      return product.gender === "men";
    }
    
    if (params.category.toLowerCase() === "women") {
      // Show only women's products for the women's collection
      return product.gender === "women";
    }
    
    // For men's subcategories, filter by that category within men's products
    if (menCategories.some(cat => cat.id.toLowerCase() === params.category.toLowerCase())) {
      return product.gender === "men" && 
             product.category.toLowerCase() === params.category.toLowerCase();
    }
    
    // For women's subcategories, filter by that category within women's products
    if (womenCategories.some(cat => cat.id.toLowerCase() === params.category.toLowerCase())) {
      return product.gender === "women" && 
             product.category.toLowerCase() === params.category.toLowerCase();
    }
    
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by color
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false;
    }

    return true;
  })

  // Determine if we're in men's or women's collections
  const isWomensCategory = category.toLowerCase() === "women" || 
    womenCategories.some(cat => cat.id === category.toLowerCase());
  const isMensCategory = category.toLowerCase() === "men" || 
    menCategories.some(cat => cat.id === category.toLowerCase());

  // Set the display categories based on whether we're in men's or women's section
  const displayCategories = isWomensCategory ? womenCategories : 
                            isMensCategory ? menCategories : 
                            category.toLowerCase() === "all" ? [...womenCategories, ...menCategories] : 
                            [...womenCategories];

  // Get appropriate heading text
  const headingText = isMensCategory ? "Men's Collection" : 
                      isWomensCategory ? "Women's Collection" : 
                      `${category} Collection`;

  const descriptionText = isMensCategory ? 
    "Discover our distinguished collection of handcrafted silk dhothis, where tradition meets contemporary elegance for the modern gentleman." : 
    "Discover our exquisite range of handcrafted silk sarees, each piece a testament to centuries-old traditions and unparalleled craftsmanship.";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4 uppercase tracking-wider text-sm">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={5000}
          max={60000}
          step={1000}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <Separator className="bg-amber-100/30" />

      <div>
        <h3 className="font-medium mb-4 uppercase tracking-wider text-sm">Colors</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center">
              <Checkbox
                id={`color-${color.id}`}
                checked={selectedColors.includes(color.value)}
                onCheckedChange={() => toggleColor(color.value)}
                className="border-amber-200/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <label
                htmlFor={`color-${color.id}`}
                className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-amber-100/30" />

      <div>
        <h3 className="font-medium mb-4 uppercase tracking-wider text-sm">Fabric Type</h3>
        <div className="space-y-2">
          {fabricTypes.map((fabric) => (
            <div key={fabric.id} className="flex items-center">
              <Checkbox
                id={`fabric-${fabric.id}`}
                checked={selectedFabrics.includes(fabric.id)}
                onCheckedChange={() => toggleFabric(fabric.id)}
                className="border-amber-200/50 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <label
                htmlFor={`fabric-${fabric.id}`}
                className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fabric.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" 
        className="w-full border-amber-200/50 hover:border-amber-300/70 text-sm uppercase tracking-wider"
        onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  )

  const handleAddToCart = (productId: string) => {
    setAddingToCart(productId)
    
    // Simulate API request delay
    setTimeout(() => {
      // Check if item is already in cart
      const existingItemIndex = cartItems.findIndex(item => item.id === productId)
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedCart = [...cartItems]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        }
        setCartItems(updatedCart)
      } else {
        // Add new item to cart
        setCartItems([...cartItems, { id: productId, quantity: 1 }])
      }
      
      // Show success toast
      toast({
        title: "Added to cart",
        description: "Item has been added to your shopping cart.",
      })
      
      // Dispatch custom event to update cart count
      window.dispatchEvent(new Event('cartUpdated'))
      
      setAddingToCart(null)
    }, 600)
  }

  return (
    <main className="flex-1 py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 silk-pattern opacity-10"></div>
      <div className="silk-wave absolute inset-0"></div>
      
      <div className="container relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-10">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-foreground/50" />
          <Link href="/collections" className="text-foreground/70 hover:text-foreground transition-colors">
            Collections
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-foreground/50" />
          <span className="text-foreground font-medium">{category}</span>
        </nav>
        
        {/* Category Header */}
        <div className="text-center mb-12 animate-fade-slide-up">
          <h1 className="text-3xl md:text-4xl mb-4 uppercase tracking-wider font-light elegant-heading silk-text-gradient">{headingText}</h1>
          <div className="elegant-divider w-32 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {descriptionText}
          </p>
        </div>
        
        {/* Category Navigation - Desktop */}
        <div className="hidden md:block mb-10 overflow-x-auto scrollbar-hidden">
          <div className="flex gap-2 md:gap-4 justify-center min-w-max p-1">
            {displayCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/collections/${cat.id}`}
                className={`px-6 py-2 ${cat.id.toLowerCase() === params.category.toLowerCase() ? 'bg-amber-50/80 border-amber-200/50' : 'bg-gradient-to-r from-amber-50/50 to-transparent border-amber-100/30'} border rounded-sm hover:border-amber-200/50 transition-all duration-300 text-sm uppercase tracking-wider`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <h2 className="text-lg font-medium mb-6 uppercase tracking-wider">Filters</h2>
            <div className="bg-gradient-to-r from-[#f9f7f4] to-[#f5f1ea] p-6 rounded-sm border border-amber-100/30 decorated-corners">
              <FilterContent />
            </div>
          </div>

          {/* Filters - Mobile */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden mb-4 border-amber-200/50 hover:border-amber-300/70">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium uppercase tracking-wider">Filters</h2>
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
              <p className="text-foreground/70 text-sm">{filteredProducts.length} products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 stagger-animation">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card luxury-card border border-amber-100/30 decorated-corners overflow-hidden group hover-lift glow-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 text-black text-xs uppercase tracking-wider font-medium">
                        {product.label}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <Link 
                          href={`/product/${product.id}`}
                          className="w-full luxury-button bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Quick View
                        </Link>
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product.id);
                      }}
                      disabled={addingToCart === product.id}
                      className="w-full bg-black hover:bg-amber-900 text-white py-3 font-medium uppercase tracking-wider text-sm relative overflow-hidden group border border-transparent transition-all duration-300 flex items-center justify-center"
                    >
                      <span className={`flex items-center justify-center transition-all duration-300 ${addingToCart === product.id ? 'opacity-0' : 'opacity-100'}`}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        ADD TO CART
                      </span>
                      <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${addingToCart === product.id ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="loading-spinner"></span>
                      </span>
                      <span className="absolute inset-0 w-full h-full bg-amber-700/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-gradient-to-r from-[#f9f7f4] to-[#f5f1ea] rounded-sm border border-amber-100/30 decorated-corners">
                <h3 className="text-xl font-medium mb-4 elegant-heading">No products found</h3>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your current filters. Try adjusting your selections to discover our beautiful silk collection.
                </p>
                <Button variant="outline" 
                  className="border-amber-200/50 hover:border-amber-300/70 text-sm uppercase tracking-wider"
                  onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

