"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RotateCcw,
  Trophy,
  History,
  Target,
  Settings2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { useFocus, MODES } from "@/context/FocusContext"

const mockCourses = [
  { id: 1, name: "Human Computer Interaction" },
  { id: 2, name: "Data Structures & Algorithm" },
  { id: 3, name: "Database Systems" },
]

export default function FocusPage() {
  const {
    mode,
    timeLeft,
    isActive,
    selectedCourseId,
    sessionsCompleted,
    toggleTimer,
    resetTimer,
    setFocusMode,
    showRatingDialog,
    setShowRatingDialog,
    startFocusSession,
  } = useFocus()

  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")
  const [sessionHistory, setSessionHistory] = useState([
    {
      id: 1,
      course: "Human Computer Interaction",
      duration: "25m",
      time: "10:30 AM",
      rating: 4,
    },
    {
      id: 2,
      course: "Data Structures & Algorithm",
      duration: "25m",
      time: "09:45 AM",
      rating: 5,
    },
    {
      id: 3,
      course: "Data Structures & Algorithm",
      duration: "25m",
      time: "09:00 AM",
      rating: 3,
    },
  ])

  const currentMode = MODES[mode as keyof typeof MODES]
  const progress = ((currentMode.time - timeLeft) / currentMode.time) * 100

  const handleSaveSession = () => {
    const courseName =
      mockCourses.find((c) => c.id.toString() === selectedCourseId)?.name ||
      "Self Study"
    const newSession = {
      id: Date.now(),
      course: courseName,
      duration: "25m",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      rating,
    }
    setSessionHistory([newSession, ...sessionHistory])
    setShowRatingDialog(false)
    setRating(0)
    setNotes("")
    toast.success("Session saved!")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How was your focus?</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={cn(
                      "p-1 transition-transform hover:scale-110",
                      rating >= star ? "text-warning" : "text-muted",
                    )}
                  >
                    <Star
                      className="w-8 h-8"
                      fill={rating >= star ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {rating === 0
                  ? "Select a rating"
                  : rating === 5
                    ? "Peak performance!"
                    : rating >= 4
                      ? "Great job!"
                      : rating >= 3
                        ? "Good focus"
                        : "Could be better"}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Notes</label>
              <Textarea
                placeholder="What did you accomplish? Any distractions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRatingDialog(false)}
            >
              Skip
            </Button>
            <Button onClick={handleSaveSession} disabled={rating === 0}>
              Save Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Focus Tracker</h1>
        <p className="text-muted-foreground">
          Maximize your productivity with Pomodoro sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Card */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl bg-linear-to-br from-card to-secondary/30">
          <CardContent className="pt-10 flex flex-col items-center text-center">
            <div className="flex bg-muted p-1 rounded-xl mb-10">
              {Object.entries(MODES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setFocusMode(key as keyof typeof MODES)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    mode === key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value.label}
                </button>
              ))}
            </div>

            <div className="relative mb-8">
              <svg className="w-64 h-64 -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                  className="text-primary transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black tracking-tighter tabular-nums text-foreground">
                  {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {mode.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <Button
                size="lg"
                className="h-16 w-16 rounded-full shadow-lg"
                onClick={toggleTimer}
              >
                {isActive ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={resetTimer}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

            <div className="w-full max-w-sm space-y-3 pb-6">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Now studying:
              </label>
              <Select
                value={selectedCourseId || ""}
                onValueChange={(val) => startFocusSession(val)}
              >
                <SelectTrigger className="w-full bg-background/50 border-border/50 backdrop-blur-sm">
                  <SelectValue placeholder="What are you studying?" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats & History */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Focus Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">{sessionsCompleted}</p>
                  <p className="text-xs text-muted-foreground">sessions</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Focus Time
                  </p>
                  <p className="text-2xl font-bold">{sessionsCompleted * 25}</p>
                  <p className="text-xs text-muted-foreground">minutes</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Daily Goal</span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {Math.min(sessionsCompleted, 8)}/8
                  </span>
                </div>
                <Progress
                  value={(sessionsCompleted / 8) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="pb-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Recent Sessions
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sessionHistory.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold leading-none">
                          {session.course}
                        </p>
                        {session.rating && (
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-warning text-warning" />
                            <span className="text-[10px] font-bold text-warning">
                              {session.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {session.duration}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs text-muted-foreground py-4 h-auto"
              >
                View all history
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
