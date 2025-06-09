import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"

interface LanguageStatsProps {
  languages: Array<{
    name: string
    count: number
    percentage: number
  }>
}

export function LanguageStats({ languages }: LanguageStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lang.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{lang.count} snippets</span>
                </div>
                <span className="text-sm font-medium">{lang.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
