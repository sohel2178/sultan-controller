"use client";

import { Building2, BadgeCheck, Phone, Globe, Mail } from "lucide-react";

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
  hotline,
  website,
  email,
}: CompanyCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Company Information
        </h3>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5 text-sm">
        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="Brand"
          value={brandName}
        />

        <InfoRow
          icon={<Building2 className="h-4 w-4" />}
          label="Operated By"
          value={companyName}
        />

        <InfoRow
          icon={<BadgeCheck className="h-4 w-4" />}
          label="BTRC VTS License"
          value={licenseNo}
        />

        <InfoRow
          icon={<Phone className="h-4 w-4" />}
          label="24/7 Hotline"
          value={hotline}
        />

        <InfoRow
          icon={<Globe className="h-4 w-4" />}
          label="Website"
          value={website}
        />

        <InfoRow
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={email}
        />
      </div>

      {/* Footer */}
      <div className="border-t bg-orange-50 px-5 py-3">
        <p className="text-center text-xs font-medium text-orange-700">
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
    <div className="flex gap-3">
      <div className="mt-0.5 text-orange-500">{icon}</div>

      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="mt-0.5 font-semibold text-gray-900 break-all">{value}</p>
      </div>
    </div>
  );
}
