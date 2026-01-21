"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteSemester } from "@/services/hooks/semesterHook"
import { Semester } from "@/types"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type SemesterDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  semester: Semester
}

export default function SemesterDeleteDialog({
  open,
  onOpenChange,
  semester,
}: SemesterDeleteDialogProps) {
  const { mutate, isPending: isDeleting } = useDeleteSemester()
  const handleDelete = () => {
    mutate(semester.id, {
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            semester{" "}
            <span className="font-semibold text-foreground">
              &quot;{semester.name}&quot;
            </span>{" "}
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
