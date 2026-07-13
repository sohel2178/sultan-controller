"use client";

import { MapPinned } from "lucide-react";
import StatusCard from "./StatusCard";
import { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function GPSCard({ device }: Props) {
  const sat = device.geo?.number_of_satellite ?? 0;

  let status: "healthy" | "warning" | "critical" = "healthy";

  if (sat < 3) status = "critical";
  else if (sat <= 4) status = "warning";

  return (
    <StatusCard title="GPS" icon={MapPinned} status={status}>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Satellites</span>
          <span>{sat}</span>
        </div>

        <div className="flex justify-between">
          <span>Speed</span>
          <span>{device.geo?.speed} km/h</span>
        </div>

        <div className="flex justify-between">
          <span>Last GPS</span>
          <span>
            {device.geo?.latest_time
              ? new Date(device.geo.latest_time).toLocaleTimeString()
              : "-"}
          </span>
        </div>
      </div>
    </StatusCard>
  );
}
