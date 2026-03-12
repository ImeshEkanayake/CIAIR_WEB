"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import type { TeamMember } from "@/lib/supabase"
import { Checkbox } from "@/components/ui/checkbox"

interface PublicationFormProps {
  publication?: {
    id: number
    title: string
    authors: string
    journal_info: string
    year: number
    url: string
    citation_count: number
    category: string
    abstract?: string | null
    youtube_link?: string | null
    keywords?: string | null
  }
  publicationAuthors?: Array<{
    team_member_id: number
    is_primary_author: boolean
  }>
  teamMembers?: Array<{
    id: number
    name: string
  }>
}

export default function PublicationForm({
  publication,
  publicationAuthors = [],
  teamMembers: initialTeamMembers = [],
}: PublicationFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(publication?.title || "")
  const [authors, setAuthors] = useState(publication?.authors || "")
  const [journalInfo, setJournalInfo] = useState(publication?.journal_info || "")
  const [year, setYear] = useState(publication?.year?.toString() || new Date().getFullYear().toString())
  const [url, setUrl] = useState(publication?.url || "")
  const [citationCount, setCitationCount] = useState(publication?.citation_count?.toString() || "0")
  const [category, setCategory] = useState(publication?.category || "")
  const [abstract, setAbstract] = useState(publication?.abstract || "")
  const [youtubeLink, setYoutubeLink] = useState(publication?.youtube_link || "")
  const [keywords, setKeywords] = useState(publication?.keywords || "")
  const [loading, setLoading] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers as TeamMember[])
  const [selectedAuthors, setSelectedAuthors] =
    useState<
      Array<{
        team_member_id: number
        is_primary_author: boolean
      }>
    >(publicationAuthors)
  const [categories, setCategories] = useState<string[]>([])

  // Fetch team members and categories on component mount
  useEffect(() => {
    async function fetchData() {
      // Fetch team members
      if (initialTeamMembers.length === 0) {
        const { data: members, error: membersError } = await supabase
          .from("team_members")
          .select("*")
          .order("name", { ascending: true })

        if (membersError) {
          console.error("Error fetching team members:", membersError)
        } else {
          setTeamMembers((members || []) as TeamMember[])
        }
      }

      // Fetch unique categories
      const { data: publications, error: pubError } = await supabase.from("publications").select("category")

      if (pubError) {
        console.error("Error fetching categories:", pubError)
      } else {
        const uniqueCategories = Array.from(
          new Set((publications || []).map((p) => p.category).filter((c) => c !== null && c !== "")),
        ).sort()
        setCategories(uniqueCategories)
      }
    }

    fetchData()
  }, [initialTeamMembers])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const publicationData = {
        title,
        authors,
        journal_info: journalInfo,
        year: Number.parseInt(year),
        url,
        citation_count: Number.parseInt(citationCount),
        category,
        abstract,
        youtube_link: youtubeLink,
        keywords,
      }

      let publicationId = publication?.id

      if (publicationId) {
        // Update existing publication
        const { error } = await supabase.from("publications").update(publicationData).eq("id", publicationId)

        if (error) throw error
      } else {
        // Create new publication
        const { data, error } = await supabase.from("publications").insert(publicationData).select()

        if (error) throw error
        publicationId = data[0].id
      }

      // Handle publication authors
      if (publicationId) {
        // First, delete existing author associations
        await supabase.from("publication_authors").delete().eq("publication_id", publicationId)

        // Then, insert new author associations
        if (selectedAuthors.length > 0) {
          const authorInserts = selectedAuthors.map((author) => ({
            publication_id: publicationId,
            team_member_id: author.team_member_id,
            is_primary_author: author.is_primary_author,
          }))

          const { error } = await supabase.from("publication_authors").insert(authorInserts)

          if (error) throw error
        }
      }

      router.push("/admin/publications")
      router.refresh()
    } catch (error) {
      console.error("Error saving publication:", error)
      alert("Failed to save publication. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAuthorToggle = (teamMemberId: number) => {
    setSelectedAuthors((prev) => {
      const exists = prev.some((author) => author.team_member_id === teamMemberId)

      if (exists) {
        // Remove author
        return prev.filter((author) => author.team_member_id !== teamMemberId)
      } else {
        // Add author
        return [...prev, { team_member_id: teamMemberId, is_primary_author: false }]
      }
    })
  }

  const handlePrimaryAuthorToggle = (teamMemberId: number) => {
    setSelectedAuthors((prev) =>
      prev.map((author) =>
        author.team_member_id === teamMemberId ? { ...author, is_primary_author: !author.is_primary_author } : author,
      ),
    )
  }

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="authors">Authors (as they appear in publication)</Label>
          <Input id="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="mt-1 h-32"
          />
        </div>

        <div>
          <Label htmlFor="keywords">Keywords (comma separated)</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="AI, machine learning, ethics"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="youtube_link">YouTube Video Link</Label>
          <Input
            id="youtube_link"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="journal">Journal/Conference Information</Label>
          <Input id="journal" value={journalInfo} onChange={(e) => setJournalInfo(e.target.value)} className="mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="year">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="mt-1">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="citations">Citation Count</Label>
            <Input
              id="citations"
              type="number"
              min="0"
              value={citationCount}
              onChange={(e) => setCitationCount(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="url">URL</Label>
          <Input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <div className="flex gap-2 mt-1">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="flex-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Or enter new category"
              value={!categories.includes(category) ? category : ""}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label className="block mb-2">CIAIR Authors</Label>
          <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2">Name</th>
                  <th className="text-center pb-2">Include</th>
                  <th className="text-center pb-2">Primary Author</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => {
                  const isSelected = selectedAuthors.some((a) => a.team_member_id === member.id)
                  const isPrimary = selectedAuthors.some((a) => a.team_member_id === member.id && a.is_primary_author)

                  return (
                    <tr key={member.id} className="border-t">
                      <td className="py-2">{member.name}</td>
                      <td className="text-center">
                        <Checkbox checked={isSelected} onCheckedChange={() => handleAuthorToggle(member.id)} />
                      </td>
                      <td className="text-center">
                        <Checkbox
                          checked={isPrimary}
                          disabled={!isSelected}
                          onCheckedChange={() => handlePrimaryAuthorToggle(member.id)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/publications")} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : publication ? "Update Publication" : "Add Publication"}
        </Button>
      </div>
    </form>
  )
}
