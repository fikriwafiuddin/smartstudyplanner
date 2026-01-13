"use client"

import { cn } from "@/lib/utils"
import { Group } from "@/types"
import { CheckIcon, CopyIcon, UsersIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

type GroupCardProps = {
  group: Group
}

function GroupCard({ group }: GroupCardProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast("Copied!", {
      description: "Invite code copied to clipboard",
    })
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div
      key={group.id}
      className="bg-card rounded-xl border p-4 shadow-soft hover:shadow-md transition-all duration-200 animate-slide-up"
      // style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            group.color
          )}
        >
          <UsersIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate hover:underline">
            <Link href={`/groups/${group.id}`}>{group.name}</Link>
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {group.members} members
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {group.lastActive}
            </span>
          </div>
        </div>
        {group.pendingTasks > 0 && (
          <Badge variant="secondary" className="text-xs">
            {group.pendingTasks} tasks
          </Badge>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 text-xs bg-secondary px-2 py-1 rounded font-mono text-muted-foreground">
          {group.inviteCode}
        </code>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation()
            handleCopyCode(group.inviteCode)
          }}
        >
          {copiedCode === group.inviteCode ? (
            <CheckIcon className="w-3.5 h-3.5 text-success" />
          ) : (
            <CopyIcon className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default GroupCard
