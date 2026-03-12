import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface ResearchProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ResearchProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: project } = await supabase.from("research_projects").select("*").eq("slug", slug).single()

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | CIAIR Research`,
    description: project.description,
  }
}

export default async function ResearchProjectPage({ params }: ResearchProjectPageProps) {
  const { slug } = await params
  const { data: project } = await supabase.from("research_projects").select("*").eq("slug", slug).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="w-full py-12">
      <ResponsiveContainer className="max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/research">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Research
          </Link>
        </Button>

        <div className="space-y-8">
          <div>
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">{project.category}</div>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-2">Last updated: {formatDate(project.updated_at || project.created_at)}</p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={project.image_url || "/placeholder.svg?height=600&width=1200"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
