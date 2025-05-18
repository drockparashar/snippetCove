"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula, prism } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Check, Copy, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export default function CodeBlock({ code, language, filename = "snippet.js" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Map language to display name
  const languageMap: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    java: "Java",
    csharp: "C#",
    go: "Go",
    rust: "Rust",
    ruby: "Ruby",
    php: "PHP",
    html: "HTML",
    css: "CSS",
  }

  const displayLanguage = languageMap[language] || language

  // Pick theme based on current mode
  const syntaxTheme = theme === "dark" ? dracula : prism;

  // Normalize language for SyntaxHighlighter
  const normalizedLanguage = language.toLowerCase();

  return (
    <div className="code-window my-6 group">
      <div className="code-window-header">
        <div className="flex items-center gap-4 w-full">
          <div className="code-window-dots">
            <div className="code-window-dot bg-red-500"></div>
            <div className="code-window-dot bg-yellow-500"></div>
            <div className="code-window-dot bg-green-500"></div>
          </div>

          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{filename}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary">{displayLanguage}</div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="code-window-body overflow-x-auto">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={syntaxTheme}
          showLineNumbers
          customStyle={{ margin: 0, background: "transparent", fontSize: "0.95em", borderRadius: "0.5rem", padding: "1.25rem 1rem" }}
          codeTagProps={{ style: { fontFamily: 'var(--font-mono, monospace)' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
