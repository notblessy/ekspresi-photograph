"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts"

interface PopularGroup {
  groupId: string
  groupName: string
  views: number
  avgTimeSpent: number
}

interface PopularGroupsChartProps {
  data: PopularGroup[]
}

export function PopularGroupsChart({ data }: PopularGroupsChartProps) {
  // Sort data by views (descending)
  const sortedData = [...data].sort((a, b) => b.views - a.views)

  return (
    <div className="h-80 w-full">
      <Chart>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#888" opacity={0.2} />
              <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="groupName"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="views" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={30}>
                <LabelList dataKey="views" position="right" style={{ fill: "#888", fontSize: 12 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const avgMinutes = Math.floor(data.avgTimeSpent / 60)
    const avgSeconds = data.avgTimeSpent % 60

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-medium">{data.groupName}</div>
          <div className="flex items-center">
            <span>Views: {data.views}</span>
          </div>
          <div className="flex items-center">
            <span>
              Avg. Time: {avgMinutes}m {avgSeconds}s
            </span>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

