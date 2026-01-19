import { z } from "zod"

export const semesterFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isActive: z.boolean(),
})
