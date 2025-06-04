"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {BACKEND_URL} from "@/lib/backend";


export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for GitHub login by looking for a session cookie (or a backend endpoint)
    fetch(`${BACKEND_URL}/api/auth/check`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          router.push("/login");
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        router.push("/login");
      });
  }, [router]);

  if (!isLoggedIn) return null // Show nothing while redirecting

  return <>{children}</>
}
