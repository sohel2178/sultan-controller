"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CertificateAPI, RangsCertificateAPI } from "@/lib/api";
import { Certificate } from "@/types/certificate-types";
import { usePathname } from "next/navigation";

interface Props {
  certificate: Certificate;
  onDeleted: () => void;
}

export default function DeleteCertificateDialog({
  certificate,
  onDeleted,
}: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const isRangsCertificate = pathname.includes("rangs-certificate");

  async function handleDelete() {
    try {
      setLoading(true);

      if (isRangsCertificate) {
        await RangsCertificateAPI.remove(certificate._id);
      } else {
        await CertificateAPI.remove(certificate._id);
      }

      toast.success("Certificate deleted successfully.");

      onDeleted();
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete certificate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Certificate</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete
            <br />
            <strong>{certificate.certificateNo}</strong>?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
