import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <SyntaxHighlighter 
      language={language} 
      style={dracula}
      showLineNumbers
      className="rounded-lg text-sm"
    >
      {code}
    </SyntaxHighlighter>
  );
}