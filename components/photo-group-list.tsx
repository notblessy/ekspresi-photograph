"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, FolderPlus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ImageWithLoading } from "@/components/image-with-loading"
import type { PhotoGroup } from "@/contexts/auth-context"

interface PhotoGroupListProps {
  onSelectGroup: (groupId: string) => void
}

export function PhotoGroupList({ onSelectGroup }: PhotoGroupListProps) {
  const { activePortfolio, createPhotoGroup } = useAuth()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const groupId = createPhotoGroup(newGroupName, newGroupDescription)
      setNewGroupName("")
      setNewGroupDescription("")
      setIsCreateDialogOpen(false)

      // Select the newly created group
      if (groupId) {
        onSelectGroup(groupId)
      }
    }
  }

  // Find cover photo for each group
  const getGroupCoverPhoto = (group: PhotoGroup) => {
    if (!group.coverId) {
      return group.photos.length > 0 ? group.photos[0] : null
    }
    return group.photos.find((photo) => photo.id === group.coverId) || null
  }

  // Get the number of columns from the portfolio settings
  const columns = activePortfolio?.gridSettings.columns || 3

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Photo Groups</h2>
        <Button variant="outline" size="sm" onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <FolderPlus className="h-4 w-4" />
          New Group
        </Button>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {activePortfolio?.photoGroups.map((group) => {
          const coverPhoto = getGroupCoverPhoto(group)

          return (
            <Card
              key={group.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectGroup(group.id)}
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
                    <Plus className="h-8 w-8" />
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Photo Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., Landscapes, Portraits, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">Description (optional)</Label>
              <Textarea
                id="group-description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Describe this collection of photos"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

