"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { ImageWithLoading } from "@/components/image-with-loading"
import { ChevronLeft, ChevronRight, Edit, Grid3x3, Plus, Star, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { PhotoGroup, Photo, GridSettings } from "@/contexts/auth-context"

interface PhotoGroupDetailProps {
  groupId: string
  onBack: () => void
  onSelectGroup: (groupId: string) => void
}

export function PhotoGroupDetail({ groupId, onBack, onSelectGroup }: PhotoGroupDetailProps) {
  const {
    activePortfolio,
    updatePhotoGroup,
    deletePhotoGroup,
    addPhotoToGroup,
    removePhotoFromGroup,
    reorderPhotosInGroup,
    setGroupCoverPhoto,
    updateGroupGridSettings,
  } = useAuth()

  const [group, setGroup] = useState<PhotoGroup | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [newPhotoSrc, setNewPhotoSrc] = useState("/placeholder.svg?height=600&width=600")
  const [newPhotoAlt, setNewPhotoAlt] = useState("")
  const [newPhotoCaption, setNewPhotoCaption] = useState("")
  const [activeTab, setActiveTab] = useState("photos")

  // Find the current group and adjacent groups for navigation
  useEffect(() => {
    if (activePortfolio) {
      const currentGroup = activePortfolio.photoGroups.find((g) => g.id === groupId) || null
      setGroup(currentGroup)

      if (currentGroup) {
        setEditName(currentGroup.name)
        setEditDescription(currentGroup.description)
      }
    }
  }, [activePortfolio, groupId])

  const handleEditGroup = () => {
    if (group && editName.trim()) {
      updatePhotoGroup(group.id, {
        name: editName,
        description: editDescription,
      })
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteGroup = () => {
    if (group) {
      deletePhotoGroup(group.id)
      setIsDeleteDialogOpen(false)
      onBack() // Go back to the group list
    }
  }

  const handleAddPhoto = () => {
    if (group) {
      const newPhoto: Photo = {
        id: Date.now(), // Use timestamp as temporary ID
        src: newPhotoSrc,
        alt: newPhotoAlt,
        caption: newPhotoCaption,
      }

      addPhotoToGroup(group.id, newPhoto)

      // Reset form
      setNewPhotoSrc("/placeholder.svg?height=600&width=600")
      setNewPhotoAlt("")
      setNewPhotoCaption("")
      setIsAddPhotoDialogOpen(false)
    }
  }

  const handleReorderPhotos = (reorderedPhotos: Photo[]) => {
    if (group) {
      reorderPhotosInGroup(group.id, reorderedPhotos)
    }
  }

  const handleSetCover = (photoId: number) => {
    if (group) {
      setGroupCoverPhoto(group.id, photoId)
    }
  }

  const updateGridSetting = (key: keyof GridSettings, value: any) => {
    if (group) {
      updateGroupGridSettings(group.id, { [key]: value })
    }
  }

  // Find adjacent groups for navigation
  const findAdjacentGroups = () => {
    if (!activePortfolio) return { prev: null, next: null }

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

  const { prev, next } = findAdjacentGroups()

  if (!group) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Group not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Groups
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{group.name}</h1>
        {group.description && <p className="text-muted-foreground mt-1">{group.description}</p>}
      </div>

      {/* Group navigation carousel */}
      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => prev && onSelectGroup(prev.id)}
          disabled={!prev}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {prev?.name || "Previous"}
        </Button>

        <span className="text-sm font-medium">
          {activePortfolio?.photoGroups.findIndex((g) => g.id === groupId) + 1} of {activePortfolio?.photoGroups.length}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => next && onSelectGroup(next.id)}
          disabled={!next}
          className="gap-1"
        >
          {next?.name || "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="photos">Photos ({group.photos.length})</TabsTrigger>
          <TabsTrigger value="settings">Grid Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsAddPhotoDialogOpen(true)} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Photo
            </Button>
          </div>

          {group.photos.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {group.photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                      photo.id === group.coverId ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="aspect-square bg-muted relative">
                      <ImageWithLoading
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        className="w-full h-full"
                      />
                      <Button
                        variant={photo.id === group.coverId ? "default" : "outline"}
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={() => handleSetCover(photo.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs truncate">{photo.caption}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <PortfolioGrid
                images={group.photos}
                columns={group.gridSettings.columns}
                gap={group.gridSettings.gap}
                roundedCorners={group.gridSettings.roundedCorners}
                showCaptions={group.gridSettings.showCaptions}
                onReorder={handleReorderPhotos}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4">No photos in this group yet</p>
              <Button variant="outline" onClick={() => setIsAddPhotoDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Photo
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 className="h-5 w-5" />
            <h2 className="text-lg font-medium">Grid Settings for {group.name}</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="columns">Columns</Label>
                <span className="text-sm text-muted-foreground">{group.gridSettings.columns}</span>
              </div>
              <Slider
                id="columns"
                min={1}
                max={6}
                step={1}
                value={[group.gridSettings.columns]}
                onValueChange={(value) => updateGridSetting("columns", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gap">Gap Size</Label>
                <span className="text-sm text-muted-foreground">{group.gridSettings.gap}px</span>
              </div>
              <Slider
                id="gap"
                min={0}
                max={40}
                step={4}
                value={[group.gridSettings.gap]}
                onValueChange={(value) => updateGridSetting("gap", value[0])}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="rounded-corners">Rounded Corners</Label>
              <Switch
                id="rounded-corners"
                checked={group.gridSettings.roundedCorners}
                onCheckedChange={(checked) => updateGridSetting("roundedCorners", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-captions">Show Captions</Label>
              <Switch
                id="show-captions"
                checked={group.gridSettings.showCaptions}
                onCheckedChange={(checked) => updateGridSetting("showCaptions", checked)}
              />
            </div>
          </div>

          {group.photos.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">Preview</h3>
              <PortfolioGrid
                images={group.photos}
                columns={group.gridSettings.columns}
                gap={group.gridSettings.gap}
                roundedCorners={group.gridSettings.roundedCorners}
                showCaptions={group.gridSettings.showCaptions}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Group Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-group-name">Group Name</Label>
              <Input id="edit-group-name" value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-group-description">Description</Label>
              <Textarea
                id="edit-group-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGroup}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Group Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Photo Group</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the group "{group.name}"?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will delete all {group.photos.length} photos in this group. This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog open={isAddPhotoDialogOpen} onOpenChange={setIsAddPhotoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Photo to {group.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="photo-src">Photo URL</Label>
              <Input
                id="photo-src"
                value={newPhotoSrc}
                onChange={(e) => setNewPhotoSrc(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-alt">Alt Text</Label>
              <Input
                id="photo-alt"
                value={newPhotoAlt}
                onChange={(e) => setNewPhotoAlt(e.target.value)}
                placeholder="Describe the photo for accessibility"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-caption">Caption</Label>
              <Input
                id="photo-caption"
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                placeholder="Add a caption for this photo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPhotoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPhoto}>Add Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

