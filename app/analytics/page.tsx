"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ChevronLeft, Users, Clock, Eye, BarChart3, Globe, Smartphone, Calendar } from "lucide-react"
import { VisitorMap } from "@/components/analytics/visitor-map"
import { VisitorTable } from "@/components/analytics/visitor-table"
import { VisitorDevices } from "@/components/analytics/visitor-devices"
import { PageViewsChart } from "@/components/analytics/page-views-chart"
import { PopularGroupsChart } from "@/components/analytics/popular-groups-chart"
import { AnalyticsSummary } from "@/components/analytics/analytics-summary"

export default function AnalyticsPage() {
  const { activePortfolio } = useAuth()
  const [period, setPeriod] = useState<"7days" | "30days" | "90days">("7days")

  // If no analytics data is available
  if (!activePortfolio?.analytics) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col">
          <header className="px-4 lg:px-6 h-16 flex items-center border-b">
            <Link href="/editor" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="font-bold">Back to Editor</span>
            </Link>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Analytics</h1>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No analytics data available</p>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Analytics data will appear here once your portfolio starts receiving visitors.
                  </p>
                  <Link href="/editor">
                    <Button>Back to Editor</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  const { analytics } = activePortfolio

  // Calculate summary metrics
  const totalPageViews = analytics.dailyStats.reduce((sum, day) => sum + day.views, 0)
  const totalVisitors = analytics.visitors.length
  const avgDuration = Math.round(
    analytics.pageViews.reduce((sum, view) => sum + view.duration, 0) / analytics.pageViews.length,
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
          <Link href="/editor" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">Back to Editor</span>
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">Track your portfolio's performance and visitor engagement</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={period === "7days" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("7days")}
                >
                  Last 7 days
                </Button>
                <Button
                  variant={period === "30days" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("30days")}
                >
                  Last 30 days
                </Button>
                <Button
                  variant={period === "90days" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod("90days")}
                >
                  Last 90 days
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnalyticsSummary
                icon={<Eye className="h-5 w-5" />}
                title="Page Views"
                value={totalPageViews}
                trend={+8.2}
                description="vs. previous period"
              />
              <AnalyticsSummary
                icon={<Users className="h-5 w-5" />}
                title="Unique Visitors"
                value={totalVisitors}
                trend={+12.5}
                description="vs. previous period"
              />
              <AnalyticsSummary
                icon={<Clock className="h-5 w-5" />}
                title="Avg. Time on Page"
                value={`${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s`}
                trend={+5.3}
                description="vs. previous period"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Page Views Over Time</CardTitle>
                  <CardDescription>Daily page views and unique visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <PageViewsChart data={analytics.dailyStats} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Photo Groups</CardTitle>
                  <CardDescription>Most viewed photo collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <PopularGroupsChart data={analytics.popularGroups} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>Geographic distribution of your audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <VisitorMap visitors={analytics.visitors} />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="visitors">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visitors">
                  <Users className="h-4 w-4 mr-2" />
                  Visitors
                </TabsTrigger>
                <TabsTrigger value="devices">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Devices
                </TabsTrigger>
                <TabsTrigger value="referrers">
                  <Globe className="h-4 w-4 mr-2" />
                  Referrers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="visitors" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Visitors</CardTitle>
                    <CardDescription>Details about your portfolio visitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VisitorTable visitors={analytics.visitors} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devices" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                    <CardDescription>Types of devices used to view your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VisitorDevices visitors={analytics.visitors} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="referrers" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium">Coming Soon</p>
                          <p className="text-muted-foreground max-w-md mt-2">
                            Detailed referrer analytics will be available in the next update.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

