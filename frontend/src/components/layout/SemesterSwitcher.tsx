"use client"

import { useSemester } from "@/context/SemesterContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GraduationCapIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SemesterSwitcherProps {
  className?: string
  variant?: "header" | "sidebar"
}

export default function SemesterSwitcher({
  className,
  variant = "header",
}: SemesterSwitcherProps) {
  const { activeSemester, setActiveSemester, semesters } = useSemester()

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "header" &&
          "px-4 py-1.5 bg-secondary/30 rounded-full border border-border/50",
        variant === "sidebar" &&
          "p-2 bg-secondary/50 rounded-lg border border-border/50 w-full",
        className,
      )}
    >
      <GraduationCapIcon
        className={cn(
          "shrink-0",
          variant === "header"
            ? "w-4 h-4 text-primary"
            : "w-5 h-5 text-primary",
        )}
      />
      <Select
        value={activeSemester?.id.toString()}
        onValueChange={(val) => {
          const semester = semesters.find((s) => s.id.toString() === val)
          if (semester) setActiveSemester(semester)
        }}
      >
        <SelectTrigger className="h-7 border-0 bg-transparent p-0 focus:ring-0 w-full gap-2 text-sm font-medium">
          <SelectValue placeholder="Select Semester" />
        </SelectTrigger>
        <SelectContent>
          {semesters.map((s) => (
            <SelectItem key={s.id} value={s.id.toString()}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
