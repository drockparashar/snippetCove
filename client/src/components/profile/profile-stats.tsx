import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code2, Star, TrendingUp, Users } from "lucide-react"

interface UserProfile {
  _id: string
  name: string
  followers: string[]
  following: string[]
  joinDate: string
}

interface Snippet {
  _id: string
  title: string
  language: string
  upvotes: number
  createdAt: string
}

interface ProfileStatsProps {
  user: UserProfile
  snippets: Snippet[]
  totalUpvotes: number
  languages: string[]
}

export function ProfileStats({ user, snippets, totalUpvotes, languages }: ProfileStatsProps) {
  // Find most popular snippet
  const mostPopularSnippet = [...snippets].sort((a, b) => b.upvotes - a.upvotes)[0]

  // Count snippets by language
  const snippetsByLanguage = languages
    .map((language) => {
      const count = snippets.filter((snippet) => snippet.language === language).length
      return { language, count }
    })
    .sort((a, b) => b.count - a.count)

  // Calculate average upvotes per snippet
  const avgUpvotes = snippets.length > 0 ? (totalUpvotes / snippets.length).toFixed(1) : "0"

  // Calculate activity metrics
  const recentSnippets = snippets.filter(
    (snippet) => new Date(snippet.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length

  const memberSince = new Date(user.joinDate)
  const monthsSince = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24 * 30))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Overview Stats */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{snippets.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Snippets</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{totalUpvotes}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Upvotes</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{avgUpvotes}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Avg. Upvotes</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{recentSnippets}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">This Month</div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            {mostPopularSnippet && (
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Most Popular Snippet</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-medium">{mostPopularSnippet.title}</p>
                  <div className="flex items-center text-amber-400">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-amber-400" />
                    <span className="text-xs sm:text-sm">{mostPopularSnippet.upvotes}</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">Languages Used</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Language Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {snippetsByLanguage.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {snippetsByLanguage.map(({ language, count }) => (
                <div key={language}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium">{language}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{count} snippets</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 sm:h-2.5">
                    <div
                      className="bg-primary h-1.5 sm:h-2.5 rounded-full"
                      style={{ width: `${(count / snippets.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">No snippets available</p>
          )}
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Community
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{user.followers.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{user.following.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Member for {monthsSince} months
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Insights */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Activity Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm">Snippets this month</span>
              <span className="text-xs sm:text-sm font-medium">{recentSnippets}</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm">Average upvotes</span>
              <span className="text-xs sm:text-sm font-medium">{avgUpvotes}</span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm">Languages mastered</span>
              <span className="text-xs sm:text-sm font-medium">{languages.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
