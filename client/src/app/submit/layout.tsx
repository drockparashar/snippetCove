"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/auth-context";

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/submit");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
