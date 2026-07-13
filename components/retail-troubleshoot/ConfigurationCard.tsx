"use client";

import { Settings2 } from "lucide-react";
import { Device } from "@/types/device";
import StatusCard from "./StatusCard";

interface Props {
  device: Device;
}

export default function ConfigurationCard({ device }: Props) {
  const configured =
    !!device.device_sim_number &&
    !!device.center_number &&
    !!device.speed_limit;

  return (
    <StatusCard
      title="Configuration"
      icon={Settings2}
      status={configured ? "healthy" : "warning"}
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Model</span>
          <span>{device.device_model}</span>
        </div>

        <div className="flex justify-between">
          <span>SIM</span>
          <span>{device.device_sim_number || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Center</span>
          <span>{device.center_number || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Speed Limit</span>
          <span>{device.speed_limit ?? "-"} km/h</span>
        </div>
      </div>
    </StatusCard>
  );
}
