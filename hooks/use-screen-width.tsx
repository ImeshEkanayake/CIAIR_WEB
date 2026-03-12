"use client"

import { useState, useEffect } from "react"

type ScreenWidthConfig = {
  mobile: number
  tablet?: number
  desktop?: number
}

const defaultConfig: ScreenWidthConfig = {
  mobile: 720,
  tablet: 1024,
  desktop: 1440,
}

export function useScreenWidth(config: Partial<ScreenWidthConfig> = {}) {
  const mergedConfig = { ...defaultConfig, ...config }
  const [width, setWidth] = useState<number>(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setWidth(window.innerWidth)

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Only return accurate values after mounting to avoid hydration mismatch
  if (!isMounted) {
    return {
      width: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isHighDensityMobile: false,
    }
  }

  return {
    width,
    isMobile: width < mergedConfig.mobile,
    isTablet: width >= mergedConfig.mobile && width < mergedConfig.tablet!,
    isDesktop: width >= mergedConfig.tablet!,
    // Special case for high-density mobile devices like the one specified
    isHighDensityMobile: width < mergedConfig.mobile && window.devicePixelRatio > 2,
  }
}
