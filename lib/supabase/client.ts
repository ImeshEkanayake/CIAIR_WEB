"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createMockSupabaseClient, hasPublicSupabaseEnv, logMissingSupabaseEnv } from "@/lib/supabase/mock"
import type { Database } from "@/types/supabase"

// Create a singleton instance to prevent multiple instances during re-renders
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export function createClient() {
  if (!hasPublicSupabaseEnv()) {
    logMissingSupabaseEnv()
    return createMockSupabaseClient() as ReturnType<typeof createClientComponentClient<Database>>
  }

  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }
  return supabaseClient
}
