"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, ExternalLink, Pin } from "lucide-react"
import Link from "next/link"
import type { Snippet } from "@/types/user"
import { formatNumber } from "@/lib/utils"

interface PinnedSnippetsProps {
  snippets: Snippet[]
}

export function PinnedSnippets({ snippets }: PinnedSnippetsProps) {
  if (!snippets || snippets.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Pin className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Pinned Snippets</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <Card key={snippet._id} className="hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {snippet.title}
                </CardTitle>
                <Pin className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
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
    </section>
  )
}
