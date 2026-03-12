"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost, TeamMember } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface BlogPostFormProps {
  post?: BlogPost
  authors: Pick<TeamMember, "id" | "name">[]
  action: (formData: FormData) => Promise<void>
}

export function BlogPostForm({ post, authors, action }: BlogPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Education", "Environment", "Engineering", "Ethical AI", "AI Privacy", "AI in Finance"]

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await action(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={handleSubmit} className="space-y-6">
          {post && <input type="hidden" name="id" value={post.id} />}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={post?.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_id">Author</Label>
            <select
              id="author_id"
              name="author_id"
              defaultValue={post?.author_id ?? ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              defaultValue={post?.category}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea id="description" name="description" defaultValue={post?.description} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Full Content (Markdown)</Label>
            <Textarea id="content" name="content" rows={15} defaultValue={post?.content} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Featured Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              defaultValue={post?.image_url || "/placeholder.svg?height=400&width=600"}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" defaultChecked={post?.featured} />
            <Label htmlFor="featured">Featured post</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {post ? "Update Post" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
