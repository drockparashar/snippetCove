"use client"

import { Toaster, toast } from "react-hot-toast"
import { ReactNode } from "react"

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "0.95rem",
            borderRadius: "0.5rem",
            background: "#000",
            color: "#fff",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)",
          },
          success: {
            style: { background: "#43464b", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#22c55e" },
          },
          error: {
            style: { background: "#000", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#ef4444" },
          },
        }}
      />
    </>
  )
}

export function useToast() {
  return {
    showToast: (message: string, type: "success" | "error" | "info" = "info") => {
      if (type === "success") toast.success(message)
      else if (type === "error") toast.error(message)
      else toast(message)
    }
  }
}
