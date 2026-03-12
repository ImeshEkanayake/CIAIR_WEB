"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import { slugify, estimateReadTime } from "@/lib/utils"

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const authorId = Number.parseInt(formData.get("author_id") as string)
  const imageUrl = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  const slug = slugify(title)
  const readTime = estimateReadTime(content)

  const { error } = await supabaseAdmin.from("blog_posts").insert({
    title,
    description,
    content,
    category,
    author_id: authorId,
    image_url: imageUrl,
    featured,
    slug,
    read_time: readTime,
  })

  if (error) {
    throw new Error(`Error creating blog post: ${error.message}`)
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function updateBlogPost(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const authorId = Number.parseInt(formData.get("author_id") as string)
  const imageUrl = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  const slug = slugify(title)
  const readTime = estimateReadTime(content)

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .update({
      title,
      description,
      content,
      category,
      author_id: authorId,
      image_url: imageUrl,
      featured,
      slug,
      read_time: readTime,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    throw new Error(`Error updating blog post: ${error.message}`)
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function deleteBlogPost(formData: FormData) {
  const id = formData.get("id") as string

  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting blog post: ${error.message}`)
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
