import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Clock, Globe, Target } from "lucide-react"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ResponsiveContainer>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About CIAIR</h1>
              <p className="text-muted-foreground md:text-xl">
                Founded in 2024, CIAIR is a non-profit research organization based in Colombo, Sri Lanka, dedicated to
                advancing the field of Artificial Intelligence and Machine Learning through rigorous research and
                development.
              </p>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <video
                  src="https://vllbvbuaibfubrfiivmz.supabase.co/storage/v1/object/sign/homepagevideo/about.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0YmQ0YWFhLThlNjQtNGM4Yi1iZDc3LWY1NDM3ZDIxYjJjMSJ9.eyJ1cmwiOiJob21lcGFnZXZpZGVvL2Fib3V0Lm1wNCIsImlhdCI6MTc0NjQyMjg4NSwiZXhwIjoxNzc3OTU4ODg1fQ.lmU1gEvNPYioy3M3XwrzRA41zsmrsktEcxk5iaUU5x4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Mission and Vision */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To advance the field of Artificial Intelligence and Machine Learning through rigorous research across
                  Education, Environment, Engineering, Ethics, Privacy, and Finance, while fostering collaborative
                  relationships with universities, passionate individuals, companies, and other research organizations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 mb-2" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To drive innovation and ethical practices in AI for a better future, leveraging technology for
                  societal improvement across Sri Lanka and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </ResponsiveContainer>
      </section>

      {/* History */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our History</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tracing our journey from our founding to the present day.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-8 py-12">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="h-full w-0.5 bg-border"></div>
              </div>
              <div className="space-y-2 pb-8">
                <h3 className="text-xl font-bold">2024: Foundation</h3>
                <p className="text-muted-foreground">
                  CIAIR was founded by a group of AI researchers and practitioners with the goal of creating a
                  collaborative environment for cutting-edge AI research in Sri Lanka.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="h-full w-0.5 bg-border"></div>
              </div>
              <div className="space-y-2 pb-8">
                <h3 className="text-xl font-bold">2024: Initial Research Focus</h3>
                <p className="text-muted-foreground">
                  We established our initial research focus areas in Education, Environment, Engineering, Ethics,
                  Privacy, and Finance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Today</h3>
                <p className="text-muted-foreground">
                  We continue to grow and evolve, with a small but dedicated team of researchers working on
                  groundbreaking AI projects across our six main research areas.
                </p>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Achievements */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Achievements</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Celebrating our milestones and recognition in the research community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Growing Research Team",
                description:
                  "Our team consists of dedicated AI researchers and practitioners working across multiple disciplines.",
              },
              {
                title: "University Partnerships",
                description: "We've established partnerships with universities in Sri Lanka and internationally.",
              },
              {
                title: "Industry Collaborations",
                description: "We work with companies to apply AI research to real-world problems.",
              },
              {
                title: "Community Engagement",
                description:
                  "We regularly engage with the local tech community through workshops and knowledge sharing.",
              },
              {
                title: "Educational Initiatives",
                description: "We're developing programs to enhance AI education and literacy in Sri Lanka.",
              },
              {
                title: "Research Publications",
                description:
                  "Our team is actively publishing research in AI and machine learning conferences and journals.",
              },
            ].map((achievement, i) => (
              <Card key={i}>
                <CardHeader>
                  <Award className="h-10 w-10 mb-2" />
                  <CardTitle>{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Facilities */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Facilities</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our state-of-the-art research facilities and infrastructure.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Main Research Building</h3>
              <p className="text-muted-foreground">
                Our main facility houses advanced laboratories, collaborative workspaces, and meeting rooms designed to
                foster innovation and interdisciplinary research.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>High-performance computing cluster</li>
                <li>Data visualization lab</li>
                <li>AI research lab</li>
                <li>Sustainability innovation center</li>
                <li>Conference and seminar rooms</li>
              </ul>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Research Facilities"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Involved</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                There are many ways to engage with our research institute.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/people#join">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  )
}
