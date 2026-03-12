"use client"

import { useState, useEffect } from "react"
import HomeNewsHorizontal from "./home-news-horizontal"

type NewsItem = {
  id: number
  title: string
  description: string
  image_url: string
  published_date: string
  slug: string
}

export default function ClientLatestNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news")
        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to load latest news")
        // Use fallback data
        setNews([
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-800 font-medium">{error}</h3>
        <p className="text-red-600 text-sm mt-1">Please check the database connection</p>
      </div>
    )
  }

  return <HomeNewsHorizontal news={news} />
}
