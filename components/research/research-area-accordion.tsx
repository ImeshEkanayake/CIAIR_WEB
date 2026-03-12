"use client"

import { useState } from "react"
import { ExpandableResearchArea } from "./expandable-research-area"
import type { Publication } from "@/types/supabase"

interface ResearchArea {
  title: string
  description: string
  category: string
  count: number
}

interface ResearchAreaAccordionProps {
  researchAreas: ResearchArea[]
  publications: Publication[]
  uncategorizedPublications: Publication[]
}

export function ResearchAreaAccordion({
  researchAreas,
  publications,
  uncategorizedPublications,
}: ResearchAreaAccordionProps) {
  const [expandedArea, setExpandedArea] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {researchAreas.map((area) => (
        <ExpandableResearchArea
          key={area.category}
          title={area.title}
          description={area.description}
          category={area.category}
          publications={area.category === "Other" ? uncategorizedPublications : publications}
          isExpanded={expandedArea === area.category}
          onToggle={(isOpen) => {
            setExpandedArea(isOpen ? area.category : null)
          }}
        />
      ))}
    </div>
  )
}
