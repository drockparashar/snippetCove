"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BACKEND_URL } from "@/lib/backend";

interface User {
  _id: string;
  name: string;
  email: string;
  githubId?: string;
  savedSnippets?: string[];
  createdSnippets?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("snipcove_jwt") || localStorage.getItem("snipcove_token"))
      : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setUser(data || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("snipcove_jwt", token);
    localStorage.setItem("snipcove_token", token);
    setLoading(true);
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("snipcove_jwt");
    localStorage.removeItem("snipcove_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
