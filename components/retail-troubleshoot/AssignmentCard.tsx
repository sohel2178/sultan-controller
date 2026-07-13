"use client";

import { UserCheck, UserX } from "lucide-react";
import StatusCard from "./StatusCard";
import { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function AssignmentCard({ device }: Props) {
  const assigned = !!device.uid;

  const user =
    typeof device.uid === "object" && device.uid !== null ? device.uid : null;

  return (
    <StatusCard
      title="Assignment"
      icon={assigned ? UserCheck : UserX}
      status={assigned ? "healthy" : "critical"}
    >
      {assigned ? (
        <div className="space-y-2 text-sm">
          {assigned && user && (
            <>
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.email || "-"}</p>
            </>
          )}

          <div className="rounded-md bg-green-500/10 p-2 text-xs text-green-600 dark:text-green-400">
            GPS packets are accepted.
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm">No customer assigned to this device.</p>

          <div className="rounded-md bg-red-500/10 p-2 text-xs text-red-600 dark:text-red-400">
            Backend rejects all incoming GPS packets.
          </div>
        </div>
      )}
    </StatusCard>
  );
}
