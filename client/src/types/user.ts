export interface UserStats {
  publicSnippets: number
  totalUpvotes: number
  followers: number
  following: number
  totalViews: number
}

export interface Snippet {
  _id: string
  title: string
  description: string
  language: string
  tags: string[]
  upvotes: number
  views: number
  createdAt: string
}

export interface LanguageUsage {
  name: string
  count: number
  percentage: number
}

export interface ActivityData {
  thisWeek: number
  thisMonth: number
  thisYear: number
  streak: number
}

export interface UserProfileData {
  _id: string
  name: string
  username: string
  email: string
  bio?: string
  location?: string
  website?: string
  githubUsername?: string
  twitterUsername?: string
  avatar?: string
  joinDate: string
  isVerified: boolean
  stats: UserStats
  pinnedSnippets: Snippet[]
  recentSnippets: Snippet[]
  languages: LanguageUsage[]
  activityData: ActivityData
  isFollowing?: boolean
}
