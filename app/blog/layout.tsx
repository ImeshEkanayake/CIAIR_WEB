import type React from "react"
import "@/app/blog/blog.css"
import "@/app/blog/blog-horizontal-scroll.css"
import "@/app/blog/blog-card-stack.css"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
