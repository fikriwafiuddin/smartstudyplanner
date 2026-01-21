"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Shield, Calendar, LogOut, Camera } from "lucide-react"
import { useLogout } from "@/services/hooks/authHook"

export default function ProfileSettingsPage() {
  const { mutate: logout, isPending } = useLogout()
  const user = {
    user_metadata: {
      full_name: "Alex Johnson",
    },
    email: "[EMAIL_ADDRESS]",
    created_at: "2022-01-01",
  }

  const handleLogout = () => {
    logout()
  }

  const fullName = user.user_metadata?.full_name || "User"
  const email = user.email || ""
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 text-center sm:text-left mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-border/50 shadow-soft">
          <CardHeader className="text-center pb-2">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 border-2 border-background shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle>{fullName}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1 mt-1">
              <Mail className="w-3 h-3" />
              {email}
            </CardDescription>
            <div className="mt-4 flex justify-center">
              <Badge
                variant="secondary"
                className="gap-1 px-3 py-1 bg-primary/10 text-primary border-primary/20"
              >
                <Shield className="w-3 h-3" />
                Active Student
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 border-t border-border/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined
                </span>
                <span className="font-medium">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Button
                variant="destructive"
                className="w-full mt-4 gap-2 shadow-lg shadow-destructive/20"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="w-4 h-4" />
                {isPending ? "Logging out..." : "Logout from Account"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Edit Details Card */}
        <Card className="lg:col-span-2 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and background.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" defaultValue={fullName} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    defaultValue={email}
                    disabled
                    className="pl-10 bg-muted/30"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground px-1">
                  Email cannot be changed for security.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Study Bio</Label>
              <Input
                id="bio"
                placeholder="e.g. Computer Science Student | Late night learner"
              />
            </div>

            <div className="pt-2">
              <Button className="w-full sm:w-auto px-10 shadow-lg shadow-primary/20">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
