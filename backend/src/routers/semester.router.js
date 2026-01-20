import { Router } from "express"
import prisma from "../lib/db.js"

const router = Router()

// GET all semesters for a user
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query // UUID from Supabase Auth

    if (!userId) {
      return res.status(400).json({ error: "userId is required" })
    }

    const semesters = await prisma.semester.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    })

    res.json(semesters)
  } catch (error) {
    next(error)
  }
})

// POST new semester
router.post("/", async (req, res, next) => {
  try {
    const { userId, name, startDate, endDate, isActive } = req.body

    if (!userId) {
      return res.status(400).json({ error: "userId is required" })
    }

    const semester = await prisma.semester.create({
      data: {
        userId,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive || false,
      },
    })

    res.status(201).json(semester)
  } catch (error) {
    next(error)
  }
})

export default router
