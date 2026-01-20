import semesterRepository from "../repositories/semesterRepository.js"
import { ErrorResponse } from "../utils/response.js"

const create = async (data, userId) => {
  if (data.isActive) {
    await semesterRepository.deactivateAll(userId)
  }

  // If this is the first semester, make it active by default if not specified
  const existingSemesters = await semesterRepository.findAll(userId)
  if (existingSemesters.length === 0) {
    data.isActive = true
  }

  return await semesterRepository.create(data, userId)
}

const getAll = async (userId) => {
  return await semesterRepository.findAll(userId)
}

const update = async (id, data, userId) => {
  const semester = await semesterRepository.findById(id, userId)
  if (!semester) {
    throw new ErrorResponse("Semester not found", 404)
  }

  if (data.isActive) {
    await semesterRepository.deactivateAll(userId)
  }

  return await semesterRepository.update(id, data, userId)
}

const remove = async (id, userId) => {
  const semester = await semesterRepository.findById(id, userId)
  if (!semester) {
    throw new ErrorResponse("Semester not found", 404)
  }

  return await semesterRepository.remove(id, userId)
}

const semesterService = {
  create,
  getAll,
  update,
  remove,
}

export default semesterService
