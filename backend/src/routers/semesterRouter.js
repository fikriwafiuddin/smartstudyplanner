import express from "express"
import semesterController from "../controllers/semesterController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const semesterRouter = express.Router()

semesterRouter.use(authMiddleware)

semesterRouter.post("/", semesterController.create)
semesterRouter.get("/", semesterController.getAll)
semesterRouter.put("/:id", semesterController.update)
semesterRouter.delete("/:id", semesterController.remove)

export default semesterRouter
