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
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { semesterFormSchema } from "@/validations/semesterValidation"
import { SemesterFormValues } from "@/types/form"
import { Button } from "../ui/button"
import { Semester } from "@/types"
import { Switch } from "../ui/switch"

type SemesterFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  semester?: Semester
}

export default function SemesterForm({
  open,
  onOpenChange,
  mode,
  semester,
}: SemesterFormProps) {
  const form = useForm<SemesterFormValues>({
    resolver: zodResolver(semesterFormSchema),
    defaultValues: {
      name: semester?.name || "",
      startDate: semester?.startDate || "",
      endDate: semester?.endDate || "",
      isActive: semester?.isActive || true,
    },
  })

  // Re-sync form when semester prop changes
  if (semester && form.getValues("name") !== semester.name && mode === "edit") {
    form.reset({
      name: semester.name,
      startDate: semester.startDate,
      endDate: semester.endDate,
      isActive: semester.isActive,
    })
  }

  const handleSubmit = (data: SemesterFormValues) => {
    console.log(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Semester" : "Edit Semester"}
          </DialogTitle>
          <DialogDescription>
            Definisikan rentang waktu akademik Anda.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Odd Semester 2023/2024"
                      {...field}
                      value={(field.value as string) || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={(field.value as string) || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Active Semester</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Set as the current active semester
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {mode === "create" ? "Create Semester" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
