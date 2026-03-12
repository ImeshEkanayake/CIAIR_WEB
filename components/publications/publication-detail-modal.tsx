"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Publication } from "@/types/supabase"

type PublicationDetailModalProps = {
  publication: Publication | null
  isOpen: boolean
  onClose: () => void
}

export default function PublicationDetailModal({ publication, isOpen, onClose }: PublicationDetailModalProps) {
  if (!publication) return null

  const getYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{publication.title}</DialogTitle>
          <DialogDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
            {publication.authors}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Journal Information</h3>
            <p className="text-gray-700 dark:text-gray-300">{publication.journal_info}</p>
          </div>

          {publication.abstract ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Abstract</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{publication.abstract}</p>
            </div>
          ) : null}

          {publication.keywords ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Keywords</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{publication.keywords}</p>
            </div>
          ) : null}

          {publication.youtube_link ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Video Presentation</h3>
              <div className="aspect-video mt-2">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(publication.youtube_link)}`}
                  title={`Video for ${publication.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                />
              </div>
            </div>
          ) : null}

          {publication.publication_authors && publication.publication_authors.length > 0 ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CIAIR Authors</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {publication.publication_authors.map((author) => (
                  <Link
                    key={author.team_member_id}
                    href={`/team/${author.team_members.slug}`}
                    className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800"
                  >
                    {author.team_members.name}
                    {author.is_primary_author && "*"}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">* primary author</p>
            </div>
          ) : null}

          <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Citations: </span>
              <span className="font-medium">{publication.citation_count}</span>
              <span className="mx-2">|</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Year: </span>
              <span className="font-medium">{publication.year}</span>
            </div>
            {publication.url ? (
              <Button variant="outline" asChild>
                <a href={publication.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Publication <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
