"use client";

import { useEffect, useRef, useState } from "react";
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
  Upload,
} from "lucide-react";
import type {
  FolderType,
  PhotoType,
  PortfolioType,
} from "@/contexts/auth-context";
import { nanoid } from "nanoid";
import { upload } from "@/lib/uploader";

interface PhotoFolderDetailProps {
  portfolio: PortfolioType;
  folder: FolderType;
  onBack: () => void;
  onSelectFolder: (folder: FolderType) => void;
  onUpdateFolder: (id: string, folder: Partial<FolderType>) => void;
  onDeleteFolder: (id: string) => void;
  onAddPhotoToFolder: (folderId: string, photo: PhotoType) => void;
  onUpdateFolderGridSettings: (key: string, value: any) => void;
  onReorderPhotosInFolder: (folderId: string, photos: PhotoType[]) => void;
}

export type GridSetting = {
  columns: number;
  gap: number;
  rounded_corners: boolean;
  show_captions: boolean;
};

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

  const [activeTab, setActiveTab] = useState("photos");

  const [gridSetting, setGridSetting] = useState<GridSetting>({
    columns: folder.columns || 3,
    gap: folder.gap || 8,
    rounded_corners: folder.rounded_corners || false,
    show_captions: folder.show_captions || true,
  });

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

  const handleEditGridSettings = (key: string, value: any) => {
    onUpdateFolder(folder.id, { [key]: value });
  };

  const handleDeleteFolder = () => {
    if (folder) {
      onDeleteFolder(folder.id);
      setIsDeleteDialogOpen(false);
      onBack();
    }
  };

  const handleAddPhoto = (data: PhotoType) => {
    if (folder) {
      const newPhoto: PhotoType = {
        id: data.id,
        folder_id: folder.id,
        src: data.src,
        alt: data.alt,
        caption: data.caption,
        sort_index: folder.photos.length + 1,
        public_id: "",
        created_at: data.created_at,
      };

      folder.photos.push(newPhoto);

      onAddPhotoToFolder(folder.id, newPhoto);
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

          {folder.photos?.length > 0 ? (
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
                grid={gridSetting}
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
                  {gridSetting.columns}
                </span>
              </div>
              <Slider
                id="columns"
                min={1}
                max={6}
                step={1}
                value={[gridSetting.columns]}
                onValueChange={(value) => {
                  setGridSetting({ ...gridSetting, columns: value[0] });
                  handleEditGridSettings("columns", value[0]);
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gap">Gap Size</Label>
                <span className="text-sm text-muted-foreground">
                  {gridSetting.gap}px
                </span>
              </div>
              <Slider
                id="gap"
                min={0}
                max={40}
                step={4}
                value={[gridSetting.gap]}
                onValueChange={(value) => {
                  setGridSetting({ ...gridSetting, gap: value[0] });
                  handleEditGridSettings("gap", value[0]);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="rounded-corners">Rounded Corners</Label>
              <Switch
                id="rounded-corners"
                checked={gridSetting.rounded_corners}
                onCheckedChange={(checked) => {
                  setGridSetting({ ...gridSetting, rounded_corners: checked });
                  handleEditGridSettings("rounded_corners", checked);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-captions">Show Captions</Label>
              <Switch
                id="show-captions"
                checked={gridSetting.show_captions}
                onCheckedChange={(checked) => {
                  setGridSetting({ ...gridSetting, show_captions: checked });
                  handleEditGridSettings("show_captions", checked);
                }}
              />
            </div>
          </div>

          {folder.photos.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">Preview</h3>
              <PortfolioGrid grid={gridSetting} images={folder.photos} />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Folder Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent aria-describedby="edit-folder-name">
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
        <DialogContent aria-describedby="delete-folder">
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
        <DialogContent aria-describedby="add-photo">
          <DialogHeader>
            <DialogTitle>Add Photo to {folder.name}</DialogTitle>
          </DialogHeader>
          <AddPhotoForm
            onAdd={handleAddPhoto}
            onClose={() => setIsAddPhotoDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddPhotoForm({
  onAdd,
  onClose,
}: {
  onAdd: (data: PhotoType) => void;
  onClose: () => void;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Process files (either from input or drop)
  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    // Limit to 5 files total (existing + new, up to 5)
    const newFiles = [...selectedFiles, ...fileArray].slice(0, 5);
    setSelectedFiles(newFiles);

    // Create previews for selected files
    const newPreviews = newFiles.map((file) => {
      // If this file is already in our previews, reuse the URL
      const existingIndex = selectedFiles.findIndex(
        (f) => f.name === file.name && f.size === file.size
      );
      if (existingIndex >= 0 && existingIndex < previews.length) {
        return previews[existingIndex];
      }
      // Otherwise create a new object URL
      return URL.createObjectURL(file);
    });
    setPreviews(newPreviews);

    // Initialize captions array (keep existing captions)
    const newCaptions = [...captions];
    while (newCaptions.length < newFiles.length) {
      newCaptions.push("");
    }
    setCaptions(newCaptions);
  };

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Filter for only image files
      const imageFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length > 0) {
        processFiles(imageFiles);
      }
    }
  };

  // Update caption for a specific image
  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove a file from selection
  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    const newCaptions = [...captions];

    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    newCaptions.splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setCaptions(newCaptions);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    await Promise.all(
      selectedFiles.map(async (file, index) => {
        await upload(
          file,
          {
            id: nanoid(),
            folder_id: "",
            src: previews[index],
            alt: captions[index] || "",
            caption: captions[index] || "",
            sort_index: 0,
            public_id: "",
            created_at: new Date().toISOString(),
          },
          (data) => {
            onAdd(data as PhotoType);
          }
        );
      })
    );

    setUploading(false);
    onClose();
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} photo${
                  selectedFiles.length > 1 ? "s" : ""
                } selected (max 5)`
              : "No photos selected"}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={selectedFiles.length >= 5}
          >
            <Plus className="h-4 w-4 mr-2" />
            Select Photos
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            onClick={(e) => {
              // Reset value to allow selecting the same file again
              (e.target as HTMLInputElement).value = "";
            }}
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border rounded-md p-3"
              >
                <div className="relative h-20 w-20 flex-shrink-0">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-medium truncate">
                    {selectedFiles[index].name}
                  </div>
                  <Input
                    placeholder="Add a caption (optional)"
                    value={captions[index]}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedFiles.length === 0 && (
          <div
            ref={dropZoneRef}
            className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="mx-auto flex flex-col items-center">
              <Upload
                className={`h-10 w-10 mb-4 ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-sm font-medium mb-1">
                {isDragging ? "Drop photos here" : "Drag and drop photos here"}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                or click to select files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF (max 5 photos)
              </p>
            </div>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={onClose} type="button" variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedFiles.length === 0 || uploading}
        >
          Upload {selectedFiles.length > 0 ? selectedFiles.length : ""} Photo
          {selectedFiles.length !== 1 ? "s" : ""}
        </Button>
      </DialogFooter>
    </>
  );
}
