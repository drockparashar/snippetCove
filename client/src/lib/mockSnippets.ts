"use client"

export interface Snippet {
  _id: string
  title: string
  code: string
  language: "javascript" | "typescript" | "python"
  tags: string[]
  upvotes: number
}

export const mockSnippets: Snippet[] = [
  {
    _id: "6829dfff6e8017ccc49aa71c",
    title: "Debounce Function",
    code: "const debounce = (fn: Function, delay: number) => {\n  let timer: NodeJS.Timeout;\n  return (...args: any[]) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};",
    language: "typescript",
    tags: ["react", "performance"],
    upvotes: 42,
  }
]
