import type { Snippet } from "@/lib/mockSnippets"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Star, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CodeBlock from "@/components/CodeBlock"

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  // Get a preview of the code (first 3 lines)
  const codePreview = snippet.code.split("\n").slice(0, 3).join("\n")

  return (
    <Link href={`/snippets/${snippet.id}`}>
      <Card className="snippet-card h-full transition-all duration-300 hover:translate-y-[-2px] overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{snippet.title}</CardTitle>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" />
              <span className="text-sm font-medium">{snippet.upvotes}</span>
            </div>
          </div>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {snippet.language}
            </Badge>
            <span className="text-xs text-muted-foreground">{snippet.code.split("\n").length} lines</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <CodeBlock code={codePreview + (snippet.code.split("\n").length > 3 ? "..." : "")} language={snippet.language} />
            <div className="absolute bottom-0 right-0 p-1.5">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {snippet.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
