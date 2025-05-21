"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookMarked, Code2, Github, Mail, Settings, Star } from 'lucide-react'

interface ProfileSectionProps {
  user: {
    _id: string
    name: string
    email: string
    githubId?: string
  }
  savedCount: number
  createdCount: number
  totalUpvotes: number
  onSettingsClick: () => void
}

export function ProfileSection({ user, savedCount, createdCount, totalUpvotes, onSettingsClick }: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader className="relative p-4 sm:p-6">
        <div className="absolute right-3 top-3 sm:right-6 sm:top-6">
          <Button variant="ghost" size="sm" onClick={onSettingsClick} className="h-8 text-xs sm:text-sm">
            <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-background">
            <AvatarImage src={`/api/placeholder/96/96`} alt={user.name || "User"} />
            <AvatarFallback className="text-xl sm:text-2xl">{(user.name && user.name.charAt(0)) || "?"}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-xl sm:text-2xl">{user.name || "Unknown User"}</CardTitle>
            <CardDescription className="flex items-center justify-center sm:justify-start mt-1">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {user.email}
            </CardDescription>
            {user.githubId && (
              <CardDescription className="flex items-center justify-center sm:justify-start mt-1">
                <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                GitHub Connected
              </CardDescription>
            )}
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Saved</p>
                <p className="text-lg sm:text-xl font-semibold">{savedCount}</p>
              </div>
              <Separator orientation="vertical" className="h-8 sm:h-10" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Created</p>
                <p className="text-lg sm:text-xl font-semibold">{createdCount}</p>
              </div>
              <Separator orientation="vertical" className="h-8 sm:h-10" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Upvotes</p>
                <p className="text-lg sm:text-xl font-semibold">{totalUpvotes}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Account Settings</h3>
            <div className="space-y-3 sm:space-y-4">
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10" onClick={onSettingsClick}>
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Account Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10">
                <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {user.githubId ? "Manage GitHub Connection" : "Connect GitHub"}
              </Button>
            </div>
          </div> */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 mt-4 md:mt-0">Activity Summary</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center">
                  <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
                  <span className="text-xs sm:text-sm">Created Snippets</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">{createdCount}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center">
                  <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
                  <span className="text-xs sm:text-sm">Saved Snippets</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">{savedCount}</span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
                  <span className="text-xs sm:text-sm">Total Upvotes</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">{totalUpvotes}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
