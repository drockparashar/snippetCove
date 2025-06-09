"use client"

import { ProfileHeader } from "./profile-header"
import { ProfileContent } from "./profile-content"
import { ProfileSkeleton } from "./profile-skeleton"
import { ProfileError } from "./profile-error"
import type { UserProfileData } from "@/types/user"

interface PublicProfileLayoutProps {
  userData: UserProfileData | null
  loading: boolean
  error: string | null
}

export function PublicProfileLayout({ userData, loading, error }: PublicProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {loading && <ProfileSkeleton />}

      {error && <ProfileError error={error} />}

      {userData && !loading && !error && (
        <>
          <ProfileHeader userData={userData} />
          <ProfileContent userData={userData} />
        </>
      )}
    </div>
  )
}
