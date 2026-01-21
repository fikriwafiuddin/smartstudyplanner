"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseFormSchema } from "@/validations/courseValidation"
import { CourseFormValues } from "@/types/form"
import { Button } from "../ui/button"
import { Course } from "@/types"
import { useSemester } from "@/context/SemesterContext"
import { useCreateCourse, useUpdateCourse } from "@/services/hooks/courseHook"
import { Spinner } from "../ui/spinner"

const colors = [
  { value: "bg-blue-500", label: "Blue", preview: "bg-blue-500" },
  { value: "bg-red-500", label: "Red", preview: "bg-red-500" },
  { value: "bg-green-500", label: "Green", preview: "bg-green-500" },
  { value: "bg-yellow-500", label: "Yellow", preview: "bg-yellow-500" },
  { value: "bg-purple-500", label: "Purple", preview: "bg-purple-500" },
  { value: "bg-pink-500", label: "Pink", preview: "bg-pink-500" },
  { value: "bg-orange-500", label: "Orange", preview: "bg-orange-500" },
  { value: "bg-indigo-500", label: "Indigo", preview: "bg-indigo-500" },
]

type CourseFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  course?: Course
}

function CourseForm({ open, onOpenChange, mode, course }: CourseFormProps) {
  const { semesters, activeSemester } = useSemester()
  const createMutation = useCreateCourse()
  const updateMutation = useUpdateCourse()

  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: course?.name || "",
      code: course?.code || "",
      color: course?.color || "bg-blue-500",
      semesterId: course?.semesterId || activeSemester?.id || 0,
      totalMeetings: course?.totalMeetings || 14,
      completedMeetings: course?.completedMeetings || 0,
    },
  })

  // Re-sync form when course prop changes
  // if (course && form.getValues("name") !== course.name && mode === "edit") {
  //   form.reset({
  //     name: course.name,
  //     code: course.code,
  //     color: course.color,
  //     semesterId: course.semesterId,
  //     totalMeetings: course.totalMeetings,
  //     completedMeetings: course.completedMeetings,
  //   })
  // }

  const handleSubmit = (data: CourseFormValues) => {
    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
        },
      })
    } else if (mode === "edit" && course) {
      updateMutation.mutate(
        { id: course.id, ...data },
        {
          onSuccess: () => onOpenChange(false),
        },
      )
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Course" : "Edit Course"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Define your course details and tracking."
              : "Update course details."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="semesterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(parseInt(val))}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {semesters.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Data Structures" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., CS201"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select color">
                            {field.value && (
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded ${field.value}`}
                                />
                                <span>
                                  {
                                    colors.find((c) => c.value === field.value)
                                      ?.label
                                  }
                                </span>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded ${color.preview}`}
                              />
                              <span>{color.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalMeetings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Meetings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completedMeetings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed Meetings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner />
                ) : mode === "create" ? (
                  "Add Course"
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CourseForm
