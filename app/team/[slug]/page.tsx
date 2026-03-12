import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: member } = await supabase.from("team_members").select("*").eq("slug", slug).single()

  if (!member) {
    return {
      title: "Team Member Not Found | CIAIR",
      description: "The requested team member could not be found.",
    }
  }

  return {
    title: `${member.name} | CIAIR Team`,
    description: member.bio.substring(0, 160),
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: member, error } = await supabase.from("team_members").select("*").eq("slug", slug).single()

  if (error || !member) {
    notFound()
  }

  const { data: publications } = await supabase
    .from("publication_authors")
    .select(
      `
      is_primary_author,
      publications (
        id,
        title,
        authors,
        journal_info,
        citation_count,
        year,
        url
      )
    `,
    )
    .eq("team_member_id", member.id)
    .order("is_primary_author", { ascending: false })

  const publicationsByYear =
    publications?.reduce(
      (acc, pub) => {
        const publication = Array.isArray(pub.publications) ? pub.publications[0] : pub.publications
        if (!publication) {
          return acc
        }

        const year = publication.year
        if (!acc[year]) {
          acc[year] = []
        }

        acc[year].push({
          ...publication,
          is_primary_author: pub.is_primary_author,
        })

        return acc
      },
      {} as Record<number, any[]>,
    ) || {}

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="container mx-auto py-12 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            {member.image_url ? (
              <Image
                src={member.image_url || "/placeholder.svg"}
                alt={member.name}
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg w-full aspect-square flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}

            <h1 className="text-2xl font-bold mt-4">{member.name}</h1>
            <p className="text-lg text-gray-600">{member.title}</p>

            <div className="mt-4 space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${member.email}`} className="text-blue-600">
                  {member.email}
                </a>
              </p>

              <div className="flex gap-4 mt-4">
                {member.linkedin_url ? (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    LinkedIn
                  </a>
                ) : null}
                {member.twitter_url ? (
                  <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Twitter
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="prose max-w-none">
            <h2>Biography</h2>
            <p>{member.bio}</p>

            {years.length > 0 ? (
              <>
                <h2 className="mt-8">Publications</h2>
                <div className="not-prose">
                  {years.map((year) => (
                    <div key={year} className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{year}</h3>
                      <ul className="space-y-4">
                        {publicationsByYear[year].map((pub: any) => (
                          <li key={pub.id} className="border-l-4 pl-4 border-gray-300">
                            {pub.url ? (
                              <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                                {pub.title}
                              </a>
                            ) : (
                              <span className="font-medium">{pub.title}</span>
                            )}
                            <div className="text-gray-600 text-sm mt-1">{pub.authors}</div>
                            <div className="text-gray-600 text-sm">{pub.journal_info}</div>
                            <div className="text-sm mt-1 flex justify-between">
                              <span>{pub.is_primary_author ? <span className="text-green-600 font-medium">Primary Author</span> : null}</span>
                              <span className="text-gray-500">Citations: {pub.citation_count > 0 ? pub.citation_count : "N/A"}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/research/publications" className="text-blue-600 hover:underline">
                    View all CIAIR publications -&gt;
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
