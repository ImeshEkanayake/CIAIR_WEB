import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabase = await createClient()
    const baseUrl = "http://ciair.org" // Using your actual domain

    // Fetch all blog posts
    const { data: blogPosts } = await supabase.from("blog_posts").select("slug, updated_at, created_at")

    // Fetch all research projects
    const { data: researchProjects } = await supabase.from("research_projects").select("slug, updated_at, created_at")

    // Fetch all team members
    const { data: teamMembers } = await supabase.from("team_members").select("slug, updated_at, created_at")

    // Fetch all news items
    const { data: newsItems } = await supabase.from("news").select("slug, updated_at, published_date")

    // Format date for XML
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toISOString().split("T")[0]
    }

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Add static pages
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/about", priority: "0.8", changefreq: "monthly" },
      { url: "/research", priority: "0.9", changefreq: "weekly" },
      { url: "/research/publications", priority: "0.8", changefreq: "weekly" },
      { url: "/blog", priority: "0.8", changefreq: "weekly" },
      { url: "/people", priority: "0.7", changefreq: "monthly" },
      { url: "/contact", priority: "0.7", changefreq: "monthly" },
    ]

    staticPages.forEach((page) => {
      xml += "  <url>\n"
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`
      xml += `    <lastmod>${formatDate(new Date().toISOString())}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += "  </url>\n"
    })

    // Add blog posts
    blogPosts?.forEach((post) => {
      xml += "  <url>\n"
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`
      xml += `    <lastmod>${formatDate(post.updated_at || post.created_at)}</lastmod>\n`
      xml += "    <changefreq>never</changefreq>\n"
      xml += "    <priority>0.5</priority>\n"
      xml += "  </url>\n"
    })

    // Add research projects
    researchProjects?.forEach((project) => {
      xml += "  <url>\n"
      xml += `    <loc>${baseUrl}/research/${project.slug}</loc>\n`
      xml += `    <lastmod>${formatDate(project.updated_at || project.created_at)}</lastmod>\n`
      xml += "    <changefreq>monthly</changefreq>\n"
      xml += "    <priority>0.6</priority>\n"
      xml += "  </url>\n"
    })

    // Add team members
    teamMembers?.forEach((member) => {
      xml += "  <url>\n"
      xml += `    <loc>${baseUrl}/people/${member.slug}</loc>\n`
      xml += `    <lastmod>${formatDate(member.updated_at || member.created_at)}</lastmod>\n`
      xml += "    <changefreq>monthly</changefreq>\n"
      xml += "    <priority>0.4</priority>\n"
      xml += "  </url>\n"
    })

    // Add news items
    newsItems?.forEach((news) => {
      xml += "  <url>\n"
      xml += `    <loc>${baseUrl}/news/${news.slug}</loc>\n`
      xml += `    <lastmod>${formatDate(news.updated_at || news.published_date)}</lastmod>\n`
      xml += "    <changefreq>never</changefreq>\n"
      xml += "    <priority>0.5</priority>\n"
      xml += "  </url>\n"
    })

    xml += "</urlset>"

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
