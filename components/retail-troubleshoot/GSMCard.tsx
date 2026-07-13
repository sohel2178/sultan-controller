"use client";

import { Signal } from "lucide-react";
import StatusCard from "./StatusCard";
import { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function GSMCard({ device }: Props) {
  const gsm = device.geo?.gsm_signal_strength ?? 0;

  let status: "healthy" | "warning" | "critical" = "healthy";

  if (gsm < 15) status = "critical";
  else if (gsm < 30) status = "warning";

  return (
    <StatusCard title="GSM Network" icon={Signal} status={status}>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Signal</span>
          <span>{gsm}%</span>
        </div>

        <div className="w-full rounded-full bg-muted h-2">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${gsm}%` }}
          />
        </div>
      </div>
    </StatusCard>
  );
}
