import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import { ToastProvider } from "@/components/toast-provider"
import { TokenHandler } from "@/components/TokenHandler"
import { AuthProvider } from "@/components/auth-context"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SnipCove - Developer Code Snippets",
  description: "A community-driven platform for developers to save, share, and discover clean, reusable code snippets",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TokenHandler />
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <ToastProvider>
              <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
                <Navbar />
                <main>{children}</main>
                <Analytics />
              </div>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

