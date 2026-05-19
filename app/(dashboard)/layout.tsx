"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/nav/Sidebar"), {
  ssr: false,
});

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
