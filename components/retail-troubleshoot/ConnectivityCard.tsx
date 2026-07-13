"use client";

import { Wifi } from "lucide-react";
import StatusCard from "./StatusCard";
import { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function ConnectivityCard({ device }: Props) {
  const deviceTimeString = device.geo?.devicetime ?? device.geo?.update_time;

  const deviceTime = deviceTimeString ? new Date(deviceTimeString) : null;

  const diff = deviceTime
    ? (Date.now() - deviceTime.getTime()) / 1000 / 60
    : Infinity;

  let status: "healthy" | "warning" | "critical" = "healthy";

  if (diff > 15) status = "critical";
  else if (diff > 5) status = "warning";

  return (
    <StatusCard title="Connectivity" icon={Wifi} status={status}>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Status</span>
          <span className="font-medium">
            {status === "healthy"
              ? "Online"
              : status === "warning"
                ? "Delayed"
                : "Offline"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Last Device Packet</span>
          <span>{Math.floor(diff)} min ago</span>
        </div>

        <div className="flex justify-between">
          <span>Last Server Update</span>
          <span>
            {device.geo?.update_time
              ? new Date(device.geo.update_time).toLocaleTimeString()
              : "-"}
          </span>
        </div>
      </div>
    </StatusCard>
  );
}
