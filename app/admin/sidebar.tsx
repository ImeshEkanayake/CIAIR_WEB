import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BookOpen,
  Newspaper,
  Building,
  FileSpreadsheet,
} from "lucide-react"

export function AdminSidebar() {
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Admin Dashboard</h2>
          <div className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Content Management</h2>
          <div className="space-y-1">
            <Link
              href="/admin/research"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Research Projects</span>
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Blog Posts</span>
            </Link>
            <Link
              href="/admin/news"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Newspaper className="mr-2 h-4 w-4" />
              <span>News</span>
            </Link>
            <Link
              href="/admin/publications"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>Publications</span>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">User Management</h2>
          <div className="space-y-1">
            <Link
              href="/admin/people"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Team Members</span>
            </Link>
            <Link
              href="/admin/collaborators"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Building className="mr-2 h-4 w-4" />
              <span>Collaborators</span>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">System</h2>
          <div className="space-y-1">
            <Link
              href="/admin/settings"
              className="flex items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
