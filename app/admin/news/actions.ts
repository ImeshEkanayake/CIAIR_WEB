"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createNews(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const published_date = formData.get("published_date") as string
  const featured = formData.get("featured") === "on"
  const slug = formData.get("slug") as string

  const { data, error } = await supabase
    .from("news")
    .insert([
      {
        title,
        description,
        content,
        image_url,
        published_date: published_date || new Date().toISOString(),
        featured,
        slug:
          slug ||
          title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating news:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/news")
  revalidatePath("/")

  return { success: true, data }
}

export async function updateNews(id: number, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const published_date = formData.get("published_date") as string
  const featured = formData.get("featured") === "on"
  const slug = formData.get("slug") as string

  const { data, error } = await supabase
    .from("news")
    .update({
      title,
      description,
      content,
      image_url,
      published_date: published_date || new Date().toISOString(),
      featured,
      slug:
        slug ||
        title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating news:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/news")
  revalidatePath("/")

  return { success: true, data }
}

export async function deleteNews(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("news").delete().eq("id", id)

  if (error) {
    console.error("Error deleting news:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/news")
  revalidatePath("/")

  return { success: true }
}
