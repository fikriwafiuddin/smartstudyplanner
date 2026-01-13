export const PRIORITIES = [
  { value: "high", label: "High", color: "text-destructive" },
  { value: "medium", label: "Medium", color: "text-warning" },
  { value: "low", label: "Low", color: "text-success" },
] as const

export const FILTER_TABS = [
  { key: "all", label: "All Tasks" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
] as const
