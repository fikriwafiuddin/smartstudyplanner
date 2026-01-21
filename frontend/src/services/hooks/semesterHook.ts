import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import semesterApi from "../api/semesterApi"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { SemesterFormValues } from "@/types/form"

export const useSemesters = () => {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: semesterApi.getAll,
  })
}

export const useCreateSemester = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SemesterFormValues) => semesterApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semesters"] })
      toast.success("Semester created successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create semester")
    },
  })
}

export const useUpdateSemester = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<SemesterFormValues> & { id: number }) =>
      semesterApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semesters"] })
      toast.success("Semester updated successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update semester")
    },
  })
}

export const useDeleteSemester = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => semesterApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semesters"] })
      toast.success("Semester removed successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Failed to remove semester")
    },
  })
}
