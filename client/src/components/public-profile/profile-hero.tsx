"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Github,
  Globe,
  MapPin,
  Share2,
  Twitter,
  UserPlus,
  Verified,
  Eye,
  Star,
  Users,
  Code2,
} from "lucide-react"
import Link from "next/link"
import type { UserProfileData } from "@/types/user"

interface ProfileHeroProps {
  userData: UserProfileData
}

export function ProfileHero({ userData }: ProfileHeroProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userData.name}'s Profile - SnipCove`,
          text: `Check out ${userData.name}'s code snippets on SnipCove`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column - Profile Info */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-80">
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-4">
              <Avatar className="h-24 w-24 sm:h-20 sm:w-20 lg:h-32 lg:w-32 border-4 border-background">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-2xl lg:text-3xl">{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left lg:text-center">
                <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-2 mb-1">
                  <h1 className="text-xl lg:text-2xl font-bold">{userData.name}</h1>
                  {userData.isVerified && <Verified className="h-5 w-5 text-blue-500 fill-blue-500" />}
                </div>
                <p className="text-muted-foreground text-sm lg:text-base">@{userData.username}</p>
              </div>
            </div>

            {userData.bio && (
              <p className="text-sm lg:text-base text-center sm:text-left lg:text-center mt-2 lg:mt-4">
                {userData.bio}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {userData.location && (
                <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {userData.location}
                </div>
              )}
              <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Joined{" "}
                {new Date(userData.joinDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center sm:justify-start lg:justify-center gap-2">
              {userData.website && (
                <Link href={userData.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-8">
                    <Globe className="h-3 w-3 mr-1" />
                    Website
                  </Button>
                </Link>
              )}
              {userData.githubUsername && (
                <Link href={`https://github.com/${userData.githubUsername}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="h-8">
                    <Github className="h-3 w-3 mr-1" />
                    GitHub
                  </Button>
                </Link>
              )}
              {userData.twitterUsername && (
                <Link
                  href={`https://twitter.com/${userData.twitterUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="h-8">
                    <Twitter className="h-3 w-3 mr-1" />
                    Twitter
                  </Button>
                </Link>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center sm:justify-start lg:justify-center">
              <Button size="sm" className="h-8">
                <UserPlus className="h-3 w-3 mr-1" />
                Follow
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="h-8">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="flex-1">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-lg lg:text-2xl font-bold">{userData.stats.publicSnippets}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Snippets</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-lg lg:text-2xl font-bold">{userData.stats.totalUpvotes}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Upvotes</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-lg lg:text-2xl font-bold">{userData.stats.totalViews}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Views</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-lg lg:text-2xl font-bold">{userData.stats.followers}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <div className="text-lg lg:text-2xl font-bold">{userData.stats.following}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Code2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold">{userData.activityData.thisWeek}</div>
                  <div className="text-xs text-muted-foreground">This week</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold">{userData.activityData.thisMonth}</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold">{userData.activityData.thisYear}</div>
                  <div className="text-xs text-muted-foreground">This year</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold">{userData.activityData.streak}</div>
                  <div className="text-xs text-muted-foreground">Day streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
