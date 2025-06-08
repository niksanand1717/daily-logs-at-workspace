import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProviders } from "@/contexts/providers";
import { NotesProvider } from "@/contexts/notes-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Logs - Capture Your Thoughts",
  description:
    "A beautiful daily log-taking app to capture your activities and ideas",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <NotesProvider>{children}</NotesProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
