import { Snippet } from "@/lib/mockSnippets";
import { CardHeader, CardTitle, CardDescription, Card } from "@/components/ui/card";
import Link from "next/link";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <Link href={`/snippets/${snippet.id}`}>
<Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>
          {snippet.language} • {snippet.upvotes} upvotes
        </CardDescription>
      </CardHeader>
      
    </Card>
</Link>
  );
}

