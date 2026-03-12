"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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

interface HorizontalScrollPublicationsProps {
  publications: Publication[]
}

export function HorizontalScrollPublications({ publications }: HorizontalScrollPublicationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

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
        inner.style.width = "250%"
        inner.style.paddingLeft = "0"
        inner.style.left = "0"
      }

      // Apply fixed widths to all card links
      const cardLinks = container?.querySelectorAll(".card-link")
      cardLinks?.forEach((card) => {
        ;(card as HTMLElement).style.width = "22%"
      })
    }

    // Apply styles initially and after any potential re-renders
    applyFixedStyles()

    const handleScroll = () => {
      if (!container || !inner) return

      const containerRect = container.getBoundingClientRect()
      const scrolled = window.scrollY - containerRect.top + window.innerHeight / 2
      const totalScrollDistance = containerRect.height

      // Adjust scroll speed for better control with the new card sizes
      const scrollPercentage = Math.max(0, Math.min(1, scrolled / totalScrollDistance)) / 2.5

      // Calculate the transform to show approximately 2.5 cards at a time
      const translateX = -scrollPercentage * 100
      inner.style.transform = `translateX(${translateX}%)`
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize position

    // Re-apply fixed styles when the component is mounted or updated
    const resizeObserver = new ResizeObserver(() => {
      applyFixedStyles()
    })

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="horizontal-container">
      <div ref={innerRef} className="inner">
        {mostCitedPublications.map((publication) => (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            key={publication.id}
            className="card-link"
            style={{ width: "22%" }} // Inline style for fixed width
          >
            <Card className="publication-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {publication.category}
                  </Badge>
                  <span className="text-sm font-medium">{publication.year}</span>
                </div>

                <h3 className="font-semibold text-lg line-clamp-2 mb-3">{publication.title}</h3>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{publication.authors}</p>

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
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
