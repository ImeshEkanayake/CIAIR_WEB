"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ChevronDown } from "lucide-react"

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

interface PinnedPublicationCardsProps {
  publications: Publication[]
}

export function PinnedPublicationCards({ publications }: PinnedPublicationCardsProps) {
  // Get the top 6 most cited publications
  const topCitedPublications = publications.slice(0, 6)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isPinned, setIsPinned] = useState(false)
  const [cardHeight, setCardHeight] = useState(400) // Default height

  useEffect(() => {
    // Get actual card height once component is mounted
    if (cardRef.current) {
      const height = cardRef.current.offsetHeight
      setCardHeight(height)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Calculate the section height (card height + 5%) - reduced from 10%
    const sectionHeight = cardHeight * 1.05

    // Calculate the total scroll distance needed
    const totalScrollHeight = sectionHeight * topCitedPublications.length

    // Create a spacer element to allow for scrolling
    const spacer = document.createElement("div")
    spacer.style.height = `${totalScrollHeight}px`
    spacer.style.position = "absolute"
    spacer.style.top = "0"
    spacer.style.left = "0"
    spacer.style.width = "100%"
    spacer.style.pointerEvents = "none"
    container.appendChild(spacer)

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const containerTop = rect.top

      // Check if we should pin the container
      if (containerTop <= 0 && containerTop > -totalScrollHeight + sectionHeight) {
        setIsPinned(true)

        // Calculate which card should be active based on scroll position
        const scrollProgress = -containerTop / (totalScrollHeight - sectionHeight)
        const cardIndex = Math.min(
          Math.floor(scrollProgress * topCitedPublications.length),
          topCitedPublications.length - 1,
        )
        setActiveIndex(cardIndex)
      } else {
        setIsPinned(false)
        if (containerTop > 0) {
          setActiveIndex(-1) // Before the container
        } else {
          setActiveIndex(topCitedPublications.length - 1) // After the container
        }
      }
    }

    // Initial call
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (container.contains(spacer)) {
        container.removeChild(spacer)
      }
    }
  }, [topCitedPublications.length, cardHeight])

  return (
    <div
      className="stacked-cards-container"
      ref={containerRef}
      style={{ height: `${cardHeight * 1.05 * topCitedPublications.length}px` }} // Reduced from 1.1 to 1.05
    >
      <div
        className="stacked-cards-wrapper"
        style={{
          position: isPinned ? "fixed" : "relative",
          top: isPinned ? 0 : "auto",
          left: 0,
          width: "100%",
          height: `${cardHeight * 1.05}px`, // Reduced from 1.1 to 1.05
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Changed from center to flex-start
          alignItems: "center",
          paddingTop: "10px", // Added minimal top padding
          zIndex: 5,
        }}
      >
        <ul className="stacked-cards">
          {topCitedPublications.map((publication, index) => (
            <li
              key={publication.id}
              className={`stacked-card ${index === activeIndex ? "active" : ""}`}
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transform: `scale(${index === activeIndex ? 1 : 0})`,
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div
                className="stacked-card-body"
                ref={index === 0 ? cardRef : undefined} // Reference the first card to get height
              >
                <div className="stacked-card-header">
                  <Badge variant="outline">{publication.category}</Badge>
                  <span className="text-sm font-medium">{publication.year}</span>
                </div>

                <div className="stacked-card-content">
                  <h3 className="text-lg font-semibold mb-2">{publication.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{publication.authors}</p>
                  <p className="text-muted-foreground text-xs italic mb-3">{publication.journal_info}</p>

                  {publication.publication_authors && publication.publication_authors.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">CIAIR Authors:</p>
                      <div className="flex flex-wrap gap-1">
                        {publication.publication_authors.map((author) => (
                          <Link
                            href={`/team/${author.team_members.slug}`}
                            key={author.team_member_id}
                            className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80"
                          >
                            {author.team_members.name}
                            {author.is_primary_author && "*"}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="stacked-card-footer">
                  <div className="flex items-center">
                    <span className="mr-1 text-sm">Citations:</span>
                    <span className="font-medium">{publication.citation_count}</span>
                  </div>
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Publication <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="scroll-indicator">
          {topCitedPublications.map((_, index) => (
            <div key={index} className={`scroll-indicator-dot ${index === activeIndex ? "active" : ""}`} />
          ))}
        </div>

        {activeIndex === -1 && (
          <div className="scroll-instruction">
            <span>Scroll down to explore</span>
            <ChevronDown size={16} />
          </div>
        )}
      </div>
    </div>
  )
}
