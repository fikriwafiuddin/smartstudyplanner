import { cn } from "@/lib/utils"

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
const courses = [
  {
    id: 1,
    name: "Data Structures",
    lecturer: "Dr. Smith",
    day: 0,
    startHour: 9,
    duration: 2,
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Linear Algebra",
    lecturer: "Prof. Johnson",
    day: 1,
    startHour: 11,
    duration: 1,
    color: "bg-accent",
  },
  {
    id: 3,
    name: "Database Systems",
    lecturer: "Dr. Chen",
    day: 2,
    startHour: 14,
    duration: 2,
    color: "bg-success",
  },
  {
    id: 4,
    name: "Computer Networks",
    lecturer: "Prof. Williams",
    day: 3,
    startHour: 10,
    duration: 2,
    color: "bg-warning",
  },
  {
    id: 5,
    name: "Software Engineering",
    lecturer: "Dr. Brown",
    day: 4,
    startHour: 13,
    duration: 2,
    color: "bg-destructive",
  },
  {
    id: 6,
    name: "Data Structures Lab",
    lecturer: "TA Martinez",
    day: 0,
    startHour: 14,
    duration: 3,
    color: "bg-primary/70",
  },
  {
    id: 7,
    name: "Physics",
    lecturer: "Dr. Taylor",
    day: 2,
    startHour: 9,
    duration: 2,
    color: "bg-indigo-500",
  },
]

function WeeklyCalendarSection() {
  const getCourseAtTime = (dayIndex: number, hour: number) => {
    return courses.find(
      (course) =>
        course.day === dayIndex &&
        hour >= course.startHour &&
        hour < course.startHour + course.duration
    )
  }

  const isFirstHourOfCourse = (dayIndex: number, hour: number) => {
    const course = getCourseAtTime(dayIndex, hour)
    return course?.startHour === hour
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden animate-slide-up">
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border">
            <div className="p-4 bg-secondary/30" />
            {days.map((day, index) => (
              <div
                key={day}
                className="p-4 text-center border-l border-border bg-secondary/30"
              >
                <p className="font-semibold text-foreground">{day}</p>
                <p className="text-sm text-muted-foreground">Jan {6 + index}</p>
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
                  const course = getCourseAtTime(dayIndex, parseInt(hour))
                  const isFirst = isFirstHourOfCourse(dayIndex, parseInt(hour))

                  return (
                    <div
                      key={dayIndex}
                      className="border-l border-border h-16 relative"
                    >
                      {isFirst && course && (
                        <div
                          className={cn(
                            "absolute inset-x-1 top-1 rounded-lg p-2 text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity z-10",
                            course.color
                          )}
                          style={{
                            height: `${course.duration * 64 - 8}px`,
                          }}
                        >
                          <p className="font-medium text-sm truncate">
                            {course.name}
                          </p>
                          <p className="text-xs opacity-90 truncate">
                            {course.lecturer}
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
  )
}

export default WeeklyCalendarSection
