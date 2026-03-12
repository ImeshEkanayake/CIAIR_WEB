"use client"

import type React from "react"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Loader2, Search, X } from "lucide-react"

import { searchBlogPosts } from "@/app/blog/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: number
  title: string
  description: string
  category: string
  image_url: string | null
  slug: string
  created_at: string
  read_time: number
  keywords?: string | null
  relevanceScore: number
  author?: {
    id: number
    name: string
    title: string
    image_url: string | null
    slug: string
  }
}

export function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<BlogPost[]>([])
  const [isSearchActive, setIsSearchActive] = useState(!!initialQuery)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (pathname !== "/blog") {
      setResults([])
      setIsSearchActive(false)
    }
  }, [pathname])

  useEffect(() => {
    if (initialQuery && pathname === "/blog") {
      handleSearch(initialQuery)
    }
  }, [initialQuery, pathname])

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsSearchActive(false)

    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    router.push(`/blog${params.size > 0 ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      clearSearch()
      return
    }

    setIsSearchActive(true)

    startTransition(async () => {
      try {
        const searchResults = (await searchBlogPosts(searchQuery)) as BlogPost[]
        setResults(searchResults)

        const params = new URLSearchParams(searchParams.toString())
        params.set("q", searchQuery)
        router.push(`/blog?${params.toString()}`, { scroll: false })
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      }
    })
  }

  const getKeywords = (keywords?: string | null) => {
    if (!keywords) return []
    return keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch(query)
          }}
          className="relative"
        >
          <Input
            type="search"
            placeholder="Search blog posts..."
            className="h-10 pl-10 pr-10 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          {query ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-10 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          ) : null}
          <Button type="submit" className="absolute right-1 top-1/2 h-8 -translate-y-1/2" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </form>

        {isPending ? (
          <div className="text-center py-4">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="ml-2">Searching...</span>
          </div>
        ) : null}

        {isSearchActive && results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {results.length} {results.length === 1 ? "result" : "results"} found
              </h2>
              <Button variant="ghost" size="sm" onClick={clearSearch}>
                <X className="h-4 w-4 mr-2" /> Clear results
              </Button>
            </div>

            <div className="divide-y">
              {results.map((post) => (
                <div key={post.id} className="py-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold hover:underline">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault()
                          router.push(`/blog/${post.slug}`)
                          setResults([])
                          setIsSearchActive(false)
                        }}
                      >
                        {post.title}
                      </a>
                    </h3>
                    <Badge variant="outline">{Math.round(post.relevanceScore)}% match</Badge>
                  </div>
                  <p className="text-muted-foreground">{post.description}</p>

                  {post.keywords ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getKeywords(post.keywords).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span className="mx-2">|</span>
                    <span>{post.read_time} min read</span>
                    {post.author ? (
                      <>
                        <span className="mx-2">|</span>
                        <span>By {post.author.name}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {isSearchActive && !isPending && results.length === 0 && query ? (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No results found for "{query}"</p>
            <p className="mt-2">Try using different keywords or check for spelling errors.</p>
            <Button variant="outline" className="mt-4" onClick={clearSearch}>
              Clear search
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
