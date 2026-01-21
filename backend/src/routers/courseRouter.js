import express from "express"
import courseController from "../controllers/courseController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const courseRouter = express.Router()

courseRouter.use(authMiddleware)

courseRouter.post("/", courseController.create)
courseRouter.get("/", courseController.getAll)
courseRouter.put("/:id", courseController.update)
courseRouter.delete("/:id", courseController.remove)

export default courseRouter
