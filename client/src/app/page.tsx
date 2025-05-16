import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          The Best Place for <span className="text-blue-600">Clean Code Snippets</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover, share, and curate reusable code snippets for developers. No fluff, just quality.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/snippets">
            <Button size="lg">Explore Snippets</Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Use CodeSnippets?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "🚀 Curated Quality",
              desc: "Every snippet is reviewed for readability and best practices.",
            },
            {
              title: "🔍 Smart Search",
              desc: "Filter by language, framework, or use case.",
            },
            {
              title: "💡 Learn Faster",
              desc: "See multiple solutions to the same problem.",
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}