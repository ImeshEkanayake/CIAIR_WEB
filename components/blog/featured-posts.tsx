"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  description: string
  slug: string
  image_url?: string
  category: string
  read_time: number
  author?: {
    name: string
    title: string
    image_url?: string
    slug: string
  }
}

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    setCanScrollLeft(scrollContainer.scrollLeft > 0)
    setCanScrollRight(scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth)
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      checkScrollButtons()
      scrollContainer.addEventListener("scroll", checkScrollButtons)
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  useEffect(() => {
    // Check if we can scroll right initially
    checkScrollButtons()
    // Add window resize listener to recheck scroll buttons
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [posts])

  const scroll = (direction: "left" | "right") => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const cardWidth = scrollContainer.querySelector("div")?.clientWidth || 0
    const scrollAmount = cardWidth + 16 // card width + gap

    if (direction === "left") {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Posts</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory">
        {posts.map((post) => (
          <div
            key={post.id}
            className="min-w-[calc(100%-16px)] sm:min-w-[calc(50%-16px)] md:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-start border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image_url || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm text-muted-foreground">{post.category}</div>
                  <div className="text-sm text-muted-foreground">•</div>
                  <div className="text-sm text-muted-foreground">{post.read_time} min read</div>
                </div>
                <h3 className="font-semibold line-clamp-2 mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{post.description}</p>

                {post.author && (
                  <div className="mt-4 flex items-center gap-2">
                    <img
                      src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                      alt={post.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
