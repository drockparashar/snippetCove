import { mockSnippets } from "@/lib/mockSnippets";
import CodeBlock from "@/components/CodeBlock";
import { notFound } from "next/navigation";

export default async function SnippetDetail({
  params,
}: {
  params: { id: string };
}) {
  // Await params if it's a Promise (Next.js dynamic route API)
  const resolvedParams = await params;
  const snippet = mockSnippets.find((s) => s.id === resolvedParams.id);

  if (!snippet) return notFound();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>
      <div className="flex gap-2 mb-4">
        {snippet.tags.map((tag) => (
          <span key={tag} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
            {tag}
          </span>
        ))}
      </div>
      <CodeBlock code={snippet.code} language={snippet.language} />
    </div>
  );
}