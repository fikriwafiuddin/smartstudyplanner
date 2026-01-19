import HeaderActionsSeaction from "./_components/HeaderActionsSeaction"
import WeeklyCalendarSection from "./_components/WeeklyCalendarSection"
import CourseLegendSection from "./_components/CourseLegendSection"
import AttendanceSummarySection from "./_components/AttendanceSummarySection"

function SchedulePage() {
  return (
    <div className="space-y-6">
      <HeaderActionsSeaction />
      <AttendanceSummarySection />

      <WeeklyCalendarSection />

      <CourseLegendSection />
    </div>
  )
}

export default SchedulePage
