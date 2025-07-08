"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, User } from "lucide-react"
import Link from "next/link"
import { ProfileSection } from "@/components/profile-section"
import { MySnippetsSection } from "@/components/my-snippets-section"
import { SavedSnippetsSection } from "@/components/saved-snippets-section"
import { StatsSection } from "@/components/stats-section"
import { SettingsDialog } from "@/components/settings-dialog"
// import { useToast } from "@/components/toast-provider"
import { BACKEND_URL } from "@/lib/backend"
import { useAuth } from "@/components/auth-context"

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
  const { user, loading } = useAuth();
  const [savedSnippets, setSavedSnippets] = useState<Snippet[]>([]);
  const [createdSnippets, setCreatedSnippets] = useState<Snippet[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [wasSettingsOpen, setWasSettingsOpen] = useState(false);
  const [, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login?redirect=/dashboard");
      return;
    }
    if (user) {
      // Fetch user data
      fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Fetch saved snippets
      if (user.savedSnippets?.length) {
        const savedPromises = user.savedSnippets.map((id: string) =>
          fetch(`${BACKEND_URL}/api/snippets/${id}`).then((res) => res.json()),
        );
        Promise.all(savedPromises).then((snippets) => {
          setSavedSnippets(snippets.filter(Boolean));
        });
      } else {
        setSavedSnippets([]);
      }
      // Fetch created snippets
      if (user.createdSnippets?.length) {
        const createdPromises = user.createdSnippets.map((id: string) =>
          fetch(`${BACKEND_URL}/api/snippets/${id}`).then((res) => res.json()),
        );
        Promise.all(createdPromises).then((snippets) => {
          setCreatedSnippets(snippets.filter(Boolean));
        });
      } else {
        setCreatedSnippets([]);
      }
    }
  }, [user, loading, router])

  useEffect(() => {
    if (wasSettingsOpen && settingsOpen === false) {
      window.location.reload(); // Refresh the page to fetch updated data
    }
    setWasSettingsOpen(settingsOpen);
  }, [settingsOpen]);

  // Calculate total upvotes for created snippets
  const totalUpvotes = createdSnippets.reduce((sum, s) => sum + (s.upvotes || 0), 0);

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

        <TabsContent value="profile"
        className="mx-auto w-full max-w-2xl">
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
          <SavedSnippetsSection snippets={savedSnippets} />
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
