"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import PublicationDetailModal from "@/components/publications/publication-detail-modal"
import type { Publication } from "@/types/supabase"

interface ResearchArea {
  title: string
  description: string
  category: string
  count: number
}

interface MobileResearchAreaAccordionProps {
  researchAreas: ResearchArea[]
  publications: Publication[]
  uncategorizedPublications: Publication[]
  onPublicationClick?: (publication: Publication) => void
}

export function MobileResearchAreaAccordion({
  researchAreas,
  publications,
  uncategorizedPublications,
  onPublicationClick,
}: MobileResearchAreaAccordionProps) {
  const [expandedArea, setExpandedArea] = useState<string | null>(null)
  const [expandedYear, setExpandedYear] = useState<number | null>(null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleArea = (category: string) => {
    if (expandedArea === category) {
      setExpandedArea(null)
      setExpandedYear(null) // Reset expanded year when closing area
    } else {
      setExpandedArea(category)
      setExpandedYear(null) // Reset expanded year when changing area
    }
  }

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year)
  }

  const handlePublicationClick = (publication: Publication) => {
    if (onPublicationClick) {
      onPublicationClick(publication)
      return
    }
    setSelectedPublication(publication)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        {researchAreas.map((area) => {
          const isAreaExpanded = expandedArea === area.category

          // Filter publications based on category
          const filteredPublications =
            area.category === "Other"
              ? uncategorizedPublications
              : publications.filter((pub) => pub.category === area.category)

          // Group publications by year (only if area is expanded)
          let publicationsByYear: Record<number, Publication[]> = {}
          let years: number[] = []

          if (isAreaExpanded) {
            publicationsByYear = filteredPublications.reduce<Record<number, Publication[]>>((acc, pub) => {
              const year = pub.year
              if (!acc[year]) {
                acc[year] = []
              }
              acc[year].push(pub)
              return acc
            }, {})

            years = Object.keys(publicationsByYear)
              .map(Number)
              .sort((a, b) => b - a)
          }

          return (
            <div key={area.category} className="border rounded-lg overflow-hidden">
              <div
                className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => toggleArea(area.category)}
              >
                <div>
                  <h3 className="font-medium text-sm">{area.title}</h3>
                  <p className="text-xs text-muted-foreground">{filteredPublications.length} publications</p>
                </div>
                <motion.div
                  initial={false}
                  animate={{ rotate: isAreaExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-gray-500"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isAreaExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 space-y-3 border-t">
                      {area.description && <p className="text-sm text-muted-foreground mb-3">{area.description}</p>}

                      {years.length > 0 ? (
                        <div className="space-y-2">
                          {years.map((year) => {
                            const isYearExpanded = expandedYear === year

                            return (
                              <div key={year} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                <div
                                  className="flex items-center cursor-pointer py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                                  onClick={() => toggleYear(year)}
                                >
                                  <div className="flex items-center">
                                    {isYearExpanded ? (
                                      <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                      </motion.div>
                                    ) : (
                                      <ChevronRight className="h-4 w-4 mr-2" />
                                    )}
                                    <span className="font-medium text-sm">
                                      {year} ({publicationsByYear[year].length})
                                    </span>
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {isYearExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pl-6 space-y-2 mt-2">
                                        {publicationsByYear[year].map((publication) => (
                                          <Card
                                            key={publication.id}
                                            className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                            onClick={() => handlePublicationClick(publication)}
                                          >
                                            <div className="flex flex-col">
                                              <h4 className="font-semibold text-sm line-clamp-2 text-blue-600 dark:text-blue-400">
                                                {publication.title}
                                              </h4>
                                              <p className="text-muted-foreground text-xs mt-1 line-clamp-1">
                                                {publication.authors}
                                              </p>
                                              <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs">Citations: {publication.citation_count}</span>
                                              </div>
                                            </div>
                                          </Card>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-center text-muted-foreground">No publications in this area</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {selectedPublication && (
        <PublicationDetailModal
          publication={selectedPublication}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
