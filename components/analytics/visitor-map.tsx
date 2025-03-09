"use client"

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

interface VisitorMapProps {
  visitors: Visitor[]
}

export function VisitorMap({ visitors }: VisitorMapProps) {
  // Count visitors by country
  const countryData: Record<string, number> = {}
  visitors.forEach((visitor) => {
    countryData[visitor.country] = (countryData[visitor.country] || 0) + 1
  })

  // Convert to array for rendering
  const countries = Object.entries(countryData)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="space-y-4">
      <div className="h-40 relative bg-muted rounded-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Interactive map coming soon</p>
        </div>
        <img
          src="/placeholder.svg?height=160&width=600&text=World+Map"
          alt="World Map Placeholder"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {countries.map(({ country, count }) => (
          <div key={country} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <span className="text-sm font-medium">{country}</span>
            <span className="text-sm text-muted-foreground">
              {count} visitor{count !== 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

