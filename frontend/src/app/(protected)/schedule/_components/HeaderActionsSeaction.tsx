"use client"

import ActivityForm from "@/components/schedule/ActivityForm"
import EventForm from "@/components/schedule/EventForm"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react"
import { useState } from "react"

function HeaderActionsSeaction() {
  const [currentWeek] = useState("January 6 - 12, 2025")
  const [openActivityForm, setOpenActivityForm] = useState<boolean>(false)
  const [openEventForm, setOpenEventForm] = useState<boolean>(false)

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 order-2 md:order-1">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-foreground px-2 min-w-[180px] text-center">
            {currentWeek}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2">
          <div className="flex items-center gap-2">
            <Button onClick={() => setOpenActivityForm(true)} variant="outline">
              <UsersIcon className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
            <Button onClick={() => setOpenEventForm(true)}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      <ActivityForm
        open={openActivityForm}
        onOpenChange={setOpenActivityForm}
      />
      <EventForm open={openEventForm} onOpenChange={setOpenEventForm} />
    </>
  )
}

export default HeaderActionsSeaction
