"use client";

import { CalendarCheck2, CalendarClock, Clock3, Wifi } from "lucide-react";

import StatusBadge from "./StatusBadge";
import { formatBangladeshDateTime, formatBangladeshDate } from "@/lib/date";

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
      {/* Header */}
      <div className="bg-gray-900 px-4 py-2.5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Certificate Status
        </h3>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        <Row
          icon={<CalendarCheck2 size={14} />}
          label="Issue Date"
          value={formatBangladeshDate(issueDate)}
        />

        <Row
          icon={<CalendarClock size={14} />}
          label="Valid Until"
          value={formatBangladeshDate(validUntil)}
        />

        <Row
          icon={<Clock3 size={14} />}
          label="Remaining Days"
          value={`${remainingDays} Days`}
        />

        {/* Status */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            GPS Service
          </span>

          <StatusBadge status={gpsStatus} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Device Status
          </span>

          <StatusBadge status={deviceStatus} />
        </div>

        {/* Last Communication */}
        <div className="border-t pt-3">
          <div className="flex gap-2.5">
            <Wifi size={14} className="mt-0.5 shrink-0 text-orange-500" />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                Last Communication
              </p>

              <p className="mt-0.5 text-[13px] font-semibold leading-5 text-gray-900">
                {formatBangladeshDateTime(lastCommunication) || "-"}
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
    <div className="flex gap-2.5">
      <div className="mt-0.5 shrink-0 text-orange-500">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-0.5 text-[13px] font-semibold leading-5 text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}
