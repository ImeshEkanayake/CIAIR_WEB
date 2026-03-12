"use client"

import type React from "react"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import PublicationDetailModal from "@/components/publications/publication-detail-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Publication } from "@/types/supabase"

interface PublicationSearchProps {
  publications: Publication[]
}

export default function PublicationSearch({ publications }: PublicationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Publication[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [openYear, setOpenYear] = useState<number | null>(null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setSearchResults([])
      setHasSearched(false)
      setOpenYear(null)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = publications.filter((publication) => {
      const titleMatch = publication.title.toLowerCase().includes(query)
      const authorsMatch = publication.authors.toLowerCase().includes(query)
      const journalMatch = publication.journal_info.toLowerCase().includes(query)
      const categoryMatch = publication.category.toLowerCase().includes(query)
      const abstractMatch = publication.abstract ? publication.abstract.toLowerCase().includes(query) : false
      const keywordsMatch = publication.keywords ? publication.keywords.toLowerCase().includes(query) : false

      return titleMatch || authorsMatch || journalMatch || categoryMatch || abstractMatch || keywordsMatch
    })

    const scoredResults = results
      .map((publication) => {
        let score = 0

        if (publication.title.toLowerCase().includes(query)) score += 10
        if (publication.abstract?.toLowerCase().includes(query)) score += 5
        if (publication.keywords?.toLowerCase().includes(query)) score += 8
        if (publication.authors.toLowerCase().includes(query)) score += 3
        if (publication.journal_info.toLowerCase().includes(query)) score += 2
        if (publication.category.toLowerCase().includes(query)) score += 1
        score += (publication.citation_count || 0) / 100

        return { publication, score }
      })
      .sort((a, b) => b.score - a.score)
      .map((item) => item.publication)

    setSearchResults(scoredResults)
    setHasSearched(true)

    const years = Array.from(new Set(scoredResults.map((p) => p.year))).sort((a, b) => b - a)
    setOpenYear(years[0] ?? null)
  }

  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, Publication[]> = {}

    searchResults.forEach((publication) => {
      if (!grouped[publication.year]) {
        grouped[publication.year] = []
      }
      grouped[publication.year].push(publication)
    })

    return grouped
  }, [searchResults])

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search publications by title, abstract, keywords..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {hasSearched ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {searchResults.length > 0
              ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </h3>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Research Publications</h2>

              <div className="space-y-4">
                {years.map((year) => {
                  const publicationsForYear = publicationsByYear[year]
                  const isOpen = openYear === year

                  return (
                    <div key={year} className="border-b pb-4 dark:border-gray-700">
                      <div className="cursor-pointer font-bold text-lg py-2 flex items-center" onClick={() => setOpenYear(isOpen ? null : year)}>
                        <span className="mr-2">{isOpen ? "▼" : "▶"}</span>
                        {year} ({publicationsForYear.length})
                      </div>

                      {isOpen ? (
                        <table className="w-full mt-2">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <th className="text-left p-2">Title</th>
                              <th className="text-left p-2 w-24">Cited by</th>
                              <th className="text-left p-2 w-24">Year</th>
                            </tr>
                          </thead>
                          <tbody>
                            {publicationsForYear.map((publication) => {
                              const authors = publication.publication_authors ?? []

                              return (
                                <tr
                                  key={publication.id}
                                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                  onClick={() => {
                                    setSelectedPublication(publication)
                                    setIsModalOpen(true)
                                  }}
                                >
                                  <td className="p-2">
                                    <div className="text-blue-600 hover:underline dark:text-blue-400">{publication.title}</div>
                                    <div className="text-gray-600 text-sm mt-1 dark:text-gray-400">{publication.authors}</div>
                                    <div className="text-gray-600 text-sm dark:text-gray-400">{publication.journal_info}</div>
                                    {publication.abstract ? (
                                      <div className="text-gray-600 text-sm mt-1 line-clamp-2 dark:text-gray-400">
                                        <span className="font-medium">Abstract:</span> {publication.abstract}
                                      </div>
                                    ) : null}
                                    {publication.keywords ? (
                                      <div className="text-gray-600 text-sm mt-1 dark:text-gray-400">
                                        <span className="font-medium">Keywords:</span> {publication.keywords}
                                      </div>
                                    ) : null}
                                    {authors.length > 0 ? (
                                      <div className="text-sm mt-1">
                                        <span className="text-gray-600 dark:text-gray-400">CIAIR Authors: </span>
                                        {authors.map((author, index) => (
                                          <span key={author.team_member_id}>
                                            <Link
                                              href={`/team/${author.team_members?.slug ?? ""}`}
                                              className="text-blue-600 hover:underline dark:text-blue-400"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              {author.team_members?.name ?? "Unknown"}
                                              {author.is_primary_author && "*"}
                                            </Link>
                                            {index < authors.length - 1 ? ", " : ""}
                                          </span>
                                        ))}
                                        <span className="text-xs text-gray-500 ml-1 dark:text-gray-400">(* primary author)</span>
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="p-2">{publication.citation_count > 0 ? publication.citation_count : "N/A"}</td>
                                  <td className="p-2">{publication.year}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <PublicationDetailModal
        publication={selectedPublication}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPublication(null)
        }}
      />
    </div>
  )
}
