"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

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

interface HorizontalScrollPostsProps {
  posts: Post[]
}

export function HorizontalScrollPosts({ posts }: HorizontalScrollPostsProps) {
  const horizontalWrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Make sure we have posts
    if (!posts || posts.length === 0) return

    const handleScroll = () => {
      const windowScroll = window.scrollY
      const horizontalWrapper = horizontalWrapperRef.current
      const inner = innerRef.current

      if (!horizontalWrapper || !inner) return

      // Get the position of the wrapper relative to the viewport
      const wrapperRect = horizontalWrapper.getBoundingClientRect()
      const wrapperTop = wrapperRect.top + window.scrollY

      // Calculate the scroll progress
      const scrollStart = wrapperTop - 100 // Start a bit earlier
      const scrollEnd = wrapperTop + horizontalWrapper.offsetHeight - window.innerHeight + 100 // End a bit later

      // Calculate how far we've scrolled within the section
      const scrolled = windowScroll - scrollStart
      const totalScrollDistance = scrollEnd - scrollStart

      // Calculate the percentage scrolled (0 to 1) - SLOWED DOWN by dividing by 3
      const scrollPercentage = Math.max(0, Math.min(1, scrolled / totalScrollDistance)) / 3

      // Apply the transform - we're moving from 0% to 100% horizontally
      inner.style.transform = `translateX(-${scrollPercentage * 100}%)`

      // Add sticky class when in the viewport
      if (windowScroll >= wrapperTop - 100 && windowScroll <= scrollEnd - 100) {
        horizontalWrapper.classList.add("sticky")
      } else {
        horizontalWrapper.classList.remove("sticky")
      }
    }

    // Initial call to set the correct state
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
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
    <div className="horizontal-scroll-section">
      <div ref={horizontalWrapperRef} className="horizontal-wrapper">
        <ResponsiveContainer className="horizontal-container">
          <div className="horizontal-content">
            <div ref={innerRef} className="inner">
              {displayPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <Link href={`/blog/${post.slug}`} className="post-link group">
                    <div className="post-image-wrapper">
                      <Image
                        src={post.image_url || "/placeholder.svg?height=240&width=360&query=blog post"}
                        alt={post.title}
                        width={360}
                        height={240}
                        className="post-image object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-category">{post.category}</span>
                        <span className="post-divider">•</span>
                        <span className="post-read-time">{post.read_time} min read</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-description">{post.description}</p>
                      {post.author && (
                        <div className="post-author">
                          <Image
                            src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                            alt={post.author.name}
                            width={29}
                            height={29}
                            className="author-image"
                          />
                          <div className="author-info">
                            <span className="author-name">{post.author.name}</span>
                            <span className="author-title">{post.author.title}</span>
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
