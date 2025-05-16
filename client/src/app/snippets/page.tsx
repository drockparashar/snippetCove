"use client"

import { useState } from "react"
import { mockSnippets } from "@/lib/mockSnippets"
import SnippetCard from "@/components/SnippetCard"
import { Input } from "@/components/ui/input"
import { Search, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SnippetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const languages = [...new Set(mockSnippets.map((snippet) => snippet.language))]

  const filteredSnippets = mockSnippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLanguage = selectedLanguage ? snippet.language === selectedLanguage : true

    return matchesSearch && matchesLanguage
  })

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Code Snippets</h1>
          <p className="text-muted-foreground">
            Browse {mockSnippets.length} snippets across multiple languages and frameworks
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Code2 className="mr-2 h-4 w-4" />
          Submit a Snippet
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-card border border-border/50 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or tag (e.g., 'react')"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedLanguage === null ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => setSelectedLanguage(null)}
            >
              All
            </Badge>
            {languages.map((lang) => (
              <Badge
                key={lang}
                variant={selectedLanguage === lang ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredSnippets.length} {filteredSnippets.length === 1 ? "snippet" : "snippets"}
        {selectedLanguage && (
          <span>
            {" "}
            in <span className="text-primary">{selectedLanguage}</span>
          </span>
        )}
        {searchTerm && (
          <span>
            {" "}
            matching <span className="text-primary">"{searchTerm}"</span>
          </span>
        )}
      </div>

      {/* Snippet Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-3 rounded-full bg-muted mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No snippets found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter to find what you're looking for
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedLanguage(null)
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
