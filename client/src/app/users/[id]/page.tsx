"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import { PublicProfileLayout } from "@/components/public-profile/public-profile-layout"
import type { UserProfileData } from "@/types/user"
import { BACKEND_URL } from "@/lib/backend"

export default function UserProfilePage() {
  const params = useParams()
  const [userData, setUserData] = useState<UserProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!params?.id) return

    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch user profile data by ID
        const response = await fetch(`${BACKEND_URL}/api/users/id/${params.id}`)


        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error(`Failed to fetch profile: ${response.statusText}`)
        }

        const data = await response.json()
        setUserData(data)
      } catch (err) {
        console.error("Error fetching user profile:", err)
        setError(err instanceof Error ? err.message : "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [params?.id])

  return <PublicProfileLayout userData={userData} loading={loading} error={error} />
}
