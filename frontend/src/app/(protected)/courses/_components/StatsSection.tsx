import { BookOpen, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const courses = [
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
]

function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {courses.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {courses.reduce((acc, c) => acc + parseInt(c.duration), 0)}h
            </p>
            <p className="text-sm text-muted-foreground">Weekly Hours</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <User className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {new Set(courses.map((c) => c.lecturer).filter(Boolean)).size}
            </p>
            <p className="text-sm text-muted-foreground">Instructors</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsSection
