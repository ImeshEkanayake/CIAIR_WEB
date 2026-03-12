"use client"

import type { CSSProperties } from "react"
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtLastCard = useRef(false)
  const isAtFirstCard = useRef(true)
  const wheelDeltaAccumulator = useRef(0)
  const wheelResetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMobile()
  const cssStyles = isMobile ? mobileStyles : styles

  // Clamp helper
  const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max))

  const resetWheelAccumulator = useCallback(() => {
    wheelDeltaAccumulator.current = 0

    if (wheelResetTimeout.current) {
      clearTimeout(wheelResetTimeout.current)
      wheelResetTimeout.current = null
    }
  }, [])

  const scheduleWheelAccumulatorReset = useCallback(() => {
    if (wheelResetTimeout.current) {
      clearTimeout(wheelResetTimeout.current)
    }

    wheelResetTimeout.current = setTimeout(() => {
      wheelDeltaAccumulator.current = 0
      wheelResetTimeout.current = null
    }, 140)
  }, [])

  const isInViewport = useCallback(() => {
    const container = containerRef.current
    if (!container) return false

    const rect = container.getBoundingClientRect()
    return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.2
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

  // Initialize the position flags
  useEffect(() => {
    isAtFirstCard.current = current === 0
    isAtLastCard.current = current === topPublications.length - 1
  }, [current, topPublications.length])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isInViewport()) {
        resetWheelAccumulator()
        return
      }

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      if ((isScrollingDown && isAtLastCard.current) || (isScrollingUp && isAtFirstCard.current)) {
        resetWheelAccumulator()
        return
      }

      wheelDeltaAccumulator.current += e.deltaY
      scheduleWheelAccumulatorReset()

      if (Math.abs(wheelDeltaAccumulator.current) < 42) {
        e.preventDefault()
        return
      }

      e.preventDefault()

      if (wheelDeltaAccumulator.current > 0) {
        goToNextCard()
      } else {
        goToPrevCard()
      }

      resetWheelAccumulator()
    }

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)

      if (wheelResetTimeout.current) {
        clearTimeout(wheelResetTimeout.current)
      }
    }
  }, [goToNextCard, goToPrevCard, isInViewport, resetWheelAccumulator, scheduleWheelAccumulatorReset])

  useEffect(() => {
    if (!direction) return

    const timeout = setTimeout(() => setDirection(null), 220)
    return () => clearTimeout(timeout)
  }, [direction])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (!inViewport) return

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
  }, [goToNextCard, goToPrevCard])

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
    <div
      ref={sectionRef}
      className={cssStyles.section}
      style={{ ["--stack-cards" as string]: topPublications.length } as CSSProperties}
    >
      <div ref={containerRef} className={cssStyles.stage}>
        {topPublications.map((publication, i) => {
        const offset = i - current // 0 = front, 1 = just behind, …
        const depth = Math.abs(offset)

        // Calculate visibility for backward and forward cards
        const isBackwardCard = offset < 0
        const isForwardCard = offset > 0
        const isCurrentCard = offset === 0

        // Adjust the positioning and scaling based on card position
        let translateY = offset * 14
        let scale = 1 - depth * 0.035
        let rotateX = 0

        // Increase visibility for backward cards (cards above current)
        if (isBackwardCard) {
          translateY = offset * 18
          rotateX = 1.5
        }

        // Increase visibility for forward cards (cards below current)
        if (isForwardCard) {
          translateY = offset * 28
          scale = 1 - depth * 0.025
          rotateX = -2
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
              transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg)`,
              opacity: depth > 3 ? 0 : Math.max(0.18, 1 - depth * 0.22),
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
    </div>
  )
}
