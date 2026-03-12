import { supabase } from "@/lib/supabase"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { PublicationCardStack } from "@/components/research/publication-card-stack"
import PublicationSearch from "@/components/research/research-search"
import { ResearchAreaAccordion } from "@/components/research/research-area-accordion"
import type { Publication } from "@/types/supabase"
import "./research.css"

export const dynamic = "force-dynamic"

// Helper function to get a description for a category
function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "AI Privacy": "Privacy-preserving machine learning techniques and data protection",
    Education: "AI-powered educational tools and assessment systems",
    Environment: "AI applications for environmental monitoring and conservation",
    "Ethical AI": "Ethical frameworks for AI deployment and responsible AI development",
    Healthcare: "AI applications in medical diagnosis, treatment, and healthcare management",
    NLP: "Natural Language Processing research and applications",
    "Computer Vision": "Research in image recognition, object detection, and visual understanding",
    Robotics: "AI for robotics, automation, and intelligent systems",
    Other: "Miscellaneous research publications across various emerging fields",
    // Default description for any other category
    default: "Research and publications in this emerging field",
  }

  return descriptions[category] || descriptions["default"]
}

export default async function ResearchPage() {
  // Fetch publications from Supabase with additional fields
  const { data: publicationsData = [] } = await supabase
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
  const publications = publicationsData as Publication[]

  // Find uncategorized publications (NULL or empty string)
  const uncategorizedPublications = publications.filter((pub) => !pub.category || pub.category.trim() === "")

  // Extract unique categories from publications with valid categories
  const categories = Array.from(
    new Set(publications.filter((pub) => pub.category && pub.category.trim() !== "").map((pub) => pub.category)),
  ).sort()

  // Add "Other" category only if there are uncategorized publications
  if (uncategorizedPublications.length > 0) {
    categories.push("Other")
  }

  // Create research areas dynamically from categories
  const researchAreas = categories.map((category) => ({
    title: category,
    description: getCategoryDescription(category),
    category: category,
    count:
      category === "Other"
        ? uncategorizedPublications.length
        : publications.filter((pub) => pub.category === category).length,
  }))

  return (
    <div className="w-full py-12">
      <ResponsiveContainer>
        <h1 className="text-3xl font-bold mb-8">Research</h1>

        {/* 1. FIRST: Most Cited Publications - Now with Card Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">Most Cited Publications</h2>
          <p className="text-muted-foreground mb-6">Scroll to explore our most influential research</p>
          <PublicationCardStack publications={publications} />
        </section>

        {/* 2. SECOND: Search section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Search Publications</h2>
          <PublicationSearch publications={publications} />
        </section>

        {/* 3. THIRD: Research areas section - Now with dynamic categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">View Research by Area</h2>
          {researchAreas.length > 0 ? (
            <ResearchAreaAccordion
              researchAreas={researchAreas}
              publications={publications}
              uncategorizedPublications={uncategorizedPublications}
            />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No research categories available. Please add categories to your publications.
            </p>
          )}
        </section>
      </ResponsiveContainer>
    </div>
  )
}
