"use client"

import { useScreenWidth } from "@/hooks/use-screen-width"
import type { ReactNode } from "react"

interface ResponsiveWrapperProps {
  children: ReactNode
  mobileContent: ReactNode
  breakpoint?: number
}

export function ResponsiveWrapper({ children, mobileContent, breakpoint = 720 }: ResponsiveWrapperProps) {
  const { isMobile } = useScreenWidth({ mobile: breakpoint })

  return <>{isMobile ? mobileContent : children}</>
}
