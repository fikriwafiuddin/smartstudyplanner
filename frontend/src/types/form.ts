import { taskFormSchema } from "@/validations/taskValidation"
import { z } from "zod"

export type TaskFormValues = z.infer<typeof taskFormSchema>
