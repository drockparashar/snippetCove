"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp } from "lucide-react"
import type { ActivityData } from "@/types/user"

interface ActivityOverviewProps {
  activityData: ActivityData
  detailed?: boolean
}

export function ActivityOverview({ activityData, detailed = false }: ActivityOverviewProps) {
  if (detailed) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{activityData.thisWeek}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{activityData.thisMonth}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{activityData.thisYear}</div>
                <div className="text-sm text-muted-foreground">This Year</div>
              </div>
              {/* <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{activityData.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Contribution Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Average per week</span>
                <span className="font-medium">{(activityData.thisYear / 52).toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Average per month</span>
                <span className="font-medium">{(activityData.thisYear / 12).toFixed(1)}</span>
              </div>
              {/* <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Current streak</span>
                <span className="font-medium">{activityData.streak} days</span>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">This week</span>
            <span className="font-medium">{activityData.thisWeek}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">This month</span>
            <span className="font-medium">{activityData.thisMonth}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">This year</span>
            <span className="font-medium">{activityData.thisYear}</span>
          </div>
          {/* <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Current streak</span>
            </div>
            <span className="font-medium">{activityData.streak} days</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
