"use client";

import { SearchCheck } from "lucide-react";
import { Device } from "@/types/device";
import StatusCard from "./StatusCard";

interface Props {
  device: Device;
}

export default function RootCauseCard({ device }: Props) {
  const user =
    typeof device.uid === "object" && device.uid !== null ? device.uid : null;

  const deviceTime = device.geo?.devicetime ?? device.geo?.update_time;

  const minutes = deviceTime
    ? (Date.now() - new Date(deviceTime).getTime()) / 1000 / 60
    : Infinity;

  const satellite = device.geo?.number_of_satellite ?? 0;
  const gsm = device.geo?.gsm_signal_strength ?? 0;

  let title = "No problems detected.";
  let description = "Device is operating normally.";
  let action = "No action required.";
  let status: "healthy" | "warning" | "critical" = "healthy";

  if (!user) {
    status = "critical";
    title = "Device is not assigned.";
    description = "Backend rejects all incoming GPS packets.";
    action = "Assign the device to a customer.";
  } else if (minutes > 15) {
    status = "critical";
    title = "Device offline.";
    description = "No packets received from the tracker.";
    action = "Check tracker power and SIM.";
  } else if (satellite < 3) {
    status = "critical";
    title = "No GPS Fix.";
    description = "Tracker cannot obtain location.";
    action = "Inspect GPS antenna.";
  } else if (satellite <= 4) {
    status = "warning";
    title = "Weak GPS signal.";
    description = `${satellite} satellites detected.`;
    action = "Move vehicle to open sky.";
  } else if (gsm < 15) {
    status = "warning";
    title = "Weak GSM signal.";
    description = "Network connectivity is poor.";
    action = "Check SIM/network coverage.";
  }

  return (
    <StatusCard
      title="Root Cause Analysis"
      icon={SearchCheck}
      status={status}
      className="col-span-full"
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Recommended Action
          </p>

          <p className="mt-1 text-sm">{action}</p>
        </div>
      </div>
    </StatusCard>
  );
}
