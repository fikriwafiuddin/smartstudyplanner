"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react"
import { toast } from "sonner"

export const MODES = {
  POMODORO: { label: "Pomodoro", time: 25 * 60 },
  SHORT_BREAK: { label: "Short Break", time: 5 * 60 },
  LONG_BREAK: { label: "Long Break", time: 15 * 60 },
}

type FocusMode = keyof typeof MODES

interface FocusContextType {
  mode: FocusMode
  timeLeft: number
  isActive: boolean
  selectedCourseId: string | null
  selectedTaskId: string | null
  sessionsCompleted: number
  setFocusMode: (mode: FocusMode) => void
  toggleTimer: () => void
  resetTimer: () => void
  startFocusSession: (courseId?: string, taskId?: string) => void
  showRatingDialog: boolean
  setShowRatingDialog: (show: boolean) => void
  onSessionComplete: () => void
}

const FocusContext = createContext<FocusContextType | undefined>(undefined)

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<FocusMode>("POMODORO")
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.time)
  const [isActive, setIsActive] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [showRatingDialog, setShowRatingDialog] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const toggleTimer = useCallback(() => setIsActive((prev) => !prev), [])

  const resetTimer = useCallback(() => {
    setIsActive(false)
    setTimeLeft(MODES[mode].time)
  }, [mode])

  const setFocusMode = useCallback((newMode: FocusMode) => {
    setMode(newMode)
    setIsActive(false)
    setTimeLeft(MODES[newMode].time)
  }, [])

  const startFocusSession = useCallback(
    (courseId?: string, taskId?: string) => {
      setSelectedCourseId(courseId || null)
      setSelectedTaskId(taskId || null)
      setMode("POMODORO")
      setTimeLeft(MODES.POMODORO.time)
      setIsActive(true)
      toast.info("Focus session started!")
    },
    [],
  )

  const onSessionComplete = useCallback(() => {
    setIsActive(false)
    if (mode === "POMODORO") {
      setSessionsCompleted((prev) => prev + 1)
      setShowRatingDialog(true)
    } else {
      toast.success("Break over! Ready to focus?")
      setFocusMode("POMODORO")
    }
  }, [mode, setFocusMode])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current)
            setTimeout(() => onSessionComplete(), 0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, timeLeft, onSessionComplete])

  return (
    <FocusContext.Provider
      value={{
        mode,
        timeLeft,
        isActive,
        selectedCourseId,
        selectedTaskId,
        sessionsCompleted,
        setFocusMode,
        toggleTimer,
        resetTimer,
        startFocusSession,
        showRatingDialog,
        setShowRatingDialog,
        onSessionComplete,
      }}
    >
      {children}
    </FocusContext.Provider>
  )
}

export const useFocus = () => {
  const context = useContext(FocusContext)
  if (context === undefined) {
    throw new Error("useFocus must be used within a FocusProvider")
  }
  return context
}
