import z from "zod"

export const loginFormSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),
  password: z.string().min(8, {
    error: "Password must be at least 8 characters long",
  }),
})

export const registerFormSchema = z
  .object({
    name: z.string().min(3, {
      error: "Name must be at least 3 characters long",
    }),
    email: z.email({
      error: "Invalid email address",
    }),
    password: z.string().min(8, {
      error: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      error: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  })
