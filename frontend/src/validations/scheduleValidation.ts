import { z } from "zod"

export const scheduleFormSchema = z
  .object({
    type: z.enum(["course", "activity", "event"]),
    name: z.string().min(1, "Name is required").max(100),
    code: z.string().max(20).optional(),
    lecturer: z.string().max(100).optional(),
    organizer: z.string().max(100).optional(),
    location: z.string().min(1, "Location is required").max(100),
    day: z.string().min(1, "Day is required"),
    startHour: z.string().min(1, "Start time is required"),
    duration: z.string().min(1, "Duration is required"),
    color: z.string().min(1, "Color is required"),
    description: z.string().max(500).optional(),
    isRecurring: z.boolean(),
    eventDate: z.string().optional(),
    stoppedAt: z.string().optional(),
    semesterId: z.string().optional(),
    courseId: z.string().optional(),
    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "event" && !data.eventDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Event date is required for events",
        path: ["eventDate"],
      })
    }
  })
