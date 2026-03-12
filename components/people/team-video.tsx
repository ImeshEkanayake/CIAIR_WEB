"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function TeamVideo() {
  const [isLoading, setIsLoading] = useState(true)
  const videoUrl =
    "https://vllbvbuaibfubrfiivmz.supabase.co/storage/v1/object/sign/homepagevideo/CIARI%20v4.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0YmQ0YWFhLThlNjQtNGM4Yi1iZDc3LWY1NDM3ZDIxYjJjMSJ9.eyJ1cmwiOiJob21lcGFnZXZpZGVvL0NJQVJJIHY0Lm1wNCIsImlhdCI6MTc0NzA0NDMwNCwiZXhwIjoxNzc4NTgwMzA0fQ.r8D0onkGDpmRRS5ujF3SY4Bosb0-Mx3qZsgN9EiHvvc"

  useEffect(() => {
    // Reset loading state when component mounts
    setIsLoading(true)
  }, [])

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <video
        className="w-full h-full object-cover"
        controls
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoading(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
