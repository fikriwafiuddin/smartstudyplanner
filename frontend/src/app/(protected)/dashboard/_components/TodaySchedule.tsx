import { cn } from "@/lib/utils"
import { ClockIcon, MapPinIcon } from "lucide-react"

const scheduleItems = [
  {
    id: 1,
    time: "09:00",
    title: "Data Structures",
    location: "Room 301",
    color: "bg-primary",
    duration: "1h 30m",
  },
  {
    id: 2,
    time: "11:00",
    title: "Linear Algebra",
    location: "Room 205",
    color: "bg-accent",
    duration: "1h",
  },
  {
    id: 3,
    time: "14:00",
    title: "Study Group Meeting",
    location: "Library",
    color: "bg-success",
    duration: "2h",
  },
  {
    id: 4,
    time: "17:00",
    title: "Database Systems",
    location: "Room 401",
    color: "bg-warning",
    duration: "1h 30m",
  },
]

function TodaySchedule() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft animate-slide-up">
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">{"Today's"} Schedule</h3>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {scheduleItems.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="text-sm font-medium text-muted-foreground w-12 shrink-0">
              {item.time}
            </div>
            <div className={cn("w-1 rounded-full shrink-0", item.color)} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPinIcon className="w-3 h-3" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ClockIcon className="w-3 h-3" />
                  {item.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodaySchedule
