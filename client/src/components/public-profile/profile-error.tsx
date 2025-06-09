"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ProfileErrorProps {
  error: string
}

export function ProfileError({ error }: ProfileErrorProps) {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="inline-block p-4 rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {error || "This user profile doesn't exist or has been removed."}
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/explore">
          <Button>Explore Snippets</Button>
        </Link>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
