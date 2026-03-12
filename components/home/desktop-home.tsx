"use client"

import ClientLatestNews from "@/components/home/client-latest-news"
import HeroWithVideo from "@/components/home/hero-with-video"

export default function DesktopHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section with Video */}
      <HeroWithVideo />

      {/* Latest News Section */}
      <ClientLatestNews />

      {/* Research Areas Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Research Areas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our institute focuses on several key areas of artificial intelligence research.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M22 12h-4v4h-4v4h8v-8Z" />
                  <path d="M6 12v4h4v4h4v-8H6Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Machine Learning</h3>
              <p className="text-muted-foreground text-center">
                Developing new algorithms and approaches for machine learning and deep learning.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Natural Language Processing</h3>
              <p className="text-muted-foreground text-center">
                Advancing language understanding and generation capabilities of AI systems.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
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
              <h3 className="text-xl font-bold">Computer Vision</h3>
              <p className="text-muted-foreground text-center">
                Researching visual perception, object recognition, and scene understanding.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Reinforcement Learning</h3>
              <p className="text-muted-foreground text-center">
                Developing agents that learn optimal behaviors through interaction with environments.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="m9 15 3 3 3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Ethics</h3>
              <p className="text-muted-foreground text-center">
                Studying the ethical implications and responsible development of AI technologies.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className=" h-6 w-6 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Robotics</h3>
              <p className="text-muted-foreground text-center">
                Integrating AI with robotic systems for autonomous operation and decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Research Community
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                We're always looking for talented researchers and collaborators to join our community.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/contact"
              >
                Contact Us
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/people"
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
