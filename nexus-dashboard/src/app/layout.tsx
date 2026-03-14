// Author: A Taylor
// License: MIT
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Nexus Intelligence Dashboard",
  description: "AI-powered intelligence dashboard with Web Search, CRM, and Data Warehouse modules.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
