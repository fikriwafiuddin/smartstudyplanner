import StatsCard from "@/components/StatsCard"
import {
  CheckCircle2Icon,
  ClockIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react"

const stats = [
  {
    title: "Tasks Completed",
    value: 35,
    change: "+12%",
    icon: CheckCircle2Icon,
    color: "text-success",
  },
  {
    title: "Study Hours",
    value: "28.5h",
    change: "+8%",
    icon: ClockIcon,
    color: "text-primary",
  },
  {
    title: "Productivity",
    value: "87%",
    change: "+5%",
    icon: TrendingUpIcon,
    color: "text-accent",
  },
  {
    title: "Goals Met",
    value: "4/5",
    change: "80%",
    icon: TargetIcon,
    color: "text-warning",
  },
]

function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}

export default StatsSection
