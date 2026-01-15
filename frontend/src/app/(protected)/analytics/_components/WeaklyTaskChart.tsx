"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const weeklyData = [
  { day: "Mon", completed: 4, pending: 2, hours: 3.5 },
  { day: "Tue", completed: 6, pending: 1, hours: 4.2 },
  { day: "Wed", completed: 3, pending: 3, hours: 2.8 },
  { day: "Thu", completed: 8, pending: 0, hours: 5.1 },
  { day: "Fri", completed: 5, pending: 2, hours: 4.0 },
  { day: "Sat", completed: 7, pending: 1, hours: 4.8 },
  { day: "Sun", completed: 2, pending: 4, hours: 1.5 },
]

function WeaklyTaskChart() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-4">
        Weekly Task Overview
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
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
              }}
            />
            <Legend />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="hsl(239 84% 67%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              name="Pending"
              fill="hsl(220 14% 96%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeaklyTaskChart
