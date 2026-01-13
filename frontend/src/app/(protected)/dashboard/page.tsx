import StatsSection from "./_components/StatsSection"
import ProductivityChart from "./_components/ProductivityChart"
import UpcomingTasks from "./_components/UpcomingTasks"
import TodaySchedule from "./_components/TodaySchedule"
import ProgressRing from "./_components/ProgressRing"

function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsSection />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ProductivityChart />
          <UpcomingTasks />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TodaySchedule />
          <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
            <h3 className="font-semibold text-foreground mb-4">
              Weekly Progress
            </h3>
            <div className="flex justify-center">
              <ProgressRing
                progress={72}
                label="Tasks Completed"
                sublabel="18 of 25 tasks"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
