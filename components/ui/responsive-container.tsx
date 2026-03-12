import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function ResponsiveContainer({ children, className, as: Component = "div" }: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        // Base padding for all screens
        "w-full px-4 mx-auto",
        // Small screens (mobile)
        "sm:px-6",
        // Medium screens (tablets)
        "md:px-8",
        // Large screens (laptops - 16:9)
        "lg:px-12 lg:max-w-7xl",
        // Extra large screens (desktops)
        "xl:px-16",
        // Ultrawide screens (21:9)
        "2xl:max-w-[1400px] 2xl:px-20",
        className,
      )}
    >
      {children}
    </Component>
  )
}
