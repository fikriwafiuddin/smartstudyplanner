"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import StatsSection from "./_components/StatsSection"
import CourseCard from "@/components/courses/CourseCard"
import { ScheduleItem } from "@/types"
import EmptyCourses from "./_components/EmptyCourses"
import CourseForm from "@/components/courses/CourseForm"

const courses: ScheduleItem[] = [
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

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <>
      <CourseForm open={openForm} onOpenChange={setOpenForm} mode="create" />

      <StatsSection />

      {/* Search */}
      <Card>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="gap-2" onClick={() => setOpenForm(true)}>
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && <EmptyCourses searchQuery={searchQuery} />}
    </>
  )
}
