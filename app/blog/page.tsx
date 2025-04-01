import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample blog posts - would typically come from a CMS or API
const blogPosts = [
  {
    id: "1",
    title: "The Rich Heritage of Kanjivaram Silk Sarees",
    excerpt:
      "Explore the history and cultural significance of Kanjivaram silk sarees, one of India's most treasured textile traditions.",
    image: "/placeholder.svg?height=600&width=800",
    date: "March 15, 2023",
    author: "Meera Patel",
    readTime: "6 min read",
    category: "Heritage",
  },
  {
    id: "2",
    title: "How to Care for Your Silk Sarees",
    excerpt:
      "Learn the best practices for maintaining the beauty and longevity of your precious silk sarees with these expert tips.",
    image: "/placeholder.svg?height=600&width=800",
    date: "February 28, 2023",
    author: "Priya Iyer",
    readTime: "4 min read",
    category: "Care Guide",
  },
  {
    id: "3",
    title: "Modern Styling Ideas for Traditional Silk Sarees",
    excerpt:
      "Discover creative ways to style your traditional silk sarees for contemporary occasions and make a fashion statement.",
    image: "/placeholder.svg?height=600&width=800",
    date: "January 20, 2023",
    author: "Ananya Sharma",
    readTime: "5 min read",
    category: "Style Guide",
  },
  {
    id: "4",
    title: "The Art of Handloom Weaving: Behind the Scenes",
    excerpt:
      "Take a glimpse into the meticulous process of handloom weaving and the skilled artisans who create these masterpieces.",
    image: "/placeholder.svg?height=600&width=800",
    date: "December 12, 2022",
    author: "Raj Sharma",
    readTime: "7 min read",
    category: "Craftsmanship",
  },
  {
    id: "5",
    title: "Regional Variations in Indian Silk Sarees",
    excerpt:
      "Explore the diverse styles, motifs, and techniques that characterize silk sarees from different regions of India.",
    image: "/placeholder.svg?height=600&width=800",
    date: "November 5, 2022",
    author: "Meera Patel",
    readTime: "8 min read",
    category: "Heritage",
  },
  {
    id: "6",
    title: "Choosing the Perfect Silk Saree for Wedding Season",
    excerpt:
      "A comprehensive guide to selecting the ideal silk saree for weddings and festive occasions based on color, design, and fabric.",
    image: "/placeholder.svg?height=600&width=800",
    date: "October 18, 2022",
    author: "Priya Iyer",
    readTime: "6 min read",
    category: "Buying Guide",
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1)

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the rich heritage of Indian silk sarees, styling tips, care guides, and stories behind our
          collections.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={featuredPost.image || "/placeholder.svg"}
              alt={featuredPost.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {featuredPost.category}
              </span>
              <span className="text-sm text-muted-foreground">Featured</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">
                {featuredPost.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{featuredPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
            <Button asChild>
              <Link href={`/blog/${featuredPost.id}`}>Read Full Article</Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mb-16" />

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                    <Image src="/placeholder.svg?height=50&width=50" alt={post.author} width={24} height={24} />
                  </div>
                  <span className="text-sm">{post.author}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

