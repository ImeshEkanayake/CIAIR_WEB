import { BlogPostForm } from "@/components/admin/blog-post-form"
import { createBlogPost } from "../actions"
import { supabaseAdmin } from "@/lib/supabase"

export default async function NewBlogPostPage() {
  // Fetch team members for author selection
  const { data: authors } = await supabaseAdmin.from("team_members").select("id, name").order("name")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
      <BlogPostForm action={createBlogPost} authors={authors || []} />
    </div>
  )
}
