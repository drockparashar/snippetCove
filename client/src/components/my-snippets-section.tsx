"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code2, Edit, ExternalLink, Plus, Star } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Snippet {
  _id: string
  title: string
  code: string
  language: string
  tags: string[]
  author: string
  upvotes: number
  createdAt: string
}

interface MySnippetsSectionProps {
  snippets: Snippet[]
}

export function MySnippetsSection({ snippets }: MySnippetsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "upvotes">("newest")

  // Get unique languages
  const languages = [...new Set(snippets.map((snippet) => snippet.language))]

  // Filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLanguage = !languageFilter || snippet.language === languageFilter
    return matchesSearch && matchesLanguage
  })

  // Sort snippets
  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      return b.upvotes - a.upvotes
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-3 sm:gap-0">
        <div>
          <CardTitle className="text-lg sm:text-xl">My Snippets</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Code snippets you've created and shared</CardDescription>
        </div>
        <Link href="/submit">
          <Button size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            New Snippet
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {snippets.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by title or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <Select value={languageFilter || "all"} onValueChange={(value) => setLanguageFilter(value === "all" ? null : value)}>
                  <SelectTrigger className="w-full xs:w-[140px] sm:w-[180px] text-xs sm:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs sm:text-sm">All Languages</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-xs sm:text-sm">{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "upvotes") => setSortBy(value)}>
                  <SelectTrigger className="w-full xs:w-[140px] sm:w-[180px] text-xs sm:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest" className="text-xs sm:text-sm">Newest First</SelectItem>
                    <SelectItem value="oldest" className="text-xs sm:text-sm">Oldest First</SelectItem>
                    <SelectItem value="upvotes" className="text-xs sm:text-sm">Most Upvotes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Showing {sortedSnippets.length} of {snippets.length} snippets
            </div>

            <div className="space-y-3 sm:space-y-4">
              {sortedSnippets.map((snippet) => (
                <div
                  key={snippet._id}
                  className="p-3 sm:p-4 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <h3 className="font-medium text-base sm:text-lg">{snippet.title}</h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs">
                          {snippet.language}
                        </Badge>
                        {snippet.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-muted-foreground text-[10px] sm:text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center text-amber-400">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-amber-400" />
                        <span className="text-xs sm:text-sm">{snippet.upvotes}</span>
                      </div>
                      <Link href={`/snippets/${snippet._id}`}>
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          View
                        </Button>
                      </Link>
                      {/* <Link href={`/edit/${snippet._id}`}>
                        <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Edit
                        </Button>
                      </Link> */}
                    </div>
                  </div>
                  <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">
                    Created on {new Date(snippet.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination placeholder */}
            {snippets.length > 10 && (
              <div className="flex justify-center mt-4 sm:mt-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" disabled className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary/10 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block p-2 sm:p-3 rounded-full bg-muted mb-3 sm:mb-4">
              <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">No snippets created yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              Share your knowledge by submitting your first code snippet
            </p>
            <Link href="/submit">
              <Button size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Submit a Snippet
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
