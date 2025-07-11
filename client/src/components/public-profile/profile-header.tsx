"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Github, Globe, MapPin, Share2, Twitter, Verified } from "lucide-react"
import Link from "next/link"
import type { UserProfileData } from "@/types/user"
import { formatNumber } from "@/lib/utils"
import { useAuth } from "@/components/auth-context"
import { useState, useEffect } from "react"
import { BACKEND_URL } from "@/lib/backend"
import { useToast } from "@/components/toast-provider"

interface ProfileHeaderProps {
  userData: UserProfileData
}

export function ProfileHeader({ userData }: ProfileHeaderProps) {
  const { user } = useAuth()
  const isOwnProfile = user?._id === userData._id
  const [isFollowing, setIsFollowing] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    if (user) {
      const isUserFollowing = Array.isArray(userData.followers) && userData.followers.includes(user._id)
      setIsFollowing(isUserFollowing)
    }
    // console.log(userData)
  }, [user, userData.followers])

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
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleFollow = async () => {
    if (!user) {
      showToast("Please log in to follow users.", "info")
      return
    }

    try {
      const endpoint = isFollowing ? `${BACKEND_URL}/api/users/unfollow` : `${BACKEND_URL}/api/users/follow`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          targetUserId: userData._id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update follow status")
      }

      setIsFollowing(!isFollowing)
      showToast(`You have ${isFollowing ? "unfollowed" : "followed"} ${userData.name}.`, "success")
    } catch (error) {
      console.error("Error updating follow status:", error)
      showToast("Failed to update follow status. Please try again.", "error")
    }
  }

  const joinDate = new Date(userData.joinDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-6 border-2 border-border">
                <AvatarImage src={userData.avatar || "/placeholder.svg?height=128&width=128"} alt={userData.name} />
                <AvatarFallback className="text-3xl font-medium">
                  {userData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Social Links as Clean Icon Buttons */}
              <div className="flex gap-2">
                {userData.website && (
                  <Link href={userData.website} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 hover:bg-muted transition-colors bg-transparent"
                      title="Visit website"
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {userData.githubUsername && (
                  <Link
                    href={`https://github.com/${userData.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 hover:bg-muted transition-colors bg-transparent"
                      title={`@${userData.githubUsername} on GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {userData.twitterUsername && (
                  <Link href={`https://x.com/${userData.twitterUsername}`} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 hover:bg-muted transition-colors bg-transparent"
                      title={`@${userData.twitterUsername} on X`}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Name and Username */}
              <div className="mb-4">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold tracking-tight">{userData.name}</h1>
                  {userData.isVerified && <Verified className="h-6 w-6 text-blue-500 fill-blue-500" />}
                </div>
                <p className="text-xl text-muted-foreground">@{userData.githubUsername}</p>
              </div>

              {/* Bio */}
              {userData.bio && <p className="text-lg text-foreground mb-6 max-w-2xl leading-relaxed">{userData.bio}</p>}

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground mb-6">
                {userData.location && (
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{userData.location}</span>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {joinDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                {!isOwnProfile && (
                  <Button onClick={handleFollow} className="px-6">
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
                <Button variant="outline" onClick={handleShare} className="px-6 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatNumber(userData.stats.publicSnippets)}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Snippets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{formatNumber(userData.stats.totalUpvotes)}</div>
              <div className="text-sm text-muted-foreground font-medium">Upvotes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{formatNumber(userData.stats.totalViews)}</div>
              <div className="text-sm text-muted-foreground font-medium">Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{formatNumber(userData.stats.followers)}</div>
              <div className="text-sm text-muted-foreground font-medium">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{formatNumber(userData.stats.following)}</div>
              <div className="text-sm text-muted-foreground font-medium">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
