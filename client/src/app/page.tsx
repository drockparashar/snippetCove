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
}

const TypingEffect = ({ messages }: TypingEffectProps) => {
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
    <div className="h-8 font-mono text-lg">
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
                <br />
                <TypingEffect messages={["modern developers.", "faster development.", "better solutions."]} />
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
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-md px-8 py-6 border-primary/50 hover:bg-primary/10"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-secondary border-2 border-background overflow-hidden"
                    >
                      <img src={`/api/placeholder/32/32`} alt="User avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-muted-foreground">
                  Joined by <span className="font-semibold text-foreground">10,000+</span> developers
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg">
              <CodeSnippet />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <StatsCounter value="10,000" label="Developers" />
            <StatsCounter value="25,000" label="Code Snippets" />
            <StatsCounter value="100" label="Languages & Frameworks" />
            <StatsCounter value="500" label="Daily Contributions" />
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
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {item.step}
                  </div>
                  {index < 2 && (
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
              <Link href="/signup">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold">SnipCove</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your go-to platform for clean, reusable code snippets that make development easier.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Learn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 mt-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} SnipCove. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
