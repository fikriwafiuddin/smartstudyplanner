"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", tasks: 4, hours: 3.5 },
  { day: "Tue", tasks: 6, hours: 4.2 },
  { day: "Wed", tasks: 3, hours: 2.8 },
  { day: "Thu", tasks: 8, hours: 5.1 },
  { day: "Fri", tasks: 5, hours: 4.0 },
  { day: "Sat", tasks: 7, hours: 4.8 },
  { day: "Sun", tasks: 2, hours: 1.5 },
]

function ProductivityChart() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Weekly Productivity</h3>
        <p className="text-sm text-muted-foreground">
          Tasks completed this week
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(239 84% 67%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(239 84% 67%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220 13% 91%)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 9% 46%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 9% 46%)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(220 13% 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
              }}
              labelStyle={{ color: "hsl(224 71% 4%)", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="hsl(239 84% 67%)"
              strokeWidth={2}
              fill="url(#colorTasks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProductivityChart
