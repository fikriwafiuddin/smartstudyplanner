import { z } from "zod"

const createSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
  isActive: z.boolean().optional().default(false),
})

const updateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  startDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  endDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  isActive: z.boolean().optional(),
})

const semesterValidation = {
  createSchema,
  updateSchema,
}

export default semesterValidation
