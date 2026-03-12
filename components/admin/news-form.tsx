"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createNews, updateNews } from "@/app/admin/news/actions"

interface NewsFormProps {
  news?: {
    id: number
    title: string
    description: string
    content: string
    image_url: string | null
    published_date: string
    featured: boolean
    slug: string
  }
}

export function NewsForm({ news }: NewsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      let result

      if (news?.id) {
        result = await updateNews(news.id, formData)
      } else {
        result = await createNews(formData)
      }

      if (result.success) {
        router.push("/admin/news")
      } else {
        setError(result.error || "An error occurred while saving the news item.")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={news?.title || ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" defaultValue={news?.slug || ""} placeholder="auto-generated-if-empty" />
        <p className="text-sm text-muted-foreground">Leave empty to auto-generate from title</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} defaultValue={news?.description || ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" rows={10} defaultValue={news?.content || ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          name="image_url"
          defaultValue={news?.image_url || ""}
          placeholder="/news-collage.png"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="published_date">Published Date</Label>
        <Input
          id="published_date"
          name="published_date"
          type="datetime-local"
          defaultValue={
            news?.published_date
              ? new Date(news.published_date).toISOString().slice(0, 16)
              : new Date().toISOString().slice(0, 16)
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="featured" name="featured" defaultChecked={news?.featured || false} />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/news")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : news?.id ? "Update News" : "Create News"}
        </Button>
      </div>
    </form>
  )
}
