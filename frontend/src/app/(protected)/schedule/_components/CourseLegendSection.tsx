import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ScheduleItem, ScheduleItemType } from "@/types"

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
const items: ScheduleItem[] = [
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
    startHour: "9",
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
    startHour: "11",
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
    startHour: "14",
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
    startHour: "10",
    duration: "1",
    color: "bg-warning",
    isRecurring: true,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

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

function CourseLegendSection() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-4">Your Schedule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {getTypeLabel(item.type)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {item.lecturer || item.organizer} • {days[item.day]}{" "}
                {item.startHour}:00
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseLegendSection
