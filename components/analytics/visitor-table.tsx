"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface VisitorTableProps {
  visitors: Visitor[]
}

export function VisitorTable({ visitors }: VisitorTableProps) {
  // Sort visitors by last visit (most recent first)
  const sortedVisitors = [...visitors].sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Browser</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead className="text-right">Total Visits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVisitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>
                <div className="font-medium">{visitor.city}</div>
                <div className="text-sm text-muted-foreground">{visitor.country}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {visitor.device === "Desktop" && <Monitor className="h-4 w-4 mr-2" />}
                  {visitor.device === "Mobile" && <Smartphone className="h-4 w-4 mr-2" />}
                  {visitor.device === "Tablet" && <Tablet className="h-4 w-4 mr-2" />}
                  {visitor.device}
                </div>
              </TableCell>
              <TableCell>{visitor.browser}</TableCell>
              <TableCell>
                {new Date(visitor.lastVisit).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className="text-right">{visitor.totalVisits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

