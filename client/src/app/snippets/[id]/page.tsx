"use client"

import { useEffect, useState } from "react"
import CodeBlock from "@/components/CodeBlock"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Copy, Share2, BookmarkPlus, Check } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function SnippetDetail() {
  const params = useParams()
  const [snippet, setSnippet] = useState<any | null>(null)
  const [allSnippets, setAllSnippets] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params && typeof params.id === "string") {
      setLoading(true)
      Promise.all([
        fetch(`http://localhost:5000/api/snippets/${params.id}`).then(res => {
          if (!res.ok) throw new Error("Snippet not found")
          return res.json()
        }),
        fetch("http://localhost:5000/api/snippets").then(res => res.json())
      ])
        .then(([snippetData, allData]) => {
          setSnippet(snippetData)
          setAllSnippets(allData)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [params])

  if (loading) return (
    <div className="container mx-auto py-12 px-4 text-center">
      <div className="inline-block p-3 rounded-full bg-muted mb-4">
        <ArrowLeft className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
      <h3 className="text-xl font-medium mb-2">Loading snippet...</h3>
    </div>
  )
  if (error || !snippet) return notFound()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Find similar snippets (sharing at least one tag, not itself)
  const similarSnippets = allSnippets
    .filter((s) => s._id !== snippet._id && s.tags.some((tag: string) => snippet.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/snippets">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to snippets
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border/50 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{snippet.title}</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {snippet.language}
              </Badge>
              {(snippet.tags as string[]).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-muted-foreground">
                  #{tag}
                </Badge>
              ))}
            </div>

            <CodeBlock
              code={snippet.code}
              language={snippet.language}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border/50 rounded-xl p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Snippet Info</h3>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-5 w-5 fill-amber-400" />
                <span className="font-medium">{snippet.upvotes}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Language</h4>
                <p className="font-medium">{snippet.language}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Lines of Code</h4>
                <p className="font-medium">{snippet.code.split("\n").length}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {(snippet.tags as string[]).map((tag: string) => (
                    <span key={tag} className="text-sm px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Added by</h4>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                    <img src="/api/placeholder/32/32" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium">DevUser123</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Similar Snippets</h3>
              <div className="space-y-3">
                {similarSnippets.map((s) => (
                  <Link href={`/snippets/${s._id}`} key={s._id}>
                    <div className="p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                      <h4 className="font-medium text-sm">{s.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {s.language}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{s.upvotes} upvotes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
