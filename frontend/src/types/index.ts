export type Task = {
  id: number
  title: string
  course: string
  deadline: string
  priority: PriorityTask
  completed: boolean
  description?: string
}

export type PriorityTask = "high" | "medium" | "low"

export type FilterType = "all" | "today" | "upcoming" | "completed"
