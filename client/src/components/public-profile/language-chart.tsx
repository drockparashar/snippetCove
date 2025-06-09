"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"
import type { LanguageUsage } from "@/types/user"

interface LanguageChartProps {
  languages: LanguageUsage[]
  detailed?: boolean
}

export function LanguageChart({ languages, detailed = false }: LanguageChartProps) {
  // Merge languages by name (case-insensitive), summing counts
  const languageMap = new Map<string, { name: string; count: number }>()
  let totalCount = 0
  languages.forEach(lang => {
    const lowerName = lang.name.toLowerCase()
    if (!languageMap.has(lowerName)) {
      languageMap.set(lowerName, { name: lowerName, count: lang.count })
    } else {
      languageMap.get(lowerName)!.count += lang.count
    }
    totalCount += lang.count
  })
  const uniqueLanguages = Array.from(languageMap.values()).map(lang => ({
    name: lang.name,
    count: lang.count,
    percentage: totalCount > 0 ? Math.round((lang.count / totalCount) * 100) : 0,
  }))

  const sortedLanguages = [...uniqueLanguages].sort((a, b) => b.percentage - a.percentage)
  const displayLanguages = (detailed ? sortedLanguages : sortedLanguages.slice(0, 5)).map(lang => ({
    ...lang,
    name: lang.name.toLowerCase(),
  }))

  // Color palette for languages
  const getLanguageColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-orange-500",
    ]
    return colors[index % colors.length]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayLanguages.map((lang, index) => (
            <div key={`${lang.name}-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(index)}`} />
                  <span className="text-sm font-medium">{lang.name}</span>
                  {detailed && (
                    <Badge variant="outline" className="text-xs">
                      {lang.count} snippets
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium">{lang.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getLanguageColor(index)}`}
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
              {detailed && (
                <div className="text-xs text-muted-foreground mt-1">
                  {lang.count} snippets ({lang.percentage}% of total)
                </div>
              )}
            </div>
          ))}
        </div>

        {!detailed && languages.length > 5 && (
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">+{languages.length - 5} more languages</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
