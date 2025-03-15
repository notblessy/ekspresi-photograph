"use client";

import { useState, useEffect } from "react";
import { ulid } from "ulid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ChevronLeft,
  Eye,
  Grid3x3,
  LogOut,
  Moon,
  Save,
  Settings,
  Sun,
  User,
  BarChart3,
} from "lucide-react";
import { ProfileSection } from "@/components/profile-section";
import { PhotoFolderList } from "@/components/photo-folder-list";
import { PhotoFolderDetail } from "@/components/photo-folder-detail";
import { ProtectedRoute } from "@/components/protected-route";
import { FolderType, PortfolioType, useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";

export default function EditorPage() {
  const { user, onLogout } = useAuth();
  const { toast } = useToast();

  const [darkMode, setDarkMode] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

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

  useEffect(() => {
    if (user) {
      setPortfolio(user.portfolio);

      setSelectedFolder(null);
    }
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const updateGridSettings = (key: string, value: any) => {
    setPortfolio({ ...portfolio, [key]: value });
  };

  const updateProfileData = (key: string, value: string) => {
    const newProfileData = {
      ...portfolio.profiles,
      [key]: value,
    };
    setPortfolio({ ...portfolio, profiles: newProfileData });
  };

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your portfolio has been updated successfully",
    });
  };

  const isPortfolioChanged = () => {
    return user?.portfolio !== portfolio;
  };

  const handleUpdateFolder = (
    folderId: string,
    folder: Partial<FolderType>
  ) => {
    setPortfolio({
      ...portfolio,
      folders: portfolio.folders.map((f) =>
        f.id === folderId ? { ...f, ...folder } : f
      ),
    });
  };

  const handleAddPhotoToFolder = (folderId: string, photo: any) => {
    const newFolders = portfolio.folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          photos: [...folder.photos, photo],
        };
      }
      return folder;
    });

    setPortfolio({ ...portfolio, folders: newFolders });
  };

  const handleDeleteFolder = (folderId: string) => {
    const newFolders = portfolio.folders.filter(
      (folder) => folder.id !== folderId
    );
    setPortfolio({ ...portfolio, folders: newFolders });
  };

  const handleReorderPhotosInFolder = (folderId: string, photos: any[]) => {
    const newFolders = portfolio.folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          photos: photos,
        };
      }
      return folder;
    });

    setPortfolio({ ...portfolio, folders: newFolders });
  };

  return (
    <ProtectedRoute>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">Ekspresi</span>
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
            <Link href="/preview">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Button
              disabled={!isPortfolioChanged()}
              size="sm"
              className="gap-2"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Link href="/account">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Account
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-80 border-r p-4 overflow-y-auto hidden md:block">
            <Tabs defaultValue="photos">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="photos">
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Folders
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photos" className="pt-4 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Folder List Settings</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    These settings control how your folders are displayed in the
                    list view.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="columns">Columns ({portfolio.columns})</Label>
                  <Slider
                    id="columns"
                    min={1}
                    max={6}
                    step={1}
                    value={[portfolio.columns]}
                    onValueChange={(value) =>
                      updateGridSettings("columns", value[0])
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gap">Gap Size ({portfolio.gap}px)</Label>
                  <Slider
                    id="gap"
                    min={0}
                    max={40}
                    step={4}
                    value={[portfolio.gap]}
                    onValueChange={(value) =>
                      updateGridSettings("gap", value[0])
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="rounded-corners"
                    checked={portfolio.rounded_corners}
                    onCheckedChange={(checked) =>
                      updateGridSettings("rounded_corners", checked)
                    }
                  />
                  <Label htmlFor="rounded-corners">Rounded Corners</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-captions"
                    checked={portfolio.show_captions}
                    onCheckedChange={(checked) =>
                      updateGridSettings("show_captions", checked)
                    }
                  />
                  <Label htmlFor="show-captions">Show Title</Label>
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                  <p>
                    Note: Each photo group has its own grid settings that can be
                    customized when viewing the group.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="profile" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={portfolio.profiles.name}
                    onChange={(e) => updateProfileData("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={portfolio.profiles.title}
                    onChange={(e) => updateProfileData("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={portfolio.profiles.bio}
                    onChange={(e) => updateProfileData("bio", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={portfolio.profiles.email}
                    onChange={(e) => updateProfileData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={portfolio.profiles.instagram}
                    onChange={(e) =>
                      updateProfileData("instagram", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={portfolio.profiles.website}
                    onChange={(e) =>
                      updateProfileData("website", e.target.value)
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="settings" className="pt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    defaultValue={portfolio?.title}
                    onChange={(e) =>
                      setPortfolio({
                        ...portfolio,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    defaultValue={portfolio?.description}
                    onChange={(e) =>
                      setPortfolio({
                        ...portfolio,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </aside>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
              <ProfileSection data={portfolio.profiles} />

              {selectedFolder ? (
                <PhotoFolderDetail
                  portfolio={portfolio}
                  folder={selectedFolder}
                  onBack={() => setSelectedFolder(null)}
                  onSelectFolder={setSelectedFolder}
                  onUpdateFolder={handleUpdateFolder}
                  onAddPhotoToFolder={handleAddPhotoToFolder}
                  onDeleteFolder={handleDeleteFolder}
                  onReorderPhotosInFolder={handleReorderPhotosInFolder}
                />
              ) : (
                <PhotoFolderList
                  portfolio={portfolio}
                  onSelectFolder={setSelectedFolder}
                  onAddFolder={(name, description) => {
                    setPortfolio({
                      ...portfolio,
                      folders: [
                        ...portfolio.folders,
                        {
                          id: ulid(),
                          portfolio_id: portfolio.id,
                          name: name,
                          description: description,
                          photos: [],
                          cover_id: "",
                        },
                      ],
                    });
                  }}
                />
              )}
            </div>
          </main>
        </div>
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="grid grid-cols-3 divide-x">
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-16 rounded-none"
            >
              <Grid3x3 className="h-5 w-5 mb-1" />
              <span className="text-xs">Folders</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-16 rounded-none"
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-16 rounded-none"
            >
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
