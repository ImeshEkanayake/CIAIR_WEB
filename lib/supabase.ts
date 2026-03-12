import { createClient } from "@supabase/supabase-js"

// Get environment variables with better error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

if (!supabaseServiceKey) {
  console.warn("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY (admin operations may fail)")
}

// Create a Supabase client for public usage (client-side)
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")

// Create a Supabase client with service role for admin operations (server-side only)
export const supabaseAdmin = createClient(supabaseUrl || "", supabaseServiceKey || "")

// Types for our database tables
export type ResearchProject = {
  id: number
  title: string
  description: string
  category: string
  image_url: string | null
  content: string
  created_at: string
  updated_at: string
  slug: string
  featured: boolean
  summary?: string | null
}

export type TeamMember = {
  id: number
  name: string
  title: string
  bio: string
  image_url: string | null
  email: string
  linkedin_url: string | null
  twitter_url: string | null
  category: string
  created_at: string
  updated_at: string
  slug: string
}

export type Collaborator = {
  id: number
  name: string
  description: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: number
  title: string
  description: string
  content: string
  image_url: string | null
  author_id: number | null
  category: string
  created_at: string
  updated_at: string
  slug: string
  read_time: number
  featured: boolean
  keywords?: string | null
}

export type Author = TeamMember
