import { PriorityTask } from "@/types"

/**
 * Helper to calculate priority based on position in list
 */
export function calculatePriority(
  index: number,
  totalItems: number
): PriorityTask {
  if (totalItems <= 1) return "high"
  const position = index / (totalItems - 1)
  if (position <= 0.33) return "high"
  if (position <= 0.66) return "medium"
  return "low"
}
