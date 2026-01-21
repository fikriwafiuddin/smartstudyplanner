import { LoginFormValues, RegisterFormValues } from "@/types/form"
import { createClient } from "@/lib/supabase/client"
import { axiosInstance } from "@/lib/axios"

const login = async (data: LoginFormValues) => {
  const supabase = createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) throw error

  return authData
}

const register = async (data: RegisterFormValues) => {
  const supabase = createClient()

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
      },
    },
  })

  if (error) throw error

  if (authData.user) {
    // Sync with backend using axiosInstance
    try {
      await axiosInstance.post("/auth/sync", {
        userId: authData.user.id,
        email: authData.user.email,
      })
    } catch (err) {
      console.error("Failed to sync user with backend:", err)
    }
  }

  return authData
}

const logout = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

const authApi = {
  login,
  register,
  logout,
}

export default authApi
