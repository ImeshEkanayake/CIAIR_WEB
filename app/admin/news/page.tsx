import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default async function AdminNewsPage() {
  const supabase = await createClient()

  const { data: news, error } = await supabase.from("news").select("*").order("published_date", { ascending: false })

  if (error) {
    console.error("Error fetching news:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Button asChild>
          <Link href="/admin/news/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add News
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Published Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Featured</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {news && news.length > 0 ? (
                news.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.title}</td>
                    <td className="p-4 align-middle">{new Date(item.published_date).toLocaleDateString()}</td>
                    <td className="p-4 align-middle">{item.featured ? "Yes" : "No"}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/news/${item.id}`}>Edit</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center">
                    No news items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
