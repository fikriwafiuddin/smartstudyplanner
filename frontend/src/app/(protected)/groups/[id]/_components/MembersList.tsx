import InviteMemberModal from "@/components/groups/InviteMemberModal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { statusColors } from "@/constants/groups"
import { cn } from "@/lib/utils"

const members = [
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
]

function MembersList() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Members</h4>
        <InviteMemberModal />
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-secondary">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                  statusColors[member.status as keyof typeof statusColors]
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MembersList
