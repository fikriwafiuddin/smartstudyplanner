import GroupCard from "@/components/groups/GroupCard"
import GroupForm from "@/components/groups/GroupForm"
import JoinGroupModal from "@/components/groups/JoinGroupModal"
import { Group } from "@/types"

const groups: Group[] = [
  {
    id: 1,
    name: "Data Structures Study Group",
    members: 5,
    inviteCode: "DST-2025-A",
    lastActive: "2 hours ago",
    pendingTasks: 3,
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Linear Algebra Squad",
    members: 4,
    inviteCode: "LA-2025-B",
    lastActive: "1 day ago",
    pendingTasks: 1,
    color: "bg-accent",
  },
  {
    id: 3,
    name: "Database Project Team",
    members: 6,
    inviteCode: "DB-2025-C",
    lastActive: "3 hours ago",
    pendingTasks: 5,
    color: "bg-success",
  },
]

function GroupsPage() {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Your Groups</h3>
          <GroupForm />
        </div>

        {/* Join Group */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-soft animate-slide-up">
          <h4 className="font-medium text-foreground mb-3">Join a Group</h4>
          <JoinGroupModal />
        </div>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </>
  )
}

export default GroupsPage
