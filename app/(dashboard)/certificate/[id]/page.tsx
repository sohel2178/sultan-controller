"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Printer, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import Certificate from "@/components/certificate-v2/Certificate";

import { CertificateAPI } from "@/lib/api";
import { Certificate as CertificateType } from "@/types/certificate-types";
import { exportCertificatePDF } from "@/lib/pdf";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CertificateViewPage({ params }: PageProps) {
  const { id } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<CertificateType | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchCertificate() {
      try {
        setLoading(true);
        const res = await CertificateAPI.getById(id);
        setCertificate(res);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [id]);

  useEffect(() => {
    if (!certificate) return;

    async function prepare() {
      await document.fonts.ready;

      const root = document.getElementById("certificate");
      if (!root) return;

      const imgs = Array.from(root.querySelectorAll("img"));

      await Promise.all(
        imgs
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              }),
          ),
      );

      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);

      setReady(true);
    }

    prepare();
  }, [certificate]);

  async function loadCertificate() {
    try {
      setLoading(true);

      const res = await CertificateAPI.getById(id);

      console.log("Certificate:", res);

      setCertificate(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        Certificate not found.
      </div>
    );
  }

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(certificate.validity.validUntil).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Toolbar */}

      <div className="flex items-center justify-between border-b bg-background px-6 py-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-bold">Certificate</h1>

            <p className="text-sm text-muted-foreground">
              {certificate.certificateNo}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/certificate/${id}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            disabled={!ready}
            onClick={async () => {
              const el = document.getElementById("certificate");

              console.log(el);

              if (!el) return;

              await exportCertificatePDF(
                el,
                `${certificate.registrationNo}.pdf`,
              );
            }}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Preview */}

      <ScrollArea className="min-h-0 flex-1 bg-slate-200">
        <div className="flex justify-center p-8">
          <Certificate
            certificateNo={certificate.certificateNo}
            verificationUrl={certificate.verificationUrl ?? ""}
            company={certificate.company}
            vehicle={certificate.vehicle}
            validity={{
              ...certificate.validity,
              remainingDays,
            }}
          />
        </div>
      </ScrollArea>
    </main>
  );
}
