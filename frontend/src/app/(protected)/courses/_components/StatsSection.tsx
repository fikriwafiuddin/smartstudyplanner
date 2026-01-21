import { BookOpen, CheckCircle2, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Course } from "@/types"

type StatsSectionProps = {
  courses: Course[]
}

function StatsSection({ courses }: StatsSectionProps) {
  const totalMeetings = courses.reduce((acc, c) => acc + c.totalMeetings, 0)
  const completedMeetings = courses.reduce(
    (acc, c) => acc + c.completedMeetings,
    0,
  )

  const overallProgress =
    totalMeetings > 0
      ? Math.round((completedMeetings / totalMeetings) * 100)
      : 0

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
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {completedMeetings}
            </p>
            <p className="text-sm text-muted-foreground">Meetings Attended</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {overallProgress}%
            </p>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsSection
