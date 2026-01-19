"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut, SettingsIcon, UsersIcon } from "lucide-react"
import { toast } from "sonner"

const group = {
  id: 1,
  name: "Data Structures Study Group",
  members: [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "",
      role: "Admin",
      status: "online",
    },
    { id: 2, name: "Sarah Chen", avatar: "", role: "Member", status: "online" },
    {
      id: 3,
      name: "Mike Davis",
      avatar: "",
      role: "Member",
      status: "offline",
    },
    { id: 4, name: "Emma Wilson", avatar: "", role: "Member", status: "away" },
    {
      id: 5,
      name: "James Brown",
      avatar: "",
      role: "Member",
      status: "online",
    },
  ],
  totalMembers: 5,
  inviteCode: "DST-2025-A",
  lastActive: "2 hours ago",
  pendingTasks: 3,
  color: "bg-primary",
}

function HeaderSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-soft animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              group.color,
            )}
          >
            <UsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{group.name}</h3>
            <p className="text-sm text-muted-foreground">
              {group.totalMembers} members • Created Jan 2025
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              toast.error("You have left the group.")
              window.location.href = "/groups"
            }}
          >
            <LogOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SettingsIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Members */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {group.members.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
              <AvatarFallback className="text-xs bg-secondary">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {group.totalMembers > 4 && (
          <span className="text-sm text-muted-foreground">
            +{group.totalMembers - 4} more
          </span>
        )}
      </div>
    </div>
  )
}

export default HeaderSection
