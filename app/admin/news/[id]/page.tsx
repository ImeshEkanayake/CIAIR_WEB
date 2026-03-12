import { createClient } from "@/lib/supabase/server"
import { NewsForm } from "@/components/admin/news-form"
import { notFound } from "next/navigation"

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: news, error } = await supabase.from("news").select("*").eq("id", id).single()

  if (error || !news) {
    console.error("Error fetching news:", error)
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit News Item</h1>
      <NewsForm news={news} />
    </div>
  )
}
