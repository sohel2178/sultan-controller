"use client";

import Link from "next/link";
import { Eye, Pencil, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteCertificateDialog from "./DeleteCertificateDialog";
import { Certificate } from "@/types/certificate-types";
import { usePathname } from "next/navigation";

interface Props {
  certificate: Certificate;
  onDeleted: () => void;
}

export default function CertificateActions({ certificate, onDeleted }: Props) {
  const pathname = usePathname();
  const editHref = pathname.includes("rangs-certificate")
    ? `/rangs-certificate/${certificate._id}/edit`
    : `/certificate/${certificate._id}/edit`;

  const viewHref = pathname.includes("rangs-certificate")
    ? `/rangs-certificate/${certificate._id}`
    : `/certificate/${certificate._id}`;

  const printHref = pathname.includes("rangs-certificate")
    ? `/rangs-certificate/${certificate._id}/print`
    : `/certificate/${certificate._id}/print`;
  return (
    <div className="flex justify-end gap-1">
      <Button asChild size="icon" variant="ghost">
        <Link href={viewHref}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      <Button asChild size="icon" variant="ghost">
        <Link href={editHref}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <Button asChild size="icon" variant="ghost">
        <Link href={printHref} target="_blank">
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
