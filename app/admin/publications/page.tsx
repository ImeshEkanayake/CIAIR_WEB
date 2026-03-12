"use client"

import { supabaseAdmin } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default async function AdminPublicationsPage() {
  const { data: publications, error } = await supabaseAdmin
    .from("publications")
    .select(`
      *,
      publication_authors (
        team_member_id,
        is_primary_author,
        team_members (
          id,
          name
        )
      )
    `)
    .order("year", { ascending: false })
    .order("title", { ascending: true })

  if (error) {
    console.error("Error fetching publications:", error)
    return <div>Error loading publications</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Publications</h1>
        <Link href="/admin/publications/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Publication
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Year
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Citations
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Authors
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publications?.map((publication) => (
              <tr key={publication.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {publication.title.length > 60 ? `${publication.title.substring(0, 60)}...` : publication.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{publication.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{publication.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{publication.citation_count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {publication.publication_authors
                    ?.map((author: { is_primary_author: boolean; team_members: { name: string } }) => author.team_members.name + (author.is_primary_author ? "*" : ""))
                    .join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/publications/${publication.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {
                      /* Delete functionality */
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
