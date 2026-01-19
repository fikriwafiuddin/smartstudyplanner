"use client"

import React, { createContext, useContext, useState } from "react"
import { Semester } from "@/types"

type SemesterContextType = {
  activeSemester: Semester | null
  setActiveSemester: (semester: Semester) => void
  semesters: Semester[]
  setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>
}

const SemesterContext = createContext<SemesterContextType | undefined>(
  undefined,
)

// Mock initial data
const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 1,
    userId: 1,
    name: "Odd Semester 2023/2024",
    startDate: "2023-09-01",
    endDate: "2024-01-31",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    name: "Even Semester 2023/2024",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function SemesterProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<Semester[]>(INITIAL_SEMESTERS)
  const [activeSemester, setActiveSemesterState] = useState<Semester | null>(
    INITIAL_SEMESTERS.find((s) => s.isActive) || null,
  )

  const setActiveSemester = (semester: Semester) => {
    setSemesters((prev) =>
      prev.map((s) => ({
        ...s,
        isActive: s.id === semester.id,
      })),
    )
    setActiveSemesterState(semester)
  }

  return (
    <SemesterContext.Provider
      value={{
        activeSemester,
        setActiveSemester,
        semesters,
        setSemesters,
      }}
    >
      {children}
    </SemesterContext.Provider>
  )
}

export function useSemester() {
  const context = useContext(SemesterContext)
  if (context === undefined) {
    throw new Error("useSemester must be used within a SemesterProvider")
  }
  return context
}
