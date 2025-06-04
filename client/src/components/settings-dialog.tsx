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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Github, Mail, Save, Trash2, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BACKEND_URL } from "@/lib/backend"

interface UserProfile {
  name: string;
  email: string;
  githubId?: string;
  // Add other fields as needed
}

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserProfile
}

export function SettingsDialog({ open, onOpenChange, user }: SettingsDialogProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast();

  const handleSave = async () => {
    setSaving(true)

    try {
      // This would be the actual API call to update the user profile
      const res = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      })

      if (res.ok) {
        showToast("Profile updated!", "success")
        onOpenChange(false)
      } else {
        showToast("Failed to update profile.", "error")
        console.error("Failed to update profile")
      }
    } catch (error) {
      showToast("Error updating profile.", "error")
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Account Settings</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Update your profile information and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-3 sm:mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="text-xs sm:text-sm py-1 sm:py-2">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="text-xs sm:text-sm py-1 sm:py-2">
              Account
            </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm py-1 sm:py-2">
                Notifications
              </TabsTrigger>
            </TabsList>

          <TabsContent value="profile" className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-border">
                <AvatarImage src={`/api/placeholder/64/64`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center xs:text-left">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8">
                  Change Avatar
                </Button>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">JPG, PNG or GIF. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Display Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Github className="h-4 w-4 sm:h-6 sm:w-6" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium">GitHub</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {user.githubId ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={user.githubId ? "outline" : "default"}
                  size="sm"
                  className="text-xs sm:text-sm h-7 sm:h-8"
                >
                  {user.githubId ? "Disconnect" : "Connect"}
                </Button>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Password</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                  Change your password or set one if you&apos;re using social login
                </p>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8">
                  Change Password
                </Button>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-destructive mb-1 sm:mb-2">Danger Zone</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                  Permanently delete your account and all your data
                </p>
                <Button variant="destructive" size="sm" className="text-xs sm:text-sm h-7 sm:h-8">
                  <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium">Email Notifications</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Receive email notifications about your activity
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium">New Snippet Comments</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Get notified when someone comments on your snippets
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium">Snippet Upvotes</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Get notified when someone upvotes your snippets
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium">Marketing Emails</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-3 sm:mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            size="sm"
            className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
          >
            {saving ? (
              <>
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
