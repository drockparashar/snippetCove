"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PinnedSnippets } from "./pinned-snippets"
import { RecentSnippets } from "./recent-snippets"
import { LanguageChart } from "./language-chart"
import { ActivityOverview } from "./activity-overview"
import { MySnippetsSection } from "../my-snippets-section"
import type { UserProfileData } from "@/types/user"

interface ProfileContentProps {
  userData: UserProfileData
}

export function ProfileContent({ userData }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="overview" className="text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="snippets" className="text-sm">
            Snippets
          </TabsTrigger>
          <TabsTrigger value="languages" className="text-sm">
            Languages
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-sm">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Pinned Snippets */}
          {/* {userData.pinnedSnippets.length > 0 && <PinnedSnippets snippets={userData.pinnedSnippets} />} */}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentSnippets snippets={userData.recentSnippets} showAll={false} title="Recent Activity" />
            </div>
            <div className="space-y-6">
              <LanguageChart languages={userData.languages} />
              <ActivityOverview activityData={userData.activityData} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="snippets">
          {/* Map userData snippets to MySnippetsSection format, providing defaults for missing fields */}
          <MySnippetsSection
            snippets={userData.recentSnippets.map(s => ({
              _id: s._id,
              title: s.title,
              code: "", // No code field in UserProfileData.Snippet, provide empty string
              language: s.language,
              tags: s.tags,
              author: "", // No author field in UserProfileData.Snippet, provide empty string
              upvotes: s.upvotes,
              createdAt: s.createdAt
            }))}
          />
        </TabsContent>

        <TabsContent value="languages">
          <div className="max-w-2xl">
            <LanguageChart languages={userData.languages} detailed={true} />
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <ActivityOverview activityData={userData.activityData} detailed={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
