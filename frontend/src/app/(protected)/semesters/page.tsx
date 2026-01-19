"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Semester } from "@/types"
import SemesterForm from "@/components/semesters/SemesterForm"
import { useSemester } from "@/context/SemesterContext"
import SemesterCard from "@/components/semesters/SemesterCard"

export default function Semesters() {
  const { semesters } = useSemester()
  const [searchQuery, setSearchQuery] = useState("")
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [selectedSemester, setSelectedSemester] = useState<
    Semester | undefined
  >(undefined)

  const filteredSemesters = semesters.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedSemester(undefined)
    setOpenForm(true)
  }

  return (
    <div className="space-y-6">
      <SemesterForm
        open={openForm}
        onOpenChange={setOpenForm}
        mode="create"
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
          <SemesterCard key={semester.id} semester={semester} />
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
