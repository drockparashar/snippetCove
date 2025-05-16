"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Code, FileCode, Hash, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CodeBlock from "@/components/CodeBlock"

export default function SubmitSnippetPage() {
  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Snippet submitted! (Backend not connected yet)")
    router.push("/snippets") // Redirect after "submission"
  }

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit a new snippet</h1>
        <p className="text-muted-foreground">Share your code with the community to help other developers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="E.g., 'JWT Authentication Middleware'"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  Code
                </label>
                <Textarea
                  id="code"
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono min-h-[300px] resize-y"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-muted-foreground" />
                    Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((t) => (
                      <Badge key={t} variant="secondary" className="flex items-center gap-1">
                        {t}
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => removeTag(t)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Submit Snippet
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border/50 rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>

            {code ? (
              <CodeBlock
                key={language + code} // force re-render on edit/language change
                code={code}
                language={language}
              />
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-lg">
                <Code className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Your code preview will appear here</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium">Tips for great snippets:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Keep your code concise and focused on a single task
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Add comments to explain complex parts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Use descriptive variable and function names
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Add relevant tags to help others find your snippet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
