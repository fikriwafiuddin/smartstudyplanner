import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AlertCircleIcon, CheckCircle2Icon, CircleIcon } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Complete Algorithm Assignment",
    course: "Data Structures",
    deadline: "Tomorrow",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Read Chapter 5",
    course: "Linear Algebra",
    deadline: "In 2 days",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    course: "Database Systems",
    deadline: "In 3 days",
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    title: "Submit lab report",
    course: "Physics",
    deadline: "Today",
    priority: "high",
    completed: true,
  },
]

const priorityConfig = {
  high: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: AlertCircleIcon,
  },
  medium: { color: "bg-warning/10 text-warning border-warning/20", icon: null },
  low: { color: "bg-success/10 text-success border-success/20", icon: null },
}

function UpcomingTasks() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Upcoming Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {tasks.filter((t) => !t.completed).length} pending tasks
          </p>
        </div>
        <a
          href="/tasks"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </a>
      </div>
      <div className="p-4 space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer",
              task.completed && "opacity-60"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button className="mt-0.5 shrink-0">
              {task.completed ? (
                <CheckCircle2Icon className="w-5 h-5 text-success" />
              ) : (
                <CircleIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium text-foreground",
                  task.completed && "line-through"
                )}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {task.course}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    task.deadline === "Today" || task.deadline === "Tomorrow"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {task.deadline}
                </span>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs capitalize",
                priorityConfig[task.priority as keyof typeof priorityConfig]
                  .color
              )}
            >
              {task.priority}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingTasks
