import { axiosInstance } from "@/lib/axios"
import { Semester } from "@/types"
import { SemesterFormValues } from "@/types/form"

const getAll = async () => {
  const response = await axiosInstance.get("/semesters")
  return response.data.data as Semester[]
}

const create = async (data: SemesterFormValues) => {
  const response = await axiosInstance.post("/semesters", data)
  return response.data.data as Semester
}

const update = async ({
  id,
  ...data
}: Partial<SemesterFormValues> & { id: number }) => {
  const response = await axiosInstance.put(`/semesters/${id}`, data)
  return response.data.data as Semester
}

const remove = async (id: number) => {
  const response = await axiosInstance.delete(`/semesters/${id}`)
  return response.data
}

const semesterApi = {
  getAll,
  create,
  update,
  remove,
}

export default semesterApi
