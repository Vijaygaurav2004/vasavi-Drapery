import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

export default function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
  return (
    <div className="silk-card group hover:translate-y-[-8px] transition-all duration-500">
      <Link href={`/product/${id}`} className="block relative overflow-hidden aspect-[4/5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {isNew && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-[10px] uppercase tracking-wider font-medium z-10">
            New
          </div>
        )}
      </Link>
      <div className="p-6 text-center">
        <Link href={`/product/${id}`} className="block mb-2 text-xl tracking-wide font-light group-hover:text-primary-foreground transition-colors">
          {name}
        </Link>
        <p className="text-foreground/70 mb-3">
          ₹{price.toLocaleString()}
        </p>
        <div className="w-8 h-px mx-auto bg-primary/50 mb-3"></div>
        <button className="uppercase text-xs tracking-wider text-foreground/80 hover:text-foreground transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

