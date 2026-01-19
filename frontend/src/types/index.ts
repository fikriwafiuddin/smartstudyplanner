export type PriorityTask = "high" | "medium" | "low"

export type Task = {
  id: number
  userId: number
  semesterId: number
  courseId: number | null
  parentTaskId: number | null
  title: string
  course?: string
  description?: string
  deadline: string
  priority: PriorityTask
  completed: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export type Group = {
  id: number
  ownerId: number
  name: string
  description?: string
  inviteCode: string
  color: string
  memberCount: number
  lastActive: string
  createdAt: string
  updatedAt: string
}

export type FilterType = "all" | "today" | "upcoming" | "completed"

export type ScheduleItemType = "course" | "activity" | "event"
export type ScheduleStatus = "active" | "paused" | "archived" | "inactive"

export type ScheduleItem = {
  id: string
  userId: number
  courseId: number | null
  semesterId: number | null
  type: ScheduleItemType
  name: string
  code?: string
  lecturer?: string
  organizer?: string
  location: string
  day: number // 0-6
  startHour: string
  duration: string
  color: string
  description?: string
  isRecurring: boolean
  eventDate?: string
  stoppedAt?: string
  status: ScheduleStatus
  pausedAt?: string
  createdAt: string
  updatedAt: string
}

// New Types from ERD
export type User = {
  id: number
  clerkUserId: string
  createdAt: string
  updatedAt: string
}

export type UserPreferences = {
  id: number
  userId: number
  timezone: string
  reminderDefaultMinutes: number
  startOfWeek: number // 0-6
  workingHoursStart: string
  workingHoursEnd: string
  updatedAt: string
}

export type Semester = {
  id: number
  userId: number
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type Course = {
  id: number
  userId: number
  semesterId: number
  name: string
  code?: string
  color: string
  totalMeetings: number
  completedMeetings: number
  createdAt: string
  updatedAt: string
}

export type AssessmentType =
  | "exam"
  | "quiz"
  | "project"
  | "paper"
  | "assignment"

export type Assessment = {
  id: number
  courseId: number
  semesterId: number
  type: AssessmentType
  name: string
  date: string
  weightPercentage: number
  score?: number
  maxScore: number
  grade?: string
  createdAt: string
  updatedAt: string
}

export type StudySession = {
  id: number
  userId: number
  courseId?: number
  taskId?: number
  startedAt: string
  endedAt?: string
  durationMinutes: number
  notes?: string
  focusRating: number // 1-5
  createdAt: string
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused"

export type AttendanceRecord = {
  id: number
  scheduleId: number
  userId: number
  date: string
  status: AttendanceStatus
  notes?: string
  createdAt: string
}

export type ReminderType = "push" | "email"

export type Reminder = {
  id: number
  userId: number
  taskId?: number
  scheduleId?: number
  assessmentId?: number
  remindAt: string
  type: ReminderType
  isSent: boolean
  sentAt?: string
  createdAt: string
}

export type ResourceType = "note" | "link" | "file"

export type Resource = {
  id: number
  courseId: number
  userId: number
  type: ResourceType
  title: string
  content?: string
  url?: string
  filePath?: string
  createdAt: string
  updatedAt: string
}

export type GroupRole = "owner" | "admin" | "member"

export type GroupMember = {
  id: number
  groupId: number
  userId: number
  role: GroupRole
  joinedAt: string
}

export type SharedTask = {
  id: number
  groupId: number
  assigneeId?: number
  createdBy: number
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type Discussion = {
  id: number
  groupId: number
  userId: number
  message: string
  createdAt: string
}
