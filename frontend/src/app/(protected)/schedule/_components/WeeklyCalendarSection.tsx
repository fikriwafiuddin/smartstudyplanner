"use client"

import ScheduleForm from "@/components/schedule/ScheduleForm"
import { cn } from "@/lib/utils"
import { ScheduleItem, ScheduleItemType } from "@/types"
import { BookOpenIcon, CalendarIcon, UsersIcon } from "lucide-react"
import { useState } from "react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]
const schedule: ScheduleItem[] = [
  {
    id: "1",
    type: "course",
    name: "Data Structures",
    code: "CS201",
    lecturer: "Dr. Smith",
    location: "Room 301",
    day: "0",
    startHour: "9",
    duration: "2",
    color: "bg-primary",
    description: "Introduction to data structures and algorithms",
    isRecurring: true,
  },
  {
    id: "2",
    type: "course",
    name: "Linear Algebra",
    code: "MATH301",
    lecturer: "Prof. Johnson",
    location: "Room 205",
    day: "1",
    startHour: "11",
    duration: "1",
    color: "bg-accent",
    isRecurring: true,
  },
  {
    id: "3",
    type: "course",
    name: "Database Systems",
    code: "CS301",
    lecturer: "Dr. Williams",
    location: "Room 401",
    day: "2",
    startHour: "14",
    duration: "2",
    color: "bg-success",
    description: "Relational databases and SQL",
    isRecurring: true,
  },
  {
    id: "4",
    type: "course",
    name: "Computer Networks",
    code: "CS401",
    lecturer: "Prof. Brown",
    location: "Room 102",
    day: "3",
    startHour: "10",
    duration: "1",
    color: "bg-warning",
    isRecurring: true,
  },
  {
    id: "5",
    type: "activity",
    name: "Student Council Meeting",
    organizer: "Student Affairs",
    location: "Meeting Room A",
    day: "4",
    startHour: "15",
    duration: "2",
    color: "bg-indigo-500",
    description: "Weekly organizational meeting",
    isRecurring: true,
  },
  {
    id: "6",
    type: "event",
    name: "AI Workshop Seminar",
    organizer: "Tech Club",
    location: "Auditorium",
    day: "2",
    startHour: "16",
    duration: "3",
    color: "bg-pink-500",
    description: "Introduction to Machine Learning",
    isRecurring: false,
    eventDate: "2025-01-08",
  },
]

const getTypeIcon = (type: ScheduleItemType) => {
  switch (type) {
    case "course":
      return <BookOpenIcon className="w-3 h-3" />
    case "activity":
      return <UsersIcon className="w-3 h-3" />
    case "event":
      return <CalendarIcon className="w-3 h-3" />
  }
}

const getTypeLabel = (type: ScheduleItemType) => {
  switch (type) {
    case "course":
      return "Course"
    case "activity":
      return "Activity"
    case "event":
      return "Event"
  }
}

const getItemAtTime = (dayIndex: number, hour: number) => {
  return schedule.find(
    (item) =>
      parseInt(item.day) === dayIndex &&
      hour >= parseInt(item.startHour) &&
      hour < parseInt(item.startHour) + parseInt(item.duration),
  )
}

const isFirstHourOfItem = (dayIndex: number, hour: number) => {
  const item = getItemAtTime(dayIndex, hour)
  return item && parseInt(item.startHour) === hour
}

function WeeklyCalendarSection() {
  const [editingItem, setEditingItem] = useState<boolean>(false)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  )

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden animate-slide-up">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[900px]">
            {/* Day Headers */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border">
              <div className="p-4 bg-secondary/30" />
              {days.map((day, index) => (
                <div
                  key={day}
                  className="p-4 text-center border-l border-border bg-secondary/30"
                >
                  <p className="font-semibold text-foreground">{day}</p>
                  <p className="text-sm text-muted-foreground">
                    Jan {6 + index}
                  </p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border last:border-b-0"
                >
                  <div className="p-3 text-sm text-muted-foreground text-right pr-4 bg-secondary/10">
                    {hour}
                  </div>
                  {days.map((_, dayIndex) => {
                    const item = getItemAtTime(dayIndex, parseInt(hour))
                    const isFirst = isFirstHourOfItem(dayIndex, parseInt(hour))

                    return (
                      <div
                        key={dayIndex}
                        className="border-l border-border h-16 relative"
                      >
                        {isFirst && item && (
                          <div
                            className={cn(
                              "absolute inset-x-1 top-1 rounded-lg p-2 text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity z-10",
                              item.color,
                            )}
                            style={{
                              height: `${parseInt(item.duration) * 64 - 8}px`,
                            }}
                            onClick={() => {
                              setEditingItem(true)
                              setSelectedSchedule(item)
                            }}
                            onContextMenu={(e) => {
                              e.preventDefault()
                            }}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              {getTypeIcon(item.type)}
                              <span className="text-[10px] opacity-80">
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <p className="font-medium text-sm truncate">
                              {item.name}
                            </p>
                            <p className="text-xs opacity-90 truncate">
                              {item.lecturer || item.organizer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScheduleForm
        schedule={selectedSchedule}
        open={editingItem}
        onOpenChange={setEditingItem}
      />
    </>
  )
}

export default WeeklyCalendarSection
