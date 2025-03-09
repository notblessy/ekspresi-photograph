"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Monitor, Smartphone, Tablet } from "lucide-react"

interface Visitor {
  id: string
  country: string
  city: string
  device: string
  browser: string
  firstVisit: string
  lastVisit: string
  totalVisits: number
}

interface VisitorDevicesProps {
  visitors: Visitor[]
}

export function VisitorDevices({ visitors }: VisitorDevicesProps) {
  // Count visitors by device type
  const deviceCounts: Record<string, number> = {
    Desktop: 0,
    Mobile: 0,
    Tablet: 0,
  }

  visitors.forEach((visitor) => {
    deviceCounts[visitor.device] = (deviceCounts[visitor.device] || 0) + 1
  })

  // Convert to array for chart
  const data = Object.entries(deviceCounts).map(([name, value]) => ({ name, value }))

  // Colors for each device type
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  // Calculate percentages
  const total = visitors.length
  const getPercentage = (value: number) => Math.round((value / total) * 100)

  return (
    <div className="h-80 w-full">
      <Chart>
        <ChartLegend className="justify-center mb-4">
          <ChartLegendItem name="Desktop" color="#0088FE" />
          <ChartLegendItem name="Mobile" color="#00C49F" />
          <ChartLegendItem name="Tablet" color="#FFBB28" />
        </ChartLegend>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${getPercentage(value)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip total={total} />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col items-center">
          <div className="bg-[#0088FE]/10 p-2 rounded-full mb-2">
            <Monitor className="h-5 w-5 text-[#0088FE]" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{deviceCounts.Desktop}</div>
            <div className="text-xs text-muted-foreground">Desktop</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[#00C49F]/10 p-2 rounded-full mb-2">
            <Smartphone className="h-5 w-5 text-[#00C49F]" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{deviceCounts.Mobile}</div>
            <div className="text-xs text-muted-foreground">Mobile</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[#FFBB28]/10 p-2 rounded-full mb-2">
            <Tablet className="h-5 w-5 text-[#FFBB28]" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{deviceCounts.Tablet}</div>
            <div className="text-xs text-muted-foreground">Tablet</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, total }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const percentage = Math.round((data.value / total) * 100)

    return (
      <ChartTooltip>
        <ChartTooltipContent>
          <div className="font-medium">{data.name}</div>
          <div className="flex items-center">
            <span>Count: {data.value}</span>
          </div>
          <div className="flex items-center">
            <span>Percentage: {percentage}%</span>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

