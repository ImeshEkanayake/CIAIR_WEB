"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

// Mobile-optimized news card component
function MobileNewsCard({
  title,
  excerpt,
  date,
  slug,
  imageUrl,
}: {
  title: string
  excerpt: string
  date: string
  slug: string
  imageUrl: string
}) {
  return (
    <Link href={`/news/${slug}`} className="block">
      <div className="rounded-lg overflow-hidden border shadow-sm bg-card">
        <div className="relative h-32 w-full">
          <Image
            src={imageUrl || "/placeholder.svg?height=200&width=400&query=news"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 720px) 100vw, 400px"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{excerpt}</p>
          <p className="text-xs text-muted-foreground mt-2">{date}</p>
        </div>
      </div>
    </Link>
  )
}

export default function MobileLatestNews() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const supabase = await createClient()
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(4)

        if (error) {
          console.error("Error fetching news:", error)
          return
        }

        setNews(data || [])
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section className="w-full py-8">
      <ResponsiveContainer className="px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tighter">Latest News</h2>
            <p className="text-sm text-muted-foreground mx-auto">
              Stay updated with our recent activities and announcements
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-center">Loading news...</div>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {news.map((item) => (
              <MobileNewsCard
                key={item.id}
                title={item.title}
                excerpt={item.excerpt || item.content.substring(0, 100) + "..."}
                date={formatDate(item.published_at)}
                slug={item.slug}
                imageUrl={item.image_url}
              />
            ))}
            <div className="flex justify-center mt-2">
              <Link href="/news" className="text-sm font-medium text-primary hover:underline">
                View All News →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No news items found.</p>
          </div>
        )}
      </ResponsiveContainer>
    </section>
  )
}
