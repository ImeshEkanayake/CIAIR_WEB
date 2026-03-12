"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import { slugify } from "@/lib/utils"

export async function createResearchProject(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  const slug = slugify(title)

  const { error } = await supabaseAdmin.from("research_projects").insert({
    title,
    description,
    category,
    content,
    image_url: imageUrl,
    featured,
    slug,
  })

  if (error) {
    throw new Error(`Error creating research project: ${error.message}`)
  }

  revalidatePath("/admin/research")
  revalidatePath("/research")
  redirect("/admin/research")
}

export async function updateResearchProject(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("image_url") as string
  const featured = formData.get("featured") === "on"

  const slug = slugify(title)

  const { error } = await supabaseAdmin
    .from("research_projects")
    .update({
      title,
      description,
      category,
      content,
      image_url: imageUrl,
      featured,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    throw new Error(`Error updating research project: ${error.message}`)
  }

  revalidatePath("/admin/research")
  revalidatePath("/research")
  redirect("/admin/research")
}

export async function deleteResearchProject(formData: FormData) {
  const id = formData.get("id") as string

  const { error } = await supabaseAdmin.from("research_projects").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting research project: ${error.message}`)
  }

  revalidatePath("/admin/research")
  revalidatePath("/research")
}
