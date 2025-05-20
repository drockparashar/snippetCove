"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status from backend
    fetch("http://localhost:5000/api/auth/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsLoggedIn(true)
          setUser(data.user)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch(() => {
        setIsLoggedIn(false)
        setUser(null)
      })
  }, [])

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", { credentials: "include" })
    setIsLoggedIn(false)
    setUser(null)
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            {/* Logo or Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary"><rect width="24" height="24" rx="6" fill="currentColor"/></svg>
            <span>SnipCove</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/snippets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Explore</Link>
            <Link href="/submit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Submit</Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
            )}
            <ThemeToggle />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/api/placeholder/32/32" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} variant="destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded hover:bg-muted" onClick={() => setIsMenuOpen((v) => !v)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-2">
            <Link href="/snippets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Explore</Link>
            <Link href="/submit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Submit</Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            )}
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <Link href="/dashboard/settings" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                <Button variant="destructive" size="sm" className="mt-2" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</Button>
              </>
            ) : (
              <Button asChild variant="outline" size="sm" className="mt-2" onClick={() => setIsMenuOpen(false)}>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
