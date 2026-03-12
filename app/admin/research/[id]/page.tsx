import { ResearchProjectForm } from "@/components/admin/research-project-form"
import { supabaseAdmin } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { updateResearchProject } from "../actions"

export default async function EditResearchProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: project } = await supabaseAdmin.from("research_projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Research Project</h1>
      <ResearchProjectForm action={updateResearchProject} project={project} />
    </div>
  )
}
