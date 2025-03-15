"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { ImageWithLoading } from "@/components/image-with-loading";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Grid3x3,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import type {
  FolderType,
  PhotoType,
  PortfolioType,
} from "@/contexts/auth-context";
import { ulid } from "ulid";

interface PhotoFolderDetailProps {
  portfolio: PortfolioType;
  folder: FolderType;
  onBack: () => void;
  onSelectFolder: (folder: FolderType) => void;
  onUpdateFolder: (id: string, folder: Partial<FolderType>) => void;
  onDeleteFolder: (id: string) => void;
  onAddPhotoToFolder: (folderId: string, photo: PhotoType) => void;
  onReorderPhotosInFolder: (folderId: string, photos: PhotoType[]) => void;
}

export function PhotoFolderDetail({
  portfolio,
  folder,
  onBack,
  onSelectFolder,
  onUpdateFolder,
  onDeleteFolder,
  onAddPhotoToFolder,
  onReorderPhotosInFolder,
}: PhotoFolderDetailProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(folder.name || "");
  const [editDescription, setEditDescription] = useState(
    folder.description || ""
  );
  const [newPhotoSrc, setNewPhotoSrc] = useState(
    "/placeholder.svg?height=600&width=600"
  );
  const [newPhotoAlt, setNewPhotoAlt] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [activeTab, setActiveTab] = useState("photos");

  const handleEditFolder = () => {
    if (folder && editName.trim()) {
      onUpdateFolder(folder.id, {
        name: editName,
        description: editDescription,
      });

      folder.name = editName;
      folder.description = editDescription;

      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteFolder = () => {
    if (folder) {
      onDeleteFolder(folder.id);
      setIsDeleteDialogOpen(false);
      onBack();
    }
  };

  const handleAddPhoto = () => {
    if (folder) {
      const newPhoto: PhotoType = {
        id: ulid(),
        folder_id: folder.id,
        src: newPhotoSrc,
        alt: newPhotoAlt,
        caption: newPhotoCaption,
        sort_index: folder.photos.length + 1,
        public_id: "",
        created_at: new Date().toISOString(),
      };

      onAddPhotoToFolder(folder.id, newPhoto);

      // Reset form
      setNewPhotoSrc("/placeholder.svg?height=600&width=600");
      setNewPhotoAlt("");
      setNewPhotoCaption("");
      setIsAddPhotoDialogOpen(false);
    }
  };

  const handleReorderPhotos = (reorderedPhotos: PhotoType[]) => {
    if (folder) {
      onReorderPhotosInFolder(folder.id, reorderedPhotos);
    }
  };

  const handleSetCover = (photoId: string) => {
    if (folder) {
      onUpdateFolder(folder.id, { cover_id: photoId });
    }
  };

  const updateGridSetting = (key: string, value: any) => {
    if (folder) {
      onUpdateFolder(folder.id, {
        ...folder,
        [key]: value,
      });
    }
  };

  // Find adjacent folders for navigation
  const findAdjacentFolders = () => {
    if (!portfolio) return { prev: null, next: null };

    const folders = portfolio.folders;
    const currentIndex = folders.findIndex((g) => g.id === folder.id);

    if (currentIndex === -1) return { prev: null, next: null };

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : folders.length - 1;
    const nextIndex = currentIndex < folders.length - 1 ? currentIndex + 1 : 0;

    return {
      prev: folders[prevIndex],
      next: folders[nextIndex],
    };
  };

  const { prev, next } = findAdjacentFolders();

  if (!folder) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Folder not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Folders
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
            className="gap-1"
          >
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
        <h1 className="text-2xl font-bold">{folder.name}</h1>
        {folder.description && (
          <p className="text-muted-foreground mt-1">{folder.description}</p>
        )}
      </div>

      {/* Folder navigation carousel */}
      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => prev && onSelectFolder(prev)}
          disabled={!prev}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {prev?.name || "Previous"}
        </Button>

        <span className="text-sm font-medium">
          {(portfolio?.folders?.findIndex((g) => g.id === folder.id) ?? -1) + 1}{" "}
          of {portfolio?.folders.length}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => next && onSelectFolder(next)}
          disabled={!next}
          className="gap-1"
        >
          {next?.name || "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="photos">
            Photos ({folder.photos.length})
          </TabsTrigger>
          <TabsTrigger value="settings">Grid Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddPhotoDialogOpen(true)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Photo
            </Button>
          </div>

          {folder.photos.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {folder.photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                      photo.id === folder.cover_id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="aspect-square bg-muted relative">
                      <ImageWithLoading
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        className="w-full h-full"
                      />
                      <Button
                        variant={
                          photo.id === folder.cover_id ? "default" : "outline"
                        }
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
                portfolio={portfolio}
                images={folder.photos}
                onReorder={handleReorderPhotos}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4">
                No photos in this folder yet
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddPhotoDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Your First Photo
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 className="h-5 w-5" />
            <h2 className="text-lg font-medium">
              Grid Settings for {folder.name}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="columns">Columns</Label>
                <span className="text-sm text-muted-foreground">
                  {portfolio?.columns}
                </span>
              </div>
              <Slider
                id="columns"
                min={1}
                max={6}
                step={1}
                value={[portfolio?.columns]}
                onValueChange={(value) =>
                  updateGridSetting("columns", value[0])
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gap">Gap Size</Label>
                <span className="text-sm text-muted-foreground">
                  {portfolio?.gap}px
                </span>
              </div>
              <Slider
                id="gap"
                min={0}
                max={40}
                step={4}
                value={[portfolio?.gap]}
                onValueChange={(value) => updateGridSetting("gap", value[0])}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="rounded-corners">Rounded Corners</Label>
              <Switch
                id="rounded-corners"
                checked={portfolio?.rounded_corners}
                onCheckedChange={(checked) =>
                  updateGridSetting("roundedCorners", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-captions">Show Captions</Label>
              <Switch
                id="show-captions"
                checked={portfolio?.show_captions}
                onCheckedChange={(checked) =>
                  updateGridSetting("showCaptions", checked)
                }
              />
            </div>
          </div>

          {folder.photos.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">Preview</h3>
              <PortfolioGrid portfolio={portfolio} images={folder.photos} />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Folder Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-folder-name">Folder Name</Label>
              <Input
                id="edit-folder-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-folder-description">Description</Label>
              <Textarea
                id="edit-folder-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditFolder}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Folder Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Photo Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the folder "{folder.name}"?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This will delete all {folder.photos.length} photos in this folder.
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteFolder}>
              Delete Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog
        open={isAddPhotoDialogOpen}
        onOpenChange={setIsAddPhotoDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Photo to {folder.name}</DialogTitle>
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
            <Button
              variant="outline"
              onClick={() => setIsAddPhotoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddPhoto}>Add Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
