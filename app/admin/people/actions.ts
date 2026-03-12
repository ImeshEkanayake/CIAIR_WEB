"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import { slugify } from "@/lib/utils"

export async function createTeamMember(formData: FormData) {
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const bio = formData.get("bio") as string
  const email = formData.get("email") as string
  const category = formData.get("category") as "leadership" | "researchers" | "staff"
  const imageUrl = formData.get("image_url") as string
  const linkedinUrl = formData.get("linkedin_url") as string
  const twitterUrl = formData.get("twitter_url") as string

  const slug = slugify(name)

  const { error } = await supabaseAdmin.from("team_members").insert({
    name,
    title,
    bio,
    email,
    category,
    image_url: imageUrl,
    linkedin_url: linkedinUrl || null,
    twitter_url: twitterUrl || null,
    slug,
  })

  if (error) {
    throw new Error(`Error creating team member: ${error.message}`)
  }

  revalidatePath("/admin/people")
  revalidatePath("/people")
  redirect("/admin/people")
}

export async function updateTeamMember(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const bio = formData.get("bio") as string
  const email = formData.get("email") as string
  const category = formData.get("category") as "leadership" | "researchers" | "staff"
  const imageUrl = formData.get("image_url") as string
  const linkedinUrl = formData.get("linkedin_url") as string
  const twitterUrl = formData.get("twitter_url") as string

  const slug = slugify(name)

  const { error } = await supabaseAdmin
    .from("team_members")
    .update({
      name,
      title,
      bio,
      email,
      category,
      image_url: imageUrl,
      linkedin_url: linkedinUrl || null,
      twitter_url: twitterUrl || null,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    throw new Error(`Error updating team member: ${error.message}`)
  }

  revalidatePath("/admin/people")
  revalidatePath("/people")
  redirect("/admin/people")
}

export async function deleteTeamMember(formData: FormData) {
  const id = formData.get("id") as string

  const { error } = await supabaseAdmin.from("team_members").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting team member: ${error.message}`)
  }

  revalidatePath("/admin/people")
  revalidatePath("/people")
}
