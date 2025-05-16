"use client"; // Required for client-side interactivity

import { useState } from "react";
import { mockSnippets } from "@/lib/mockSnippets";
import SnippetCard from "@/components/SnippetCard";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSnippets = mockSnippets.filter((snippet) => 
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Clean Code Snippets</h1>
      
      {/* Search Bar */}
      <Input
        placeholder="Search by title or tag (e.g., 'react')"
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Snippet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </main>
  );
}