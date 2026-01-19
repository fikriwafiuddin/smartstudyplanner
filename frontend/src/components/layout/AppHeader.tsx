"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { BellIcon, SearchIcon } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "../ModeToggle"
import { usePathname } from "next/navigation"
import Link from "next/link"
import SemesterSwitcher from "./SemesterSwitcher"

const notifications = [
  {
    id: 1,
    title: "Assignment due tomorrow",
    desc: "Data Structures - Project 2",
    unread: true,
  },
  {
    id: 2,
    title: "Study group meeting",
    desc: "Today at 4:00 PM",
    unread: true,
  },
  {
    id: 3,
    title: "New task added",
    desc: "Research paper outline",
    unread: false,
  },
]

function AppHeader() {
  const pathname = usePathname()
  const split = pathname.split("/")
  let title = split[1]
  title = title.length > 0 ? title.charAt(0).toUpperCase() + title.slice(1) : ""
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          {/* Title */}
          <div>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>

          <SemesterSwitcher className="hidden lg:flex ml-4" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, courses..."
              className="w-64 pl-9 bg-secondary/50 border-0 focus-visible:ring-1"
            />
          </div>

          <ModeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    {notification.unread && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                    <span className="text-sm font-medium">
                      {notification.title}
                    </span>
                  </div>
                  <span className="text-xs ml-4">{notification.desc}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Link href="/settings/notifications" className="w-full">
                <DropdownMenuItem className="text-center text-primary text-sm justify-center cursor-pointer hover:underline">
                  View all notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
