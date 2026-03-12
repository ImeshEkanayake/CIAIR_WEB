import { supabaseAdmin, type Collaborator } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { Edit, Trash, Plus } from "lucide-react"
import { deleteCollaborator } from "./actions"

export default async function CollaboratorsPage() {
  const { data: collaborators } = await supabaseAdmin
    .from("collaborators")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Collaborators</h1>
        <Button asChild>
          <Link href="/admin/collaborators/new">
            <Plus className="mr-2 h-4 w-4" /> New Collaborator
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collaborators && collaborators.length > 0 ? (
              collaborators.map((collaborator: Collaborator) => (
                <TableRow key={collaborator.id}>
                  <TableCell className="font-medium">{collaborator.name}</TableCell>
                  <TableCell>{collaborator.description}</TableCell>
                  <TableCell>{formatDate(collaborator.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/collaborators/${collaborator.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={deleteCollaborator}>
                        <input type="hidden" name="id" value={collaborator.id} />
                        <Button size="sm" variant="destructive" type="submit">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No collaborators found. Create your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
