"use client"

import { useState } from "react"
import { useToast } from "@/components/toast-provider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BACKEND_URL } from "@/lib/backend"

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUsername?: string;
  twitterUsername?: string;
  avatar?: string;
}

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserProfile
}

export function SettingsDialog({ open, onOpenChange, user }: SettingsDialogProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [githubUsername, setGithubUsername] = useState(user.githubUsername || "");
  const [twitterUsername, setTwitterUsername] = useState(user.twitterUsername || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("website", website);
    formData.append("githubUsername", githubUsername);
    formData.append("twitterUsername", twitterUsername);
    if (avatar) formData.append("avatar", avatar);
    formData.append("userId", user._id); // Add userId to the request body

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        showToast("Profile updated!", "success");
        onOpenChange(false);
      } else {
        showToast("Failed to update profile.", "error");
      }
    } catch {
      showToast("Error updating profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Account Settings</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Update your profile information and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src={avatar ? URL.createObjectURL(avatar) : user.avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="avatar" className="cursor-pointer">
                Change Avatar
              </label>
            </Button>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="githubUsername">GitHub Username</Label>
            <Input id="githubUsername" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="twitterUsername">Twitter Username</Label>
            <Input id="twitterUsername" value={twitterUsername} onChange={(e) => setTwitterUsername(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
