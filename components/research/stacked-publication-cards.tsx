"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

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

interface StackedPublicationCardsProps {
  publications: Publication[]
}

export function StackedPublicationCards({ publications }: StackedPublicationCardsProps) {
  // Get the top 6 most cited publications
  const topCitedPublications = publications.slice(0, 6)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // Get container position
      const rect = container.getBoundingClientRect()
      const containerHeight = rect.height
      const containerTop = rect.top
      const viewportHeight = window.innerHeight

      // Calculate how far we've scrolled through the container
      // 0 = just entered, 1 = fully scrolled through
      const scrollProgress = Math.max(0, Math.min(1, 1 - containerTop / (containerHeight - viewportHeight)))
      setScrollProgress(scrollProgress)

      // Calculate which card should be active based on scroll progress
      const cardIndex = Math.min(
        Math.floor(scrollProgress * topCitedPublications.length),
        topCitedPublications.length - 1,
      )
      setActiveIndex(cardIndex)
    }

    // Initial call
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [topCitedPublications.length])

  // Calculate positions for each card based on scroll progress
  const getCardStyle = (index: number) => {
    const basePosition = 50 // Center of viewport (%)

    // Calculate position relative to active card
    const relativeIndex = index - activeIndex

    // Calculate fractional progress within the current card
    const cardProgress = (scrollProgress * topCitedPublications.length) % 1

    // Adjust position based on relative index and card progress
    const yPosition = basePosition + (relativeIndex - cardProgress) * 100
    let scale = 1
    let opacity = 1

    // Scale and opacity based on distance from center
    if (relativeIndex < 0) {
      // Cards that have moved up
      scale = 0.8
      opacity = 0.3
    } else if (relativeIndex > 0) {
      // Cards that are coming up
      scale = 0.9
      opacity = 0.7
    } else {
      // Active card - adjust based on progress to next card
      scale = 1 - cardProgress * 0.2
      opacity = 1 - cardProgress * 0.7
    }

    // Make cards visible only when they're near the viewport
    const isVisible = yPosition > -50 && yPosition < 150

    return {
      transform: `translate(-50%, ${yPosition}%) scale(${scale})`,
      opacity: isVisible ? opacity : 0,
      zIndex: 100 - Math.abs(relativeIndex),
    }
  }

  return (
    <div className="stacked-cards-container" ref={containerRef}>
      <ul className="stacked-cards">
        {topCitedPublications.map((publication, index) => (
          <li
            key={publication.id}
            className={`stacked-card ${index >= activeIndex - 1 && index <= activeIndex + 1 ? "visible" : ""}`}
            style={getCardStyle(index)}
          >
            <div className="stacked-card-body">
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
    </div>
  )
}
