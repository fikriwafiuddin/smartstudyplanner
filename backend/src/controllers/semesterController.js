import semesterService from "../services/semesterService.js"
import validate from "../validations/validation.js"
import semesterValidation from "../validations/semesterValidation.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const userId = req.userId
    const request = req.body
    const validatedData = await validate(
      request,
      semesterValidation.createSchema,
    )
    const semester = await semesterService.create(validatedData, userId)

    return res
      .status(201)
      .json(new SuccessResponse("Semester successfully created", semester))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const userId = req.userId
    const semesters = await semesterService.getAll(userId)

    return res.json(
      new SuccessResponse("Semesters successfully retrieved", semesters),
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
    const validatedData = await validate(
      request,
      semesterValidation.updateSchema,
    )
    const semester = await semesterService.update(id, validatedData, userId)

    return res.json(
      new SuccessResponse("Semester successfully updated", semester),
    )
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.userId
    const id = parseInt(req.params.id)
    await semesterService.remove(id, userId)

    return res.json(new SuccessResponse("Semester successfully removed"))
  } catch (error) {
    next(error)
  }
}

const semesterController = {
  create,
  getAll,
  update,
  remove,
}

export default semesterController
