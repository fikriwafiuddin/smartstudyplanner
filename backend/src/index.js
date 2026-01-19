import express from "express"
import cors from "cors"
import "dotenv/config"

import logger from "./lib/logger.js"
import router from "./routers/router.js"
import httpLogger from "./middleware/httpLogger.js"

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)

app.use(router)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
