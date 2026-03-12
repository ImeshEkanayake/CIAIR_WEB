"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PublicationCardStack } from "@/components/research/publication-card-stack"
import { MobileResearchAreaAccordion } from "@/components/research/mobile-research-area-accordion"
import { getCategoryDescription } from "@/lib/category-utils"
import PublicationDetailModal from "@/components/publications/publication-detail-modal"
import type { Publication } from "@/types/supabase"

export default function MobileResearchPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Publication[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [researchAreas, setResearchAreas] = useState<Array<{ title: string; description: string; category: string; count: number }>>([])
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const supabase = await createClient()

      // Fetch publications from Supabase
      const { data: rawPublications } = await supabase
        .from("publications")
        .select(`
          *,
          publication_authors (
            team_member_id,
            is_primary_author,
            team_members (
              id,
              name,
              slug
            )
          )
        `)
        .order("citation_count", { ascending: false })
      const publicationsData = (rawPublications ?? []) as Publication[]

      setPublications(publicationsData)

      // Find uncategorized publications
      const uncategorizedPublications = publicationsData.filter((pub) => !pub.category || pub.category.trim() === "")

      // Extract unique categories from publications with categories
      const categories = Array.from(
        new Set(
          publicationsData.filter((pub) => pub.category && pub.category.trim() !== "").map((pub) => pub.category),
        ),
      ).sort()

      // Add "Other" category only if there are uncategorized publications
      if (uncategorizedPublications.length > 0) {
        categories.push("Other")
      }

      // Create research areas dynamically from categories
      const areas = categories.map((category) => ({
        title: category,
        description: getCategoryDescription(category),
        category: category,
        count:
          category === "Other"
            ? uncategorizedPublications.length
            : publicationsData.filter((pub) => pub.category === category).length,
      }))

      setResearchAreas(areas)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!searchQuery.trim()) {
      setSearchResults([])
      setHasSearched(false)
      setIsLoading(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = publications.filter((publication) => {
      // Safely check each property before calling toLowerCase()
      const titleMatch = publication.title ? publication.title.toLowerCase().includes(query) : false
      const authorsMatch = publication.authors ? publication.authors.toLowerCase().includes(query) : false
      const journalMatch = publication.journal_info ? publication.journal_info.toLowerCase().includes(query) : false
      const categoryMatch = publication.category ? publication.category.toLowerCase().includes(query) : false
      const abstractMatch = publication.abstract ? publication.abstract.toLowerCase().includes(query) : false
      const keywordsMatch = publication.keywords ? publication.keywords.toLowerCase().includes(query) : false

      return titleMatch || authorsMatch || journalMatch || categoryMatch || abstractMatch || keywordsMatch
    })

    setSearchResults(results)
    setHasSearched(true)
    setIsLoading(false)
  }

  const handlePublicationClick = (publication: Publication) => {
    setSelectedPublication(publication)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPublication(null)
  }

  return (
    <div className="w-full py-6">
      <ResponsiveContainer className="px-4">
        <h1 className="text-2xl font-bold mb-6">Research</h1>

        {/* 1. FIRST: Most Cited Publications - Card Stack */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Most Cited Publications</h2>
          <p className="text-sm text-muted-foreground mb-3">Our most influential research</p>

          {publications.length > 0 ? (
            <PublicationCardStack publications={publications} />
          ) : (
            <Card className="p-4 text-center text-muted-foreground">Loading publications...</Card>
          )}
        </section>

        {/* 2. SECOND: Search section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Search Publications</h2>

          <form onSubmit={handleSearch} className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search publications..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>

          {hasSearched && (
            <div className="mt-4 space-y-4">
              <h3 className="text-base font-medium">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`}
              </h3>

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.slice(0, 5).map((publication) => (
                    <Card
                      key={publication.id}
                      className="p-3 cursor-pointer"
                      onClick={() => handlePublicationClick(publication)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                            {publication.category || "Uncategorized"}
                          </span>
                          <span className="text-xs font-medium">{publication.year}</span>
                        </div>
                        <h4 className="font-semibold text-sm line-clamp-2">{publication.title}</h4>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-1">{publication.authors}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            Citations: {publication.citation_count}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {searchResults.length > 5 && (
                    <div className="text-center mt-3">
                      <Link href={`/research/publications?search=${encodeURIComponent(searchQuery)}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View all {searchResults.length} results
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* 3. THIRD: Research areas section with accordion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">View Research by Area</h2>
          {isLoading ? (
            <Card className="p-4 text-center text-muted-foreground">Loading research areas...</Card>
          ) : researchAreas.length > 0 ? (
            <MobileResearchAreaAccordion
              researchAreas={researchAreas}
              publications={publications}
              uncategorizedPublications={publications.filter((pub) => !pub.category || pub.category.trim() === "")}
              onPublicationClick={handlePublicationClick}
            />
          ) : (
            <Card className="p-4 text-center text-muted-foreground">
              No research categories available. Please add categories to your publications.
            </Card>
          )}
        </section>

        {/* 4. FOURTH: Publications section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Publications</h2>
          </div>

          <div className="text-center">
            <Link href="/research/publications">
              <Button className="w-full">Browse All Publications</Button>
            </Link>
          </div>
        </section>

        {/* Publication detail modal */}
        <PublicationDetailModal publication={selectedPublication} isOpen={isModalOpen} onClose={closeModal} />
      </ResponsiveContainer>
    </div>
  )
}
