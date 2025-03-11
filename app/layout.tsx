import "./globals.css";
import "@/styles/globals.css";

import type React from "react";
import config from "@/config";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ekspresi - Photographer Portfolio Builder",
  description:
    "Create a stunning photography portfolio with customizable grid layouts",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers googleClientId={config.GOOGLE_CLIENT_ID || ""}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
