"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

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

interface BlogFeaturedCardStackProps {
  posts: Post[]
}

export function BlogFeaturedCardStack({ posts }: BlogFeaturedCardStackProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtFirstCard = useRef(true)
  const isAtLastCard = useRef(false)
  const hasScrolledAllCards = useRef(false)
  const isMobile = useMobile()
  const originalBodyOverflow = useRef("")
  const originalBodyPosition = useRef("")
  const originalBodyTop = useRef("")
  const scrollY = useRef(0)
  const isScrollLocked = useRef(false)

  // Check if we're at the first or last card
  useEffect(() => {
    isAtFirstCard.current = current === 0
    isAtLastCard.current = current === posts.length - 1

    // If we've reached the last card, mark that we've scrolled all cards
    if (isAtLastCard.current) {
      hasScrolledAllCards.current = true
    }
  }, [current, posts.length])

  // Check if the component is in the viewport
  const isInViewport = () => {
    if (!containerRef.current) return false
    const rect = containerRef.current.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0
  }

  // Check if the page is at the top
  const isPageAtTop = () => {
    return window.scrollY <= 10
  }

  // Lock scroll
  const lockScroll = () => {
    if (isScrollLocked.current) return

    scrollY.current = window.scrollY
    originalBodyOverflow.current = document.body.style.overflow
    originalBodyPosition.current = document.body.style.position
    originalBodyTop.current = document.body.style.top

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY.current}px`
    document.body.style.width = "100%"

    isScrollLocked.current = true
  }

  // Unlock scroll
  const unlockScroll = () => {
    if (!isScrollLocked.current) return

    document.body.style.overflow = originalBodyOverflow.current
    document.body.style.position = originalBodyPosition.current
    document.body.style.top = originalBodyTop.current
    window.scrollTo(0, scrollY.current)

    isScrollLocked.current = false
  }

  // Navigate to the next card
  const nextCard = () => {
    if (current < posts.length - 1) {
      setDirection("down")
      setCurrent((prev) => prev + 1)
    }
  }

  // Navigate to the previous card
  const prevCard = () => {
    if (current > 0) {
      setDirection("up")
      setCurrent((prev) => prev - 1)
    }
  }

  // Handle wheel events for card navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when the component is in viewport
      if (!isInViewport()) return

      // For downward scrolling
      if (e.deltaY > 0) {
        // If not at the last card, navigate to the next card
        if (!isAtLastCard.current) {
          e.preventDefault()
          lockScroll()
          nextCard()
        }
        // If at the last card, allow page scrolling
        else {
          unlockScroll()
        }
      }
      // For upward scrolling
      else if (e.deltaY < 0) {
        // If at the top of the page and not at the first card, navigate to the previous card
        if (isPageAtTop() && !isAtFirstCard.current) {
          e.preventDefault()
          lockScroll()
          prevCard()
        }
        // Otherwise, allow normal page scrolling
        else {
          unlockScroll()
        }
      }
    }

    // Add wheel event listener to document
    document.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheel)
      unlockScroll() // Ensure scroll is unlocked when component unmounts
    }
  }, [current, posts.length])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when the component is in viewport
      if (!isInViewport()) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (!isAtLastCard.current) {
          e.preventDefault()
          lockScroll()
          nextCard()
        } else {
          unlockScroll()
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (isPageAtTop() && !isAtFirstCard.current) {
          e.preventDefault()
          lockScroll()
          prevCard()
        } else {
          unlockScroll()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [current, posts.length])

  // Add touch support
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInViewport()) return

      const touchY = e.touches[0].clientY
      const touchX = e.touches[0].clientX
      const diffY = touchStartY - touchY
      const diffX = touchStartX - touchX

      // Only handle vertical swipes (when vertical movement is greater than horizontal)
      if (Math.abs(diffY) > Math.abs(diffX)) {
        // Swiping up (equivalent to scrolling down)
        if (diffY > 50) {
          if (!isAtLastCard.current) {
            e.preventDefault()
            lockScroll()
            nextCard()
            touchStartY = touchY // Reset to prevent multiple triggers
          } else {
            unlockScroll()
          }
        }
        // Swiping down (equivalent to scrolling up)
        else if (diffY < -50) {
          if (isPageAtTop() && !isAtFirstCard.current) {
            e.preventDefault()
            lockScroll()
            prevCard()
            touchStartY = touchY // Reset to prevent multiple triggers
          } else {
            unlockScroll()
          }
        }
      }
    }

    const handleTouchEnd = () => {
      // Unlock scroll when touch ends
      if (isAtLastCard.current || isAtFirstCard.current) {
        unlockScroll()
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [current, posts.length])

  // If no posts, don't render anything
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="blog-card-stack-container" ref={containerRef}>
      <div className="blog-card-stack-title">
        <h2 className="text-2xl font-bold">Featured Posts</h2>
        <div className="text-sm text-muted-foreground">Scroll to explore our featured articles</div>
      </div>

      <div className="blog-card-stack">
        {posts.map((post, index) => {
          const offset = index - current
          const isActive = index === current
          const isForwardCard = offset > 0
          const isBackwardCard = offset < 0

          // Calculate transform values
          let translateY = 0
          let scale = 1
          let opacity = 1
          const zIndex = posts.length - Math.abs(offset)

          // Adjust the positioning for forward cards (below current)
          if (isForwardCard) {
            // Show more of forward cards (20px instead of 8px)
            translateY = offset * 20
            // Adjust scale to make forward cards more visible
            scale = 1 - Math.abs(offset) * 0.02
            opacity = 1 - Math.abs(offset) * 0.2
          }

          // Adjust the positioning for backward cards (above current)
          if (isBackwardCard) {
            // Show more of backward cards (15px instead of 8px)
            translateY = offset * 15
            scale = 1 - Math.abs(offset) * 0.02
            opacity = 1 - Math.abs(offset) * 0.2
          }

          return (
            <article
              key={post.id}
              className={`blog-card-stack-card ${isActive ? "blog-card-stack-current" : ""} 
                ${isForwardCard ? "blog-card-stack-forward" : ""} 
                ${isBackwardCard ? "blog-card-stack-backward" : ""} 
                ${direction === "up" && isActive ? "scrolling-up" : ""} 
                ${direction === "down" && isActive ? "scrolling-down" : ""}`}
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <Link href={`/blog/${post.slug}`} className="blog-card-stack-link">
                <div className="blog-card-stack-image-container">
                  <Image
                    src={post.image_url || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="blog-card-stack-image"
                  />
                </div>

                <div className="blog-card-stack-content">
                  <div className="blog-card-stack-meta">
                    <span className="blog-card-stack-category">{post.category}</span>
                    <span className="blog-card-stack-divider">•</span>
                    <span className="blog-card-stack-read-time">{post.read_time} min read</span>
                  </div>

                  <h3 className="blog-card-stack-title">{post.title}</h3>

                  {!isMobile && <p className="blog-card-stack-description">{post.description}</p>}

                  {post.author && (
                    <div className="blog-card-stack-author">
                      <Image
                        src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="blog-card-stack-author-image"
                      />
                      <div className="blog-card-stack-author-info">
                        <span className="blog-card-stack-author-name">{post.author.name}</span>
                        {!isMobile && post.author.title && (
                          <span className="blog-card-stack-author-title">{post.author.title}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>

              {/* Card position counter */}
              <div className="blog-card-stack-counter">
                {current + 1} / {posts.length}
              </div>
            </article>
          )
        })}

        {/* Visual indicator for scrolling */}
        {!isAtLastCard.current && (
          <div className="blog-card-stack-scroll-indicator">
            <span>Scroll to see more</span>
            <ChevronDown size={18} />
          </div>
        )}
      </div>
    </div>
  )
}
