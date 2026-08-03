// components/certificate/StatusBadge.tsx

import { cn } from "@/lib/utils";

type StatusType =
  | "ACTIVE"
  | "ONLINE"
  | "OFFLINE"
  | "DISCONNECTED"
  | "EXPIRED"
  | "PENDING";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const styles: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  ONLINE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  OFFLINE: "bg-gray-100 text-gray-700 border-gray-200",
  DISCONNECTED: "bg-red-100 text-red-700 border-red-200",
  EXPIRED: "bg-red-100 text-red-700 border-red-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const badgeStyle =
    styles[status.toUpperCase()] ??
    "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        badgeStyle,
        className,
      )}
    >
      <span
        className={cn(
          "mr-2 h-2 w-2 rounded-full",
          status === "ACTIVE" || status === "ONLINE"
            ? "bg-emerald-500"
            : status === "PENDING"
              ? "bg-amber-500"
              : "bg-red-500",
        )}
      />

      {status}
    </span>
  );
}
