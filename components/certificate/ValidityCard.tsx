"use client";

import { CalendarCheck2, CalendarClock, Clock3, Wifi } from "lucide-react";

import StatusBadge from "./StatusBadge";

interface ValidityCardProps {
  issueDate: string;
  validUntil: string;
  remainingDays: number;
  gpsStatus: string;
  deviceStatus: string;
  lastCommunication: string;
}

export default function ValidityCard({
  issueDate,
  validUntil,
  remainingDays,
  gpsStatus,
  deviceStatus,
  lastCommunication,
}: ValidityCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Certificate Status
        </h3>
      </div>

      <div className="space-y-5 p-5">
        <Row
          icon={<CalendarCheck2 size={16} />}
          label="Issue Date"
          value={issueDate}
        />

        <Row
          icon={<CalendarClock size={16} />}
          label="Valid Until"
          value={validUntil}
        />

        <Row
          icon={<Clock3 size={16} />}
          label="Remaining Days"
          value={`${remainingDays} Days`}
        />

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm font-medium text-gray-600">GPS Service</span>

          <StatusBadge status={gpsStatus} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Device Status
          </span>

          <StatusBadge status={deviceStatus} />
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-3">
            <Wifi size={16} className="mt-1 text-orange-500" />

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Last Communication
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {lastCommunication}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function Row({ icon, label, value }: RowProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-orange-500">{icon}</div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
