import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Calendar, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch with our team for inquiries, collaborations, or to learn more about our research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="text-muted-foreground mt-2">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john.doe@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Research Collaboration" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Contact Information</h2>
                <p className="text-muted-foreground mt-2">Here's how you can reach us directly.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">Address</CardTitle>
                    <CardDescription className="text-sm">
                      123 Innovation Avenue
                      <br />
                      Colombo
                      <br />
                      Sri Lanka
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">Email</CardTitle>
                    <CardDescription className="text-sm">
                      <Link href="mailto:admin@ciair.org" className="hover:underline">
                        admin@ciair.org
                      </Link>
                      <br />
                      <Link href="mailto:collaborations@researchinstitute.org" className="hover:underline">
                        collaborations@researchinstitute.org
                      </Link>
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">Phone</CardTitle>
                    <CardDescription className="text-sm">
                      <Link href="tel:+94766582288" className="hover:underline">
                        +94 76 658 2288
                      </Link>
                      <br />
                      <Link href="tel:+14155550124" className="hover:underline">
                        +1 (415) 555-0124
                      </Link>
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">Hours</CardTitle>
                    <CardDescription className="text-sm">
                      Monday - Friday
                      <br />
                      9:00 AM - 5:00 PM PST
                      <br />
                      Closed on weekends and holidays
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c-1.3 1.3-2.5 1.6-3 1.7-3.6.3-6.8.2-6.8.2s-5 .1-8.4-.5c-.8-.1-1.8-.5-2.8-1.5C-2 6.2 0 0 0 0s2.1.7 3.4 2c1.3 1.3 1.6 2.5 1.7 3 .3 3.6.2 6.8.2 6.8s.1 5-.5 8.4c-.1.8-.5 1.8-1.5 2.8-1.1 1.1-2.3 1.3-3.1 1.4-4.4.4-8.1.3-8.1.3s-5.9 0-8.4-1c-.8-.3-1.6-.7-2.2-1.4C-2 18.1 0 12 0 12s2.1.7 3.4 2c1.3 1.3 1.6 2.5 1.7 3 .3 3.6.2 6.8.2 6.8s.1 5-.5 8.4" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="visit">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Visit Us</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Plan your visit to our research institute.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Campus Tours</h3>
              <p className="text-muted-foreground">
                We offer guided tours of our research facilities for prospective collaborators, students, and visitors.
              </p>
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Tour Schedule:</h4>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Monday: 10:00 AM and 2:00 PM</li>
                  <li>Wednesday: 10:00 AM and 2:00 PM</li>
                  <li>Friday: 10:00 AM</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Tours last approximately 90 minutes and include visits to our main research areas, laboratories, and
                collaborative spaces.
              </p>
              <Button asChild>
                <Link href="/contact#book-tour">
                  Book a Tour <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0927348441075!2d-122.41941638468173!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1620164782045!5m2!1sen!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="events">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join us for seminars, workshops, and conferences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
            {[
              {
                title: "Annual Research Symposium",
                date: "June 15-17, 2024",
                description: "A three-day event showcasing our latest research findings and innovations.",
                location: "Main Auditorium",
              },
              {
                title: "Workshop on Advanced Data Analysis",
                date: "July 10, 2024",
                description: "Learn cutting-edge techniques for analyzing complex datasets.",
                location: "Conference Room A",
              },
              {
                title: "Guest Lecture: Future of AI",
                date: "August 5, 2024",
                description:
                  "Distinguished professor from MIT discusses the future landscape of artificial intelligence.",
                location: "Lecture Hall B",
              },
            ].map((event, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.date} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <Button variant="outline" asChild>
                    <Link href="/contact#register">
                      Register Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="careers">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Careers</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our team and contribute to groundbreaking research.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-8 py-12">
            <p className="text-muted-foreground">
              We're always looking for talented individuals to join our team. Check out our current openings below or
              send your resume to{" "}
              <Link href="mailto:careers@researchinstitute.org" className="underline">
                careers@researchinstitute.org
              </Link>
              .
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Senior Research Scientist - Artificial Intelligence",
                  type: "Full-time",
                  location: "San Francisco, CA",
                },
                {
                  title: "Postdoctoral Researcher - Data Science",
                  type: "Full-time",
                  location: "San Francisco, CA",
                },
                {
                  title: "Research Assistant - Sustainability",
                  type: "Full-time",
                  location: "San Francisco, CA",
                },
                {
                  title: "Communications Specialist",
                  type: "Full-time",
                  location: "San Francisco, CA",
                },
                {
                  title: "Grant Writer",
                  type: "Full-time",
                  location: "San Francisco, CA",
                },
              ].map((job, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>
                      {job.type} • {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        View Job Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
