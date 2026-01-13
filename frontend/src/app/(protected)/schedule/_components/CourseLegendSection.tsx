import { cn } from "@/lib/utils"

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

function CourseLegendSection() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-4">Your Courses</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {courses
          .filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i)
          .map((course) => (
            <div
              key={course.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className={cn("w-3 h-3 rounded-full", course.color)} />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {course.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {course.lecturer}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CourseLegendSection
