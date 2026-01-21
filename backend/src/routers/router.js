import express from "express"
import { ErrorResponse, SuccessResponse } from "../utils/response.js"
import errorMiddleware from "../middleware/errorMiddleware.js"
import semesterRouter from "./semesterRouter.js"
import authRouter from "./auth.router.js"

const router = express.Router()

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Routes
router.use("/auth", authRouter)
router.use("/semesters", semesterRouter)

router.get("/", (req, res) => {
  return res.json(new SuccessResponse("Welcome to SmartStudyPlanner API"))
})

router.all(/.*/, (req, res) => {
  return res.status(404).json(new ErrorResponse("Not Found", 404))
})

// Error Handling
router.use(errorMiddleware)

export default router
