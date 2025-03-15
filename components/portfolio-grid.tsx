"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImageWithLoading } from "@/components/image-with-loading";
import { FolderType, PhotoType, PortfolioType } from "@/contexts/auth-context";
import { GridSetting } from "./photo-folder-detail";

interface PortfolioGridProps {
  grid: GridSetting;
  images: PhotoType[];
  onReorder?: (images: PhotoType[]) => void;
}

export function PortfolioGrid({ grid, images, onReorder }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<PhotoType | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination || !onReorder) {
      return;
    }

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="images"
          direction="horizontal"
          isDropDisabled
          isCombineEnabled
          ignoreContainerClipping
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid w-full"
              style={{
                gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
                gap: `${grid.gap}px`,
              }}
            >
              {images.map((image, index) => (
                <Draggable
                  key={image.id.toString()}
                  draggableId={image.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-col"
                    >
                      <div
                        className={`aspect-square bg-muted overflow-hidden ${
                          grid.rounded_corners ? "rounded-md" : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <ImageWithLoading
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full transition-transform hover:scale-105 cursor-pointer"
                        />
                      </div>
                      {grid.show_captions && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          {image.caption}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <ImageWithLoading
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                <p className="font-medium">{selectedImage.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
