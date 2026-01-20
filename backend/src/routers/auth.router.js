import { Router } from "express"
import prisma from "../lib/db.js"

const router = Router()

// Sync user from Supabase Auth
router.post("/sync", async (req, res, next) => {
  try {
    const { userId, email } = req.body

    if (!userId || !email) {
      return res.status(400).json({ error: "userId and email are required" })
    }

    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: {
        id: userId,
        email,
      },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Handle user preferences
router.post("/preferences", async (req, res, next) => {
  try {
    const { userId, timezone } = req.body

    if (!userId) {
      return res.status(400).json({ error: "userId is required" })
    }

    const preferences = await prisma.userPreference.upsert({
      where: { userId },
      update: { timezone: timezone || "UTC" },
      create: {
        userId,
        timezone: timezone || "UTC",
      },
    })

    res.json(preferences)
  } catch (error) {
    next(error)
  }
})

export default router
