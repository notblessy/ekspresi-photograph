"use client";

import type React from "react";
import Link from "next/link";

import { debounce } from "lodash";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Loader2, LucideLoader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/protected-route";

export default function AccountPage() {
  const { user, onCheckUsername, onUpdateProfile, loading } = useAuth();
  const [newUsername, setNewUsername] = useState(user?.username || "");

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  const [checkingUsername, setCheckingUsername] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateProfile({ username: newUsername });

    setIsUsernameAvailable(null);
  };

  const debouncedCheckUsername = useMemo(
    () =>
      debounce((value: string) => {
        if (value) {
          if (value === user?.username) {
            setIsUsernameAvailable(null);
            setCheckingUsername(false);
          } else {
            onCheckUsername(value, (isAvailable: boolean) => {
              setIsUsernameAvailable(isAvailable);
              setCheckingUsername(false);
            });
          }
        } else {
          setIsUsernameAvailable(null);
          setCheckingUsername(false);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedCheckUsername.cancel(); // <--- important to cancel on unmount
    };
  }, [debouncedCheckUsername]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-muted/40">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
          <Link href="/editor" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">Back to Editor</span>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your Ekspresi account information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newUsername}
                    onChange={(e) => {
                      setCheckingUsername(true);
                      setIsUsernameAvailable(null);
                      setNewUsername(e.target.value);
                      debouncedCheckUsername(e.target.value);
                    }}
                    placeholder="Enter your new username"
                  />
                  {checkingUsername && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideLoader2 className="h-4 w-4 animate-spin" />
                      <span>Checking username...</span>
                    </div>
                  )}
                  {isUsernameAvailable === false && (
                    <p className="text-red-500 text-sm">
                      This username is already taken.
                    </p>
                  )}
                  {isUsernameAvailable === true && (
                    <p className="text-green-500 text-sm">
                      This username is available!
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    loading ||
                    user?.username === newUsername ||
                    newUsername === ""
                  }
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
