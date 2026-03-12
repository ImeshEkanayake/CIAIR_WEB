"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Publication {
  id: number
  title: string
  authors: string
  journal_info: string
  citation_count: number
  year: number
  url: string
  category: string
  publication_authors?: Array<{
    team_member_id: number
    is_primary_author: boolean
    team_members: {
      id: number
      name: string
      slug: string
    }
  }>
}

interface ResearchHorizontalPublicationsProps {
  publications: Publication[]
}

export function ResearchHorizontalPublications({ publications }: ResearchHorizontalPublicationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
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

  // Update the component to have fixed card sizes with 2.5 cards visible at a time
  const mostCitedPublications = publications.slice(0, 6)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current

    if (!container || !inner) return

    // Set initial position to ensure the first card is fully visible
    inner.style.transform = "translateX(0%)"

    // Apply fixed styles to ensure consistency
    const applyFixedStyles = () => {
      if (inner) {
        inner.style.width = isMobile ? "500%" : "250%"
        inner.style.paddingLeft = "0"
        inner.style.left = "0"
      }

      // Apply fixed widths to all card links
      const cardLinks = container?.querySelectorAll(".research-card-link")
      cardLinks?.forEach((card) => {
        ;(card as HTMLElement).style.width = isMobile ? "45%" : "22%"
      })
    }

    // Apply styles initially and after any potential re-renders
    applyFixedStyles()

    // Check if the container is in the viewport
    const checkVisibility = () => {
      if (!container) return false

      const rect = container.getBoundingClientRect()

      // Check if section is fully visible at the top of the viewport (for upward scrolling)
      isSectionFullyVisible.current = rect.top <= 10 && rect.top >= -10

      // For downward scrolling, use regular visibility check
      if (!isScrollingUp.current) {
        isInHorizontalSection.current =
          rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0
      }
      // For upward scrolling, only consider it "in section" when fully visible at the top
      else {
        isInHorizontalSection.current = isSectionFullyVisible.current
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
        const rect = container.getBoundingClientRect()

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
          inner.style.transform = `translateX(-${newProgress * 100}%)`

          // Check if we've reached the end
          if (newProgress >= 0.99) {
            isHorizontalScrollComplete.current = true
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
          inner.style.transform = `translateX(-${newProgress * 100}%)`
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
            inner.style.transform = `translateX(-${newProgress * 100}%)`

            // Check if we've reached the end
            if (newProgress >= 0.99) {
              isHorizontalScrollComplete.current = true
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
            inner.style.transform = `translateX(-${newProgress * 100}%)`
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
        }
        // When scrolling up to the section, reset to beginning
        else if (isScrollingUp.current) {
          horizontalScrollProgress.current = 0
          inner.style.transform = `translateX(0%)`
          isHorizontalScrollComplete.current = false
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("scroll", resetHorizontalScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })

    // Add touch event listeners for mobile
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    // Initialize
    lastScrollY.current = window.scrollY
    checkVisibility()

    // Re-apply fixed styles when the component is mounted or updated
    const resizeObserver = new ResizeObserver(() => {
      applyFixedStyles()
    })

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", resetHorizontalScroll)
      window.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
  }, [isScrolling, isMobile])

  return (
    <div ref={containerRef} className="research-horizontal-container">
      <div ref={innerRef} className="research-horizontal-inner">
        {mostCitedPublications.map((publication) => (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            key={publication.id}
            className="research-card-link"
            style={{ width: isMobile ? "45%" : "22%" }} // Responsive width
          >
            <Card className="research-publication-card">
              <CardContent className={`p-5 ${isMobile ? "p-3" : "p-5"}`}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {publication.category}
                  </Badge>
                  <span className="text-sm font-medium">{publication.year}</span>
                </div>

                <h3 className={`font-semibold ${isMobile ? "text-base" : "text-lg"} line-clamp-2 mb-3`}>
                  {publication.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{publication.authors}</p>

                {!isMobile && <p className="text-muted-foreground text-xs italic mb-3">{publication.journal_info}</p>}

                {publication.publication_authors && publication.publication_authors.length > 0 && !isMobile && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">CIAIR Authors:</p>
                    <div className="flex flex-wrap gap-1">
                      {publication.publication_authors.map((author) => (
                        <Link
                          href={`/team/${author.team_members.slug}`}
                          key={author.team_member_id}
                          className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {author.team_members.name}
                          {author.is_primary_author && "*"}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <span className="mr-1">Citations:</span>
                    <span className="font-medium">{publication.citation_count}</span>
                  </div>
                  <ExternalLink className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-muted-foreground`} />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
