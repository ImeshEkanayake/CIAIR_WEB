"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import MobileNavbar from "@/components/mobile-navbar"
import Footer from "@/components/footer"
import MobileFooter from "@/components/mobile-footer"

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 720)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // During SSR or initial hydration, use desktop layout to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center w-full">{children}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <main className="flex-1 flex flex-col items-center w-full">{children}</main>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  )
}
