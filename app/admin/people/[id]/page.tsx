import { TeamMemberForm } from "@/components/admin/team-member-form"
import { supabaseAdmin } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { updateTeamMember } from "../actions"

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: member } = await supabaseAdmin.from("team_members").select("*").eq("id", id).single()

  if (!member) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
      <TeamMemberForm action={updateTeamMember} member={member} />
    </div>
  )
}
