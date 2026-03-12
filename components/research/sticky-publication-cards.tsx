import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { CardScrollHandler } from "./card-scroll-handler"
import type { Publication } from "@/types/supabase"

interface StickyPublicationCardsProps {
  publications: Publication[]
}

export function StickyPublicationCards({ publications }: StickyPublicationCardsProps) {
  // Get the top 6 most cited publications
  const topCitedPublications = publications.slice(0, 6)

  return (
    <div className="sticky-cards-container">
      <CardScrollHandler />
      <ul className="sticky-cards">
        {topCitedPublications.map((publication) => (
          <li key={publication.id} className="sticky-card">
            <div className="sticky-card-body">
              <div className="sticky-card-header">
                <Badge variant="outline">{publication.category}</Badge>
                <span className="text-sm font-medium">{publication.year}</span>
              </div>

              <div className="sticky-card-content">
                <h3 className="text-lg font-semibold mb-2">{publication.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{publication.authors}</p>
                <p className="text-muted-foreground text-xs italic mb-3">{publication.journal_info}</p>

                {publication.publication_authors && publication.publication_authors.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">CIAIR Authors:</p>
                    <div className="flex flex-wrap gap-1">
                      {publication.publication_authors.map((author) => (
                        <Link
                          href={`/team/${author.team_members.slug}`}
                          key={author.team_member_id}
                          className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80"
                        >
                          {author.team_members.name}
                          {author.is_primary_author && "*"}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky-card-footer">
                <div className="flex items-center">
                  <span className="mr-1 text-sm">Citations:</span>
                  <span className="font-medium">{publication.citation_count}</span>
                </div>
                {publication.url ? (
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Publication <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
