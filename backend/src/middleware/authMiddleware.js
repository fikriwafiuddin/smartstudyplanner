import { ErrorResponse } from "../utils/response.js"

const authMiddleware = (req, res, next) => {
  const { userId } = req.auth()
  if (!userId) {
    return res.status(401).json(new ErrorResponse("Unauthorized access", 401))
  }

  req.user = userId
  next()
}

export default authMiddleware
