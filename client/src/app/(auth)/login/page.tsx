"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mockLoggedIn", "true"); // Mock login
    router.push("/submit"); // Redirect to submit page
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">Log in to submit snippets</h1>
      <form className="space-y-4">
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit" className="w-full" onClick={handleSubmit}>Log in</Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}