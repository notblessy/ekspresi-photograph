"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import LoadingSpinner from "./ui/loading-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user?.id) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
        <div className="space-y-4">
          <LoadingSpinner />
        </div>
      </div>
    );

  return <>{children}</>;
}
