"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ClientResponsiveWrapperProps {
  desktopComponent: React.ReactNode
  mobileComponent: React.ReactNode
  mobileBreakpoint?: number
}

export default function ClientResponsiveWrapper({
  desktopComponent,
  mobileComponent,
  mobileBreakpoint = 720,
}: ClientResponsiveWrapperProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [mobileBreakpoint])

  // During SSR or initial hydration, use desktop layout to avoid hydration mismatch
  if (!isClient) {
    return <>{desktopComponent}</>
  }

  return <>{isMobile ? mobileComponent : desktopComponent}</>
}
