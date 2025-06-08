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
    // Check for JWT token in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("snipcove_jwt") : null;
    if (!token) {
      setIsLoggedIn(false);
      router.push("/login");
      return;
    }
    fetch(`${BACKEND_URL}/api/auth/check`, {
      headers: { Authorization: `Bearer ${token}` },
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
