import courseRepository from "../repositories/courseRepository.js"
import semesterRepository from "../repositories/semesterRepository.js"
import { ErrorResponse } from "../utils/response.js"

const create = async (data, userId) => {
  const semester = await semesterRepository.findById(data.semesterId, userId)
  if (!semester) {
    throw new ErrorResponse("Semester not found or access denied", 404)
  }
  return await courseRepository.create(data, userId)
}

const getAll = async (userId, semesterId) => {
  return await courseRepository.findAll(userId, semesterId)
}

const update = async (id, data, userId) => {
  const course = await courseRepository.findById(id, userId)
  if (!course) {
    throw new ErrorResponse("Course not found", 404)
  }

  if (data.semesterId) {
    const semester = await semesterRepository.findById(data.semesterId, userId)
    if (!semester) {
      throw new ErrorResponse("Semester not found or access denied", 404)
    }
  }

  return await courseRepository.update(id, data, userId)
}

const remove = async (id, userId) => {
  const course = await courseRepository.findById(id, userId)
  if (!course) {
    throw new ErrorResponse("Course not found", 404)
  }
  return await courseRepository.remove(id, userId)
}

const courseService = {
  create,
  getAll,
  update,
  remove,
}

export default courseService
