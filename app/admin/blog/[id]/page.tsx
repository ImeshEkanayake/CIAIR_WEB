import { BlogPostForm } from "@/components/admin/blog-post-form"
import { supabaseAdmin } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { updateBlogPost } from "../actions"

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // Fetch the blog post
  const { data: post } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  // Fetch team members for author selection
  const { data: authors } = await supabaseAdmin.from("team_members").select("id, name").order("name")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
      <BlogPostForm action={updateBlogPost} post={post} authors={authors || []} />
    </div>
  )
}
