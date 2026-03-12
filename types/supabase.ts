export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: number
          name: string
          email: string
          password: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          password: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          password?: string
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          description: string
          content: string
          category: string
          author_id: number | null
          image_url: string | null
          featured: boolean
          read_time: number
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          content: string
          category: string
          author_id?: number | null
          image_url?: string | null
          featured?: boolean
          read_time?: number
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          content?: string
          category?: string
          author_id?: number | null
          image_url?: string | null
          featured?: boolean
          read_time?: number
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborators: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      publication_authors: {
        Row: {
          id: number
          publication_id: number
          team_member_id: number
          is_primary_author: boolean
          created_at: string
        }
        Insert: {
          id?: number
          publication_id: number
          team_member_id: number
          is_primary_author?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          publication_id?: number
          team_member_id?: number
          is_primary_author?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_authors_publication_id_fkey"
            columns: ["publication_id"]
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_authors_team_member_id_fkey"
            columns: ["team_member_id"]
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          id: number
          title: string
          authors: string
          journal_info: string
          citation_count: number
          year: number
          url: string | null
          category: string
          abstract: string | null
          youtube_link: string | null
          keywords: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          authors: string
          journal_info: string
          citation_count?: number
          year: number
          url?: string | null
          category: string
          abstract?: string | null
          youtube_link?: string | null
          keywords?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          authors?: string
          journal_info?: string
          citation_count?: number
          year?: number
          url?: string | null
          category?: string
          abstract?: string | null
          youtube_link?: string | null
          keywords?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      research_projects: {
        Row: {
          id: number
          title: string
          description: string
          category: string
          content: string
          image_url: string | null
          featured: boolean
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          category: string
          content: string
          image_url?: string | null
          featured?: boolean
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          category?: string
          content?: string
          image_url?: string | null
          featured?: boolean
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: number
          name: string
          title: string
          bio: string
          email: string
          category: string
          image_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          title: string
          bio: string
          email: string
          category: string
          image_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          title?: string
          bio?: string
          email?: string
          category?: string
          image_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          id: number
          title: string
          description: string
          content: string
          image_url: string | null
          published_date: string
          featured: boolean
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          content: string
          image_url?: string | null
          published_date: string
          featured?: boolean
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          content?: string
          image_url?: string | null
          published_date?: string
          featured?: boolean
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface Publication {
  id: number
  title: string
  authors: string
  journal_info: string
  citation_count: number
  year: number
  url: string | null
  category: string
  abstract: string | null
  youtube_link: string | null
  keywords: string | null
  publication_authors?: Array<{
    team_member_id: number
    is_primary_author: boolean
    team_members: {
      id: number
      name: string
      slug: string
    }
  }>
}

export interface ResearchProject {
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

export interface News {
  id: number
  title: string
  description: string
  content: string
  image_url: string | null
  published_date: string
  featured: boolean
  slug: string
  created_at: string
  updated_at: string
}
