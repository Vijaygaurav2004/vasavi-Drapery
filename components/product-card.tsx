import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useWishlist } from "@/app/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  // Remove unused category
  // category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const inWishlist = isInWishlist(product.id);
  
  const handleWishlistToggle = () => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      if (inWishlist) {
        removeFromWishlist(product.id);
        toast({
          description: "Removed from wishlist",
          duration: 2000,
        });
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg"
        });
        toast({
          description: "Added to wishlist",
          duration: 2000,
        });
      }
    }, 0);
  };

  return (
    <div className="silk-card group hover:translate-y-[-8px] transition-all duration-500">
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5]">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder-image.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Wishlist button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm z-10 transition-all duration-300"
        >
          <Heart 
            size={18} 
            className={`${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} 
          />
        </button>
      </Link>
      <div className="p-6 text-center">
        <Link href={`/product/${product.id}`} className="block mb-2 text-xl tracking-wide font-light group-hover:text-primary-foreground transition-colors">
          {product.name}
        </Link>
        <p className="text-foreground/70 mb-3">
          ₹{product.price.toLocaleString()}
        </p>
        <div className="w-8 h-px mx-auto bg-primary/50 mb-3"></div>
        <button 
          className="uppercase text-xs tracking-wider text-foreground/80 hover:text-foreground transition-colors"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

