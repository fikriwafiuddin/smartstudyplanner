"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { Calendar } from "lucide-react"

// In a real app, this would fetch from an API
const mockDeadlines = [
  {
    id: 1,
    title: "Algorithm Assignment",
    deadline: new Date().toISOString().split("T")[0],
    type: "task",
  },
  {
    id: 2,
    title: "Theory Quiz",
    deadline: new Date().toISOString().split("T")[0],
    type: "assessment",
  },
]

export default function DeadlineAlerts() {
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const upcoming = mockDeadlines.filter((d) => d.deadline === today)

    upcoming.forEach((deadline) => {
      toast(
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">Upcoming Deadline!</p>
            <p className="text-xs text-muted-foreground">
              {deadline.title} is due today.
            </p>
          </div>
        </div>,
        {
          duration: 5000,
          id: `deadline-${deadline.id}`,
        },
      )
    })
  }, [])

  return null
}
