import z from "zod"

export const createGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters"),
  description: z.string().optional(),
  color: z.string(),
})

export const joinGroupSchema = z.object({
  inviteCode: z
    .string()
    .min(1, "Invite code is required")
    .regex(
      /^[A-Z]{3}-\d{4}-[A-Z0-9]{1,2}$/,
      "Invalid invite code format (e.g., ABC-2025-XY)"
    ),
})

export const inviteMemberSchema = z.object({
  email: z.email("Please enter a valid email address"),
})

export const addSharedTaskSchema = z.object({
  title: z.string().min(3, "Task title must be at least 3 characters"),
  description: z.string().optional(),
  assignee: z.string().min(1, "Please assign this task to a member"),
})
