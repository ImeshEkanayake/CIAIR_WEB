"use client"

import Link from "next/link"
import Image from "next/image"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface BlogPost {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  slug: string
  created_at: string
  read_time: number
  author?: {
    id: number
    name: string
    title: string
    image_url: string
    slug: string
  }
}

interface MobileBlogPageProps {
  featuredPosts: BlogPost[]
  regularPosts: BlogPost[]
  query: string
}

export function MobileBlogPage({ featuredPosts, regularPosts, query }: MobileBlogPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="space-y-4 pb-6 w-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4 px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blog posts..."
            className="pl-10 bg-background dark:bg-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!query && (
        <>
          <ResponsiveContainer>
            <h2 className="text-lg font-bold mb-3">Featured Posts</h2>
          </ResponsiveContainer>

          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="flex space-x-3 pb-3 px-4">
              {featuredPosts && featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
                  <div key={post.id} className="flex-shrink-0 w-[80vw] max-w-[320px]">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="rounded-lg overflow-hidden border shadow-sm h-full">
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={post.image_url || "/placeholder.svg?height=200&width=300&query=blog post"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-xs text-muted-foreground">{post.category}</div>
                            <div className="text-xs text-muted-foreground">•</div>
                            <div className="text-xs text-muted-foreground">{post.read_time} min read</div>
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                          {post.author && (
                            <div className="mt-2 flex items-center gap-2">
                              <Image
                                src={post.author.image_url || "/placeholder.svg?height=24&width=24&query=person"}
                                alt={post.author.name}
                                className="h-6 w-6 rounded-full object-cover"
                                width={24}
                                height={24}
                              />
                              <div className="text-xs">
                                <Link href={`/people/${post.author.slug}`} className="font-medium">
                                  {post.author.name}
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 w-full">
                  <p className="text-sm">No featured posts available.</p>
                </div>
              )}
            </div>
          </div>

          <ResponsiveContainer>
            {regularPosts && regularPosts.length > 0 && (
              <div className="space-y-3 pt-2 w-full">
                <h2 className="text-lg font-semibold tracking-tight">Recent Posts</h2>
                <div className="grid gap-3 w-full">
                  {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block w-full">
                      <div className="rounded-lg overflow-hidden border shadow-sm w-full">
                        <div className="flex w-full">
                          <div className="w-1/3 relative">
                            <Image
                              src={post.image_url || "/placeholder.svg?height=120&width=120&query=blog post"}
                              alt={post.title}
                              width={120}
                              height={120}
                              className="object-cover h-full w-full"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <div className="flex items-center gap-1 mb-1">
                              <div className="text-xs text-muted-foreground">{post.category}</div>
                            </div>
                            <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                            <div className="mt-1 text-xs text-muted-foreground">{post.read_time} min read</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
