"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"

export async function createCollaborator(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("image_url") as string

  const { error } = await supabaseAdmin.from("collaborators").insert({
    name,
    description,
    image_url: imageUrl,
  })

  if (error) {
    throw new Error(`Error creating collaborator: ${error.message}`)
  }

  revalidatePath("/admin/collaborators")
  revalidatePath("/people")
  redirect("/admin/collaborators")
}

export async function updateCollaborator(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("image_url") as string

  const { error } = await supabaseAdmin
    .from("collaborators")
    .update({
      name,
      description,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    throw new Error(`Error updating collaborator: ${error.message}`)
  }

  revalidatePath("/admin/collaborators")
  revalidatePath("/people")
  redirect("/admin/collaborators")
}

export async function deleteCollaborator(formData: FormData) {
  const id = formData.get("id") as string

  const { error } = await supabaseAdmin.from("collaborators").delete().eq("id", id)

  if (error) {
    throw new Error(`Error deleting collaborator: ${error.message}`)
  }

  revalidatePath("/admin/collaborators")
  revalidatePath("/people")
}
