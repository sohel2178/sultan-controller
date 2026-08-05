"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Certificate } from "@/types/certificate-types";

import CertificateRow from "./CertificateRow";
import EmptyState from "./EmptyState";

interface CertificateTableProps {
  certificates: Certificate[];
  page?: number;
  limit?: number;
  onDeleted: () => void;
}

export default function CertificateTable({
  certificates,
  page = 1,
  limit = 10,
  onDeleted,
}: CertificateTableProps) {
  if (!certificates.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14 text-center">#</TableHead>
            <TableHead>Certificate No.</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>IMEI</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {certificates.map((certificate, index) => (
            <CertificateRow
              key={certificate._id}
              certificate={certificate}
              index={(page - 1) * limit + index + 1}
              onDeleted={onDeleted}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
