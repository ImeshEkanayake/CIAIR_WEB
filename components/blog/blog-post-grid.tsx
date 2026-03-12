import Link from "next/link"
import Image from "next/image"

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

interface BlogPostGridProps {
  posts: BlogPost[]
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="group relative overflow-hidden rounded-lg border">
          <div className="aspect-video overflow-hidden">
            <Image
              src={post.image_url || "/placeholder.svg?height=400&width=600"}
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
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-muted-foreground">{post.description}</p>
            {post.author && (
              <div className="mt-4 flex items-center gap-2">
                <Image
                  src={post.author.image_url || "/placeholder.svg?height=40&width=40&query=person"}
                  alt={post.author.name}
                  className="h-8 w-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
                <div className="text-sm">
                  <Link href={`/people/${post.author.slug}`} className="font-medium hover:underline">
                    {post.author.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{post.author.title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
