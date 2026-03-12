"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ThemeLogoProps {
  className?: string
  width?: number
  height?: number
}

export function ThemeLogo({ className = "h-10 w-auto", width = 120, height = 40 }: ThemeLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the appropriate logo after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className} /> // Return empty div with same dimensions during SSR
  }

  const logoSrc = resolvedTheme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"

  return (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="CIAIR Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
