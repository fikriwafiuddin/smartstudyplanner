"use client"

import { useFocus, MODES } from "@/context/FocusContext"
import { Play, Pause, Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function GlobalFocusTimer() {
  const {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    selectedTaskId,
    selectedCourseId,
  } = useFocus()
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isActive && timeLeft === MODES[mode].time) return null

  const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-2xl cursor-pointer hover:scale-105 transition-all flex items-center gap-2"
        onClick={() => setIsMinimized(false)}
      >
        <span className="text-xs font-mono font-bold">
          {formatTime(timeLeft)}
        </span>
        {isActive ? (
          <Pause className="w-3 h-3 fill-current" />
        ) : (
          <Play className="w-3 h-3 fill-current" />
        )}
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 bg-card border border-border/50 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {MODES[mode].label}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
            >
              <div className="w-2 h-0.5 bg-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive"
              onClick={resetTimer}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/focus"
            className="text-2xl font-black tabular-nums hover:text-primary transition-colors"
          >
            {formatTime(timeLeft)}
          </Link>
          <Button
            size="sm"
            variant={isActive ? "secondary" : "default"}
            className="h-8 rounded-full px-4"
            onClick={toggleTimer}
          >
            {isActive ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2 ml-1" />
            )}
            {isActive ? "Pause" : "Resume"}
          </Button>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {(selectedTaskId || selectedCourseId) && (
        <div className="bg-muted/50 px-4 py-2 border-t border-border/30">
          <p className="text-[10px] font-medium text-muted-foreground truncate italic">
            Focusing on:{" "}
            {selectedTaskId
              ? `Task #${selectedTaskId}`
              : `Course #${selectedCourseId}`}
          </p>
        </div>
      )}
    </div>
  )
}
