"use server"

import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function deletePublication(id: number) {
  try {
    // Delete publication authors first (due to foreign key constraint)
    await supabaseAdmin.from("publication_authors").delete().eq("publication_id", id)

    // Then delete the publication
    const { error } = await supabaseAdmin.from("publications").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/admin/publications")
    revalidatePath("/research/publications")

    return { success: true }
  } catch (error) {
    console.error("Error deleting publication:", error)
    return { success: false, error: "Failed to delete publication" }
  }
}
