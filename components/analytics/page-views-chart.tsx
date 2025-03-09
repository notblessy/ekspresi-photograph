"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface DailyStat {
  date: string
  views: number
  visitors: number
  avgDuration: number
}

interface PageViewsChartProps {
  data: DailyStat[]
}

export function PageViewsChart({ data }: PageViewsChartProps) {
  // Format dates for display
  const formattedData = data.map((item) => {
    const date = new Date(item.date)
    return {
      ...item,
      formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }
  })

  return (
    <div className="h-80 w-full">
      <Chart>
        <ChartLegend className="justify-center mb-4">
          <ChartLegendItem name="Page Views" color="#0ea5e9" />
          <ChartLegendItem name="Unique Visitors" color="#6366f1" />
        </ChartLegend>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="views" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="visitors" stroke="#6366f1" fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
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
            <span>Page Views: {payload[0].value}</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[#6366f1] mr-2" />
            <span>Visitors: {payload[1].value}</span>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

