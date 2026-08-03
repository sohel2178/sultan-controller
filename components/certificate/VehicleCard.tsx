"use client";

import { Car, Hash, Cpu, Calendar, User, Wrench } from "lucide-react";

interface VehicleCardProps {
  ownerName: string;
  registrationNo: string;
  vehicleType: string;
  chassisNo: string;
  engineNo: string;
  imei: string;
  iccid: string;
  deviceModel: string;
  installationDate: string;
  installer: string;
}

export default function VehicleCard({
  ownerName,
  registrationNo,
  vehicleType,
  chassisNo,
  engineNo,
  imei,
  iccid,
  deviceModel,
  installationDate,
  installer,
}: VehicleCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Vehicle Particulars
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5 p-5">
        <InfoItem
          icon={<User size={16} />}
          label="Owner Name"
          value={ownerName}
        />

        <InfoItem
          icon={<Car size={16} />}
          label="Registration No."
          value={registrationNo}
        />

        <InfoItem
          icon={<Car size={16} />}
          label="Vehicle Type"
          value={vehicleType}
        />

        <InfoItem
          icon={<Hash size={16} />}
          label="Chassis No."
          value={chassisNo}
        />

        <InfoItem
          icon={<Hash size={16} />}
          label="Engine No."
          value={engineNo}
        />

        <InfoItem icon={<Cpu size={16} />} label="Device IMEI" value={imei} />

        <InfoItem icon={<Cpu size={16} />} label="SIM ICCID" value={iccid} />

        <InfoItem
          icon={<Cpu size={16} />}
          label="Device Model"
          value={deviceModel}
        />

        <InfoItem
          icon={<Calendar size={16} />}
          label="Installation Date"
          value={installationDate}
        />

        <InfoItem
          icon={<Wrench size={16} />}
          label="Installed By"
          value={installer}
        />
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-orange-500">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-all font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
