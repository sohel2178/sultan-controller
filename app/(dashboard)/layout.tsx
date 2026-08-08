"use client";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const Sidebar = dynamic(() => import("@/components/nav/Sidebar"), {
  ssr: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 relative overflow-hidden">
        <div className="h-full overflow-hidden">
          {children}
          <Toaster position="top-right" richColors closeButton expand={false} />
        </div>
      </main>
    </div>
  );
}
