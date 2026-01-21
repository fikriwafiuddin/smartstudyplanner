import { axiosInstance } from "@/lib/axios"
import { Course } from "@/types"
import { CourseFormValues } from "@/types/form"

const getAll = async (semesterId?: string) => {
  const response = await axiosInstance.get("/courses", {
    params: { semesterId },
  })
  return response.data.data as Course[]
}

const create = async (data: CourseFormValues) => {
  const response = await axiosInstance.post("/courses", data)
  return response.data.data as Course
}

const update = async ({
  id,
  ...data
}: Partial<CourseFormValues> & { id: number }) => {
  const response = await axiosInstance.put(`/courses/${id}`, data)
  return response.data.data as Course
}

const remove = async (id: number) => {
  const response = await axiosInstance.delete(`/courses/${id}`)
  return response.data
}

const courseApi = {
  getAll,
  create,
  update,
  remove,
}

export default courseApi
