"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ExternalLink, Github, Globe, MapPin, Share2, Twitter, UserPlus, UserMinus } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  _id: string
  name: string
  email: string
  username: string
  bio?: string
  location?: string
  website?: string
  githubUsername?: string
  twitterUsername?: string
  followers: string[]
  following: string[]
  joinDate: string
  isFollowing?: boolean
}

interface ProfileHeaderProps {
  user: UserProfile
  currentUser: UserProfile | null
  totalUpvotes: number
  snippetCount: number
  onFollow: () => void
  onShare: () => void
}

export function ProfileHeader({
  user,
  currentUser,
  totalUpvotes,
  snippetCount,
  onFollow,
  onShare,
}: ProfileHeaderProps) {
  const isOwnProfile = currentUser?._id === user._id

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={`/api/placeholder/128/128`} alt={user.name} />
              <AvatarFallback className="text-2xl md:text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-sm md:text-base text-muted-foreground">@{user.username}</p>

              {user.bio && <p className="mt-2 text-sm md:text-base text-foreground max-w-md">{user.bio}</p>}

              {/* Location and Join Date */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 md:gap-4 mt-3 text-xs md:text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Joined {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2 md:gap-3 mt-3">
                {user.website && (
                  <Link href={user.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-7 md:h-8 text-xs md:text-sm">
                      <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Website
                    </Button>
                  </Link>
                )}
                {user.githubUsername && (
                  <Link href={`https://github.com/${user.githubUsername}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-7 md:h-8 text-xs md:text-sm">
                      <Github className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {user.twitterUsername && (
                  <Link href={`https://twitter.com/${user.twitterUsername}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-7 md:h-8 text-xs md:text-sm">
                      <Twitter className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Twitter
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{snippetCount}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Snippets</div>
              </div>
              <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{totalUpvotes}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Upvotes</div>
              </div>
              <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{user.followers.length}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{user.following.length}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end">
              {!isOwnProfile && currentUser && (
                <Button
                  onClick={onFollow}
                  variant={user.isFollowing ? "outline" : "default"}
                  size="sm"
                  className="text-xs md:text-sm h-8 md:h-9"
                >
                  {user.isFollowing ? (
                    <>
                      <UserMinus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={onShare} className="text-xs md:text-sm h-8 md:h-9">
                <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Share
              </Button>

              {isOwnProfile && (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="text-xs md:text-sm h-8 md:h-9">
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
