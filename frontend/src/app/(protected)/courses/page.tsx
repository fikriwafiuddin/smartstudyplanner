"use client"

import { useState } from "react"
import { useSemester } from "@/context/SemesterContext"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import StatsSection from "./_components/StatsSection"
import CourseCard from "@/components/courses/CourseCard"
import { ScheduleItem } from "@/types"
import EmptyCourses from "./_components/EmptyCourses"
import CourseForm from "@/components/courses/CourseForm"

const courses: ScheduleItem[] = [
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

// No longer need local mockSemesters

export default function Courses() {
  const { activeSemester, semesters } = useSemester()
  const [searchQuery, setSearchQuery] = useState("")
  const [manualSemester, setManualSemester] = useState<string | null>(null)
  const [openForm, setOpenForm] = useState<boolean>(false)

  const selectedSemester = manualSemester || activeSemester?.id.toString() || ""

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = course.semesterId?.toString() === selectedSemester
    return matchesSearch && matchesSemester
  })

  return (
    <div className="space-y-6">
      <CourseForm open={openForm} onOpenChange={setOpenForm} mode="create" />

      <StatsSection />

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSemester} onValueChange={setManualSemester}>
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={() => setOpenForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <EmptyCourses searchQuery={searchQuery} />
      )}
    </div>
  )
}
