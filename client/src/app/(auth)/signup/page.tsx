import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      <form className="space-y-4">
        <Input type="text" placeholder="Name" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit" className="w-full">Sign up</Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}