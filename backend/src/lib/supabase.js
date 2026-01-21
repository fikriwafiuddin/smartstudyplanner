import { createClient } from "@supabase/supabase-js"
import logger from "./logger.js"

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || ""

if (!supabaseUrl || !supabaseSecretKey) {
  logger.error("Supabase credentials missing in backend environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey)
