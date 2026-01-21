import { useMutation } from "@tanstack/react-query"
import authApi from "../api/authApi"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LoginFormValues, RegisterFormValues } from "@/types/form"

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginFormValues) => authApi.login(data),
    onSuccess: (data) => {
      if (data.session) {
        toast.success("Welcome back!")
        router.push("/dashboard")
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid login credentials")
    },
  })
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterFormValues) => authApi.register(data),
    onSuccess: (data) => {
      if (data.user) {
        toast.success(
          "Account created successfully! Please check your email for verification.",
        )
        router.push("/auth/login")
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong during registration")
    },
  })
}
export const useLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      toast.success("Logged out successfully")
      router.push("/auth/login")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to logout")
    },
  })
}
