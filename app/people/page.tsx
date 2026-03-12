import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mail, Linkedin, Twitter } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { TeamMember, Collaborator } from "@/lib/supabase"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import TeamVideo from "@/components/people/team-video"

export const metadata = {
  title: "People & Collaborators | CIAIR",
  description: "Meet our team of AI researchers, advisors, and institutional collaborators.",
}

export default async function PeoplePage() {
  // Fetch team members and collaborators from Supabase
  const { data: membersData } = await supabase.from("team_members").select("*").order("name")

  const { data: collaborators = [] } = await supabase.from("collaborators").select("*").order("name")
  const members = membersData ?? []

  // Group team members by category with fallback for empty database
  const founders = members.filter((member) => member.category === "founders")
  const advisors = members.filter((member) => member.category === "advisors")
  const researchers = members.filter((member) => member.category === "researchers")
  const staff = members.filter((member) => member.category === "staff")

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ResponsiveContainer>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">People & Collaborators</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet our dedicated team of AI researchers and collaborators who make our work possible.
              </p>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Team Members */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <Tabs defaultValue="founders" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="founders">Founders</TabsTrigger>
                <TabsTrigger value="advisors">Advisors</TabsTrigger>
                <TabsTrigger value="researchers">Researchers</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="founders">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {founders.map((person: TeamMember) => (
                  <Card key={person.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={person.image_url || "/placeholder.svg?height=300&width=300"}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{person.bio}</p>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" asChild>
                          <Link href={`mailto:${person.email}`}>
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Link>
                        </Button>
                        {person.linkedin_url && (
                          <Button size="icon" variant="ghost" asChild>
                            <Link href={person.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                              <span className="sr-only">LinkedIn</span>
                            </Link>
                          </Button>
                        )}
                        {person.twitter_url && (
                          <Button size="icon" variant="ghost" asChild>
                            <Link href={person.twitter_url} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-4 w-4" />
                              <span className="sr-only">Twitter</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advisors">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {advisors.map((person: TeamMember) => (
                  <Card key={person.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={person.image_url || "/placeholder.svg?height=300&width=300"}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{person.bio}</p>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" asChild>
                          <Link href={`mailto:${person.email}`}>
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Link>
                        </Button>
                        {person.linkedin_url && (
                          <Button size="icon" variant="ghost" asChild>
                            <Link href={person.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                              <span className="sr-only">LinkedIn</span>
                            </Link>
                          </Button>
                        )}
                        {person.twitter_url && (
                          <Button size="icon" variant="ghost" asChild>
                            <Link href={person.twitter_url} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-4 w-4" />
                              <span className="sr-only">Twitter</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="researchers">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {researchers.map((person: TeamMember) => (
                  <Card key={person.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={person.image_url || "/placeholder.svg?height=300&width=300"}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" asChild className="px-0">
                        <Link href={`/people/${person.slug}`}>
                          View profile <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {staff.map((person: TeamMember) => (
                  <Card key={person.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={person.image_url || "/placeholder.svg?height=300&width=300"}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" asChild className="px-0">
                        <Link href={`/people/${person.slug}`}>
                          View profile <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ResponsiveContainer>
      </section>

      {/* Institutes Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ResponsiveContainer>
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Partner Institutes</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Organizations and institutions we collaborate with to advance AI research and applications.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collaborators?.map((org: Collaborator) => (
              <Card key={org.id}>
                <div className="h-[200px] relative">
                  <Image
                    src={org.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={org.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{org.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{org.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Join Our Team */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="join">
        <ResponsiveContainer>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="text-muted-foreground">
                We're always looking for talented AI researchers and staff to join our small but growing team. Explore
                our current openings and opportunities.
              </p>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Current Openings:</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Research Scientist - AI in Education</li>
                  <li>Research Assistant - Ethical AI</li>
                  <li>ML Engineer - Environmental Applications</li>
                  <li>Communications Specialist</li>
                  <li>Research Intern - AI Privacy</li>
                </ul>
              </div>
              <Button asChild>
                <Link href="/contact#careers">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mx-auto lg:ml-auto">
              <TeamVideo />
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  )
}
