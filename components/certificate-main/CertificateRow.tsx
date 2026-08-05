"use client";

import { formatBangladeshDate } from "@/lib/date";
import { Certificate } from "@/types/certificate-types";

import CertificateActions from "./CertificateActions";
import CertificateStatusBadge from "./CertificateStatusBadge";

interface CertificateRowProps {
  index: number;
  certificate: Certificate;
  onDeleted: () => void;
}

export default function CertificateRow({
  index,
  certificate,
  onDeleted,
}: CertificateRowProps) {
  return (
    <tr className="border-b hover:bg-muted/40">
      <td className="px-4 py-3 text-center">{index}</td>

      <td className="px-4 py-3">
        <div className="font-semibold">{certificate.certificateNo}</div>

        <div className="text-xs text-muted-foreground">
          {formatBangladeshDate(certificate.createdAt)}
        </div>
      </td>

      <td className="px-4 py-3">{certificate.vehicle.ownerName}</td>

      <td className="px-4 py-3">{certificate.vehicle.registrationNo}</td>

      <td className="px-4 py-3 font-mono text-sm">
        {certificate.vehicle.imei}
      </td>

      <td className="px-4 py-3">
        <CertificateStatusBadge status={certificate.validity.gpsStatus} />
      </td>

      <td className="px-4 py-3">
        {formatBangladeshDate(certificate.validity.issueDate)}
      </td>

      <td className="px-4 py-3">
        <CertificateActions certificate={certificate} onDeleted={onDeleted} />
      </td>
    </tr>
  );
}
