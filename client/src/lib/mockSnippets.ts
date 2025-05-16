"use client"

export interface Snippet {
  id: string
  title: string
  code: string
  language: "javascript" | "typescript" | "python"
  tags: string[]
  upvotes: number
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
  {
    id: "2",
    title: "JWT Authentication Middleware",
    code: "const authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) {\n    return res.status(401).json({ message: 'Unauthorized' });\n  }\n  try {\n    const user = verifyToken(token);\n    req.user = user;\n    next();\n  } catch (err) {\n    return res.status(403).json({ message: 'Invalid token' });\n  }\n};",
    language: "javascript",
    tags: ["auth", "middleware", "express"],
    upvotes: 78,
  },
  {
    id: "3",
    title: "React useLocalStorage Hook",
    code: "import { useState, useEffect } from 'react';\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    if (typeof window === 'undefined') {\n      return initialValue;\n    }\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.log(error);\n      return initialValue;\n    }\n  });\n\n  const setValue = (value) => {\n    try {\n      const valueToStore =\n        value instanceof Function ? value(storedValue) : value;\n      setStoredValue(valueToStore);\n      if (typeof window !== 'undefined') {\n        window.localStorage.setItem(key, JSON.stringify(valueToStore));\n      }\n    } catch (error) {\n      console.log(error);\n    }\n  };\n\n  return [storedValue, setValue];\n}",
    language: "javascript",
    tags: ["react", "hooks", "storage"],
    upvotes: 103,
  },
  {
    id: "4",
    title: "Python Decorator for Timing Functions",
    code: "import time\nfrom functools import wraps\n\ndef timing_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f'{func.__name__} took {end_time - start_time:.2f} seconds to run')\n        return result\n    return wrapper\n\n@timing_decorator\ndef slow_function():\n    time.sleep(1)\n    return 'Done!'\n\nresult = slow_function()  # Output: slow_function took 1.00 seconds to run",
    language: "python",
    tags: ["python", "decorator", "performance"],
    upvotes: 67,
  },
  {
    id: "5",
    title: "TypeScript Deep Clone Function",
    code: "function deepClone<T>(obj: T): T {\n  if (obj === null || typeof obj !== 'object') {\n    return obj;\n  }\n\n  if (Array.isArray(obj)) {\n    return obj.map(item => deepClone(item)) as unknown as T;\n  }\n\n  const clonedObj = {} as T;\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      clonedObj[key] = deepClone(obj[key]);\n    }\n  }\n\n  return clonedObj;\n}",
    language: "typescript",
    tags: ["typescript", "utility", "objects"],
    upvotes: 54,
  },
  {
    id: "6",
    title: "React Error Boundary Component",
    code: "import React, { Component, ErrorInfo, ReactNode } from 'react';\n\ninterface Props {\n  children: ReactNode;\n  fallback?: ReactNode;\n}\n\ninterface State {\n  hasError: boolean;\n  error?: Error;\n}\n\nclass ErrorBoundary extends Component<Props, State> {\n  constructor(props: Props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error: Error): State {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {\n    console.error('Error caught by ErrorBoundary:', error, errorInfo);\n  }\n\n  render(): ReactNode {\n    if (this.state.hasError) {\n      return this.props.fallback || (\n        <div className=\"error-boundary\">\n          <h2>Something went wrong.</h2>\n          <details>\n            <summary>Error details</summary>\n            <pre>{this.state.error?.toString()}</pre>\n          </details>\n        </div>\n      );\n    }\n\n    return this.props.children;\n  }\n}\n\nexport default ErrorBoundary;",
    language: "typescript",
    tags: ["react", "error-handling", "component"],
    upvotes: 89,
  },
  {
    id: "7",
    title: "Python Context Manager for File Handling",
    code: "from contextlib import contextmanager\n\n@contextmanager\ndef file_manager(filename, mode='r'):\n    try:\n        file = open(filename, mode)\n        yield file\n    finally:\n        file.close()\n\n# Usage\nwith file_manager('example.txt', 'w') as f:\n    f.write('Hello, World!')\n\n# File is automatically closed after the with block",
    language: "python",
    tags: ["python", "file-handling", "context-manager"],
    upvotes: 45,
  },
  {
    id: "8",
    title: "JavaScript Async Retry Function",
    code: "/**\n * Retries an async function with exponential backoff\n * @param {Function} fn - The async function to retry\n * @param {number} maxRetries - Maximum number of retries\n * @param {number} baseDelay - Base delay in ms\n * @param {Function} shouldRetry - Function to determine if retry should happen\n * @returns {Promise<any>} - Result of the function\n */\nasync function retryWithBackoff(\n  fn,\n  maxRetries = 3,\n  baseDelay = 300,\n  shouldRetry = (error) => true\n) {\n  let retries = 0;\n  \n  while (true) {\n    try {\n      return await fn();\n    } catch (error) {\n      if (retries >= maxRetries || !shouldRetry(error)) {\n        throw error;\n      }\n      \n      const delay = baseDelay * Math.pow(2, retries);\n      console.log(`Retry ${retries + 1}/${maxRetries} after ${delay}ms`);\n      await new Promise(resolve => setTimeout(resolve, delay));\n      retries++;\n    }\n  }\n}",
    language: "javascript",
    tags: ["async", "error-handling", "network"],
    upvotes: 72,
  },
]
