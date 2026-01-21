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
import EmptyCourses from "./_components/EmptyCourses"
import CourseForm from "@/components/courses/CourseForm"
import { useCourses } from "@/services/hooks/courseHook"
import { Skeleton } from "@/components/ui/skeleton"

export default function Courses() {
  const { activeSemester, semesters } = useSemester()
  const [searchQuery, setSearchQuery] = useState("")
  const [manualSemester, setManualSemester] = useState<string | null>(null)
  const [openForm, setOpenForm] = useState<boolean>(false)

  const selectedSemester =
    manualSemester || (activeSemester?.id ? String(activeSemester.id) : "")

  const { data: courses = [], isLoading } = useCourses(
    selectedSemester || undefined,
  )

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <CourseForm open={openForm} onOpenChange={setOpenForm} mode="create" />

      <StatsSection courses={courses} />

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
                  <SelectItem key={s.id} value={String(s.id)}>
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
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-[180px]">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-3 h-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[60%]" />
                      <Skeleton className="h-3 w-[30%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
      </div>

      {!isLoading && filteredCourses.length === 0 && (
        <EmptyCourses searchQuery={searchQuery} />
      )}
    </div>
  )
}
