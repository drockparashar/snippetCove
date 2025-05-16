"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // For now, just check localStorage (mock auth)
    const loggedIn = localStorage.getItem("mockLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      alert("Please log in to submit snippets!");
      router.push("/login");
    }
  }, []);

  if (!isLoggedIn) return null; // Show nothing while redirecting

  return <>{children}</>;
}