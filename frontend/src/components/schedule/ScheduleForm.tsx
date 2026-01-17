"use client"

import { ScheduleItem, ScheduleItemType } from "@/types"
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
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { scheduleFormSchema } from "@/validations/scheduleValidation"
import { ScheduleFormValues } from "@/types/form"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"

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

const itemTypes: { value: ScheduleItemType; label: string }[] = [
  { value: "course", label: "Course" },
  { value: "activity", label: "Routine Activity" },
  { value: "event", label: "One-time Event" },
]

type ScheduleFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleItem | null
}

function ScheduleForm({ open, onOpenChange, schedule }: ScheduleFormProps) {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: schedule || {
      type: "activity",
      name: "",
      code: "",
      lecturer: "",
      organizer: "",
      location: "",
      day: "",
      startHour: "",
      duration: "1",
      color: "bg-primary",
      description: "",
      isRecurring: true,
      eventDate: "",
    },
  })

  const watchType = useWatch({
    control: form.control,
    name: "type",
  })
  const watchIsRecurring = useWatch({
    control: form.control,
    name: "isRecurring",
  })

  const getTypeSpecificLabels = () => {
    switch (watchType) {
      case "course":
        return { personLabel: "Lecturer", personPlaceholder: "e.g., Dr. Smith" }
      case "activity":
        return {
          personLabel: "Organizer",
          personPlaceholder: "e.g., Student Council",
        }
      case "event":
        return {
          personLabel: "Organizer",
          personPlaceholder: "e.g., Tech Club",
        }
      default:
        return { personLabel: "Person", personPlaceholder: "" }
    }
  }

  const { personLabel, personPlaceholder } = getTypeSpecificLabels()

  const handleSubmit = (data: ScheduleFormValues) => {
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {schedule ? "Add to Schedule" : "Edit Schedule Item"}
          </DialogTitle>
          <DialogDescription>
            {schedule
              ? "Add a course, routine activity, or one-time event."
              : "Update schedule item details."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          watchType === "course"
                            ? "e.g., Data Structures"
                            : watchType === "activity"
                              ? "e.g., Student Council Meeting"
                              : "e.g., AI Workshop Seminar"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchType === "course" && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CS201" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem
                    className={watchType !== "course" ? "col-span-2" : ""}
                  >
                    <FormLabel>Color</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <FormField
                control={form.control}
                name={watchType === "course" ? "lecturer" : "organizer"}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>{personLabel}</FormLabel>
                    <FormControl>
                      <Input placeholder={personPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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

              {watchType === "event" && !watchIsRecurring && (
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Duration</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem
                            key={duration.value}
                            value={duration.value}
                          >
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchType !== "event" && (
                <FormField
                  control={form.control}
                  name="isRecurring"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Recurring Weekly</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          This item repeats every week
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {schedule ? "Add to Schedule" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleForm
