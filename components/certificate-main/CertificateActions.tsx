"use client";

import Link from "next/link";
import { Eye, Pencil, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteCertificateDialog from "./DeleteCertificateDialog";
import { Certificate } from "@/types/certificate-types";

interface Props {
  certificate: Certificate;
  onDeleted: () => void;
}

export default function CertificateActions({ certificate, onDeleted }: Props) {
  return (
    <div className="flex justify-end gap-1">
      <Button asChild size="icon" variant="ghost">
        <Link href={`/certificate/${certificate._id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      <Button asChild size="icon" variant="ghost">
        <Link href={`/certificate/${certificate._id}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <Button asChild size="icon" variant="ghost">
        <Link href={`/certificate/${certificate._id}/print`} target="_blank">
          <Printer className="h-4 w-4" />
        </Link>
      </Button>

      <DeleteCertificateDialog
        certificate={certificate}
        onDeleted={onDeleted}
      />
    </div>
  );
}
