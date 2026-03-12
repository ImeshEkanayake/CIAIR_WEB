import { ResearchProjectForm } from "@/components/admin/research-project-form"
import { createResearchProject } from "../actions"

export default function NewResearchProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Research Project</h1>
      <ResearchProjectForm action={createResearchProject} />
    </div>
  )
}
