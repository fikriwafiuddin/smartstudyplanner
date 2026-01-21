"use client"

import React, { createContext, useContext, useState, useMemo } from "react"
import { Semester } from "@/types"
import { useSemesters } from "@/services/hooks/semesterHook"

type SemesterContextType = {
  activeSemester: Semester | null
  setActiveSemester: (semester: Semester) => void
  semesters: Semester[]
  isLoading: boolean
}

const SemesterContext = createContext<SemesterContextType | undefined>(
  undefined,
)

export function SemesterProvider({ children }: { children: React.ReactNode }) {
  const { data: fetchedSemesters, isLoading } = useSemesters()
  const [activeSemesterId, setActiveSemesterId] = useState<number | null>(null)

  const activeSemester = useMemo(() => {
    if (!fetchedSemesters || fetchedSemesters.length === 0) return null
    if (activeSemesterId) {
      return (
        fetchedSemesters.find((s) => s.id === activeSemesterId) ||
        fetchedSemesters.find((s) => s.isActive) ||
        fetchedSemesters[0]
      )
    }
    return fetchedSemesters.find((s) => s.isActive) || fetchedSemesters[0]
  }, [fetchedSemesters, activeSemesterId])

  const setActiveSemester = (semester: Semester) => {
    setActiveSemesterId(semester.id)
  }

  return (
    <SemesterContext.Provider
      value={{
        activeSemester,
        setActiveSemester,
        semesters: fetchedSemesters || [],
        isLoading,
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
