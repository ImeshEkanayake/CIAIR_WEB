import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | CIAIR Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      author:author_id(id, name, title, image_url, slug)
    `,
    )
    .eq("slug", slug)
    .single()

  if (!post) {
    notFound()
  }

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("title, slug, created_at")
    .eq("category", post.category)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="w-full py-12">
      <ResponsiveContainer className="max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <article className="space-y-8">
          <div>
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">{post.category}</div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center space-x-4 mt-4">
              <Image
                src={post.author?.image_url || "/placeholder.svg?height=50&width=50"}
                alt={post.author?.name || "Author"}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <Link href={`/people/${post.author?.slug}`} className="text-sm font-medium hover:underline">
                  {post.author?.name}
                </Link>
                <p className="text-sm text-muted-foreground">{formatDate(post.created_at)} | {post.read_time} min read</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.image_url || "/placeholder.svg?height=600&width=1200"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {post.keywords ? (
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {post.keywords.split(",").map((keyword: string, index: number) => (
                  <Link
                    key={index}
                    href={`/blog?q=${encodeURIComponent(keyword.trim())}`}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                  >
                    {keyword.trim()}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {relatedPosts && relatedPosts.length > 0 ? (
            <div className="border-t pt-8 mt-12">
              <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
              <ul className="space-y-2">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <Link href={`/blog/${relatedPost.slug}`} className="text-primary hover:underline">
                      {relatedPost.title}
                    </Link>
                    <span className="text-sm text-muted-foreground ml-2">({formatDate(relatedPost.created_at)})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </ResponsiveContainer>
    </div>
  )
}
