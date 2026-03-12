import { NewsForm } from "@/components/admin/news-form"

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create News Item</h1>
      <NewsForm />
    </div>
  )
}
