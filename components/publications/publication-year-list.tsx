"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import type { Publication } from "@/types/supabase"
import PublicationDetailModal from "./publication-detail-modal"

type PublicationYearListProps = {
  years: number[]
  yearCounts: Record<number, number>
  publicationsByYear: Record<number, Publication[]>
}

export default function PublicationYearList({ years, yearCounts, publicationsByYear }: PublicationYearListProps) {
  const [openYear, setOpenYear] = useState<number | null>(years[0] || null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleToggle = (year: number) => {
    setOpenYear(openYear === year ? null : year)
  }

  const handlePublicationClick = (publication: Publication, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedPublication(publication)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4">
      {years.map((year) => {
        const publications = publicationsByYear[year] || []
        const isOpen = openYear === year

        return (
          <div key={year} className="border-b pb-4">
            <div className="cursor-pointer font-bold text-lg py-2 flex items-center" onClick={() => handleToggle(year)}>
              <span className="mr-2">{isOpen ? "▼" : "▶"}</span>
              {year} ({yearCounts[year]})
            </div>

            {isOpen ? (
              <table className="gsc_table w-full mt-2">
                <thead>
                  <tr>
                    <th className="text-left p-2 bg-gray-50">Title</th>
                    <th className="text-left p-2 w-24 bg-gray-50">Cited by</th>
                    <th className="text-left p-2 w-24 bg-gray-50">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((publication) => {
                    const authors = publication.publication_authors ?? []

                    return (
                      <tr key={publication.id} className="border-t">
                        <td className="p-2">
                          <a
                            href="#"
                            onClick={(e) => handlePublicationClick(publication, e)}
                            className="gsc_a_at text-blue-600 hover:underline cursor-pointer"
                          >
                            {publication.title}
                          </a>
                          <div className="gs_gray text-gray-600 text-sm mt-1">{publication.authors}</div>
                          <div className="gs_gray text-gray-600 text-sm">{publication.journal_info}</div>
                          {authors.length > 0 ? (
                            <div className="text-sm mt-1">
                              <span className="text-gray-600">CIAIR Authors: </span>
                              {authors.map((author, index) => (
                                <span key={author.team_member_id}>
                                  <Link href={`/team/${author.team_members.slug}`} className="text-blue-600 hover:underline">
                                    {author.team_members.name}
                                    {author.is_primary_author && "*"}
                                  </Link>
                                  {index < authors.length - 1 ? ", " : ""}
                                </span>
                              ))}
                              <span className="text-xs text-gray-500 ml-1">(* primary author)</span>
                            </div>
                          ) : null}
                        </td>
                        <td className="p-2">{publication.citation_count > 0 ? publication.citation_count : "NA"}</td>
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
