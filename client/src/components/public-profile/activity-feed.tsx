import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp } from "lucide-react"

interface ActivityData {
  thisWeek: number
  thisMonth: number
  thisYear: number
  streak: number
}

interface UserStats {
  publicSnippets: number
  totalUpvotes: number
  totalViews: number
}

interface UserData {
  activityData: ActivityData
  stats: UserStats
  languages: string[]
}

interface ActivityFeedProps {
  userData: UserData
}

export function ActivityFeed({ userData }: ActivityFeedProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{userData.activityData.thisWeek}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{userData.activityData.thisMonth}</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{userData.activityData.thisYear}</div>
              <div className="text-sm text-muted-foreground">This Year</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{userData.activityData.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Contribution Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Contributions</span>
              <Badge variant="secondary">{userData.stats.publicSnippets}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Upvotes Received</span>
              <Badge variant="secondary">{userData.stats.totalUpvotes}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Profile Views</span>
              <Badge variant="secondary">{userData.stats.totalViews}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Languages Used</span>
              <Badge variant="secondary">{userData.languages.length}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
