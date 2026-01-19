"use client"

import { ScheduleItem } from "@/types"
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
  FormDescription,
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
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { scheduleFormSchema } from "@/validations/scheduleValidation"
import { ScheduleFormValues } from "@/types/form"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { StopCircle } from "lucide-react"

const colors = [
  { value: "bg-primary", label: "Blue", preview: "bg-primary" },
  { value: "bg-accent", label: "Accent", preview: "bg-accent" },
  { value: "bg-success", label: "Green", preview: "bg-success" },
  { value: "bg-warning", label: "Yellow", preview: "bg-warning" },
  { value: "bg-destructive", label: "Red", preview: "bg-destructive" },
  { value: "bg-indigo-500", label: "Indigo", preview: "bg-indigo-500" },
  { value: "bg-pink-500", label: "Pink", preview: "bg-pink-500" },
  { value: "bg-orange-500", label: "Orange", preview: "bg-orange-500" },
]

const days = [
  { value: "0", label: "Monday" },
  { value: "1", label: "Tuesday" },
  { value: "2", label: "Wednesday" },
  { value: "3", label: "Thursday" },
  { value: "4", label: "Friday" },
  { value: "5", label: "Saturday" },
  { value: "6", label: "Sunday" },
]

const hours = Array.from({ length: 14 }, (_, i) => ({
  value: String(7 + i),
  label: `${7 + i}:00`,
}))

const durations = [
  { value: "1", label: "1 hour" },
  { value: "2", label: "2 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
]

type ActivityFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleItem | null
}

function ActivityForm({ open, onOpenChange, schedule }: ActivityFormProps) {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: schedule
      ? {
          type: "activity",
          name: schedule.name,
          organizer: schedule.organizer || "",
          location: schedule.location,
          day: String(schedule.day),
          startHour: schedule.startHour,
          duration: schedule.duration,
          color: schedule.color,
          description: schedule.description || "",
          isRecurring: schedule.isRecurring || false,
          eventDate: "",
          stoppedAt: schedule.stoppedAt || "",
          semesterId: schedule.semesterId ? String(schedule.semesterId) : "",
          isActive: schedule.status !== "inactive",
          courseId: schedule.courseId ? String(schedule.courseId) : "",
          code: schedule.code || "",
          lecturer: schedule.lecturer || "",
        }
      : {
          type: "activity",
          name: "",
          organizer: "",
          location: "",
          day: "",
          startHour: "",
          duration: "1",
          color: "bg-primary",
          description: "",
          isRecurring: true,
          eventDate: "",
          stoppedAt: "",
          semesterId: "",
          isActive: true,
          courseId: "",
          code: "",
          lecturer: "",
        },
  })

  const handleSubmit: SubmitHandler<ScheduleFormValues> = (data) => {
    console.log("Submitting activity:", data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {schedule ? "Edit Activity" : "Add Activity"}
          </DialogTitle>
          <DialogDescription>
            {schedule
              ? "Update details for your recurring activity."
              : "Add a routine activity to your schedule."}
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
                  <FormLabel>Activity Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Student Council Meeting"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tech Club" {...field} />
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Room 301 or Auditorium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
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
                name="startHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-2">
              <div className="p-3 border rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <StopCircle className="w-4 h-4 text-destructive" />
                      Stop Schedule
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground leading-tight">
                      Set a date to stop this recurring activity.
                    </FormDescription>
                  </div>
                  {schedule && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => {
                        const today = new Date().toISOString().split("T")[0]
                        form.setValue("stoppedAt", today)
                      }}
                    >
                      Stop Now
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="stoppedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Recurring Weekly</FormLabel>
                      <FormDescription>
                        This activity repeats every week
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes or description..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                {schedule ? "Save Changes" : "Add Activity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityForm
