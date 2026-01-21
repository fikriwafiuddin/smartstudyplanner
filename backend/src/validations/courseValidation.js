import { z } from "zod"

const createSchema = z.object({
  semesterId: z.number().int().positive("Semester ID is required"),
  name: z.string().min(1, "Name is required").max(100),
  code: z.string().max(20).optional().nullable(),
  color: z.string().min(1, "Color is required"),
  totalMeetings: z.number().int().min(0, "Total meetings cannot be negative"),
  completedMeetings: z
    .number()
    .int()
    .min(0, "Completed meetings cannot be negative")
    .optional()
    .default(0),
})

const updateSchema = z.object({
  semesterId: z.number().int().positive().optional(),
  name: z.string().min(1).max(100).optional(),
  code: z.string().max(20).optional().nullable(),
  color: z.string().min(1).optional(),
  totalMeetings: z.number().int().min(0).optional(),
  completedMeetings: z.number().int().min(0).optional(),
})

const courseValidation = {
  createSchema,
  updateSchema,
}

export default courseValidation
