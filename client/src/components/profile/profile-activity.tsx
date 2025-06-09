import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code2, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  _id: string
  name: string
  joinDate: string
}

interface Snippet {
  _id: string
  title: string
  language: string
  upvotes: number
  createdAt: string
}

interface ProfileActivityProps {
  user: UserProfile
  snippets: Snippet[]
}

export function ProfileActivity({ user, snippets }: ProfileActivityProps) {
  // Sort snippets by creation date (most recent first)
  const recentSnippets = [...snippets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  // Group snippets by month for activity timeline
  const activityByMonth = snippets.reduce(
    (acc, snippet) => {
      const month = new Date(snippet.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(snippet)
      return acc
    },
    {} as Record<string, Snippet[]>,
  )

  const activityMonths = Object.keys(activityByMonth)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 6)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Recent Activity */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Latest code snippets shared</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {recentSnippets.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {recentSnippets.map((snippet) => (
                <div key={snippet._id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <Link href={`/snippets/${snippet._id}`}>
                      <h4 className="text-xs sm:text-sm font-medium hover:text-primary transition-colors truncate">
                        {snippet.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        {snippet.language}
                      </Badge>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {new Date(snippet.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400 ml-2">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-amber-400" />
                    <span className="text-xs sm:text-sm">{snippet.upvotes}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Activity Timeline
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Monthly contribution history</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {activityMonths.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {activityMonths.map((month) => {
                const monthSnippets = activityByMonth[month]
                const totalUpvotes = monthSnippets.reduce((sum, snippet) => sum + snippet.upvotes, 0)
                return (
                  <div key={month} className="border-l-2 border-primary/20 pl-3 sm:pl-4">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-medium">{month}</h4>
                      <Badge variant="secondary" className="text-[10px] sm:text-xs">
                        {monthSnippets.length} snippets
                      </Badge>
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{totalUpvotes} total upvotes</div>
                    <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                      {[...new Set(monthSnippets.map((s) => s.language))].map((lang) => (
                        <Badge
                          key={lang}
                          variant="outline"
                          className="text-[8px] sm:text-[10px] bg-primary/10 text-primary border-primary/20"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">No activity data available</p>
          )}
        </CardContent>
      </Card>

      {/* Contribution Summary */}
      <Card className="lg:col-span-2">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl flex items-center">
            <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
            Contribution Summary
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Member since {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">{snippets.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Contributions</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">
                {[...new Set(snippets.map((s) => s.language))].length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">
                {snippets.reduce((sum, snippet) => sum + snippet.upvotes, 0)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Upvotes</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold">
                {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Days Active</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
