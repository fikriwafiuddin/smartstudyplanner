"use client"

import { Semester } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import {
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  PencilIcon,
  RefreshCcwIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "../ui/button"
import { useSemester } from "@/context/SemesterContext"
import { useState } from "react"
import SemesterForm from "./SemesterForm"

type SemesterCardProps = {
  semester: Semester
}

function SemesterCard({ semester }: SemesterCardProps) {
  const { setActiveSemester } = useSemester()
  const [openFormEdit, setOpenFormEdit] = useState(false)

  return (
    <>
      <Card
        key={semester.id}
        className={cn(
          "group hover:shadow-md transition-shadow relative overflow-hidden",
          semester.isActive && "border-primary ring-1 ring-primary/20",
        )}
      >
        {semester.isActive && (
          <div className="absolute top-0 right-0 p-2">
            <Badge className="bg-primary text-primary-foreground">Active</Badge>
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <GraduationCapIcon className="h-5 w-5 text-primary" />
            {semester.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {new Date(semester.startDate).toLocaleDateString()} -{" "}
                {new Date(semester.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ClockIcon className="w-4 h-4" />
              <span>
                Created {new Date(semester.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-border transition-opacity">
            {!semester.isActive && (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setActiveSemester(semester)}
              >
                <RefreshCcwIcon className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setOpenFormEdit(true)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              // onClick={() => handleEdit(semester)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <SemesterForm
        open={openFormEdit}
        onOpenChange={setOpenFormEdit}
        mode="edit"
        semester={semester}
      />
    </>
  )
}

export default SemesterCard
