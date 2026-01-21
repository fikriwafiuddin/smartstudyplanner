import { z } from "zod"

export const semesterFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    startDate: z.date({
      error: (iss) =>
        iss.input === undefined || iss.input === ""
          ? "Start date is required"
          : "Start date must be a date",
    }),
    endDate: z.date({
      error: (iss) =>
        iss.input === undefined || iss.input === ""
          ? "End date is required"
          : "End date must be a date",
    }),
    isActive: z.boolean(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
