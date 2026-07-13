"use client";

import { Device } from "@/types/device";

import AssignmentCard from "./AssignmentCard";
import ConnectivityCard from "./ConnectivityCard";
import GPSCard from "./GPSCard";
import GSMCard from "./GSMCard";
import PowerCard from "./PowerCard";
import VehicleCard from "./VehicleCard";
import ConfigurationCard from "./ConfigurationCard";
import RootCauseCard from "./RootCauseCard";

interface Props {
  device: Device;
}

export default function TroubleshootGrid({ device }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <AssignmentCard device={device} />

      <ConnectivityCard device={device} />

      <GPSCard device={device} />

      <GSMCard device={device} />

      <PowerCard device={device} />

      <VehicleCard device={device} />

      <ConfigurationCard device={device} />

      <RootCauseCard device={device} />
    </div>
  );
}
