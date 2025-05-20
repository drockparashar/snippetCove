"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Plus, User } from "lucide-react"
import Link from "next/link"
import { ProfileSection } from "@/components/profile-section"
import { MySnippetsSection } from "@/components/my-snippets-section"
import { SavedSnippetsSection } from "@/components/saved-snippets-section"
import { StatsSection } from "@/components/stats-section"
import { SettingsDialog } from "@/components/settings-dialog"

interface UserData {
  _id: string
  name: string
  email: string
  githubId?: string
  savedSnippets: string[]
  createdSnippets: string[]
}

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

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [savedSnippets, setSavedSnippets] = useState<Snippet[]>([])
  const [createdSnippets, setCreatedSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [totalUpvotes, setTotalUpvotes] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    fetch("http://localhost:5000/api/auth/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/login?redirect=/dashboard")
          return
        }

        // Fetch user data
        return fetch("http://localhost:5000/api/auth/me", { credentials: "include" }).then((res) => res.json())
      })
      .then((userData) => {
        if (!userData) return
        setUser(userData)

        // Fetch saved snippets
        if (userData.savedSnippets?.length) {
          const savedPromises = userData.savedSnippets.map((id: string) =>
            fetch(`http://localhost:5000/api/snippets/${id}`).then((res) => res.json()),
          )
          Promise.all(savedPromises).then((snippets) => {
            setSavedSnippets(snippets.filter(Boolean))
          })
        }

        // Fetch created snippets
        if (userData.createdSnippets?.length) {
          const createdPromises = userData.createdSnippets.map((id: string) =>
            fetch(`http://localhost:5000/api/snippets/${id}`).then((res) => res.json()),
          )
          Promise.all(createdPromises).then((snippets) => {
            const validSnippets = snippets.filter(Boolean)
            setCreatedSnippets(validSnippets)

            // Calculate total upvotes
            const upvotes = validSnippets.reduce((total, snippet) => total + (snippet.upvotes || 0), 0)
            setTotalUpvotes(upvotes)
          })
        }

        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching user data:", err)
        setError("Failed to load user data. Please try again later.")
        setLoading(false)
      })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleRemoveSavedSnippet = async (snippetId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/unsave-snippet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ snippetId }),
      })

      if (res.ok) {
        // Update the UI by removing the snippet from the saved list
        setSavedSnippets(savedSnippets.filter((snippet) => snippet._id !== snippetId))

        // Update user data
        if (user) {
          setUser({
            ...user,
            savedSnippets: user.savedSnippets.filter((id) => id !== snippetId),
          })
        }
      }
    } catch (error) {
      console.error("Error removing saved snippet:", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 md:py-12 px-4 text-center">
        <div className="inline-block p-3 rounded-full bg-muted mb-4">
          <User className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
        <h3 className="text-xl font-medium mb-2">Loading your dashboard...</h3>
        <p className="text-muted-foreground">Please wait while we fetch your data</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 md:py-12 px-4 text-center">
        <div className="inline-block p-3 rounded-full bg-muted mb-4">
          <User className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-xl font-medium mb-2">Error loading dashboard</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 md:py-12 px-4 text-center">
        <div className="inline-block p-3 rounded-full bg-muted mb-4">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">You need to be logged in</h3>
        <p className="text-muted-foreground mb-6">Please log in to view your dashboard</p>
        <Link href="/login?redirect=/dashboard">
          <Button>Go to Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 md:py-12 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Your Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your profile, snippets, and saved content</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/submit">
            <Button className="text-xs md:text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              New Snippet
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="text-xs md:text-sm" onClick={handleLogout}>
            <LogOut className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="profile" className="text-xs md:text-sm">
            Profile
          </TabsTrigger>
          <TabsTrigger value="my-snippets" className="text-xs md:text-sm">
            My Snippets
            {createdSnippets.length > 0 && (
              <Badge variant="secondary" className="ml-1 md:ml-2 text-[10px] md:text-xs">
                {createdSnippets.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="saved" className="text-xs md:text-sm">
            Saved
            {savedSnippets.length > 0 && (
              <Badge variant="secondary" className="ml-1 md:ml-2 text-[10px] md:text-xs">
                {savedSnippets.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-xs md:text-sm">
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection
            user={user}
            savedCount={savedSnippets.length}
            createdCount={createdSnippets.length}
            totalUpvotes={totalUpvotes}
            onSettingsClick={() => setSettingsOpen(true)}
          />
        </TabsContent>

        <TabsContent value="my-snippets">
          <MySnippetsSection snippets={createdSnippets} />
        </TabsContent>

        <TabsContent value="saved">
          <SavedSnippetsSection snippets={savedSnippets} onRemove={handleRemoveSavedSnippet} />
        </TabsContent>

        <TabsContent value="stats">
          <StatsSection
            savedCount={savedSnippets.length}
            createdCount={createdSnippets.length}
            totalUpvotes={totalUpvotes}
            languages={[...new Set(createdSnippets.map((s) => s.language))]}
            snippets={createdSnippets}
          />
        </TabsContent>
      </Tabs>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} user={user} />
    </div>
  )
}
