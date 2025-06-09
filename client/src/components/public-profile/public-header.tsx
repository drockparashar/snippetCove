"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code2, Search, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">SnipCove</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/explore" className="text-muted-foreground transition-colors hover:text-foreground">
            Explore
          </Link>
          <Link href="/trending" className="text-muted-foreground transition-colors hover:text-foreground">
            Trending
          </Link>
          <Link href="/collections" className="text-muted-foreground transition-colors hover:text-foreground">
            Collections
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 flex items-center justify-center max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search snippets..." className="pl-8 h-9 bg-muted/50 border-0 focus-visible:ring-1" />
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-6">
              <Link href="/explore" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Explore
              </Link>
              <Link href="/trending" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Trending
              </Link>
              <Link href="/collections" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Collections
              </Link>
              <div className="flex flex-col gap-2 mt-6">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
