import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Linkedin, Mail, Twitter } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

interface TeamMemberPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: member } = await supabase.from("team_members").select("*").eq("slug", slug).single()

  if (!member) {
    return { title: "Team Member Not Found" }
  }

  return {
    title: `${member.name} | CIAIR Team`,
    description: `${member.title} at CIAIR - Ceylon Institute for Artificial Intelligence and Research`,
  }
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const { data: member } = await supabase.from("team_members").select("*").eq("slug", slug).single()

  if (!member) {
    notFound()
  }

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("title, slug, created_at")
    .eq("author_id", member.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: projects } = await supabase
    .from("research_projects")
    .select("title, slug, category")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="container max-w-4xl py-12 w-full">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/people">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
              <Image
                src={member.image_url || "/placeholder.svg?height=400&width=400"}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold">{member.name}</h1>
            <p className="text-muted-foreground mb-4">{member.title}</p>

            <div className="flex space-x-2 mb-6">
              <Button size="icon" variant="outline" asChild>
                <Link href={`mailto:${member.email}`}>
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              {member.linkedin_url ? (
                <Button size="icon" variant="outline" asChild>
                  <Link href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              ) : null}
              {member.twitter_url ? (
                <Button size="icon" variant="outline" asChild>
                  <Link href={member.twitter_url} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Biography</h2>
              <div className="prose dark:prose-invert">
                <p>{member.bio}</p>
              </div>
            </CardContent>
          </Card>

          {posts && posts.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Recent Publications</h2>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button variant="link" asChild className="px-0 mt-4">
                  <Link href={`/blog?author=${member.id}`}>
                    View all publications <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {projects && projects.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Research Projects</h2>
                <ul className="space-y-2">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link href={`/research/${project.slug}`} className="text-primary hover:underline">
                        {project.title}
                      </Link>
                      <span className="text-sm text-muted-foreground ml-2">({project.category})</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" asChild className="px-0 mt-4">
                  <Link href="/research">
                    View all projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
