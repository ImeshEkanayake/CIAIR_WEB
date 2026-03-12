import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import ClientResponsiveWrapper from "@/components/client-responsive-wrapper"
import { DesktopBlogPage } from "@/components/blog/desktop-blog-page"
import { MobileBlogPage } from "@/components/blog/mobile-blog-page"
import "./blog.css"
import "./blog-horizontal-scroll.css" // Import blog-specific horizontal scroll CSS

export const metadata: Metadata = {
  title: "Blog | CIAIR Research Institute",
  description: "Latest news, insights and research from CIAIR Research Institute",
}

export default async function BlogPage({
  searchParams,
}: {
  // Next 15: searchParams is a Promise
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q ?? ""

  // Fetch all posts for featured section
  const { data: featuredPosts } = !query
    ? await supabase
        .from("blog_posts")
        .select(`
          *,
          author:author_id(id, name, title, image_url, slug)
        `)
        .order("created_at", { ascending: false })
        .limit(6)
    : { data: [] as any[] }

  // Only fetch regular posts if there's no search query
  const { data: regularPosts } = !query
    ? await supabase
        .from("blog_posts")
        .select(`
          *,
          author:author_id(id, name, title, image_url, slug)
        `)
        .order("created_at", { ascending: false })
        .range(6, 17) // Skip the first 6 posts (featured) and get the next 12
    : { data: [] as any[] }

  return (
    <ClientResponsiveWrapper
      desktopComponent={
        <DesktopBlogPage featuredPosts={featuredPosts || []} regularPosts={regularPosts || []} query={query} />
      }
      mobileComponent={
        <MobileBlogPage featuredPosts={featuredPosts || []} regularPosts={regularPosts || []} query={query} />
      }
    />
  )
}
