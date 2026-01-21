"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Pencil, Trash2, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Course } from "@/types"
import { useState } from "react"
import CourseForm from "./CourseForm"
import CourseDeleteDialog from "./CourseDeleteDialog"
import { Progress } from "../ui/progress"

type CourseCardProps = {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const progress =
    course.totalMeetings > 0
      ? Math.round((course.completedMeetings / course.totalMeetings) * 100)
      : 0

  return (
    <>
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-3 h-12 rounded-full", course.color)} />
              <div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                {course.code && (
                  <Badge variant="outline" className="mt-1">
                    {course.code}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={() => setOpenForm(true)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setOpenDelete(true)}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Progress
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right italic font-medium">
              {course.completedMeetings} of {course.totalMeetings} meetings
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                Attendance
              </span>
              <div className="flex items-center gap-1.5 text-foreground mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold">
                  {course.completedMeetings} attended
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CourseForm
        open={openForm}
        onOpenChange={setOpenForm}
        mode="edit"
        course={course}
      />

      <CourseDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        course={course}
      />
    </>
  )
}

export default CourseCard
