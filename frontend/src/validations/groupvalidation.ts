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
