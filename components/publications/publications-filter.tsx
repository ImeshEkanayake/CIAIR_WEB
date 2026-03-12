"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PublicationYearList from "@/components/publications/publication-year-list"
import PublicationSearch from "@/components/research/research-search"
import type { Publication } from "@/types/supabase"

interface CategoryData {
  category: string
  years: number[]
  yearCounts: Record<number, number>
  publications: Record<number, Publication[]>
}

interface PublicationsFilterProps {
  categoryData: CategoryData[]
}

export default function PublicationsFilter({ categoryData }: PublicationsFilterProps) {
  const [activeTab, setActiveTab] = useState("browse")

  // Flatten all publications for search
  const allPublications = categoryData.flatMap((category) => {
    return Object.values(category.publications).flat()
  })

  return (
    <Tabs defaultValue="browse" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="mb-8">
        <TabsTrigger value="browse">Browse by Category</TabsTrigger>
        <TabsTrigger value="search">Search Publications</TabsTrigger>
      </TabsList>

      <TabsContent value="browse" className="space-y-8">
        {categoryData.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category.category}</h2>
            <PublicationYearList
              years={category.years}
              yearCounts={category.yearCounts}
              publicationsByYear={category.publications}
            />
          </div>
        ))}
      </TabsContent>

      <TabsContent value="search">
        <PublicationSearch publications={allPublications} />
      </TabsContent>
    </Tabs>
  )
}
