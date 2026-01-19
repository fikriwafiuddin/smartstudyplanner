import {
  addSharedTaskSchema,
  createGroupSchema,
  inviteMemberSchema,
  joinGroupSchema,
} from "@/validations/groupvalidation"
import { scheduleFormSchema } from "@/validations/scheduleValidation"
import { semesterFormSchema } from "@/validations/semesterValidation"
import { taskFormSchema } from "@/validations/taskValidation"
import { z } from "zod"

export type TaskFormValues = z.infer<typeof taskFormSchema>

export type GroupFormValues = z.infer<typeof createGroupSchema>
export type JoinGroupValues = z.infer<typeof joinGroupSchema>
export type InviteMemberValues = z.infer<typeof inviteMemberSchema>
export type AddSharedTaskValues = z.infer<typeof addSharedTaskSchema>

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>

export type SemesterFormValues = z.infer<typeof semesterFormSchema>
