import Link from "next/link"
import { BarChart, FileText, Users, BookOpen, Settings, Handshake, BookMarked } from "lucide-react"
import { ThemeLogo } from "@/components/theme-logo"

export default function AdminSidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <Link href="/admin/dashboard" className="flex items-center">
          <ThemeLogo className="h-10 w-auto" />
        </Link>
      </div>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">
          <div className="flex items-center">
            <BarChart className="mr-3 h-5 w-5" />
            Dashboard
          </div>
        </Link>

        <Link href="/admin/research" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">
          <div className="flex items-center">
            <FileText className="mr-3 h-5 w-5" />
            Research Projects
          </div>
        </Link>

        <Link
          href="/admin/publications"
          className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          <div className="flex items-center">
            <BookMarked className="mr-3 h-5 w-5" />
            Publications
          </div>
        </Link>

        <Link href="/admin/people" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">
          <div className="flex items-center">
            <Users className="mr-3 h-5 w-5" />
            Team Members
          </div>
        </Link>

        <Link href="/admin/blog" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">
          <div className="flex items-center">
            <BookOpen className="mr-3 h-5 w-5" />
            Blog Posts
          </div>
        </Link>

        <Link
          href="/admin/collaborators"
          className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          <div className="flex items-center">
            <Handshake className="mr-3 h-5 w-5" />
            Collaborators
          </div>
        </Link>

        <Link href="/admin/settings" className="block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200">
          <div className="flex items-center">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </div>
        </Link>
      </nav>
    </aside>
  )
}
