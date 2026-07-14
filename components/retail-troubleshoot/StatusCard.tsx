"use client";

import {
  LucideIcon,
  CircleCheckBig,
  TriangleAlert,
  CircleAlert,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType = "healthy" | "warning" | "critical" | "info";

interface StatusCardProps {
  title: string;
  icon: LucideIcon;
  status: StatusType;
  children: React.ReactNode;
  className?: string;
}

const config: Record<
  StatusType,
  {
    label: string;
    border: string;
    badge: string;
    icon: LucideIcon;
    iconColor: string;
    bg: string;
  }
> = {
  healthy: {
    label: "Healthy",
    border: "border-l-green-500",
    badge:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: CircleCheckBig,
    iconColor: "text-green-500",
    bg: "bg-green-500/10",
  },
  warning: {
    label: "Warning",
    border: "border-l-yellow-500",
    badge:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: TriangleAlert,
    iconColor: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  critical: {
    label: "Critical",
    border: "border-l-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: CircleAlert,
    iconColor: "text-red-500",
    bg: "bg-red-500/10",
  },
  info: {
    label: "Info",
    border: "border-l-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Info,
    iconColor: "text-blue-500",
    bg: "bg-blue-500/10",
  },
};

export default function StatusCard({
  title,
  icon: Icon,
  status,
  children,
  className,
}: StatusCardProps) {
  const c = config[status];
  const StatusIcon = c.icon;

  return (
    <Card
      className={cn(
        "border-l-4 transition-all duration-300 hover:shadow-md",
        c.border,
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              c.bg,
            )}
          >
            <Icon className={cn("h-5 w-5", c.iconColor)} />
          </div>

          <div>
            <h3 className="font-semibold leading-none">{title}</h3>
          </div>
        </div>

        <Badge className={cn("gap-1", c.badge)}>
          <StatusIcon className="h-3.5 w-3.5" />
          {c.label}
        </Badge>
      </CardHeader>

      <CardContent className="px-3 pb-3 pt-0">{children}</CardContent>
    </Card>
  );
}
