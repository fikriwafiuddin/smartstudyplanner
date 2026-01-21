import { supabase } from "../lib/supabase.js"
import { ErrorResponse } from "../utils/response.js"

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(new ErrorResponse("No token provided", 401))
  }

  const token = authHeader.split(" ")[1]

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res
        .status(401)
        .json(new ErrorResponse("Invalid or expired token", 401))
    }

    req.userId = user.id
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json(new ErrorResponse("Unauthorized access", 401))
  }
}

export default authMiddleware
