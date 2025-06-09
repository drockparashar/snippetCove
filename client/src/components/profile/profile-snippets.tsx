"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code2, Star, Eye } from "lucide-react"
import Link from "next/link"

interface Snippet {
  _id: string
  title: string
  code: string
  language: string
  tags: string[]
  author: string
  upvotes: number
  createdAt: string
  description?: string
}

interface ProfileSnippetsProps {
  snippets: Snippet[]
}

export function ProfileSnippets({ snippets }: ProfileSnippetsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

  // Get unique languages
  const languages = [...new Set(snippets.map((snippet) => snippet.language))]

  // Filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (snippet.description && snippet.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Code Snippets</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Public code snippets shared by this developer</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {snippets.length > 0 ? (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search snippets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <Select
                  value={languageFilter || "all"}
                  onValueChange={(value) => setLanguageFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-full xs:w-[140px] sm:w-[180px] text-xs sm:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-xs sm:text-sm">
                      All Languages
                    </SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-xs sm:text-sm">
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "popular") => setSortBy(value)}>
                  <SelectTrigger className="w-full xs:w-[140px] sm:w-[180px] text-xs sm:text-sm h-8 sm:h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest" className="text-xs sm:text-sm">
                      Newest First
                    </SelectItem>
                    <SelectItem value="oldest" className="text-xs sm:text-sm">
                      Oldest First
                    </SelectItem>
                    <SelectItem value="popular" className="text-xs sm:text-sm">
                      Most Popular
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Showing {sortedSnippets.length} of {snippets.length} snippets
            </div>

            {/* Snippets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedSnippets.map((snippet) => (
                <Card key={snippet._id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm sm:text-base line-clamp-2">{snippet.title}</CardTitle>
                      <div className="flex items-center text-amber-400 shrink-0">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-amber-400" />
                        <span className="text-xs sm:text-sm">{snippet.upvotes}</span>
                      </div>
                    </div>
                    {snippet.description && (
                      <CardDescription className="text-xs sm:text-sm line-clamp-2">
                        {snippet.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs"
                      >
                        {snippet.language}
                      </Badge>
                      {snippet.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-muted-foreground text-[10px] sm:text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {snippet.tags.length > 2 && (
                        <Badge variant="secondary" className="text-muted-foreground text-[10px] sm:text-xs">
                          +{snippet.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {new Date(snippet.createdAt).toLocaleDateString()}
                      </span>
                      <Link href={`/snippets/${snippet._id}`}>
                        <Button variant="outline" size="sm" className="h-6 sm:h-7 text-[10px] sm:text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination placeholder */}
            {snippets.length > 12 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary/10 h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3"
                  >
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
            <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">No public snippets yet</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">This user hasn&apos;t shared any code snippets yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
