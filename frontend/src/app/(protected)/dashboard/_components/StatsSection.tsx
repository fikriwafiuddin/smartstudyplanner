import StatsCard from "@/components/StatsCard"
import {
  BookOpenIcon,
  CheckSquareIcon,
  ClockIcon,
  TargetIcon,
} from "lucide-react"

function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Tasks Completed"
        value="12"
        change="+3 from yesterday"
        changeType="positive"
        icon={CheckSquareIcon}
        iconColor="text-success"
      />
      <StatsCard
        title="Study Hours"
        value="6.5h"
        change="Today's total"
        changeType="neutral"
        icon={ClockIcon}
        iconColor="text-primary"
      />
      <StatsCard
        title="Active Courses"
        value="5"
        change="This semester"
        changeType="neutral"
        icon={BookOpenIcon}
        iconColor="text-accent"
      />
      <StatsCard
        title="Weekly Goal"
        value="85%"
        change="On track!"
        changeType="positive"
        icon={TargetIcon}
        iconColor="text-warning"
      />
    </div>
  )
}

export default StatsSection
