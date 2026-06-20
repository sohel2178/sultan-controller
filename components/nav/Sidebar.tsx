"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  AlarmClock,
  Command,
  Wallet,
  LogOut,
  Server,
  UtilityPole,
  Megaphone,
  TriangleAlert,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [role, setRole] = useState<string | null>(null);

  // ✅ Load role properly
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // ✅ Sidebar items dynamically generated
  const sidebarItems = [
    { label: "Alerts", icon: AlarmClock, href: "/alerts" },

    { label: "Commands", icon: Command, href: "/commands" },

    {
      label: "Retail Collections",
      icon: Wallet,
      href: "/retail-collections",
    },

    {
      label: "Utilities",
      icon: UtilityPole,
      href: "/utilities",
    },

    {
      label: "Support Problems",
      icon: TriangleAlert,
      href: "/support-problem",
    },

    ...(mounted && role === "superadmin"
      ? [
          {
            label: "Campaigns",
            icon: Megaphone,
            href: "/campaigns",
          },
        ]
      : []),

    ...(mounted && role === "superadmin"
      ? [
          {
            label: "Server Controller",
            icon: Server,
            href: "/server-controller",
          },
        ]
      : []),

    { label: "Rangs Alerts", icon: AlarmClock, href: "/rangs-alerts" },
    { label: "Rangs Commands", icon: Command, href: "/rangs-commands" },
    {
      label: "Rangs Password Change",
      icon: Command,
      href: "/rangs-password-change",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="h-screen w-64 bg-card border-r flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold">⚡ Sultan Admin</h1>
        </div>

        {/* NAV */}
        <div className="p-3 space-y-2">
          {sidebarItems.map((item) => {
            const isActive =
              mounted &&
              (pathname === item.href ||
                (pathname === "/" && item.href === "/alerts"));

            return (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-xl transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
          onClick={logout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
}
