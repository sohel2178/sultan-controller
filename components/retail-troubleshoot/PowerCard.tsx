"use client";

import { BatteryCharging } from "lucide-react";
import StatusCard from "./StatusCard";
import { Device } from "@/types/device";

interface Props {
  device: Device;
}

export default function PowerCard({ device }: Props) {
  const charging = device.geo?.charging === "ON";

  const status = charging ? "healthy" : "warning";

  return (
    <StatusCard title="Power" icon={BatteryCharging} status={status}>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Charging</span>
          <span>{device.geo?.charging}</span>
        </div>

        <div className="flex justify-between">
          <span>Voltage</span>
          <span>{device.geo?.external_voltage ?? "-"} V</span>
        </div>

        <div className="flex justify-between">
          <span>Battery</span>
          <span>{device.geo?.voltage_level}</span>
        </div>
      </div>
    </StatusCard>
  );
}
