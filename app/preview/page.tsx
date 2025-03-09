"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Edit, Moon, Sun, Grid3x3, Maximize, Type } from "lucide-react"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { ProfileSection } from "@/components/profile-section"
import { ImageWithLoading } from "@/components/image-with-loading"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import type { PhotoGroup, GridSettings } from "@/contexts/auth-context"

export default function PreviewPage() {
  const { activePortfolio, isAuthenticated } = useAuth()
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [showGridControls, setShowGridControls] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    instagram: "",
    website: "",
  })

  const [customGridSettings, setCustomGridSettings] = useState<GridSettings | null>(null)

  // Load data from active portfolio
  useEffect(() => {
    if (activePortfolio) {
      setProfileData(activePortfolio.profileData)

      // Reset selected group when portfolio changes
      setSelectedGroupId(null)
      setCustomGridSettings(null)
    } else if (isAuthenticated) {
      router.push("/editor")
    }
  }, [activePortfolio, isAuthenticated, router])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Find the current group and adjacent groups for navigation
  const findGroup = (groupId: string | null): PhotoGroup | null => {
    if (!groupId || !activePortfolio) return null
    return activePortfolio.photoGroups.find((g) => g.id === groupId) || null
  }

  const findAdjacentGroups = (groupId: string | null) => {
    if (!groupId || !activePortfolio) return { prev: null, next: null }

    const groups = activePortfolio.photoGroups
    const currentIndex = groups.findIndex((g) => g.id === groupId)

    if (currentIndex === -1) return { prev: null, next: null }

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : groups.length - 1
    const nextIndex = currentIndex < groups.length - 1 ? currentIndex + 1 : 0

    return {
      prev: groups[prevIndex],
      next: groups[nextIndex],
    }
  }

  const selectedGroup = findGroup(selectedGroupId)
  const { prev, next } = findAdjacentGroups(selectedGroupId)

  // Find cover photo for a group
  const getGroupCoverPhoto = (group: PhotoGroup) => {
    if (!group.coverId) {
      return group.photos.length > 0 ? group.photos[0] : null
    }
    return group.photos.find((photo) => photo.id === group.coverId) || null
  }

  // Get the effective grid settings (custom or from the group)
  const getGridSettings = () => {
    if (customGridSettings) {
      return customGridSettings
    }
    return (
      selectedGroup?.gridSettings ||
      activePortfolio?.gridSettings || {
        columns: 3,
        gap: 16,
        roundedCorners: true,
        showCaptions: true,
      }
    )
  }

  // Update custom grid settings
  const updateGridSetting = (key: keyof GridSettings, value: any) => {
    const currentSettings = getGridSettings()
    setCustomGridSettings({
      ...currentSettings,
      [key]: value,
    })
  }

  const gridSettings = getGridSettings()

  return (
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
          <Link href="/editor" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">Back to Editor</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? "Light" : "Dark"}
            </Button>
            <Link href="/editor">
              <Button size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            <div className="text-sm text-muted-foreground">
              Preview URL: https://ekspresi.com/{activePortfolio?.profileData.username || "username"}
            </div>

            <ProfileSection data={profileData} />

            {selectedGroup ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedGroupId(null)}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Groups
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGridControls(!showGridControls)}
                    className="gap-2"
                  >
                    <Grid3x3 className="h-4 w-4" />
                    {showGridControls ? "Hide Grid Controls" : "Customize Grid"}
                  </Button>
                </div>

                <div>
                  <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
                  {selectedGroup.description && (
                    <p className="text-muted-foreground mt-1">{selectedGroup.description}</p>
                  )}
                </div>

                {/* Grid Controls */}
                {showGridControls && (
                  <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Grid3x3 className="h-4 w-4" />
                          <h3 className="font-medium">Grid Settings</h3>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="columns">Columns</Label>
                            <span className="text-sm text-muted-foreground">{gridSettings.columns}</span>
                          </div>
                          <Slider
                            id="columns"
                            min={1}
                            max={6}
                            step={1}
                            value={[gridSettings.columns]}
                            onValueChange={(value) => updateGridSetting("columns", value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="gap">Gap Size</Label>
                            <span className="text-sm text-muted-foreground">{gridSettings.gap}px</span>
                          </div>
                          <Slider
                            id="gap"
                            min={0}
                            max={40}
                            step={4}
                            value={[gridSettings.gap]}
                            onValueChange={(value) => updateGridSetting("gap", value[0])}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Type className="h-4 w-4" />
                          <h3 className="font-medium">Display Options</h3>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Maximize className="h-4 w-4" />
                            <Label htmlFor="rounded-corners">Rounded Corners</Label>
                          </div>
                          <Switch
                            id="rounded-corners"
                            checked={gridSettings.roundedCorners}
                            onCheckedChange={(checked) => updateGridSetting("roundedCorners", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            <Label htmlFor="show-captions">Show Captions</Label>
                          </div>
                          <Switch
                            id="show-captions"
                            checked={gridSettings.showCaptions}
                            onCheckedChange={(checked) => updateGridSetting("showCaptions", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Group navigation carousel */}
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => prev && setSelectedGroupId(prev.id)}
                    disabled={!prev}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {prev?.name || "Previous"}
                  </Button>

                  <span className="text-sm font-medium">
                    {activePortfolio?.photoGroups.findIndex((g) => g.id === selectedGroupId) + 1} of{" "}
                    {activePortfolio?.photoGroups.length}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => next && setSelectedGroupId(next.id)}
                    disabled={!next}
                    className="gap-1"
                  >
                    {next?.name || "Next"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <PortfolioGrid
                  images={selectedGroup.photos}
                  columns={gridSettings.columns}
                  gap={gridSettings.gap}
                  roundedCorners={gridSettings.roundedCorners}
                  showCaptions={gridSettings.showCaptions}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Photo Groups</h2>

                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${activePortfolio?.gridSettings.columns || 3}, 1fr)`,
                  }}
                >
                  {activePortfolio?.photoGroups.map((group) => {
                    const coverPhoto = getGroupCoverPhoto(group)

                    return (
                      <Card
                        key={group.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedGroupId(group.id)}
                      >
                        <div className="aspect-square bg-muted relative">
                          {coverPhoto ? (
                            <ImageWithLoading
                              src={coverPhoto.src || "/placeholder.svg"}
                              alt={coverPhoto.alt || group.name}
                              className="w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No photos
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium truncate">{group.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {group.photos.length} {group.photos.length === 1 ? "photo" : "photos"}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
        <footer className="py-6 border-t">
          <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 {profileData.name} Photography. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}

