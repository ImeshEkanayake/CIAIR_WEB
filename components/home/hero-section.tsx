import Link from "next/link"

interface HeroSectionProps {
  isMobile?: boolean
}

export default function HeroSection({ isMobile = false }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Advancing AI Research for Societal Improvement
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                CIAIR is dedicated to pioneering AI research that addresses real-world challenges and creates positive
                societal impact.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/research"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Explore Our Research
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              poster="/placeholder.svg?key=qyek0"
            >
              <source src="/videos/ai-research-hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
