import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  // If not authenticated, redirect to login
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 w-full">{children}</div>
    </div>
  )
}
