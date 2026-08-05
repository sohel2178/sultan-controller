"use client";

import { BadgeCheck, Building2 } from "lucide-react";

interface CompanyCardProps {
  companyName: string;
  brandName: string;
  licenseNo: string;
  hotline: string;
  website: string;
  email: string;
}

export default function CompanyCard({
  companyName,
  brandName,
  licenseNo,
}: CompanyCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-2.5">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Company
        </h3>
      </div>

      {/* Body */}
      <div className="flex-1 space-y-1 p-2">
        <InfoRow
          icon={<Building2 size={15} />}
          label="Brand"
          value={brandName}
        />

        <InfoRow
          icon={<Building2 size={15} />}
          label="Operated By"
          value={companyName}
        />

        <InfoRow
          icon={<BadgeCheck size={15} />}
          label="BTRC VTS License"
          value={licenseNo || "BTRC-VTS-14.32.0000.702.49.074.22.60"}
        />
      </div>

      {/* Footer */}
      <div className="border-t bg-orange-50 px-4 py-2">
        <p className="text-center text-[11px] font-semibold tracking-wide text-orange-700">
          Licensed Vehicle Tracking Service (VTS)
        </p>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 shrink-0 text-orange-500">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>

        <p className="mt-0.5 break-all text-sm font-semibold leading-5 text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}
