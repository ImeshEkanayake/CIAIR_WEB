import { supabaseAdmin } from "@/lib/supabase"
import PublicationForm from "@/components/admin/publication-form"

export default async function NewPublicationPage() {
  // Fetch team members for author selection
  const { data: teamMembers } = await supabaseAdmin.from("team_members").select("id, name").order("name")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Publication</h1>
      <PublicationForm teamMembers={teamMembers || []} />
    </div>
  )
}
