import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabaseAdmin } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Users, BookOpen, Plus } from "lucide-react"
import { SupabaseStatus } from "@/components/admin/supabase-status"

export default async function AdminDashboard() {
  // Fetch counts from database
  const [{ count: researchCount }, { count: teamCount }, { count: blogCount }] = await Promise.all([
    supabaseAdmin.from("research_projects").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("team_members").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("blog_posts").select("*", { count: "exact", head: true }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{researchCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total research projects</p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/admin/research">Manage Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total team members</p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/admin/people">Manage Team</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total blog posts</p>
            <Button asChild variant="link" className="px-0 mt-2">
              <Link href="/admin/blog">Manage Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Create new content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/admin/research/new">
                <Plus className="mr-2 h-4 w-4" /> New Research Project
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/people/new">
                <Plus className="mr-2 h-4 w-4" /> New Team Member
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <SupabaseStatus />
        </div>
      </div>
    </div>
  )
}
