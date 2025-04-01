"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

// This would typically come from an API or database
const product = {
  id: "1",
  name: "Royal Kanjivaram Silk Saree",
  price: 42750,
  description:
    "This exquisite Kanjivaram silk saree features intricate zari work with traditional motifs. The rich color and premium quality silk make it perfect for weddings and special occasions.",
  details: [
    "Pure Kanjivaram Silk",
    "Handcrafted by skilled artisans",
    "Zari work with gold thread",
    "Includes matching blouse piece (0.8m)",
    "Length: 5.5 meters",
    "Dry clean only",
  ],
  care: [
    "Dry clean only",
    "Store in a cool, dry place",
    "Avoid direct sunlight",
    "Fold with tissue paper between layers"
  ],
  colors: ["#8B0000", "#FFD700", "#006400", "#800080"],
  images: [
    "/product-1.jpg",
    "/product-1-detail.jpg",
    "/product-1-back.jpg",
    "/product-1-closeup.jpg",
  ],
  category: "Kanjivaram",
  inStock: true,
  sku: "KJ-2023-105",
  material: "100% Pure Mulberry Silk",
  craftOrigin: "Tamil Nadu, India"
}

// Similar products would typically come from an API
const similarProducts = [
  {
    id: "2",
    name: "Banarasi Silk in Emerald Green",
    price: 38900,
    image: "/product-2.jpg",
    category: "Banarasi",
  },
  {
    id: "3",
    name: "Tussar Silk with Traditional Motifs",
    price: 29500,
    image: "/product-3.jpg",
    category: "Tussar",
  },
  {
    id: "4",
    name: "Mysore Silk in Royal Blue",
    price: 35600,
    image: "/product-4.jpg",
    category: "Mysore",
  },
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [activeTab, setActiveTab] = useState('details')

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="container py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs uppercase tracking-wider mb-10 text-foreground/60">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:text-primary transition-colors">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/collections/${product.category.toLowerCase()}`}
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        {/* Product Images */}
        <div className="md:col-span-7 space-y-6">
          <div className="relative overflow-hidden aspect-[4/5] border border-foreground/5">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative overflow-hidden border ${selectedImage === index ? 'border-primary' : 'border-foreground/10'} transition-all hover:opacity-90`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-5">
          <h1 className="text-3xl md:text-4xl font-light mb-3">{product.name}</h1>
          <p className="text-xl font-light mb-8 text-primary-foreground">₹{product.price.toLocaleString()}</p>
          
          <div className="w-full h-px bg-primary/30 my-8"></div>

          <p className="text-foreground/70 leading-relaxed mb-10 text-lg">{product.description}</p>

          {/* SKU & Details */}
          <div className="grid grid-cols-2 gap-6 text-sm text-foreground/70 mb-10">
            <div className="space-y-2">
              <p><span className="uppercase text-xs tracking-wider text-foreground/90">SKU:</span> {product.sku}</p>
              <p><span className="uppercase text-xs tracking-wider text-foreground/90">Category:</span> {product.category}</p>
            </div>
            <div className="space-y-2">
              <p><span className="uppercase text-xs tracking-wider text-foreground/90">Material:</span> {product.material}</p>
              <p><span className="uppercase text-xs tracking-wider text-foreground/90">Origin:</span> {product.craftOrigin}</p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-10">
            <h3 className="uppercase tracking-wider text-sm mb-4 text-foreground/90">Color</h3>
            <div className="flex gap-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full transition-all ${selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : "hover:scale-110"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-10">
            <h3 className="uppercase tracking-wider text-sm mb-4 text-foreground/90">Quantity</h3>
            <div className="flex items-center border border-foreground/20 inline-flex">
              <button 
                className="w-12 h-12 flex items-center justify-center border-r border-foreground/20 text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors" 
                onClick={decreaseQuantity} 
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 h-12 flex items-center justify-center text-foreground">{quantity}</span>
              <button 
                className="w-12 h-12 flex items-center justify-center border-l border-foreground/20 text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors" 
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button className="relative group inline-flex px-8 py-4 bg-foreground uppercase tracking-widest text-xs font-medium text-background transition-all hover:bg-foreground/90 justify-center">
              <span>Add to Cart</span>
            </button>
            <button className="relative group inline-flex px-8 py-4 bg-transparent border border-foreground/30 uppercase tracking-widest text-xs transition-all hover:border-foreground justify-center">
              <span className="relative z-10 text-foreground group-hover:text-background transition-colors duration-300">Add to Wishlist</span>
              <span className="absolute inset-0 w-0 bg-foreground group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </button>
          </div>
          
          {/* Product Tabs */}
          <div>
            <div className="flex border-b border-foreground/10 mb-6">
              <button
                className={`px-6 py-3 text-sm uppercase tracking-wider ${
                  activeTab === 'details' ? 'border-b-2 border-primary text-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-6 py-3 text-sm uppercase tracking-wider ${
                  activeTab === 'care' ? 'border-b-2 border-primary text-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setActiveTab('care')}
              >
                Care Instructions
              </button>
              <button
                className={`px-6 py-3 text-sm uppercase tracking-wider ${
                  activeTab === 'shipping' ? 'border-b-2 border-primary text-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </button>
            </div>
            
            <div className="text-foreground/70 leading-relaxed">
              {activeTab === 'details' && (
                <ul className="space-y-2 pl-5 list-disc marker:text-primary">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
              
              {activeTab === 'care' && (
                <ul className="space-y-2 pl-5 list-disc marker:text-primary">
                  {product.care.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              
              {activeTab === 'shipping' && (
                <div>
                  <p className="mb-2">Free shipping on all orders above ₹20,000 within India.</p>
                  <p className="mb-2">International shipping available at a flat rate of ₹4,500.</p>
                  <p>Standard delivery within 5-7 business days. Express delivery available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl uppercase tracking-widest font-light mb-6 text-center">You Might Also Like</h2>
        <div className="w-16 h-px mx-auto bg-primary mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {similarProducts.map((product) => (
            <div key={product.id} className="silk-card group hover:translate-y-[-8px] transition-all duration-500">
              <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <div className="p-6 text-center">
                <Link href={`/product/${product.id}`} className="block mb-2 text-xl tracking-wide font-light group-hover:text-primary-foreground transition-colors">
                  {product.name}
                </Link>
                <p className="text-foreground/70 mb-3">
                  ₹{product.price.toLocaleString()}
                </p>
                <div className="w-8 h-px mx-auto bg-primary/50 mb-3"></div>
                <button className="uppercase text-xs tracking-wider text-foreground/80 hover:text-foreground transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

