import MainWrapper from "@/components/wrapper/MainWrapper"
import HeaderActionsSeaction from "./_components/HeaderActionsSeaction"
import WeeklyCalendarSection from "./_components/WeeklyCalendarSection"
import CourseLegendSection from "./_components/CourseLegendSection"

function SchedulePage() {
  return (
    <MainWrapper title="Schedule">
      <div className="space-y-6">
        <HeaderActionsSeaction />

        <WeeklyCalendarSection />

        <CourseLegendSection />
      </div>
    </MainWrapper>
  )
}

export default SchedulePage
