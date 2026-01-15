"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const courseDistribution = [
  { name: "Data Structures", value: 30, color: "hsl(239 84% 67%)" },
  { name: "Linear Algebra", value: 20, color: "hsl(262 83% 58%)" },
  { name: "Database Systems", value: 25, color: "hsl(142 76% 36%)" },
  { name: "Physics", value: 15, color: "hsl(38 92% 50%)" },
  { name: "Other", value: 10, color: "hsl(220 9% 46%)" },
]

function CourseDistribution() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft p-5 animate-slide-up">
      <h3 className="font-semibold text-foreground mb-4">Time by Course</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={courseDistribution}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {courseDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(220 13% 91%)",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {courseDistribution.map((course) => (
          <div
            key={course.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: course.color }}
              />
              <span className="text-foreground">{course.name}</span>
            </div>
            <span className="text-muted-foreground">{course.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseDistribution
