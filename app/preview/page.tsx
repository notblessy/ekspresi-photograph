"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Edit, Moon, Sun } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { ProfileSection } from "@/components/profile-section";
import { ImageWithLoading } from "@/components/image-with-loading";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import type {
  PortfolioType,
  PhotoType,
  FolderType,
} from "@/contexts/auth-context";

import Link from "next/link";

export default function PreviewPage() {
  const { user } = useAuth();

  const isInitialized = useRef(false);

  const [darkMode, setDarkMode] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const [portfolio, setPortfolio] = useState<PortfolioType>({
    id: "",
    user_id: "",
    title: "",
    description: "",
    columns: 3,
    gap: 8,
    rounded_corners: false,
    show_captions: true,
    profiles: {
      id: "",
      portfolio_id: "",
      name: "",
      title: "",
      bio: "",
      email: "",
      instagram: "",
      website: "",
    },
    folders: [],
  });

  // Load data from active portfolio
  useEffect(() => {
    if (user && !isInitialized.current) {
      setPortfolio(user.portfolio);
      isInitialized.current = true;
    }
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Find the current folder and adjacent folders for navigation
  const findFolder = (folderId: string | null): FolderType | null => {
    if (!folderId || !portfolio) return null;
    return portfolio.folders.find((g) => g.id === folderId) || null;
  };

  const findAdjacentFolders = (folderId: string | null) => {
    if (!folderId || !portfolio) return { prev: null, next: null };

    const folders = portfolio.folders;
    const currentIndex = folders.findIndex((g) => g.id === folderId);

    if (currentIndex === -1) return { prev: null, next: null };

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : folders.length - 1;
    const nextIndex = currentIndex < folders.length - 1 ? currentIndex + 1 : 0;

    return {
      prev: folders[prevIndex],
      next: folders[nextIndex],
    };
  };

  const selectedFolder = findFolder(selectedFolderId);
  const { prev, next } = findAdjacentFolders(selectedFolderId);

  const getFolderCoverPhoto = (folder: FolderType) => {
    if (!folder.cover_id) {
      return folder.photos.length > 0 ? folder.photos[0] : null;
    }
    return (
      folder.photos.find((photo: PhotoType) => photo.id === folder.cover_id) ||
      null
    );
  };

  return (
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
          <Link href="/editor" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">Back to Editor</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="gap-2"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
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
              Preview URL: https://ekspresi.com/
              {portfolio?.profiles.name}
            </div>

            <ProfileSection data={portfolio.profiles} />

            {selectedFolder ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFolderId(null)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Folders
                  </Button>
                </div>

                <div>
                  <h1 className="text-2xl font-bold">{selectedFolder.name}</h1>
                  {selectedFolder.description && (
                    <p className="text-muted-foreground mt-1">
                      {selectedFolder.description}
                    </p>
                  )}
                </div>

                {/* Folder navigation carousel */}
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => prev && setSelectedFolderId(prev.id)}
                    disabled={!prev}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {prev?.name || "Previous"}
                  </Button>

                  <span className="text-sm font-medium">
                    {portfolio?.folders.findIndex(
                      (g) => g.id === selectedFolderId
                    ) + 1}{" "}
                    of {portfolio?.folders.length}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => next && setSelectedFolderId(next.id)}
                    disabled={!next}
                    className="gap-1"
                  >
                    {next?.name || "Next"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <PortfolioGrid
                  images={selectedFolder.photos}
                  columns={portfolio.columns}
                  gap={portfolio.gap}
                  roundedCorners={portfolio.rounded_corners}
                  showCaptions={portfolio.show_captions}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Photo Folders</h2>

                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${
                      portfolio?.columns || 3
                    }, 1fr)`,
                  }}
                >
                  {portfolio?.folders.map((folder) => {
                    const coverPhoto = getFolderCoverPhoto(folder);

                    return (
                      <Card
                        key={folder.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedFolderId(folder.id)}
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
                              No photos
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium truncate">
                            {folder.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {folder.photos.length}{" "}
                            {folder.photos.length === 1 ? "photo" : "photos"}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
        <footer className="py-6 border-t">
          <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 {portfolio.profiles.name} Photography. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
