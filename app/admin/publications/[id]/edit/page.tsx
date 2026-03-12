import { supabaseAdmin } from "@/lib/supabase"
import PublicationForm from "@/components/admin/publication-form"
import { notFound } from "next/navigation"

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Fetch publication data
  const { data: publication, error } = await supabaseAdmin
    .from("publications")
    .select(`
      *,
      publication_authors (
        team_member_id,
        is_primary_author
      )
    `)
    .eq("id", id)
    .single()

  if (error || !publication) {
    notFound()
  }

  // Fetch team members for author selection
  const { data: teamMembers } = await supabaseAdmin.from("team_members").select("id, name").order("name")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Publication</h1>
      <PublicationForm publication={publication} teamMembers={teamMembers || []} />
    </div>
  )
}
