"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function SubmitSnippetPage() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Snippet submitted! (Backend not connected yet)");
    router.push("/snippets"); // Redirect after "submission"
  };

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <h1 className="text-2xl font-bold mb-6">Submit a new snippet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title (e.g., 'Debounce Function')"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono min-h-[200px]"
          required
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}