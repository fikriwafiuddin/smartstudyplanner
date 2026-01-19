"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Clock, MapPin, User, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScheduleItem } from "@/types"
import { useState } from "react"
import CourseForm from "./CourseForm"

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

type CourseCardProps = {
  course: ScheduleItem
}

function CourseCard({ course }: CourseCardProps) {
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <>
      <Card key={course.id} className="group hover:shadow-md transition-shadow">
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
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {course.lecturer && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{course.lecturer}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{course.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {days[course.day]}, {course.startHour}:00 ({course.duration}h)
            </span>
          </div>
          {course.description && (
            <p className="text-sm text-muted-foreground pt-2 border-t border-border">
              {course.description}
            </p>
          )}
        </CardContent>
      </Card>

      <CourseForm
        open={openForm}
        onOpenChange={setOpenForm}
        mode="edit"
        course={course}
      />
    </>
  )
}

export default CourseCard
