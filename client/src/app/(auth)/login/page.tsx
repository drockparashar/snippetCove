"use client"

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/toast-provider"

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { showToast } = useToast();

  useEffect(() => {
    // Remove mock login check, only rely on real authentication
    // (No redirect on page load)
  }, [redirect, router]);

  const handleGithubLogin = async () => {
    try {
      // Pass the redirect param to the backend so it can redirect back after GitHub login
      const redirectParam = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
      window.location.href = `https://snippetcove.onrender.com/api/auth/github${redirectParam}`;
    } catch (err) {
      showToast("GitHub login failed. Please try again.", "error");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Log in to your account to continue</p>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-6 shadow-lg">
          <button
            type="button"
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-900 transition"
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" className="mr-2"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
