"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { ResearchProject } from "@/lib/supabase"

interface HorizontalScrollProjectsProps {
  projects: ResearchProject[]
}

export function HorizontalScrollProjects({ projects }: HorizontalScrollProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Take only the latest 8 projects
  const latestProjects = projects.slice(0, 8)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current

    if (!container || !inner) return

    // Set initial position (starting from -25% instead of -75%)
    inner.style.transform = "translateX(-25%)"

    const handleScroll = () => {
      if (!container || !inner) return

      const containerRect = container.getBoundingClientRect()
      const scrolled = window.scrollY - containerRect.top + window.innerHeight / 2
      const totalScrollDistance = containerRect.height

      // Reduce speed by 50% by dividing by 6 instead of 3
      const scrollPercentage = Math.max(0, Math.min(1, scrolled / totalScrollDistance)) / 6

      // Adjust transform range from -25% to 0%
      const translateX = -25 + scrollPercentage * 25
      inner.style.transform = `translateX(${translateX}%)`
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="horizontal-container">
      <div ref={innerRef} className="inner">
        {latestProjects.map((project) => (
          <Link href={`/research/${project.slug}`} key={project.id} className="card-link">
            <Card className="research-card">
              <div className="image-container">
                <Image
                  src={project.image_url || "/placeholder.svg?height=200&width=300&query=research"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="card-image"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                  {project.summary || project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
