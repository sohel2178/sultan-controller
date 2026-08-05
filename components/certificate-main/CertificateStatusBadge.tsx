"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CertificateStatusBadgeProps {
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED";
}

export default function CertificateStatusBadge({
  status,
}: CertificateStatusBadgeProps) {
  const styles = {
    ACTIVE:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",

    EXPIRED: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",

    SUSPENDED: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "min-w-23 justify-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide",
        styles[status],
      )}
    >
      <span
        className={cn(
          "mr-2 h-2 w-2 rounded-full",
          status === "ACTIVE" && "bg-emerald-500",
          status === "EXPIRED" && "bg-red-500",
          status === "SUSPENDED" && "bg-amber-500",
        )}
      />

      {status}
    </Badge>
  );
}
