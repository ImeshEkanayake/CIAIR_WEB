import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { ResearchProject } from "@/lib/supabase"
import PublicationSearch from "@/components/research/research-search"
import { StickyPublicationCards } from "@/components/research/sticky-publication-cards"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { Button } from "@/components/ui/button"
import type { Publication } from "@/types/supabase"

export default async function DesktopResearchPage() {
  // Fetch research projects from Supabase
  const { data: projectsData = [] } = await supabase
    .from("research_projects")
    .select("*")
    .order("created_at", { ascending: false })
  const projects = projectsData ?? []

  // Fetch publications from Supabase
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

  // Group projects by category with fallback for empty database
  const projectsByCategory: Record<string, ResearchProject[]> = {}
  const defaultCategories = ["Education", "Environment", "Engineering", "Ethical AI", "AI Privacy", "AI in Finance"]

  // If we have projects, group them by category
  if (projects.length > 0) {
    projects.forEach((project) => {
      if (!projectsByCategory[project.category]) {
        projectsByCategory[project.category] = []
      }
      projectsByCategory[project.category].push(project)
    })
  } else {
    // If no projects, create empty arrays for default categories
    defaultCategories.forEach((category) => {
      projectsByCategory[category] = []
    })
  }

  // Get unique categories (either from projects or defaults)
  const categories = Object.keys(projectsByCategory).length > 0 ? Object.keys(projectsByCategory) : defaultCategories

  return (
    <div className="w-full py-12">
      <ResponsiveContainer>
        <h1 className="text-3xl font-bold mb-8">Research</h1>

        {/* 1. FIRST: Most Cited Publications - Sticky Cards */}
        <section className="featured-projects-container mb-12">
          <h2 className="text-2xl font-semibold mb-2">Most Cited Publications</h2>
          <p className="text-muted-foreground mb-6">Scroll down to explore our most influential research</p>
          <StickyPublicationCards publications={publications} />
        </section>

        {/* 2. SECOND: Search section - Now searching publications */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Search Publications</h2>
          <PublicationSearch publications={publications} />
        </section>

        {/* 3. THIRD: Research areas section with updated title */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">View Research by Area</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/research/publications?category=Environment" className="block">
              <div className="bg-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Environment</h3>
                <p className="text-gray-600">AI applications for environmental monitoring and conservation</p>
              </div>
            </Link>
            <Link href="/research/publications?category=Education" className="block">
              <div className="bg-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Education</h3>
                <p className="text-gray-600">AI-powered educational tools and assessment systems</p>
              </div>
            </Link>
            <Link href="/research/publications?category=AI+Privacy" className="block">
              <div className="bg-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">AI Privacy</h3>
                <p className="text-gray-600">Privacy-preserving machine learning techniques</p>
              </div>
            </Link>
            <Link href="/research/publications?category=Ethical+AI" className="block">
              <div className="bg-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Ethical AI</h3>
                <p className="text-gray-600">Ethical frameworks for AI deployment in Sri Lankan contexts</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 4. FOURTH: Publications section with updated title */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">View All Publications</h2>
          </div>

          <div className="mt-8 text-center">
            <Link href="/research/publications">
              <Button>Browse All Publications</Button>
            </Link>
          </div>
        </section>
      </ResponsiveContainer>
    </div>
  )
}
