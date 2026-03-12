import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

export default async function NewsDetailPage({
  params,
}: {
  // Next 15: params is a Promise
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .maybeSingle() // avoid throwing when 0 rows

  if (error || !news) {
    console.error("Error fetching news:", error)
    notFound()
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const htmlContent = (news.content ?? "").replace(/\n/g, "<br />")

  return (
    <ResponsiveContainer>
      <article className="py-12">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{news.title}</h1>
          <p className="text-muted-foreground">{formatDate(news.published_date)}</p>

          {news.image_url && (
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src={news.image_url || "/placeholder.svg"}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="lead">{news.description}</p>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </article>
    </ResponsiveContainer>
  )
}
