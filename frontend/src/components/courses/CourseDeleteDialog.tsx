"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Course } from "@/types"
import { useDeleteCourse } from "@/services/hooks/courseHook"
import { Spinner } from "../ui/spinner"

type CourseDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course
}

export default function CourseDeleteDialog({
  open,
  onOpenChange,
  course,
}: CourseDeleteDialogProps) {
  const { mutate, isPending: isDeleting } = useDeleteCourse()

  const handleDelete = () => {
    mutate(course.id, {
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
            course{" "}
            <span className="font-semibold text-foreground">
              &quot;{course.name}&quot;
            </span>{" "}
            and all associated data (tasks, assessments, resources).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner className="mr-2" /> : null}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
