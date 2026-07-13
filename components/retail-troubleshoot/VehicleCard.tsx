"use client";

import { Car } from "lucide-react";
import { Device } from "@/types/device";
import StatusCard from "./StatusCard";

interface Props {
  device: Device;
}

export default function VehicleCard({ device }: Props) {
  const acc = device.geo?.acc === "ON";
  const speed = device.geo?.speed ?? 0;

  const status = acc ? "healthy" : "info";

  return (
    <StatusCard title="Vehicle" icon={Car} status={status}>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>ACC</span>
          <span>{acc ? "ON" : "OFF"}</span>
        </div>

        <div className="flex justify-between">
          <span>Speed</span>
          <span>{speed} km/h</span>
        </div>

        <div className="flex justify-between">
          <span>Driver</span>
          <span>{device.driver_name || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Mileage</span>
          <span>
            {device.geo?.milage != null
              ? `${Math.floor(device.geo.milage / 1000)} km`
              : "-"}
          </span>
        </div>
      </div>
    </StatusCard>
  );
}
