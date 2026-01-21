import courseService from "../services/courseService.js"
import validate from "../validations/validation.js"
import courseValidation from "../validations/courseValidation.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const userId = req.userId
    const request = req.body
    const validatedData = await validate(request, courseValidation.createSchema)
    const course = await courseService.create(validatedData, userId)

    return res
      .status(201)
      .json(new SuccessResponse("Course successfully created", course))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const userId = req.userId
    const { semesterId } = req.query
    const courses = await courseService.getAll(userId, semesterId)

    return res.json(
      new SuccessResponse("Courses successfully retrieved", courses),
    )
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.userId
    const id = parseInt(req.params.id)
    const request = req.body
    const validatedData = await validate(request, courseValidation.updateSchema)
    const course = await courseService.update(id, validatedData, userId)

    return res.json(new SuccessResponse("Course successfully updated", course))
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.userId
    const id = parseInt(req.params.id)
    await courseService.remove(id, userId)

    return res.json(new SuccessResponse("Course successfully removed"))
  } catch (error) {
    next(error)
  }
}

const courseController = {
  create,
  getAll,
  update,
  remove,
}

export default courseController
