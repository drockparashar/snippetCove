import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookMarked, Code2, Star, TrendingUp } from "lucide-react"

interface Snippet {
  _id: string
  title: string
  language: string
  upvotes: number
  createdAt: string
}

interface StatsSectionProps {
  savedCount: number
  createdCount: number
  totalUpvotes: number
  languages: string[]
  snippets: Snippet[]
}

export function StatsSection({ savedCount, createdCount, totalUpvotes, languages, snippets }: StatsSectionProps) {
  // Find most popular snippet (most upvotes)
  const mostPopularSnippet = [...snippets].sort((a, b) => b.upvotes - a.upvotes)[0]

  // Count snippets by language
  const snippetsByLanguage = languages
    .map((language) => {
      const count = snippets.filter((snippet) => snippet.language === language).length
      return { language, count }
    })
    .sort((a, b) => b.count - a.count)

  // Calculate average upvotes per snippet
  const avgUpvotes = createdCount > 0 ? (totalUpvotes / createdCount).toFixed(1) : "0"

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Your Statistics</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Overview of your activity and contributions</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 text-center">
            <div className="inline-flex items-center justify-center p-2 sm:p-3 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <Code2 className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold">{createdCount}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Snippets Created</p>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 text-center">
            <div className="inline-flex items-center justify-center p-2 sm:p-3 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <BookMarked className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold">{savedCount}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Snippets Saved</p>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
            <div className="inline-flex items-center justify-center p-2 sm:p-3 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <Star className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold">{totalUpvotes}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Upvotes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
              Snippet Insights
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Average Upvotes per Snippet</p>
                <p className="text-lg sm:text-xl font-semibold">{avgUpvotes}</p>
              </div>

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
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Languages Used</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
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
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Language Distribution</h3>
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
                        style={{ width: `${(count / createdCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground">No snippets created yet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
