"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FolderPlus } from "lucide-react";
import { FolderType, PortfolioType } from "@/contexts/auth-context";
import { ImageWithLoading } from "@/components/image-with-loading";

interface PhotoFolderListProps {
  portfolio: PortfolioType;
  onSelectFolder: (folder: FolderType) => void;
  onAddFolder: (name: string, description: string) => void;
}

export function PhotoFolderList({
  portfolio,
  onSelectFolder,
  onAddFolder,
}: PhotoFolderListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName, newFolderDescription);
      setIsCreateDialogOpen(false);

      setNewFolderName("");
      setNewFolderDescription("");
    }
  };

  // Find cover photo for each folder
  const getFolderCoverPhoto = (folder: FolderType) => {
    if (!folder.cover_id) {
      return folder.photos.length > 0 ? folder.photos[0] : null;
    }
    return folder.photos.find((photo) => photo.id === folder.cover_id) || null;
  };

  const columns = portfolio.columns || 3;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Photo Folders</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          New Folder
        </Button>
      </div>

      <div
        className="grid"
        style={{
          gap: `${portfolio.gap || 4}px`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {portfolio?.folders?.map((folder, index) => {
          const coverPhoto = getFolderCoverPhoto(folder);

          return (
            <Card
              key={`${folder.id}-${index}`}
              className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                portfolio.rounded_corners && "rounded-lg"
              }`}
              onClick={() => onSelectFolder(folder)}
            >
              <div className="aspect-square bg-muted relative">
                {coverPhoto ? (
                  <ImageWithLoading
                    src={coverPhoto.src || "/placeholder.svg"}
                    alt={coverPhoto.alt || folder.name}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Plus className="h-8 w-8" />
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                {portfolio.show_captions && (
                  <h3 className="font-medium truncate">{folder.name}</h3>
                )}
                <p className="text-sm text-muted-foreground truncate">
                  {folder.photos.length}{" "}
                  {folder.photos.length === 1 ? "photo" : "photos"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g., Landscapes, Portraits, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="folder-description">Description (optional)</Label>
              <Textarea
                id="folder-description"
                value={newFolderDescription}
                onChange={(e) => setNewFolderDescription(e.target.value)}
                placeholder="Describe this collection of photos"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
