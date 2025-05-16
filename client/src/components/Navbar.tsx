import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const isLoggedIn = 
    typeof window !== "undefined" && localStorage.getItem("mockLoggedIn") === "true";

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="font-bold text-lg">
          CodeSnippets
        </Link>
        <div className="flex gap-2">
          {isLoggedIn ? (
            <Link href="/submit">
              <Button size="sm">Submit</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="outline">Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}