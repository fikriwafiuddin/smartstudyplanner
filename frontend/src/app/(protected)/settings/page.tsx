"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useLogout } from "@/services/hooks/authHook"
import { Button } from "@/components/ui/button"

const settingsOptions = [
  {
    title: "Profile",
    description: "Manage your personal information and public profile.",
    icon: User,
    href: "/settings/profile",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Notifications",
    description: "Configure how and when you want to be notified.",
    icon: Bell,
    href: "/settings/notifications",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Security",
    description: "Update your password and manage account security.",
    icon: Shield,
    href: "#",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Appearance",
    description: "Customize the theme and layout of your workspace.",
    icon: Palette,
    href: "#",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Language & Region",
    description: "Set your preferred language and time zone.",
    icon: Globe,
    href: "#",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
]

export default function SettingsPage() {
  const { mutate: logout, isPending } = useLogout()

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and set your preferences.
        </p>
      </div>

      <div className="grid gap-4">
        {settingsOptions.map((option) => (
          <Link key={option.title} href={option.href}>
            <Card className="group hover:border-primary/50 transition-all cursor-pointer border-border/50 shadow-soft hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${option.bg} ${option.color} group-hover:scale-110 transition-transform`}
                    >
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {option.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {option.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive text-muted-foreground h-14 px-6 rounded-xl transition-all"
          onClick={() => logout()}
          disabled={isPending}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">
            {isPending ? "Signing out..." : "Sign Out"}
          </span>
        </Button>
      </div>
    </div>
  )
}
