"use client";
import { useEffect } from "react";

export function TokenHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("snipcove_jwt", token);
      localStorage.setItem("snipcove_token", token);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.pathname + url.search);
      if (url.pathname === "/" || url.pathname === "/login") {
        window.location.replace("/dashboard");
      }
    }
  }, []);
  return null;
}
