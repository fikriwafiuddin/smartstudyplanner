import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import courseApi from "../api/courseApi"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { CourseFormValues } from "@/types/form"

export const useCourses = (semesterId?: string) => {
  return useQuery({
    queryKey: ["courses", semesterId],
    queryFn: () => courseApi.getAll(semesterId),
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CourseFormValues) => courseApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      toast.success("Course created successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create course")
    },
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<CourseFormValues> & { id: number }) =>
      courseApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      toast.success("Course updated successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update course")
    },
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => courseApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      toast.success("Course removed successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to remove course")
    },
  })
}
