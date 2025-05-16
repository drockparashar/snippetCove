export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: "javascript" | "python" | "typescript";
  tags: string[];
  upvotes: number;
}

export const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "Debounce Function",
    code: "const debounce = (fn: Function, delay: number) => {\n  let timer: NodeJS.Timeout;\n  return (...args: any[]) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};",
    language: "typescript",
    tags: ["react", "performance"],
    upvotes: 42,
  },
  // Add more snippets...
];