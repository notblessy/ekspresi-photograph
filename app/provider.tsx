"use client";

import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";

import { fetcher } from "@/lib/api";
import { SWRConfig } from "swr";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";

export function Providers({
  googleClientId,
  children,
}: {
  googleClientId: string;
  children: ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher,
      }}
    >
      <AuthProvider>
        <GoogleOAuthProvider clientId={googleClientId || ""}>
          {children}
        </GoogleOAuthProvider>
        <Toaster />
      </AuthProvider>
    </SWRConfig>
  );
}
