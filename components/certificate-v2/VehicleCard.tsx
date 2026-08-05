// "use client";

// import { formatBangladeshDate } from "@/lib/date";
// import { Car, Hash, Cpu, Calendar, User, Wrench } from "lucide-react";

// interface VehicleCardProps {
//   ownerName: string;
//   registrationNo: string;
//   vehicleType: string;
//   chassisNo: string;
//   engineNo: string;
//   imei: string;
//   iccid: string;
//   deviceModel: string;
//   installationDate: string;
//   installer: string;
// }

// export default function VehicleCard({
//   ownerName,
//   registrationNo,
//   vehicleType,
//   chassisNo,
//   engineNo,
//   imei,
//   iccid,
//   deviceModel,
//   installationDate,
//   installer,
// }: VehicleCardProps) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
//       <div className="bg-gray-900 px-4 py-2.5">
//         <h3 className="text-sm font-bold uppercase tracking-widest text-white">
//           Vehicle Particulars
//         </h3>
//       </div>

//       <div className="grid grid-cols-2 gap-x-8 gap-y-5 p-5">
//         <InfoItem
//           icon={<User size={16} />}
//           label="Owner Name"
//           value={ownerName}
//         />

//         <InfoItem
//           icon={<Car size={16} />}
//           label="Registration No."
//           value={registrationNo}
//         />

//         <InfoItem
//           icon={<Car size={16} />}
//           label="Vehicle Type"
//           value={vehicleType}
//         />

//         <InfoItem
//           icon={<Hash size={16} />}
//           label="Chassis No."
//           value={chassisNo}
//         />

//         <InfoItem icon={<Cpu size={16} />} label="Device IMEI" value={imei} />

//         <InfoItem
//           icon={<Cpu size={16} />}
//           label="Device Model"
//           value={deviceModel}
//         />

//         <InfoItem
//           icon={<Calendar size={16} />}
//           label="Installation Date"
//           value={formatBangladeshDate(installationDate)}
//         />

//         <InfoItem
//           icon={<Wrench size={16} />}
//           label="Installed By"
//           value={installer}
//         />
//       </div>
//     </div>
//   );
// }

// interface InfoItemProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }

// function InfoItem({ icon, label, value }: InfoItemProps) {
//   return (
//     <div className="flex gap-2.5">
//       <div className="mt-0.5 shrink-0 text-orange-500">{icon}</div>

//       <div className="min-w-0 flex-1">
//         <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
//           {label}
//         </p>

//         <p className="mt-0.5 break-all text-[13px] font-semibold leading-5 text-gray-900">
//           {value || "-"}
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { formatBangladeshDate } from "@/lib/date";
import { Calendar, Car, Cpu, Hash, User, Wrench } from "lucide-react";

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
  imei,
  deviceModel,
  installationDate,
  installer,
}: VehicleCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-2">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">
          Vehicle Particulars
        </h3>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4">
        <InfoItem
          icon={<User size={15} />}
          label="Owner Name"
          value={ownerName}
        />

        <InfoItem
          icon={<Car size={15} />}
          label="Registration No."
          value={registrationNo}
        />

        <InfoItem
          icon={<Car size={15} />}
          label="Vehicle Type"
          value={vehicleType}
        />

        <InfoItem
          icon={<Hash size={15} />}
          label="Chassis No."
          value={chassisNo}
        />

        <InfoItem icon={<Cpu size={15} />} label="Device IMEI" value={imei} />

        <InfoItem
          icon={<Cpu size={15} />}
          label="Device Model"
          value={deviceModel}
        />

        <InfoItem
          icon={<Calendar size={15} />}
          label="Installation Date"
          value={
            installationDate ? formatBangladeshDate(installationDate) : "-"
          }
        />

        <InfoItem
          icon={<Wrench size={15} />}
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
    <div className="flex items-start gap-2">
      <div className="mt-0.5 shrink-0 text-orange-500">{icon}</div>

      <div className="min-w-0 leading-none">
        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-500">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-[12px] font-semibold leading-4 text-gray-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}
