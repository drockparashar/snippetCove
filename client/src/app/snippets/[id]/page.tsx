"use client"

import { useEffect, useState } from "react"
import CodeBlock from "@/components/CodeBlock"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Copy, BookmarkPlus, Check } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/toast-provider"

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const params = useParams();
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border/50 rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">Login Required</h2>
        <p className="mb-6 text-muted-foreground">You must be logged in to save snippets.</p>
        <button
          className="w-full py-2 px-4 rounded bg-primary text-background font-semibold hover:bg-primary/90 transition"
          onClick={() => {
            onClose();
            window.location.href = `/login?redirect=/snippets/${params.id}`;
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

// Define a type for a snippet
interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  upvotes: number;
  upvotedBy?: string[];
  author?: { name?: string };
  // Add other fields as needed based on your API response
}

export default function SnippetDetail() {
  const params = useParams()
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [allSnippets, setAllSnippets] = useState<Snippet[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [upvoting, setUpvoting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const { showToast } = useToast();

  useEffect(() => {
    if (params && typeof params.id === "string") {
      setLoading(true)
      Promise.all([
        fetch(`http://localhost:5000/api/snippets/${params.id}`).then(res => {
          if (!res.ok) throw new Error("Snippet not found")
          return res.json()
        }),
        fetch("http://localhost:5000/api/snippets").then(res => res.json()),
        fetch("http://localhost:5000/api/auth/check", { credentials: "include" }).then(res => res.json())
      ])
        .then(([snippetData, allData, authData]) => {
          setSnippet(snippetData)
          setAllSnippets(allData)
          setLoading(false)
          if (authData.authenticated) {
            fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
              .then(res => res.json())
              .then(user => {
                setIsSaved(user.savedSnippets?.includes(snippetData._id))
                setUserId(user._id)
                setHasUpvoted(snippetData.upvotedBy?.includes(user._id))
              })
          } else {
            setUserId(null)
            setHasUpvoted(false)
          }
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
    showToast("Copied to clipboard!", "success")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    if (!snippet) return
    const res = await fetch(`http://localhost:5000/api/auth/save-snippet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ snippetId: snippet._id })
    })
    if (res.ok) {
      setIsSaved(true)
      showToast("Snippet saved!", "success")
    } else {
      setShowLoginModal(true)
      showToast("You must be logged in to save snippets.", "error")
    }
  }

  const handleUnsave = async () => {
    if (!snippet) return
    const res = await fetch(`http://localhost:5000/api/auth/unsave-snippet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ snippetId: snippet._id })
    })
    if (res.ok) {
      setIsSaved(false)
      showToast("Snippet removed from saved.", "success")
    } else {
      setShowLoginModal(true)
      showToast("You must be logged in to unsave snippets.", "error")
    }
  }

  const handleUpvoteToggle = async () => {
    if (!userId) {
      setShowLoginModal(true)
      showToast("You must be logged in to upvote.", "error")
      return
    }
    if (!snippet) return
    setUpvoting(true)
    if (!hasUpvoted) {
      // Upvote
      const res = await fetch("http://localhost:5000/api/snippets/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId: snippet._id, userId })
      })
      if (res.ok) {
        const updated = await res.json()
        setSnippet({ ...snippet, upvotes: updated.upvotes, upvotedBy: updated.upvotedBy })
        setHasUpvoted(true)
        showToast("Upvoted!", "success")
      } else {
        showToast("Failed to upvote.", "error")
      }
    } else {
      // Remove upvote
      const res = await fetch("http://localhost:5000/api/snippets/upvote/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId: snippet._id, userId })
      })
      if (res.ok) {
        const updated = await res.json()
        setSnippet({ ...snippet, upvotes: updated.upvotes, upvotedBy: updated.upvotedBy })
        setHasUpvoted(false)
        showToast("Upvote removed.", "success")
      } else {
        showToast("Failed to remove upvote.", "error")
      }
    }
    setUpvoting(false)
  }

  // Find similar snippets (sharing at least one tag, not itself)
  const similarSnippets = allSnippets
    .filter((s) => s._id !== snippet._id && s.tags.some((tag: string) => snippet.tags.includes(tag)))
    .slice(0, 3)

  return (
    <>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
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
                  {/* <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button> */}
                  <Button variant="outline" size="sm" onClick={isSaved ? handleUnsave : handleSave}>
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    {isSaved ? "Unsave" : "Save"}
                  </Button>
                  {/* Upvote button removed, star is now in Snippet Info */}
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
                <button
                  className={`flex items-center gap-1 focus:outline-none ${hasUpvoted ? "text-amber-400" : "text-muted-foreground hover:text-amber-400"}`}
                  onClick={handleUpvoteToggle}
                  disabled={upvoting}
                  aria-label={hasUpvoted ? "Remove upvote" : "Upvote"}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                >
                  <Star className={`h-5 w-5 ${hasUpvoted ? "fill-amber-400" : ""}`} />
                  <span className="font-medium">{snippet.upvotes}</span>
                </button>
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
                    {/* <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                      <img src="/api/placeholder/32/32" alt="User avatar" className="w-full h-full object-cover" />
                    </div> */}
                    <span className="font-medium">{snippet.author?.name || "Unknown"}</span>
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
    </>
  )
}
