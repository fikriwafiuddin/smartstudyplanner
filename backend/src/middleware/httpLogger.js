import morgan from "morgan"
import logger from "../lib/logger.js"

const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.info(`[HTTP] ${message.trim()}`),
    },
  },
)

export default httpLogger
