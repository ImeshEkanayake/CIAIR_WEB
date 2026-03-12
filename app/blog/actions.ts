"use server"

import { supabase } from "@/lib/supabase"
import type { BlogPost } from "@/lib/supabase"

interface SearchResult extends BlogPost {
  relevanceScore: number
  author?: {
    id: number
    name: string
    title: string
    image_url: string
    slug: string
  }
}

export async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === "") {
    return []
  }

  try {
    // Fetch all blog posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:author_id(id, name, title, image_url, slug)
      `)
      .order("created_at", { ascending: false })

    if (error || !posts) {
      console.error("Error fetching blog posts:", error)
      return []
    }

    // Normalize the search query
    const normalizedQuery = query.toLowerCase().trim()
    const queryTerms = normalizedQuery.split(/\s+/).filter((term) => term.length > 2)

    // Calculate relevance score for each post
    const scoredPosts = posts.map((post) => {
      let relevanceScore = 0
      const maxScore = 100

      // Check keywords (highest weight)
      if (post.keywords) {
        const keywordsList = post.keywords
          .toLowerCase()
          .split(",")
          .map((k: string) => k.trim())

        // Exact keyword match
        if (keywordsList.includes(normalizedQuery)) {
          relevanceScore += 70 // Exact keyword match
        }

        // Partial keyword matches
        const keywordMatches = queryTerms.filter((term) => keywordsList.some((keyword: string) => keyword.includes(term)))

        if (keywordMatches.length > 0) {
          relevanceScore += 50 * (keywordMatches.length / queryTerms.length)
        }
      }

      // Check title (high weight)
      const titleLower = post.title.toLowerCase()
      if (titleLower.includes(normalizedQuery)) {
        relevanceScore += 40 // Exact phrase match in title
      } else {
        // Check for individual terms in title
        queryTerms.forEach((term) => {
          if (titleLower.includes(term)) {
            relevanceScore += 30 / queryTerms.length
          }
        })
      }

      // Check description (medium weight)
      const descriptionLower = post.description.toLowerCase()
      if (descriptionLower.includes(normalizedQuery)) {
        relevanceScore += 20 // Exact phrase match in description
      } else {
        // Check for individual terms in description
        queryTerms.forEach((term) => {
          if (descriptionLower.includes(term)) {
            relevanceScore += 15 / queryTerms.length
          }
        })
      }

      // Check content (lowest weight)
      const contentLower = post.content.toLowerCase()
      if (contentLower.includes(normalizedQuery)) {
        relevanceScore += 10 // Exact phrase match in content
      } else {
        // Check for individual terms in content
        queryTerms.forEach((term) => {
          if (contentLower.includes(term)) {
            relevanceScore += 5 / queryTerms.length
          }
        })
      }

      // Ensure score doesn't exceed 100
      relevanceScore = Math.min(relevanceScore, maxScore)

      return {
        ...post,
        relevanceScore,
      }
    })

    // Filter posts with relevance score >= 5%
    const filteredPosts = scoredPosts.filter((post) => post.relevanceScore >= 5)

    // Sort by relevance score (descending)
    return filteredPosts.sort((a, b) => b.relevanceScore - a.relevanceScore)
  } catch (error) {
    console.error("Error in searchBlogPosts:", error)
    return []
  }
}
