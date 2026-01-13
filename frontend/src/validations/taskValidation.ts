import { z } from "zod"

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Title must be less than 100 characters"),
  course: z.string().min(1, "Please select a course"),
  priority: z.enum(["high", "medium", "low"], {
    error: "Please select a priority level",
  }),
  deadline: z.date({
    error: "Please select a deadline",
  }),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
})
