"use client"

import { useState } from "react"
import Link from "next/link"

type TeamMember = {
  id: number
  name: string
  slug: string
}

type PublicationAuthor = {
  team_member_id: number
  is_primary_author: boolean
  team_members: TeamMember
}

type Publication = {
  id: number
  title: string
  authors: string
  journal_info: string
  citation_count: number
  year: number
  url: string
  publication_authors: PublicationAuthor[]
}

type PublicationsListProps = {
  publicationsByYear: Record<number, Publication[]>
  years: number[]
}

export default function PublicationsList({ publicationsByYear, years }: PublicationsListProps) {
  const [openYear, setOpenYear] = useState<number | null>(years[0] || null)

  const handleToggle = (year: number) => {
    setOpenYear(openYear === year ? null : year)
  }

  return (
    <div className="space-y-4">
      {years.map((year) => {
        const publications = publicationsByYear[year] || []
        return (
          <div key={year} className="border-b pb-4">
            <details open={openYear === year} onToggle={() => handleToggle(year)}>
              <summary className="cursor-pointer font-bold text-lg py-2 flex items-center">
                <span className="mr-2">{openYear === year ? "▼" : "►"}</span>
                {year} ({publications.length})
              </summary>
              <table className="w-full mt-2">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2 w-24">Cited by</th>
                    <th className="text-left p-2 w-24">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((publication) => (
                    <tr key={publication.id} className="border-t">
                      <td className="p-2">
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {publication.title}
                        </a>
                        <div className="text-gray-600 text-sm mt-1">{publication.authors}</div>
                        <div className="text-gray-600 text-sm">{publication.journal_info}</div>
                        {publication.publication_authors && publication.publication_authors.length > 0 && (
                          <div className="text-sm mt-1">
                            <span className="text-gray-600">CIAIR Authors: </span>
                            {publication.publication_authors.map((author, index) => (
                              <span key={author.team_member_id}>
                                <Link
                                  href={`/team/${author.team_members.slug}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {author.team_members.name}
                                  {author.is_primary_author && "*"}
                                </Link>
                                {index < publication.publication_authors.length - 1 ? ", " : ""}
                              </span>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">(* primary author)</span>
                          </div>
                        )}
                      </td>
                      <td className="p-2">{publication.citation_count > 0 ? publication.citation_count : "N/A"}</td>
                      <td className="p-2">{publication.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>
        )
      })}
    </div>
  )
}
