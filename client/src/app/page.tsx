"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Search, Share2, Tag, BookMarked, User, ChevronRight, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import SnippetCard from "@/components/SnippetCard"
import { mockSnippets } from "@/lib/mockSnippets"

const CodeSnippet = () => {
  // Show the first snippet as a preview
  const snippet = mockSnippets[0]
  return (
    <div className="code-window glow animate-float">
      <SnippetCard snippet={snippet} />
    </div>
  )
}

type TypingEffectProps = {
  messages: string[]
  className?: string
}

const TypingEffect = ({ messages, className }: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [messageIndex, setMessageIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (messageIndex >= messages.length) {
      setMessageIndex(0)
      setCharIndex(0)
      setDisplayedText("")
      return
    }

    const timer = setTimeout(() => {
      if (charIndex < messages[messageIndex].length) {
        setDisplayedText((prev) => prev + messages[messageIndex][charIndex])
        setCharIndex(charIndex + 1)
      } else {
        setTimeout(() => {
          setMessageIndex(messageIndex + 1)
          setCharIndex(0)
          setDisplayedText("")
        }, 2000)
      }
    }, 70)

    return () => clearTimeout(timer)
  }, [charIndex, messageIndex, messages])

  return (
    <div className={`h-8 font-mono text-lg ${className ? className : ''}`}>
      <span className="text-primary font-semibold">{displayedText}</span>
      <span className="animate-pulse text-primary">|</span>
    </div>
  )
}

const testimonials = [
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    image: "/api/placeholder/40/40",
    content:
      "SnipCove has cut my development time in half. No more hunting through old projects for that one authentication snippet!",
  },
  {
    name: "Sarah Johnson",
    role: "Full Stack Engineer",
    image: "/api/placeholder/40/40",
    content:
      "The quality of code on SnipCove is outstanding. I've learned better practices just by using snippets from the community.",
  },
  {
    name: "Miguel Rodriguez",
    role: "Junior Developer",
    image: "/api/placeholder/40/40",
    content:
      "As someone new to coding, SnipCove is like having senior devs guide you through common patterns. Invaluable resource!",
  },
]

type StatsCounterProps = {
  value: string | number
  label: string
}

const StatsCounter = ({ value, label }: StatsCounterProps) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary">{value}+</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left lg:max-w-xl">
              <div className="mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                  Developer-First Code Sharing
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                <span className="block">Clean code snippets for</span>
                <TypingEffect messages={["modern developers.", "faster development.", "better solutions."]} className="mt-2" />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                SnipCove is a community-driven platform where developers save, share, and discover clean, reusable code
                snippets for everyday tasks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/snippets">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-md px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Start Exploring
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg">
              <CodeSnippet />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Everything You Need in One Place</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              SnipCove brings together all the features developers need to efficiently find and share quality code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-primary" />,
                title: "Smart Search",
                description:
                  "Find the perfect snippet with our powerful search and filtering system by language, framework, or purpose.",
              },
              {
                icon: <Tag className="h-8 w-8 text-primary" />,
                title: "Tag & Categorize",
                description: "Organize snippets with intuitive tagging to make your code library easily accessible.",
              },
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Quality Ratings",
                description: "Community voting helps the best snippets rise to the top so you get trusted solutions.",
              },
              {
                icon: <BookMarked className="h-8 w-8 text-primary" />,
                title: "Personal Collections",
                description: "Save your favorite snippets to customizable collections for quick access later.",
              },
              {
                icon: <Share2 className="h-8 w-8 text-primary" />,
                title: "Easy Sharing",
                description: "Share your knowledge with one-click sharing to help fellow developers.",
              },
              {
                icon: <User className="h-8 w-8 text-primary" />,
                title: "Developer Profiles",
                description: "Build your reputation with a profile showcasing your contributions and expertise.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="bg-primary/10 p-3 rounded-lg inline-block mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">How SnipCove Works</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Simplified workflow to help you find and share quality code in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Discover",
                description:
                  "Browse our extensive library of community-contributed code snippets filtered by language, framework, or use case.",
                icon: <Search className="h-6 w-6" />,
              },
              {
                step: "2",
                title: "Copy & Use",
                description:
                  "One-click copy the code you need and integrate it directly into your project with confidence.",
                icon: <Code2 className="h-6 w-6" />,
              },
              {
                step: "3",
                title: "Contribute",
                description: "Share your own snippets and help build a valuable resource for developers worldwide.",
                icon: <Share2 className="h-6 w-6" />,
              },
            ].map((item, index, arr) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-background text-xl font-bold">
                    {item.step}
                  </div>
                  {index < arr.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages & Frameworks */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Supported Languages & Frameworks</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Find snippets for all your favorite technologies in one place
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              "JavaScript",
              "Python",
              "Java",
              "TypeScript",
              "React",
              "Vue",
              "Angular",
              "Node.js",
              "Ruby",
              "PHP",
              "Go",
              "Rust",
              "Swift",
              "Kotlin",
              "C#",
              ".NET",
              "GraphQL",
              "MongoDB",
              "PostgreSQL",
              "Docker",
              "AWS",
              "Firebase",
              "Django",
              "Flask",
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-card rounded-lg py-4 px-6 border border-border/50 flex items-center justify-center hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
              >
                <span className="font-medium text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Loved by Developers</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about SnipCove
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-foreground/90">"{testimonial.content}"</p>
                <div className="mt-4 flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to streamline your development workflow?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are saving time and writing better code with SnipCove.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-md px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link href="/snippets">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto text-md px-8 py-6"
                >
                  Browse Snippets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-foreground pt-16 pb-8 border-t border-border/50">
        <div className="container mx-auto px-4">

          <div className="border-t border-border/50 pt-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} SnipCove. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
              <div className="flex space-x-4 mt-4 md:mt-0 md:ml-6">
                <a href="https://x.com/PranshuParasha4" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 4.01c-.77.35-1.6.59-2.47.7a4.13 4.13 0 0 0 1.81-2.27 8.19 8.19 0 0 1-2.6.99A4.11 4.11 0 0 0 16.11 3c-2.27 0-4.11 1.84-4.11 4.11 0 .32.04.64.1.94C8.08 7.9 5.1 6.38 3.01 4.09c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.67 1.82 3.4a4.09 4.09 0 0 1-1.86-.51v.05c0 1.98 1.41 3.63 3.28 4.01-.34.09-.7.14-1.07.14-.26 0-.51-.03-.76-.07.51 1.6 2 2.77 3.76 2.8A8.24 8.24 0 0 1 2 19.54c-.27 0-.54-.02-.8-.05A11.62 11.62 0 0 0 7.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 4.01z" /></svg>
                </a>
                <a href="https://github.com/drockparashar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/pranshu-parashar-443859249/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-9h4v1.34A4.98 4.98 0 0 1 16 8zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
