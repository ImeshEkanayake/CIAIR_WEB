import { createClient } from "@/lib/supabase/server"
import HomeNewsHorizontal from "./home-news-horizontal"

export default async function LatestNews() {
  const supabase = await createClient()

  // Fetch latest news from the database
  const { data: news, error } = await supabase
    .from("news")
    .select("id, title, description, image_url, published_date, slug")
    .order("published_date", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching news:", error.message, error.details, error.hint)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-800 font-medium">Failed to load latest news</h3>
        <p className="text-red-600 text-sm mt-1">Please check the database connection</p>
      </div>
    )
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
    return <HomeNewsHorizontal news={fallbackNews} />
  }

  console.log(`Fetched ${news.length} news items from database`)
  return <HomeNewsHorizontal news={news} />
}
