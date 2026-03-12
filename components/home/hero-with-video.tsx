"use client"

import Link from "next/link"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

interface HeroWithVideoProps {
  isMobile?: boolean
}

export default function HeroWithVideo({ isMobile = false }: HeroWithVideoProps) {
  const videoUrl =
    "https://vllbvbuaibfubrfiivmz.supabase.co/storage/v1/object/sign/homepagevideo/CIARI%20v4.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0YmQ0YWFhLThlNjQtNGM4Yi1iZDc3LWY1NDM3ZDIxYjJjMSJ9.eyJ1cmwiOiJob21lcGFnZXZpZGVvL0NJQVJJIHY0Lm1wNCIsImlhdCI6MTc0NjUwNTU3NiwiZXhwIjoxNzc4MDQxNTc2fQ.IWVIVVJaXOwWk4q_7f7FhCO2t1bP7bv511yz62Gt67k"

  if (isMobile) {
    return (
      <section className="w-full bg-white dark:bg-gray-900 py-8">
        <ResponsiveContainer className="px-4">
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold tracking-tight">Advancing AI Research for Societal Improvement</h1>
              <p className="text-sm text-muted-foreground">
                CIAIR is dedicated to advancing the field of Artificial Intelligence and Machine Learning through
                rigorous research across Education, Environment, Engineering, Ethics, Privacy, and Finance.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="/research"
                  className="w-full h-10 flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground"
                >
                  Explore Our Research
                </Link>
                <Link
                  href="/contact"
                  className="w-full h-10 flex items-center justify-center rounded-md border border-input bg-background text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Video container with 1:1 aspect ratio */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    )
  }

  return (
    <section className="w-full bg-white dark:bg-gray-900 py-16">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Advancing AI Research for Societal Improvement
            </h1>
            <p className="text-lg text-muted-foreground">
              CIAIR is dedicated to advancing the field of Artificial Intelligence and Machine Learning through rigorous
              research across Education, Environment, Engineering, Ethics, Privacy, and Finance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/research"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Our Research
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Video container with 1:1 aspect ratio */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
