"use client";

import Sidebar from "@/components/nav/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 relative overflow-hidden">
        <div className="h-full overflow-auto">{children}</div>
      </main>
    </div>
  );
}
