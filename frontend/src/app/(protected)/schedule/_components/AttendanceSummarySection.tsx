"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const mockAttendance = [
  { course: "Data Structures", attended: 12, total: 15, threshold: 75 },
  { course: "Linear Algebra", attended: 8, total: 8, threshold: 75 },
  {
    course: "Human Computer Interaction",
    attended: 10,
    total: 14,
    threshold: 75,
  },
  { course: "Database Systems", attended: 6, total: 10, threshold: 75 },
]

export default function AttendanceSummarySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockAttendance.map((item) => {
        const percentage = Math.round((item.attended / item.total) * 100)
        const isWarning = percentage < item.threshold

        return (
          <Card key={item.course} className="border-border/50 overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium leading-none truncate max-w-[140px]">
                  {item.course}
                </CardTitle>
                {isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-2xl font-bold",
                    isWarning ? "text-warning" : "text-foreground",
                  )}
                >
                  {percentage}%
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  attendance
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={percentage} className="h-1.5" />
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>
                    {item.attended}/{item.total} sessions
                  </span>
                  <span>Min {item.threshold}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
