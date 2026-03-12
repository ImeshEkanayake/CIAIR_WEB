"use client"

import Link from "next/link"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import ClientMobileLatestNews from "@/components/home/client-mobile-latest-news"
import HeroWithVideo from "@/components/home/hero-with-video"

export default function MobileHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Mobile Hero Section with Video */}
      <HeroWithVideo isMobile={true} />

      {/* Mobile Latest News Section */}
      <ClientMobileLatestNews />

      {/* Mobile Research Areas Section - Simplified for mobile */}
      <section className="w-full py-8">
        <ResponsiveContainer className="px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter">Our Research Areas</h2>
              <p className="text-sm text-muted-foreground mx-auto">Our key areas of AI research focus</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* Simplified research area cards for mobile */}
            <div className="flex flex-col items-center space-y-1 border p-3 rounded-lg">
              <div className="p-1 bg-primary/10 rounded-full">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M22 12h-4v4h-4v4h8v-8Z" />
                  <path d="M6 12v4h4v4h4v-8H6Z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold">Machine Learning</h3>
            </div>
            <div className="flex flex-col items-center space-y-1 border p-3 rounded-lg">
              <div className="p-1 bg-primary/10 rounded-full">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                </svg>
              </div>
              <h3 className="text-sm font-bold">NLP</h3>
            </div>
            <div className="flex flex-col items-center space-y-1 border p-3 rounded-lg">
              <div className="p-1 bg-primary/10 rounded-full">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <path d="M9 9h.01" />
                  <path d="M15 9h.01" />
                </svg>
              </div>
              <h3 className="text-sm font-bold">Computer Vision</h3>
            </div>
            <div className="flex flex-col items-center space-y-1 border p-3 rounded-lg">
              <div className="p-1 bg-primary/10 rounded-full">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-sm font-bold">RL</h3>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Mobile Call to Action Section */}
      <section className="w-full py-8 bg-gray-100 dark:bg-gray-900">
        <ResponsiveContainer className="px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter">Join Our Research Community</h2>
              <p className="text-sm text-muted-foreground mx-auto">
                Connect with talented researchers and collaborators
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Link
                className="w-full h-10 flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground"
                href="/contact"
              >
                Contact Us
              </Link>
              <Link
                className="w-full h-10 flex items-center justify-center rounded-md border border-input bg-background text-sm font-medium"
                href="/people"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </main>
  )
}
