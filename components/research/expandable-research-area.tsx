"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PublicationDetailModal from "@/components/publications/publication-detail-modal"
import type { Publication } from "@/types/supabase"

interface ExpandableResearchAreaProps {
  title: string
  description: string
  category: string
  publications: Publication[]
  isExpanded?: boolean
  onToggle?: (isOpen: boolean) => void
}

export function ExpandableResearchArea({
  title,
  description,
  category,
  publications,
  isExpanded = false,
  onToggle,
}: ExpandableResearchAreaProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter publications for this category
  const filteredPublications =
    category === "Other"
      ? publications.filter((pub) => !pub.category || pub.category.trim() === "")
      : publications.filter((pub) => pub.category === category)

  // Group publications by year
  const publicationsByYear = filteredPublications.reduce<Record<number, Publication[]>>((acc, pub) => {
    const year = pub.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(pub)
    return acc
  }, {})

  // Get years in descending order
  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isExpanded)
    }
    // Reset expanded year when closing the area
    if (isExpanded) {
      setExpandedYear(null)
    }
  }

  const handleYearToggle = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year)
  }

  const handlePublicationClick = (publication: Publication) => {
    setSelectedPublication(publication)
    setIsModalOpen(true)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className="p-4 flex justify-between items-center cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={handleToggle}
      >
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{filteredPublications.length} publications</p>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-500"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <p className="text-muted-foreground mb-4">{description}</p>

              <div className="space-y-2">
                {years.map((year) => (
                  <div key={year} className="border-b pb-2">
                    <div
                      className="flex items-center cursor-pointer py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                      onClick={() => handleYearToggle(year)}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: expandedYear === year ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mr-2"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                      <span className="font-medium">
                        {year} ({publicationsByYear[year].length})
                      </span>
                    </div>

                    <AnimatePresence>
                      {expandedYear === year && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 space-y-2 mt-2">
                            {publicationsByYear[year].map((publication) => (
                              <div
                                key={publication.id}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors duration-200"
                                onClick={() => handlePublicationClick(publication)}
                              >
                                <h4 className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                  {publication.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">{publication.authors}</p>
                                <p className="text-sm text-muted-foreground">{publication.journal_info}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs">Citations: {publication.citation_count}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedPublication && (
        <PublicationDetailModal
          publication={selectedPublication}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
