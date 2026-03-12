import { supabase } from "@/lib/supabase"
import PublicationsFilter from "@/components/publications/publications-filter"
import "./publications.css"

export const metadata = {
  title: "Publications | CIAIR",
  description: "Research publications from the Ceylon Institute for Artificial Intelligence and Research (CIAIR)",
}

export const dynamic = "force-dynamic"

export default async function PublicationsPage() {
  // Fetch all publications ordered by year (descending)
  const { data: publications, error } = await supabase
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
    .order("year", { ascending: false })

  if (error) {
    console.error("Error fetching publications:", error)
    return <div>Error loading publications</div>
  }

  // Get unique categories
  const categories = Array.from(new Set(publications?.map((pub) => pub.category) || [])).sort()

  // Group publications by year and category
  const publicationsByYearAndCategory = (publications || []).reduce(
    (acc, publication) => {
      const year = publication.year
      const category = publication.category || "Other"

      if (!acc[category]) {
        acc[category] = {}
      }

      if (!acc[category][year]) {
        acc[category][year] = []
      }

      acc[category][year].push(publication)
      return acc
    },
    {} as Record<string, Record<number, typeof publications>>,
  )

  // For each category, get years in descending order and count publications
  const categoryData = categories.map((category) => {
    const yearData = publicationsByYearAndCategory[category] || {}
    const years = Object.keys(yearData)
      .map(Number)
      .sort((a, b) => b - a)

    const yearCounts = years.reduce(
      (acc, year) => {
        acc[year] = yearData[year].length
        return acc
      },
      {} as Record<number, number>,
    )

    return {
      category,
      years,
      yearCounts,
      publications: yearData,
    }
  })

  // Handle publications without a category
  const uncategorizedPublications = publications?.filter((pub) => !pub.category) || []
  if (uncategorizedPublications.length > 0) {
    const otherYearData = uncategorizedPublications.reduce(
      (acc, publication) => {
        const year = publication.year

        if (!acc[year]) {
          acc[year] = []
        }

        acc[year].push(publication)
        return acc
      },
      {} as Record<number, typeof publications>,
    )

    const otherYears = Object.keys(otherYearData)
      .map(Number)
      .sort((a, b) => b - a)

    const otherYearCounts = otherYears.reduce(
      (acc, year) => {
        acc[year] = otherYearData[year].length
        return acc
      },
      {} as Record<number, number>,
    )

    categoryData.push({
      category: "Other",
      years: otherYears,
      yearCounts: otherYearCounts,
      publications: otherYearData,
    })
  }

  return (
    <div className="container mx-auto py-12 w-full">
      <h1 className="text-3xl font-bold mb-8">Research Publications</h1>
      <PublicationsFilter categoryData={categoryData} />
    </div>
  )
}
