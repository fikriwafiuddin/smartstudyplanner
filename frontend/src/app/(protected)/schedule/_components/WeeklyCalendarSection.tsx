"use client"

import ActivityForm from "@/components/schedule/ActivityForm"
import EventForm from "@/components/schedule/EventForm"
import CourseForm from "@/components/courses/CourseForm"
import { cn } from "@/lib/utils"
import { ScheduleItem, ScheduleItemType } from "@/types"
import {
  BookOpenIcon,
  CalendarIcon,
  UsersIcon,
  CheckCircle2Icon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { useSemester } from "@/context/SemesterContext"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const hours = Array.from(
  { length: 14 },
  (_, i) => `${(8 + i).toString().padStart(2, "0")}:00`,
)

const schedule: ScheduleItem[] = [
  {
    id: "1",
    userId: 1,
    courseId: 101,
    semesterId: 1,
    type: "course",
    name: "Data Structures",
    code: "CS201",
    lecturer: "Dr. Smith",
    location: "Room 301",
    day: 0,
    startHour: "09:00",
    duration: "2",
    color: "bg-primary",
    description: "Introduction to data structures and algorithms",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: 1,
    courseId: 102,
    semesterId: 1,
    type: "course",
    name: "Linear Algebra",
    code: "MATH301",
    lecturer: "Prof. Johnson",
    location: "Room 205",
    day: 1,
    startHour: "11:00",
    duration: "1",
    color: "bg-accent",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: 1,
    courseId: 103,
    semesterId: 1,
    type: "course",
    name: "Database Systems",
    code: "CS301",
    lecturer: "Dr. Williams",
    location: "Room 401",
    day: 2,
    startHour: "14:00",
    duration: "2",
    color: "bg-success",
    description: "Relational databases and SQL",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    userId: 1,
    courseId: 104,
    semesterId: 1,
    type: "course",
    name: "Computer Networks",
    code: "CS401",
    lecturer: "Prof. Brown",
    location: "Room 102",
    day: 3,
    startHour: "10:00",
    duration: "1",
    color: "bg-warning",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    userId: 1,
    courseId: null,
    semesterId: 1,
    type: "activity",
    name: "Student Council Meeting",
    organizer: "Student Affairs",
    location: "Meeting Room A",
    day: 4,
    startHour: "15:00",
    duration: "2",
    color: "bg-indigo-500",
    description: "Weekly organizational meeting",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    userId: 1,
    courseId: null,
    semesterId: 1,
    type: "event",
    name: "AI Workshop Seminar",
    organizer: "Tech Club",
    location: "Auditorium",
    day: 2,
    startHour: "16:00",
    duration: "3",
    color: "bg-pink-500",
    description: "Introduction to Machine Learning",
    isRecurring: false,
    eventDate: "2025-01-08",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    userId: 1,
    courseId: 104,
    semesterId: 2,
    type: "course",
    name: "Advanced Networking",
    code: "CS402",
    lecturer: "Prof. Brown",
    location: "Room 105",
    day: 1,
    startHour: "09:00",
    duration: "2",
    color: "bg-orange-500",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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

function WeeklyCalendarSection() {
  const { activeSemester } = useSemester()

  const getItemAtTime = (dayIndex: number, hour: number) => {
    return schedule.find(
      (item) =>
        item.semesterId === activeSemester?.id &&
        item.day === dayIndex &&
        hour >= parseInt(item.startHour) &&
        hour < parseInt(item.startHour) + parseInt(item.duration),
    )
  }

  const isFirstHourOfItem = (dayIndex: number, hour: number) => {
    const item = getItemAtTime(dayIndex, hour)
    return item && parseInt(item.startHour) === hour
  }

  const [editingActivity, setEditingActivity] = useState<boolean>(false)
  const [editingEvent, setEditingEvent] = useState<boolean>(false)
  const [editingCourse, setEditingCourse] = useState<boolean>(false)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  )
  const [checkedInItems, setCheckedInItems] = useState<Set<string>>(new Set())
  const [pausedItems, setPausedItems] = useState<Set<string>>(new Set())

  const handleCheckIn = (e: React.MouseEvent, item: ScheduleItem) => {
    e.stopPropagation()
    setCheckedInItems((prev) => new Set(prev).add(item.id))
    toast.success(`Checked in to ${item.name}`)
  }

  const handleTogglePause = (e: React.MouseEvent, item: ScheduleItem) => {
    e.stopPropagation()
    setPausedItems((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) {
        next.delete(item.id)
        toast.info(`Resumed ${item.name}`)
      } else {
        next.add(item.id)
        toast.info(`Paused ${item.name} for this week`)
      }
      return next
    })
  }

  const handleItemClick = (item: ScheduleItem) => {
    setSelectedSchedule(item)
    if (item.type === "course") {
      setEditingCourse(true)
    } else if (item.type === "activity") {
      setEditingActivity(true)
    } else if (item.type === "event") {
      setEditingEvent(true)
    }
  }

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden animate-slide-up">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[900px]">
            {/* Day Headers */}
            <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border">
              <div className="p-4 bg-secondary/30" />
              {days.map((day, index) => (
                <div
                  key={day}
                  className={cn(
                    "p-4 text-center border-l border-border",
                    index % 2 !== 0 ? "bg-secondary/90" : "bg-secondary/20",
                  )}
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
                  className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border last:border-b-0"
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
                        className={cn(
                          "border-l border-border h-16 relative",
                          dayIndex % 2 !== 0 && "bg-muted/60",
                        )}
                      >
                        {isFirst && item && (
                          <div
                            className={cn(
                              "absolute inset-x-1 top-1 rounded-lg p-2 text-white shadow-sm cursor-pointer hover:opacity-90 transition-all z-10",
                              item.color,
                              pausedItems.has(item.id) &&
                                "grayscale opacity-60",
                            )}
                            style={{
                              height: `${parseInt(item.duration) * 64 - 8}px`,
                            }}
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <div className="flex items-center gap-1">
                                {getTypeIcon(item.type)}
                                <span className="text-[10px] opacity-80">
                                  {getTypeLabel(item.type)}
                                </span>
                              </div>
                              {pausedItems.has(item.id) && (
                                <Badge
                                  variant="secondary"
                                  className="text-[8px] h-3 px-1 bg-white/20 text-white border-none"
                                >
                                  Paused
                                </Badge>
                              )}
                            </div>
                            <p className="font-semibold text-xs mb-1 line-clamp-2 leading-tight">
                              {item.name}
                            </p>
                            <div className="flex flex-col gap-0.5 mt-auto">
                              <p className="text-[10px] opacity-90 line-clamp-1">
                                {item.lecturer || item.organizer}
                              </p>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => handleCheckIn(e, item)}
                                  className={cn(
                                    "p-1 rounded-full transition-all",
                                    checkedInItems.has(item.id)
                                      ? "bg-white/20 text-white"
                                      : "hover:bg-white/20 text-white/60 hover:text-white",
                                  )}
                                >
                                  <CheckCircle2Icon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => handleTogglePause(e, item)}
                                  className="p-1 rounded-full hover:bg-white/20 text-white/60 hover:text-white transition-all"
                                >
                                  {pausedItems.has(item.id) ? (
                                    <PlayIcon className="w-4 h-4" />
                                  ) : (
                                    <PauseIcon className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
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

      <ActivityForm
        schedule={selectedSchedule}
        open={editingActivity}
        onOpenChange={setEditingActivity}
      />

      <EventForm
        schedule={selectedSchedule}
        open={editingEvent}
        onOpenChange={setEditingEvent}
      />

      <CourseForm
        course={selectedSchedule || undefined}
        open={editingCourse}
        onOpenChange={setEditingCourse}
        mode="edit"
      />
    </>
  )
}

export default WeeklyCalendarSection
