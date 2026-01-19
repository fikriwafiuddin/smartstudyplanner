import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  CheckCircle2,
  Circle,
  Calendar,
  Flag,
  BookOpen,
  Pencil,
  GripVertical,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Task } from "@/types"
import { useFocus } from "@/context/FocusContext"

const priorityConfig = {
  high: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    label: "High",
  },
  medium: {
    color: "bg-warning/10 text-warning border-warning/20",
    label: "Medium",
  },
  low: { color: "bg-success/10 text-success border-success/20", label: "Low" },
}

type SortableTaskCardProps = {
  task: Task
  index: number
  onToggle: (taskId: number) => void
  onEdit: (task: Task) => void
}

export function SortableTaskCard({
  task,
  index,
  onToggle,
  onEdit,
}: SortableTaskCardProps) {
  const { startFocusSession } = useFocus()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 30}ms`,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-md transition-all duration-200 animate-slide-up group",
        task.completed && "opacity-70",
        isDragging && "shadow-lg ring-2 ring-primary/20 z-50 opacity-90",
      )}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 shrink-0 cursor-grab active:cursor-grabbing p-1 -ml-1 rounded hover:bg-secondary/80 transition-colors touch-none"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>

        <button onClick={() => onToggle(task.id)} className="mt-1 shrink-0">
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4
                className={cn(
                  "font-medium text-foreground",
                  task.completed && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </h4>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge
                variant="outline"
                className={cn(priorityConfig[task.priority].color)}
              >
                <Flag className="w-3 h-3 mr-1" />
                {priorityConfig[task.priority].label}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation()
                  startFocusSession(
                    task.courseId?.toString(),
                    task.id.toString(),
                  )
                }}
              >
                <Target className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit(task)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              {task.course}
            </span>
            <span
              className={cn(
                "flex items-center gap-1.5 text-sm",
                new Date(task.deadline) <= new Date() && !task.completed
                  ? "text-destructive font-medium"
                  : "text-muted-foreground",
              )}
            >
              <Calendar className="w-4 h-4" />
              {new Date(task.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
