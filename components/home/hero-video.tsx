"use client"

import { useEffect, useRef, useState } from "react"

interface HeroVideoProps {
  isMobile?: boolean
}

export default function HeroVideo({ isMobile = false }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("loadeddata", () => {
        setIsLoaded(true)
      })

      // Attempt to play the video automatically
      const playVideo = async () => {
        try {
          await videoElement.play()
        } catch (error) {
          console.log("Auto-play prevented:", error)
        }
      }

      playVideo()
    }

    return () => {
      if (videoElement) {
        videoElement.pause()
        videoElement.removeEventListener("loadeddata", () => {
          setIsLoaded(true)
        })
      }
    }
  }, [])

  return (
    <div className={`relative w-full ${isMobile ? "h-[40vh]" : "h-[70vh]"} overflow-hidden`}>
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg?key=x2bge"
      >
        <source src="/videos/ai-research-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 z-10">
        <h1
          className={`text-center font-bold tracking-tighter ${isMobile ? "text-2xl mb-2" : "text-4xl md:text-5xl lg:text-6xl mb-4"}`}
        >
          Ceylon Institute for Artificial Intelligence and Research
        </h1>
        <p
          className={`text-center max-w-[900px] ${isMobile ? "text-sm mb-4" : "md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-6"}`}
        >
          Advancing the frontiers of artificial intelligence through innovative research and collaboration.
        </p>
        <div className={`flex ${isMobile ? "flex-col w-full" : "flex-row"} gap-2`}>
          <a
            className={`inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isMobile ? "w-full" : ""}`}
            href="/research"
          >
            Explore Research
          </a>
          <a
            className={`inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isMobile ? "w-full" : ""}`}
            href="/about"
          >
            About Us
          </a>
        </div>
      </div>
    </div>
  )
}
