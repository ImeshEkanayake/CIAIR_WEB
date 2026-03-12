"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import "@/app/home-news-horizontal-scroll.css"

interface NewsItem {
  id: number
  title: string
  description: string
  image_url: string
  published_date: string
  slug: string
}

interface HomeNewsHorizontalProps {
  news: NewsItem[]
}

export default function HomeNewsHorizontal({ news }: HomeNewsHorizontalProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const innerContainerRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollComplete, setIsScrollComplete] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Calculate total scroll width
  const calculateScrollWidth = () => {
    if (!innerContainerRef.current || !containerRef.current) return 0
    return innerContainerRef.current.scrollWidth - containerRef.current.clientWidth
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Check if section is visible in viewport
  const checkVisibility = () => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0
    setIsVisible(isVisible)

    // Check scroll direction
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isScrollingDown = scrollTop > lastScrollTop
    setLastScrollTop(scrollTop)

    // Reset horizontal scroll when scrolling up into view
    if (!isScrollingDown && rect.top > 0 && rect.top < window.innerHeight) {
      setScrollProgress(0)
      if (innerContainerRef.current) {
        innerContainerRef.current.style.transform = `translateX(0px)`
      }
      setIsScrollComplete(false)
    }
  }

  // Handle wheel event for horizontal scrolling
  const handleWheel = (e: WheelEvent) => {
    if (!isVisible || isScrollComplete || !innerContainerRef.current || !containerRef.current) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isScrollingDown = scrollTop > lastScrollTop
    setLastScrollTop(scrollTop)

    // Only handle horizontal scroll when scrolling down and section is visible
    if (isScrollingDown && isVisible && !isScrollComplete) {
      e.preventDefault()

      const maxScroll = calculateScrollWidth()
      let newProgress = scrollProgress + e.deltaY

      // Clamp progress between 0 and maxScroll
      newProgress = Math.max(0, Math.min(newProgress, maxScroll))
      setScrollProgress(newProgress)

      // Update transform
      innerContainerRef.current.style.transform = `translateX(-${newProgress}px)`

      // Check if horizontal scroll is complete
      if (newProgress >= maxScroll) {
        setIsScrollComplete(true)
      } else {
        setIsScrollComplete(false)
      }

      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: TouchEvent) => {
    setIsTouching(true)
    setTouchStartX(e.touches[0].clientX)
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isTouching || !isVisible || !innerContainerRef.current) return

    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY

    const deltaX = touchStartX - touchX
    const deltaY = touchStartY - touchY

    // If horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && isVisible && !isScrollComplete) {
      e.preventDefault()

      const maxScroll = calculateScrollWidth()
      let newProgress = scrollProgress + deltaX

      // Clamp progress between 0 and maxScroll
      newProgress = Math.max(0, Math.min(newProgress, maxScroll))
      setScrollProgress(newProgress)

      // Update transform
      innerContainerRef.current.style.transform = `translateX(-${newProgress}px)`

      // Check if horizontal scroll is complete
      if (newProgress >= maxScroll) {
        setIsScrollComplete(true)
      } else {
        setIsScrollComplete(false)
      }

      setTouchStartX(touchX)
      setTouchStartY(touchY)
    }
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }

  // Set up event listeners
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => handleWheel(e)
    const touchStartHandler = (e: TouchEvent) => handleTouchStart(e)
    const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e)
    const touchEndHandler = () => handleTouchEnd()

    window.addEventListener("scroll", checkVisibility, { passive: true })
    document.addEventListener("wheel", wheelHandler, { passive: false })
    document.addEventListener("touchstart", touchStartHandler, { passive: true })
    document.addEventListener("touchmove", touchMoveHandler, { passive: false })
    document.addEventListener("touchend", touchEndHandler, { passive: true })

    // Initial check
    checkVisibility()

    return () => {
      window.removeEventListener("scroll", checkVisibility)
      document.removeEventListener("wheel", wheelHandler)
      document.removeEventListener("touchstart", touchStartHandler)
      document.removeEventListener("touchmove", touchMoveHandler)
      document.removeEventListener("touchend", touchEndHandler)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isVisible, scrollProgress, isScrollComplete, lastScrollTop, isTouching, touchStartX, touchStartY])

  return (
    <section ref={sectionRef} className="home-news-section w-full py-12 md:py-24 lg:py-32">
      <ResponsiveContainer>
        <div ref={containerRef} className="home-news-sticky-container">
          <div className="home-news-horizontal-container">
            <div className="home-news-header">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest News</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto mt-4">
                Stay updated with the latest developments and announcements from our institute
              </p>
            </div>
            <div className="home-news-scroll-container">
              <div ref={innerContainerRef} className="home-news-inner-container">
                {news && news.length > 0 ? (
                  news.map((item) => (
                    <div key={item.id} className="home-news-card">
                      <div className="home-news-card-inner">
                        <div className="relative w-full h-[200px]">
                          <Image
                            src={item.image_url || "/placeholder.svg?height=400&width=600&query=research+news"}
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="home-news-card-image"
                          />
                        </div>
                        <div className="home-news-card-content">
                          <div className="home-news-card-date">{formatDate(item.published_date)}</div>
                          <h3 className="home-news-card-title">{item.title}</h3>
                          <p className="home-news-card-description">{item.description}</p>
                          <Link href={`/news/${item.slug}`} className="home-news-card-link">
                            Read more <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="home-news-empty">
                    <p className="text-gray-600 font-medium">No news items available at this time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
