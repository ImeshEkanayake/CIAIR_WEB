"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { useMobile } from "@/hooks/use-mobile"

interface Post {
  id: number | string
  title: string
  description: string
  slug: string
  image_url?: string
  category: string
  read_time: number
  created_at: string
  author?: {
    name: string
    title: string
    image_url?: string
    slug: string
  }
}

interface BlogHorizontalPostsProps {
  posts: Post[]
}

export function BlogHorizontalPosts({ posts }: BlogHorizontalPostsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const horizontalScrollProgress = useRef(0)
  const isInHorizontalSection = useRef(false)
  const isHorizontalScrollComplete = useRef(false)
  const lastScrollY = useRef(0)
  const isScrollingUp = useRef(false)
  const isSectionFullyVisible = useRef(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isMobile = useMobile()

  useEffect(() => {
    // Make sure we have posts
    if (!posts || posts.length === 0) return

    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const inner = innerRef.current

    if (!section || !wrapper || !inner) return

    // Check if the section is in the viewport
    const checkVisibility = () => {
      if (!section || !wrapper) return false

      const rect = section.getBoundingClientRect()

      // Check if section is fully visible at the top of the viewport (for upward scrolling)
      isSectionFullyVisible.current = rect.top <= 10 && rect.top >= -10

      // For downward scrolling, use regular visibility check
      if (!isScrollingUp.current) {
        isInHorizontalSection.current = rect.top < window.innerHeight && rect.bottom > 0
      }
      // For upward scrolling, only consider it "in section" when fully visible at the top
      else {
        isInHorizontalSection.current = isSectionFullyVisible.current
      }

      // Add sticky class when in the viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        wrapper.classList.add("sticky")
      } else {
        wrapper.classList.remove("sticky")
      }

      // Add end-sticky class when approaching the end to prevent overlap
      if (isHorizontalScrollComplete.current) {
        wrapper.classList.add("end-sticky")
      } else {
        wrapper.classList.remove("end-sticky")
      }

      return isInHorizontalSection.current
    }

    // Handle scroll event to check visibility and detect scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Detect scroll direction
      isScrollingUp.current = currentScrollY < lastScrollY.current

      // When scrolling up and approaching the horizontal section from below
      if (isScrollingUp.current) {
        const rect = section.getBoundingClientRect()

        // If we're approaching the section from below (scrolling up)
        if (rect.bottom > 0 && rect.bottom < window.innerHeight + 100) {
          // Reset horizontal scroll to beginning when scrolling up into the section
          if (horizontalScrollProgress.current > 0) {
            horizontalScrollProgress.current = 0
            inner.style.transform = `translateX(0%)`
            isHorizontalScrollComplete.current = false
          }
        }
      }

      checkVisibility()
      lastScrollY.current = currentScrollY
    }

    // Handle wheel events for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      // Check visibility first
      checkVisibility()

      // For downward scrolling
      if (e.deltaY > 0) {
        // Only handle horizontal scrolling when the section is in view and scrolling is not complete
        if (isInHorizontalSection.current && !isHorizontalScrollComplete.current) {
          e.preventDefault()

          // Move horizontal scroll forward
          const newProgress = Math.min(1, horizontalScrollProgress.current + 0.05)
          horizontalScrollProgress.current = newProgress
          inner.style.transform = `translateX(-${newProgress * 50}%)`

          // Check if we've reached the end
          if (newProgress >= 0.99) {
            isHorizontalScrollComplete.current = true
            wrapper.classList.add("end-sticky")
          }
        }
      }
      // For upward scrolling - only handle horizontal scrolling when section is fully visible at top
      else if (e.deltaY < 0) {
        // Only handle horizontal scrolling when the section is fully visible at the top
        if (isSectionFullyVisible.current && horizontalScrollProgress.current > 0) {
          e.preventDefault()

          // Move horizontal scroll back toward the beginning
          const newProgress = Math.max(0, horizontalScrollProgress.current - 0.05)
          horizontalScrollProgress.current = newProgress
          inner.style.transform = `translateX(-${newProgress * 50}%)`

          if (newProgress < 0.99) {
            isHorizontalScrollComplete.current = false
            wrapper.classList.remove("end-sticky")
          }
        }
      }
    }

    // Handle touch start event
    const handleTouchStart = (e: TouchEvent) => {
      if (!checkVisibility()) return

      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    // Handle touch move event for horizontal scrolling
    const handleTouchMove = (e: TouchEvent) => {
      if (!checkVisibility() || !inner) return

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const diffX = touchStartX.current - touchX
      const diffY = touchStartY.current - touchY

      // Only handle horizontal swipes (when horizontal movement is greater than vertical)
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Prevent default to avoid page scrolling
        e.preventDefault()

        // Determine swipe direction
        const isSwipingLeft = diffX > 0

        // For swiping left (equivalent to scrolling down)
        if (isSwipingLeft) {
          if (!isHorizontalScrollComplete.current) {
            // Calculate new progress based on swipe distance
            const swipeFactor = 0.003 // Adjust sensitivity
            const newProgress = Math.min(1, horizontalScrollProgress.current + Math.abs(diffX) * swipeFactor)
            horizontalScrollProgress.current = newProgress
            inner.style.transform = `translateX(-${newProgress * 50}%)`

            // Check if we've reached the end
            if (newProgress >= 0.99) {
              isHorizontalScrollComplete.current = true
              wrapper.classList.add("end-sticky")
            }
          }
        }
        // For swiping right (equivalent to scrolling up)
        else {
          if (horizontalScrollProgress.current > 0) {
            // Calculate new progress based on swipe distance
            const swipeFactor = 0.003 // Adjust sensitivity
            const newProgress = Math.max(0, horizontalScrollProgress.current - Math.abs(diffX) * swipeFactor)
            horizontalScrollProgress.current = newProgress
            inner.style.transform = `translateX(-${newProgress * 50}%)`

            if (newProgress < 0.99) {
              isHorizontalScrollComplete.current = false
              wrapper.classList.remove("end-sticky")
            }
          }
        }

        // Update touch start position for continuous movement
        touchStartX.current = touchX
        touchStartY.current = touchY
      }
    }

    // Reset horizontal scroll when the section leaves the viewport
    const resetHorizontalScroll = () => {
      const isVisible = checkVisibility()

      if (!isVisible && inner) {
        // When scrolling down past the section, mark as complete
        if (!isScrollingUp.current && horizontalScrollProgress.current > 0.9) {
          isHorizontalScrollComplete.current = true
          wrapper.classList.add("end-sticky")
        }
        // When scrolling up to the section, reset to beginning
        else if (isScrollingUp.current) {
          horizontalScrollProgress.current = 0
          inner.style.transform = `translateX(0%)`
          isHorizontalScrollComplete.current = false
          wrapper.classList.remove("end-sticky")
        }
      }
    }

    // Initial call to set the correct state
    lastScrollY.current = window.scrollY
    checkVisibility()

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("scroll", resetHorizontalScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })

    // Add touch event listeners for mobile
    section.addEventListener("touchstart", handleTouchStart, { passive: true })
    section.addEventListener("touchmove", handleTouchMove, { passive: false })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", resetHorizontalScroll)
      window.removeEventListener("wheel", handleWheel)
      section.removeEventListener("touchstart", handleTouchStart)
      section.removeEventListener("touchmove", handleTouchMove)
    }
  }, [posts])

  // Only proceed if we have posts
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-6">
        <p>No featured posts available.</p>
      </div>
    )
  }

  // Ensure we have exactly 6 posts
  const displayPosts = posts.slice(0, 6)

  return (
    <div className="blog-horizontal-section" ref={sectionRef}>
      <div ref={wrapperRef} className="blog-horizontal-wrapper">
        <ResponsiveContainer className="blog-horizontal-container">
          <div className="blog-horizontal-content">
            <div ref={innerRef} className="blog-horizontal-inner" style={{ width: isMobile ? "300%" : "200%" }}>
              {displayPosts.map((post) => (
                <div key={post.id} className="blog-post-card" style={{ width: isMobile ? "45%" : "30%" }}>
                  <Link href={`/blog/${post.slug}`} className="blog-post-link group">
                    <div className="blog-post-image-wrapper">
                      <Image
                        src={post.image_url || "/placeholder.svg?height=240&width=360&query=blog post"}
                        alt={post.title}
                        width={360}
                        height={240}
                        className="blog-post-image object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="blog-post-category">{post.category}</span>
                        <span className="blog-post-divider">•</span>
                        <span className="blog-post-read-time">{post.read_time} min read</span>
                      </div>
                      <h3 className={`blog-post-title ${isMobile ? "text-base" : "text-lg"}`}>{post.title}</h3>
                      {!isMobile && <p className="blog-post-description">{post.description}</p>}
                      {post.author && (
                        <div className="blog-post-author">
                          <Image
                            src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                            alt={post.author.name}
                            width={29}
                            height={29}
                            className="blog-author-image"
                          />
                          <div className="blog-author-info">
                            <span className="blog-author-name">{post.author.name}</span>
                            {!isMobile && <span className="blog-author-title">{post.author.title}</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
