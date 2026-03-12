import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import type { Database } from "@/types/supabase" // optional

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient/*<Database>*/({
    cookies: () => cookieStore,
  } as any)

  // Fetch latest news from the database
  const { data: news, error } = await supabase
    .from("news")
    .select("id, title, description, image_url, published_date, slug")
    .order("published_date", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching news:", error.message, error.details, error.hint)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }

  // If no news is found, provide fallback data for development
  if (!news || news.length === 0) {
    const fallbackNews = [
      {
        id: 1,
        title: "New AI Research Center Launched",
        description:
          "Our institute has launched a state-of-the-art AI research center to advance machine learning technologies.",
        image_url: "/placeholder.svg?key=ob2zu",
        published_date: new Date().toISOString(),
        slug: "new-ai-research-center-launched",
      },
      {
        id: 2,
        title: "Breakthrough in Quantum Computing Research",
        description: "Researchers have achieved a significant breakthrough in quantum computing stability.",
        image_url: "/quantum-computing-research.png",
        published_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        slug: "breakthrough-quantum-computing-research",
      },
      {
        id: 3,
        title: "Annual Research Symposium Announced",
        description:
          "Save the date for our annual research symposium featuring keynote speakers from leading institutions.",
        image_url: "/placeholder.svg?key=xxkno",
        published_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        slug: "annual-research-symposium-announced",
      },
    ]

    console.log("Using fallback news data as no news found in database")
    return NextResponse.json(fallbackNews)
  }

  return NextResponse.json(news)
}
