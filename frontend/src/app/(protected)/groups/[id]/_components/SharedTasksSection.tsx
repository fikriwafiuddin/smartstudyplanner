"use client"

import { useState } from "react"
import { AddSharedTaskModal } from "@/components/groups/AddSharedTaskModal"
import { cn } from "@/lib/utils"
import { CheckIcon, CheckSquareIcon, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const INITIAL_TASKS = [
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
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const handleToggleTaskStatus = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextStatus =
            task.status === "pending"
              ? "in-progress"
              : task.status === "in-progress"
                ? "completed"
                : "pending"
          return { ...task, status: nextStatus }
        }
        return task
      }),
    )
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <CheckSquareIcon className="w-4 h-4 text-primary" />
          Shared Tasks
        </h4>
        <AddSharedTaskModal />
      </div>
      <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl border border-transparent transition-all duration-200 hover:border-border hover:bg-muted/30 group",
              task.status === "completed" && "opacity-60",
            )}
            onClick={() => handleToggleTaskStatus(task.id)}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all",
                task.status === "completed"
                  ? "bg-success border-success scale-110"
                  : task.status === "in-progress"
                    ? "border-warning bg-warning/5"
                    : "border-muted-foreground group-hover:border-primary",
              )}
            >
              {task.status === "completed" && (
                <CheckIcon className="w-3.5 h-3.5 text-white" />
              )}
              {task.status === "in-progress" && (
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "text-sm font-semibold text-foreground truncate",
                    task.status === "completed" &&
                      "line-through text-muted-foreground",
                  )}
                >
                  {task.title}
                </p>
                {task.status === "in-progress" && (
                  <Badge
                    variant="outline"
                    className="h-5 px-1.5 text-[10px] bg-warning/10 text-warning border-warning/20"
                  >
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    In Progress
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Assigned to:{" "}
                <span className="font-medium text-foreground/80">
                  {task.assignee}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharedTasksSection
