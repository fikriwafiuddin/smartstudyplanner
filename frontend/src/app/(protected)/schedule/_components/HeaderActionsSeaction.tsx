"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

function HeaderActionsSeaction() {
  const [currentWeek] = useState("January 6 - 10, 2025")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium text-foreground px-4">
          {currentWeek}
        </span>
        <Button variant="outline" size="icon">
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <Button>
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Course
      </Button>
    </div>
  )
}

export default HeaderActionsSeaction
