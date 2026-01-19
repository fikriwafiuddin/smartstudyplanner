"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Calendar,
  GraduationCap,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Semester } from "@/types"
import SemesterForm from "@/components/semesters/SemesterForm"
import { useSemester } from "@/context/SemesterContext"

export default function Semesters() {
  const { semesters, setActiveSemester } = useSemester()
  const [searchQuery, setSearchQuery] = useState("")
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [selectedSemester, setSelectedSemester] = useState<
    Semester | undefined
  >(undefined)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const filteredSemesters = semesters.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedSemester(undefined)
    setFormMode("create")
    setOpenForm(true)
  }

  const handleEdit = (semester: Semester) => {
    setSelectedSemester(semester)
    setFormMode("edit")
    setOpenForm(true)
  }

  return (
    <div className="space-y-6">
      <SemesterForm
        open={openForm}
        onOpenChange={setOpenForm}
        mode={formMode}
        semester={selectedSemester}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Semesters</h1>
          <p className="text-muted-foreground">
            Manage your academic periods and active semester.
          </p>
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus className="w-4 h-4" />
          Add Semester
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search semesters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSemesters.map((semester) => (
          <Card
            key={semester.id}
            className={cn(
              "group hover:shadow-md transition-shadow relative overflow-hidden",
              semester.isActive && "border-primary ring-1 ring-primary/20",
            )}
          >
            {semester.isActive && (
              <div className="absolute top-0 right-0 p-2">
                <Badge className="bg-primary text-primary-foreground">
                  Active
                </Badge>
              </div>
            )}
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                {semester.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(semester.startDate).toLocaleDateString()} -{" "}
                    {new Date(semester.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    Created {new Date(semester.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                {!semester.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 hover:bg-primary/10 hover:text-primary"
                    onClick={() => setActiveSemester(semester)}
                  >
                    Set Active
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(semester)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSemesters.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No semesters found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query."
              : "Start by adding your first semester."}
          </p>
        </div>
      )}
    </div>
  )
}
