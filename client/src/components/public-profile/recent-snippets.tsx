"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Eye, ExternalLink, Search, Filter } from "lucide-react"
import Link from "next/link"
import type { Snippet } from "@/types/user"
import { formatNumber } from "@/lib/utils"

interface RecentSnippetsProps {
  snippets: Snippet[]
  showAll: boolean
  title: string
}

export function RecentSnippets({ snippets, showAll, title }: RecentSnippetsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique languages
  const languages = [...new Set(snippets.map((snippet) => snippet.language))]

  // Filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLanguage = languageFilter === "all" || snippet.language === languageFilter

    return matchesSearch && matchesLanguage
  })

  // Sort snippets
  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.upvotes - a.upvotes
      case "views":
        return b.views - a.views
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const displaySnippets = showAll ? sortedSnippets : sortedSnippets.slice(0, 6)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showAll && (
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Filters */}
      {showAll && showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results count */}
      {showAll && (
        <div className="text-sm text-muted-foreground mb-4">
          Showing {displaySnippets.length} of {snippets.length} snippets
        </div>
      )}

      {/* Snippets Grid */}
      {displaySnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySnippets.map((snippet) => (
            <Card key={snippet._id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {snippet.title}
                </CardTitle>
                {snippet.description && (
                  <CardDescription className="text-sm line-clamp-3">{snippet.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs font-medium">
                    {snippet.language}
                  </Badge>
                  {snippet.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {snippet.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{snippet.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {formatNumber(snippet.upvotes)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {formatNumber(snippet.views)}
                    </div>
                  </div>
                  <Link href={`/snippets/${snippet._id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>

                {/* Date */}
                <div className="text-xs text-muted-foreground mt-3">
                  {new Date(snippet.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No snippets found matching your criteria.</p>
        </div>
      )}

      {/* View All Link */}
      {!showAll && snippets.length > 6 && (
        <div className="text-center mt-6">
          <Link href="#" className="text-primary hover:underline">
            View all {snippets.length} snippets →
          </Link>
        </div>
      )}
    </section>
  )
}
