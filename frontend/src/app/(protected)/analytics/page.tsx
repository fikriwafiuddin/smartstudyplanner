import CourseDistribution from "./_components/CourseDistribution"
import GoalsProgress from "./_components/GoalsProgress"
import StatsSection from "./_components/StatsSection"
import StudyHoursTrend from "./_components/StudyHoursTrend"
import WeaklyTaskChart from "./_components/WeaklyTaskChart"

function AnalyticsPage() {
  return (
    <>
      <StatsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeaklyTaskChart />

        <StudyHoursTrend />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CourseDistribution />

        <GoalsProgress />
      </div>
    </>
  )
}

export default AnalyticsPage
