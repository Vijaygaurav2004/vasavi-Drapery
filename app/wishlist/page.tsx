"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/app/context/wishlist-context"
import { useCart } from "@/app/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading to ensure client-side hydration
    setIsLoading(false)
  }, [])

  const handleAddToCart = (item: any) => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      })
      toast({
        description: `${item.name} added to cart`,
        duration: 2000,
      })
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-light mb-10 text-center">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-light mb-10 text-center">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-light mb-6">Your wishlist is empty</h2>
          <p className="text-foreground/70 mb-8">Add items to your wishlist to save them for later.</p>
          <Link href="/collections/women" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-foreground/70">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            <Button 
              variant="ghost" 
              onClick={clearWishlist}
              className="text-sm"
            >
              Clear wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="relative border border-border p-6 group transition-all hover:shadow-md">
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFromWishlist(item.id)}
                    className="h-8 w-8 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <Link href={`/product/${item.id}`} className="block">
                  <div className="relative mb-4 aspect-square overflow-hidden">
                    <Image 
                      src={item.image || "/placeholder-image.jpg"} 
                      alt={item.name} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                  <p className="text-foreground/70 mb-4">₹{item.price.toLocaleString()}</p>
                </Link>

                <Button 
                  onClick={() => handleAddToCart(item)} 
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 