"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ChevronDown } from "lucide-react"
import styles from "./card-stack.module.css"
import mobileStyles from "./mobile-card-stack.module.css"
import { useMobile } from "@/hooks/use-mobile"
import PublicationDetailModal from "@/components/publications/publication-detail-modal"
import type { Publication } from "@/types/supabase"

type PublicationWithImage = Publication & { Image_of_Paper?: string | null }

interface PublicationCardStackProps {
  publications: PublicationWithImage[]
}

export function PublicationCardStack({ publications }: PublicationCardStackProps) {
  // Get the top 6 most cited publications
  const topPublications = publications.slice(0, 6)
  const [current, setCurrent] = useState(0)
  const ticking = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtLastCard = useRef(false)
  const isAtFirstCard = useRef(true)
  const hasScrolledAllCards = useRef(false)
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMobile()
  const cssStyles = isMobile ? mobileStyles : styles

  // Touch handling
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const minSwipeDistance = 50 // Minimum distance for a swipe to register

  // Clamp helper
  const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max))

  // Check if we're at the top of the page
  const isPageAtTop = () => window.scrollY <= 0

  // Check if the component is in viewport
  const isInViewport = useCallback(() => {
    const container = containerRef.current
    if (!container) return false

    const rect = container.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }, [])

  // Navigate to next card
  const goToNextCard = useCallback(() => {
    if (isAtLastCard.current || ticking.current) return false

    ticking.current = true
    setDirection("down")

    setCurrent((c) => {
      const newCurrent = clamp(c + 1, 0, topPublications.length - 1)
      isAtFirstCard.current = newCurrent === 0
      isAtLastCard.current = newCurrent === topPublications.length - 1

      // If we've reached the last card, mark that we've scrolled through all cards
      if (newCurrent === topPublications.length - 1) {
        hasScrolledAllCards.current = true
      }

      return newCurrent
    })

    // Allow next tick after transition
    setTimeout(() => {
      ticking.current = false
      // Reset direction after animation completes
      setTimeout(() => setDirection(null), 50)
    }, 250)

    return true
  }, [topPublications.length])

  // Navigate to previous card
  const goToPrevCard = useCallback(() => {
    if (isAtFirstCard.current || ticking.current) return false

    ticking.current = true
    setDirection("up")

    setCurrent((c) => {
      const newCurrent = clamp(c - 1, 0, topPublications.length - 1)
      isAtFirstCard.current = newCurrent === 0
      isAtLastCard.current = newCurrent === topPublications.length - 1

      // If we're no longer at the last card, reset the flag
      if (newCurrent < topPublications.length - 1) {
        hasScrolledAllCards.current = false
      }

      return newCurrent
    })

    // Allow next tick after transition
    setTimeout(() => {
      ticking.current = false
      // Reset direction after animation completes
      setTimeout(() => setDirection(null), 50)
    }, 250)

    return true
  }, [topPublications.length])

  // Handle scroll events (wheel, touchpad, scroll bar)
  const handleScroll = useCallback(
    (e: Event) => {
      // Only handle scroll events when the component is in viewport
      if (!isInViewport()) return

      // Get scroll direction from window scroll position change
      const scrollY = window.scrollY
      const scrollDirection = scrollY > (window as any).lastScrollY ? "down" : "up"
      ;(window as any).lastScrollY = scrollY

      // Handle scrolling based on direction
      if (scrollDirection === "down") {
        // If we're not at the last card, navigate to next card
        if (!isAtLastCard.current) {
          if (goToNextCard()) {
            // Prevent default scroll behavior
            e.preventDefault()
            // Keep scroll position stable
            window.scrollTo(0, scrollY)
          }
        }
      } else if (scrollDirection === "up") {
        // If we're at the top of the page and not at the first card, navigate to previous card
        if (isPageAtTop() && !isAtFirstCard.current) {
          if (goToPrevCard()) {
            // Prevent default scroll behavior
            e.preventDefault()
            // Keep scroll position stable
            window.scrollTo(0, 0)
          }
        }
      }
    },
    [isInViewport, goToNextCard, goToPrevCard],
  )

  // Handle wheel events
  const onWheel = useCallback(
    (e: WheelEvent) => {
      // Only handle wheel events when the component is in viewport
      if (!isInViewport()) return

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // If component is not in viewport and we're not at the first card (scrolling up)
      // or not at the last card (scrolling down), we should handle the event
      const shouldHandleEvent =
        (isScrollingDown && !hasScrolledAllCards.current) || (isScrollingUp && isPageAtTop() && !isAtFirstCard.current)

      if (!shouldHandleEvent) {
        return // Let the page scroll normally
      }

      // Case 1: Scrolling down and not at the last card - always scroll cards first
      if (isScrollingDown && !isAtLastCard.current) {
        e.preventDefault() // Prevent page scrolling
        goToNextCard()
        return
      }

      // Case 2: Scrolling down and at the last card - allow page scrolling
      if (isScrollingDown && isAtLastCard.current) {
        return // Don't prevent default, allow page to scroll
      }

      // Case 3: Scrolling up and at the top of the page and not at the first card - scroll cards in reverse
      if (isScrollingUp && isPageAtTop() && !isAtFirstCard.current) {
        e.preventDefault() // Prevent page scrolling
        goToPrevCard()
        return
      }

      // Case 4: Scrolling up but not at the top of the page - allow normal page scrolling
      if (isScrollingUp && !isPageAtTop()) {
        return // Don't prevent default, allow page to scroll
      }
    },
    [isInViewport, goToNextCard, goToPrevCard],
  )

  // Handle touch start event
  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  // Handle touch move event
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      // Only handle touch events when the component is in viewport
      if (!isInViewport()) return

      // Store current touch position
      touchEndY.current = e.touches[0].clientY

      // Calculate distance moved
      const touchDiff = touchStartY.current - touchEndY.current

      // If we're swiping down and not at the last card, prevent default to avoid page scroll
      if (touchDiff > 0 && !isAtLastCard.current) {
        e.preventDefault()
      }

      // If we're swiping up and at the top of the page and not at the first card, prevent default
      if (touchDiff < 0 && isPageAtTop() && !isAtFirstCard.current) {
        e.preventDefault()
      }
    },
    [isInViewport],
  )

  // Handle touch end event
  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      // Only handle touch events when the component is in viewport
      if (!isInViewport()) return

      // Calculate swipe distance
      const touchDiff = touchStartY.current - touchEndY.current

      // If the swipe distance is greater than the minimum, handle the swipe
      if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0) {
          // Swiped up (move to next card)
          if (!isAtLastCard.current) {
            goToNextCard()
          }
        } else {
          // Swiped down (move to previous card)
          if (isPageAtTop() && !isAtFirstCard.current) {
            goToPrevCard()
          }
        }
      }
    },
    [isInViewport, goToNextCard, goToPrevCard],
  )

  // Initialize the position flags
  useEffect(() => {
    isAtFirstCard.current = current === 0
    isAtLastCard.current = current === topPublications.length - 1

    // Reset the hasScrolledAllCards flag when the component mounts or when current changes to first card
    if (current === 0) {
      hasScrolledAllCards.current = false
    }
  }, [current, topPublications.length])

  // Set up event listeners
  useEffect(() => {
    // Initialize last scroll position
    ;(window as any).lastScrollY = window.scrollY

    // Add event listeners
    document.addEventListener("wheel", onWheel, { passive: false })
    document.addEventListener("scroll", handleScroll, { passive: false })

    // Add touch event listeners for mobile
    const container = containerRef.current
    if (container) {
      container.addEventListener("touchstart", onTouchStart, { passive: true })
      container.addEventListener("touchmove", onTouchMove, { passive: false })
      container.addEventListener("touchend", onTouchEnd, { passive: true })
    }

    return () => {
      // Remove event listeners
      document.removeEventListener("wheel", onWheel)
      document.removeEventListener("scroll", handleScroll)

      // Remove touch event listeners
      if (container) {
        container.removeEventListener("touchstart", onTouchStart)
        container.removeEventListener("touchmove", onTouchMove)
        container.removeEventListener("touchend", onTouchEnd)
      }
    }
  }, [onWheel, handleScroll, onTouchStart, onTouchMove, onTouchEnd])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when the component is in viewport
      if (!isInViewport()) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (!isAtLastCard.current) {
          e.preventDefault()
          goToNextCard()
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (!isAtFirstCard.current) {
          e.preventDefault()
          goToPrevCard()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isInViewport, goToNextCard, goToPrevCard])

  // Handle card click to open modal
  const handleCardClick = (publication: Publication) => {
    setSelectedPublication(publication)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPublication(null)
  }

  // If there are no publications, show a message
  if (!publications || publications.length === 0) {
    return <div className="text-center p-8">No publications available</div>
  }

  return (
    <div ref={containerRef} className={cssStyles.stage}>
      {topPublications.map((publication, i) => {
        const offset = i - current // 0 = front, 1 = just behind, …
        const depth = Math.abs(offset)

        // Calculate visibility for backward and forward cards
        const isBackwardCard = offset < 0
        const isForwardCard = offset > 0
        const isCurrentCard = offset === 0

        // Adjust the positioning and scaling based on card position
        let translateY = offset * 8
        let scale = 1 - depth * 0.03

        // Increase visibility for backward cards (cards above current)
        if (isBackwardCard) {
          // Show more of backward cards (15px instead of 8px)
          translateY = offset * 15
        }

        // Increase visibility for forward cards (cards below current)
        if (isForwardCard) {
          // Show more of forward cards (20px instead of 8px)
          translateY = offset * 20

          // Adjust scale to make forward cards more visible
          scale = 1 - depth * 0.02
        }

        // Default placeholder image if Image_of_Paper is not available
        const placeholderImage = `/placeholder.svg?height=180&width=320&query=AI%20Research%20Publication`

        return (
          <article
            key={publication.id}
            className={`
              ${cssStyles.card} 
              ${isForwardCard ? cssStyles.forwardCard : ""} 
              ${isBackwardCard ? cssStyles.backwardCard : ""} 
              ${isCurrentCard ? cssStyles.currentCard : ""}
              ${direction === "up" ? cssStyles.scrollingUp : ""}
              ${direction === "down" ? cssStyles.scrollingDown : ""}
            `}
            style={{
              zIndex: topPublications.length - depth,
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity: depth > 2 ? 0 : 1, // Hide far-back cards
            }}
            onClick={() => handleCardClick(publication)}
          >
            <div className={cssStyles.cardContent}>
              <div className={cssStyles.cardHeader}>
                <span className={cssStyles.tag}>{publication.category}</span>
                <span className={cssStyles.year}>{publication.year}</span>
              </div>

              <h3 className={cssStyles.title}>{publication.title}</h3>
              <p className={cssStyles.authors}>{publication.authors}</p>
              <p className={cssStyles.journal}>{publication.journal_info}</p>

              {Array.isArray(publication.publication_authors) && publication.publication_authors.length > 0 && (
                <div className={cssStyles.ciairAuthors}>
                  <p className={cssStyles.ciairAuthorsTitle}>CIAIR Authors:</p>
                  <div className={cssStyles.authorLinks}>
                    {publication.publication_authors.map((author, idx) => {
                      const slug = author.team_members?.slug ?? null
                      const name = author.team_members?.name ?? "Unknown"
                      const key = author.team_member_id ?? `${publication.id}-author-${idx}`

                      return slug ? (
                        <Link
                          href={`/team/${slug}`}
                          key={key}
                          className={cssStyles.authorLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {name}
                          {author.is_primary_author && "*"}
                        </Link>
                      ) : (
                        <span key={key} className={cssStyles.authorLink}>
                          {name}
                          {author.is_primary_author && "*"}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Publication Image - 16:9 aspect ratio */}
              <div className={cssStyles.publicationImage}>
                <Image
                  src={publication.Image_of_Paper || placeholderImage}
                  alt={`Image for ${publication.title}`}
                  width={320}
                  height={180}
                  className={cssStyles.image}
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    ;(e.target as HTMLImageElement).src = placeholderImage
                  }}
                />
              </div>

              <div className={cssStyles.cardFooter}>
                <div className={cssStyles.citations}>
                  <span className={cssStyles.citationsLabel}>Citations:</span>
                  <span className={cssStyles.citationsCount}>{publication.citation_count}</span>
                </div>
                {publication.url ? (
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cssStyles.publicationLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Publication <ExternalLink className={cssStyles.linkIcon} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        )
      })}

      {/* Card position counter */}
      <div className={cssStyles.cardCounter}>
        {current + 1} / {topPublications.length}
      </div>

      {/* Visual indicator for scrolling */}
      {!isAtLastCard.current && (
        <div className={cssStyles.scrollIndicator}>
          <span>Scroll to see more</span>
          <ChevronDown size={18} />
        </div>
      )}

      {/* Publication detail modal */}
      <PublicationDetailModal publication={selectedPublication} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
