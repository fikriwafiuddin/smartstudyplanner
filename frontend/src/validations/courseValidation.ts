import { z } from "zod"

export const courseFormSchema = z.object({
  semesterId: z.number("Semester is required").int().positive(),
  name: z.string().min(1, "Name is required").max(100),
  code: z.string().max(20).optional().nullable(),
  color: z.string().min(1, "Color is required"),
  totalMeetings: z
    .int({
      error: (iss) =>
        iss.input == undefined || iss.input == ""
          ? "Total meetings is required"
          : "Total meetings must be a number",
    })
    .min(0, "Total meetings cannot be negative"),
  completedMeetings: z.number().int().min(0).default(0),
})
