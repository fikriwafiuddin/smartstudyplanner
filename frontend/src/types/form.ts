import {
  createGroupSchema,
  joinGroupSchema,
} from "@/validations/groupvalidation"
import { taskFormSchema } from "@/validations/taskValidation"
import { z } from "zod"

export type TaskFormValues = z.infer<typeof taskFormSchema>

export type GroupFormValues = z.infer<typeof createGroupSchema>
export type JoinGroupValues = z.infer<typeof joinGroupSchema>
