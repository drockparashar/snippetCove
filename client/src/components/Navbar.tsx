"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./ThemeToggle"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // For now, just check localStorage (mock auth)
    const loggedIn = localStorage.getItem("mockLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-70"></div>
              <Code2 className="h-8 w-8 text-white relative" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              SnipCove
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/snippets" className="text-foreground/80 hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/features" className="text-foreground/80 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>

            <div className="flex items-center gap-2 ml-4">
              <ThemeToggle />

              {isLoggedIn ? (
                <>
                  <Link href="/submit">
                    <Button variant="default" size="sm">
                      Submit Snippet
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/50 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              href="/snippets"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/features"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
              {isLoggedIn ? (
                <Link href="/submit" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Submit Snippet</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
