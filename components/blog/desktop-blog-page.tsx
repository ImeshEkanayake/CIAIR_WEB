"use client"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { BlogHorizontalPosts } from "@/components/blog/blog-horizontal-posts"
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

interface DesktopBlogPageProps {
  featuredPosts: BlogPost[]
  regularPosts: BlogPost[]
  query: string
}

export function DesktopBlogPage({ featuredPosts, regularPosts, query }: DesktopBlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-4">
        <div className="container">
          <div className="relative max-w-md mx-auto">
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
      </div>

      {!query && (
        <>
          <div className="featured-posts-container">
            <ResponsiveContainer>
              <h2 className="text-2xl font-bold mb-2">Featured Posts</h2>
              <p className="text-muted-foreground mb-4">Scroll down to explore our featured articles</p>
            </ResponsiveContainer>
            {featuredPosts && featuredPosts.length > 0 ? (
              <BlogHorizontalPosts posts={featuredPosts} />
            ) : (
              <ResponsiveContainer>
                <div className="text-center py-6">
                  <p>No featured posts available.</p>
                </div>
              </ResponsiveContainer>
            )}
          </div>

          {/* Add a spacer div to ensure proper separation */}
          <div className="h-16"></div>

          <ResponsiveContainer>
            {regularPosts && regularPosts.length > 0 && (
              <div className="space-y-4 py-8">
                <h2 className="text-2xl font-semibold tracking-tight">Recent Posts</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {regularPosts.map((post) => (
                    <div key={post.id} className="group relative overflow-hidden rounded-lg border">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image_url || "/placeholder.svg?height=400&width=600&query=blog post"}
                          alt={post.title}
                          className="object-cover transition-transform group-hover:scale-105 h-full w-full"
                          width={600}
                          height={400}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">{post.category}</div>
                          <div className="text-sm text-muted-foreground">•</div>
                          <div className="text-sm text-muted-foreground">{post.read_time} min read</div>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold leading-none tracking-tight">
                          <a href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </a>
                        </h3>
                        <p className="mt-2 line-clamp-3 text-muted-foreground">{post.description}</p>
                        {post.author && (
                          <div className="mt-4 flex items-center gap-2">
                            <img
                              src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                              alt={post.author.name}
                              className="h-8 w-8 rounded-full object-cover"
                              width={32}
                              height={32}
                            />
                            <div className="text-sm">
                              <a href={`/people/${post.author.slug}`} className="font-medium hover:underline">
                                {post.author.name}
                              </a>
                              <div className="text-xs text-muted-foreground">{post.author.title}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
