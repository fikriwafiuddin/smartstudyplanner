import HeaderActionsSeaction from "./_components/HeaderActionsSeaction"
import WeeklyCalendarSection from "./_components/WeeklyCalendarSection"
import CourseLegendSection from "./_components/CourseLegendSection"

function SchedulePage() {
  return (
    <div className="space-y-6">
      <HeaderActionsSeaction />

      <WeeklyCalendarSection />

      <CourseLegendSection />
    </div>
  )
}

export default SchedulePage
