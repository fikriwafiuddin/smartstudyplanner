"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2Icon, PlusIcon, SearchIcon } from "lucide-react"
import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { toast } from "sonner"
import { TaskFormModal } from "@/components/tasks/TaskFormModal"
import { SortableTaskCard } from "@/components/tasks/SortableTaskCard"
import { Task, FilterType } from "@/types"
import { TaskFormValues } from "@/types/form"
import { FILTER_TABS } from "@/constants/tasks"
import { calculatePriority } from "@/helpers/taskHelper"

const tasksData: Task[] = [
  {
    id: 1,
    title: "Complete Algorithm Assignment",
    course: "Data Structures",
    deadline: "2025-01-12",
    priority: "high",
    completed: false,
    description: "Implement quicksort and mergesort algorithms",
  },
  {
    id: 2,
    title: "Read Chapter 5 - Matrix Operations",
    course: "Linear Algebra",
    deadline: "2025-01-13",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    course: "Database Systems",
    deadline: "2025-01-14",
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    title: "Submit lab report",
    course: "Physics",
    deadline: "2025-01-11",
    priority: "high",
    completed: true,
  },
  {
    id: 5,
    title: "Review lecture notes",
    course: "Computer Networks",
    deadline: "2025-01-15",
    priority: "low",
    completed: false,
  },
  {
    id: 6,
    title: "Complete ER diagram",
    course: "Database Systems",
    deadline: "2025-01-16",
    priority: "medium",
    completed: false,
  },
  {
    id: 7,
    title: "Study for midterm",
    course: "Data Structures",
    deadline: "2025-01-20",
    priority: "high",
    completed: false,
  },
  {
    id: 8,
    title: "Group project meeting prep",
    course: "Software Engineering",
    deadline: "2025-01-11",
    priority: "medium",
    completed: true,
  },
]

function TasksPage() {
  const [tasks, setTasks] = useState(tasksData)
  const [filter, setFilter] = useState<FilterType>("all")
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)

        // Auto-adjust priority based on new position
        const movedTask = newItems[newIndex]
        const newPriority = calculatePriority(newIndex, newItems.length)

        if (movedTask.priority !== newPriority) {
          newItems[newIndex] = { ...movedTask, priority: newPriority }
          toast.success(`Priority updated to ${newPriority}`, {
            description: `"${movedTask.title}" priority changed based on position`,
          })
        }

        return newItems
      })
    }
  }

  const handleCreateTask = (values: TaskFormValues) => {
    const newTask: Task = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      title: values.title,
      course: values.course,
      deadline: values.deadline.toISOString().split("T")[0],
      priority: values.priority,
      completed: false,
      description: values.description,
    }
    setTasks([newTask, ...tasks])
  }

  const handleEditTask = (values: TaskFormValues) => {
    if (!editingTask) return
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: values.title,
              course: values.course,
              deadline: values.deadline.toISOString().split("T")[0],
              priority: values.priority,
              description: values.description,
            }
          : task
      )
    )
    setEditingTask(null)
  }

  const openCreateModal = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.course.toLowerCase().includes(search.toLowerCase())

    const today = new Date().toISOString().split("T")[0]

    switch (filter) {
      case "today":
        return matchesSearch && task.deadline === today && !task.completed
      case "upcoming":
        return matchesSearch && task.deadline > today && !task.completed
      case "completed":
        return matchesSearch && task.completed
      default:
        return matchesSearch
    }
  })

  return (
    <>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {FILTER_TABS.map((tab) => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilter(tab.key)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={openCreateModal}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {filteredTasks.length > 1 && filter === "all" && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-primary" />
          Drag tasks to reorder — priority auto-adjusts based on position
        </p>
      )}

      {/* Tasks List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2Icon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  No tasks found
                </h3>
                <p className="text-muted-foreground text-sm">
                  {filter === "completed"
                    ? "You haven't completed any tasks yet."
                    : "Create a new task to get started!"}
                </p>
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onToggle={toggleTask}
                  onEdit={openEditModal}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      <TaskFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={editingTask ? handleEditTask : handleCreateTask}
        initialValues={
          editingTask
            ? {
                title: editingTask.title,
                course: editingTask.course,
                priority: editingTask.priority,
                deadline: new Date(editingTask.deadline),
                description: editingTask.description,
              }
            : undefined
        }
        mode={editingTask ? "edit" : "create"}
      />
    </>
  )
}

export default TasksPage
