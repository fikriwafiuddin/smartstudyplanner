import { ErrorResponse } from "../utils/response.js"

const validate = async (data, schema) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.reduce((acc, curr) => {
      acc[curr.path[0]] = curr.message
      return acc
    }, {})
    throw new ErrorResponse("Validation error", 400, errors)
  }
  return result.data
}

export default validate
