"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data for demonstration
const data = [
  { month: "Jan", revenue: 1500, users: 120 },
  { month: "Feb", revenue: 2300, users: 132 },
  { month: "Mar", revenue: 3200, users: 145 },
  { month: "Apr", revenue: 2800, users: 158 },
  { month: "May", revenue: 3600, users: 162 },
  { month: "Jun", revenue: 3100, users: 175 },
  { month: "Jul", revenue: 4100, users: 190 },
]

export function AdminOverviewChart() {
  return (
    <div className="h-80 w-full">
      <Chart>
        <ChartLegend className="justify-center mb-4">
          <ChartLegendItem name="Revenue ($)" color="#0ea5e9" />
          <ChartLegendItem name="Users" color="#6366f1" />
        </ChartLegend>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                strokeWidth={2}
                yAxisId="left"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2}
                yAxisId="right"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-medium">{label}</div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[#0ea5e9] mr-2" />
            <span>Revenue: ${payload[0].value}</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[#6366f1] mr-2" />
            <span>Users: {payload[1].value}</span>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

