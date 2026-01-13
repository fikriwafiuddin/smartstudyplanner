export type Task = {
  id: number
  title: string
  course: string
  deadline: string
  priority: PriorityTask
  completed: boolean
  description?: string
}

export type Group = {
  id: number
  name: string
  members: number
  inviteCode: string
  lastActive: string
  pendingTasks: number
  color: string
  description?: string
}

export type PriorityTask = "high" | "medium" | "low"

export type FilterType = "all" | "today" | "upcoming" | "completed"
