import { TeamMemberForm } from "@/components/admin/team-member-form"
import { createTeamMember } from "../actions"

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Team Member</h1>
      <TeamMemberForm action={createTeamMember} />
    </div>
  )
}
