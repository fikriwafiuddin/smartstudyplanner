"use client"

import {
  Plus,
  BookOpen,
  Trophy,
  Calculator,
  Calendar,
  MoreVertical,
} from "lucide-react"
import { useSemester } from "@/context/SemesterContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, TrendingUp } from "lucide-react"

const mockAssessments = [
  {
    id: 1,
    semesterId: 1,
    name: "Midterm Exam",
    course: "Human Computer Interaction",
    type: "exam",
    date: "2024-03-15",
    weight: 30,
    score: 85,
    maxScore: 100,
  },
  {
    id: 2,
    semesterId: 1,
    name: "Quiz 1",
    course: "Data Structures & Algorithm",
    type: "quiz",
    date: "2024-02-20",
    weight: 10,
    score: 90,
    maxScore: 100,
  },
  {
    id: 3,
    semesterId: 2,
    name: "Final Project",
    course: "Database Systems",
    type: "project",
    date: "2024-06-20",
    weight: 40,
    score: null,
    maxScore: 100,
  },
  {
    id: 4,
    semesterId: 2,
    name: "Theory Quiz",
    course: "Computer Networks",
    type: "quiz",
    date: "2025-01-10",
    weight: 15,
    score: 95,
    maxScore: 100,
  },
]

const getGrade = (score: number) => {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

const calculateGPA = (assessments: typeof mockAssessments) => {
  const scored = assessments.filter((a) => a.score !== null)
  if (scored.length === 0) return 0
  const totalPoints = scored.reduce((acc, a) => {
    const grade = (a.score! / a.maxScore) * 4
    return acc + grade * a.weight
  }, 0)
  const totalWeight = scored.reduce((acc, a) => acc + a.weight, 0)
  return totalWeight > 0 ? (totalPoints / totalWeight).toFixed(2) : "0.00"
}

export default function AssessmentsPage() {
  const { activeSemester } = useSemester()

  const filteredAssessments = mockAssessments.filter(
    (a) => a.semesterId === activeSemester?.id,
  )

  const currentGPA = calculateGPA(filteredAssessments)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Track your exams, quizzes, and project grades.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calculator className="w-4 h-4" />
            GPA Calculator
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Assessment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              Academic Standing
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-4xl font-black text-primary">{currentGPA}</p>
              <p className="text-sm text-muted-foreground font-medium">
                Current GPA
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Credits</span>
                <span className="font-bold">12/18</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="list" className="w-full">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Performance Tracking
                </h3>
                <TabsList className="h-8 bg-muted/50">
                  <TabsTrigger value="list" className="text-xs">Active</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <TabsContent value="list" className="mt-0">
                <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 hover:bg-muted/10 border-b border-border/50">
                  <TableHead className="w-[200px] font-bold text-foreground">
                    Assessment
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Type
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Course
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Weight
                  </TableHead>
                  <TableHead className="text-right font-bold text-foreground">
                    Score
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length > 0 ? (
                  filteredAssessments.map((a) => (
                    <TableRow
                      key={a.id}
                      className="hover:bg-muted/5 border-b border-border/30 last:border-0 transition-colors text-xs"
                    >
                      <TableCell>
                        <div className="font-medium text-sm">{a.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {a.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "capitalize text-[10px] h-5 px-1.5",
                            a.type === "exam"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : a.type === "quiz"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-warning/10 text-warning border-warning/20",
                          )}
                        >
                          {a.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{a.course}</TableCell>
                      <TableCell>{a.weight}%</TableCell>
                      <TableCell className="text-right">
                        {a.score !== null ? (
                          <div className="flex flex-col items-end">
                            <span className="font-bold">
                              {a.score}/{a.maxScore}
                            </span>
                            <span className="text-[10px] text-success font-bold font-mono">
                              GRADE: {getGrade((a.score! / a.maxScore) * 100)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic bg-muted/30 px-2 py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted/50"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem className="text-xs">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground italic bg-muted/5"
                    >
                      No assessments found for this semester.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="history" className="mt-0">
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                <History className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="max-w-xs mx-auto">
                <h4 className="font-semibold mb-1">Grade History</h4>
                <p className="text-[10px] text-muted-foreground">
                  Your historical performance across previous semesters will
                  appear here once they are archived.
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                View Detailed Analytics
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
      </div>
    </div>
  )
}
