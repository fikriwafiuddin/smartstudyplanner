import { AddSharedTaskModal } from "@/components/groups/AddSharedTaskModal"
import { cn } from "@/lib/utils"
import { CheckIcon, CheckSquareIcon } from "lucide-react"

const sharedTasks = [
  {
    id: 1,
    title: "Complete group presentation",
    assignee: "Sarah Chen",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Review algorithm solutions",
    assignee: "Mike Davis",
    status: "pending",
  },
  {
    id: 3,
    title: "Prepare meeting notes",
    assignee: "Alex Johnson",
    status: "completed",
  },
]

function SharedTasksSection() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <CheckSquareIcon className="w-4 h-4 text-primary" />
          Shared Tasks
        </h4>
        <AddSharedTaskModal />
      </div>
      <div className="p-4 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {sharedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
            // onClick={() => handleToggleTaskStatus(task.id)}
          >
            <div
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                task.status === "completed"
                  ? "bg-success border-success"
                  : task.status === "in-progress"
                  ? "border-warning"
                  : "border-muted-foreground"
              )}
            >
              {task.status === "completed" && (
                <CheckIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium text-foreground truncate",
                  task.status === "completed" &&
                    "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground">{task.assignee}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharedTasksSection
