import { API_URL } from "@/constants"
import axios from "axios"
import { createClient } from "./supabase/client"

export const axiosInstance = axios.create({
  baseURL: API_URL,
})

axiosInstance.interceptors.request.use(async (config) => {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
