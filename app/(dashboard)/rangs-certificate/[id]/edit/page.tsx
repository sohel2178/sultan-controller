"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Certificate from "@/components/certificate-v2/Certificate";
import CertificateForm from "@/components/certificate/CertificateForm";

import { RangsCertificateAPI } from "@/lib/api";

import {
  certificateSchema,
  CertificateFormValues,
} from "@/lib/certificate-schema";

import { Certificate as CertificateType } from "@/types/certificate-types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CertificatePreview from "@/components/certificate/CertificatePreview";

export default function EditCertificatePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [certificate, setCertificate] = useState<CertificateType | null>(null);

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
  });

  async function loadCertificate() {
    try {
      setLoading(true);

      const res = await RangsCertificateAPI.getById(id);

      setCertificate(res);

      form.reset({
        ownerName: res.vehicle.ownerName,
        registrationNo: res.vehicle.registrationNo,
        vehicleType: res.vehicle.vehicleType,

        chassisNo: res.vehicle.chassisNo ?? "",
        engineNo: res.vehicle.engineNo ?? "",

        imei: res.vehicle.imei,
        iccid: res.vehicle.iccid ?? "",

        deviceModel: res.vehicle.deviceModel,

        installationDate: res.vehicle.installationDate,

        installer: res.vehicle.installer,

        issueDate: res.validity.issueDate,

        validUntil: res.validity.validUntil,

        gpsStatus: res.validity.gpsStatus,

        deviceStatus: res.validity.deviceStatus,

        notes: res.notes ?? "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load certificate.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCertificate();
  }, []);

  async function handleSubmit(data: CertificateFormValues) {
    try {
      setSaving(true);

      await RangsCertificateAPI.update(id, data);

      toast.success("Certificate updated successfully.");

      router.push(`/rangs-certificate/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update certificate.");
    } finally {
      setSaving(false);
    }
  }

  const values = form.watch();

  const preview = useMemo(() => {
    if (!certificate) return null;

    return {
      certificateNo: certificate.certificateNo,

      verificationUrl:
        certificate.verificationUrl ??
        `https://verify.sultantracker.com/${certificate.certificateNo}`,

      company: certificate.company,

      vehicle: {
        ownerName: values.ownerName,
        registrationNo: values.registrationNo,
        vehicleType: values.vehicleType,

        chassisNo: values.chassisNo ?? "",
        engineNo: values.engineNo ?? "",

        imei: values.imei,
        iccid: values.iccid ?? "",

        deviceModel: values.deviceModel,

        installationDate: values.installationDate,

        installer: values.installer,
      },

      validity: {
        issueDate: values.issueDate,

        validUntil: values.validUntil,

        remainingDays: Math.max(
          0,
          Math.ceil(
            (new Date(values.validUntil).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          ),
        ),

        gpsStatus: values.gpsStatus,

        deviceStatus: values.deviceStatus,

        lastCommunication: certificate.validity.lastCommunication ?? "-",
      },
    };
  }, [certificate, values]);

  if (loading || !preview) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 gap-4 overflow-hidden p-2">
      {/* LEFT */}
      <section className="flex h-full w-107.5 min-h-0 shrink-0 flex-col overflow-hidden rounded-xl border bg-background">
        {/* Header */}
        <div className="shrink-0 border-b px-6 py-4">
          <h1 className="text-xl font-bold">Update Certificate</h1>

          <p className="text-sm text-muted-foreground">
            Fill up the information below.
          </p>
        </div>

        {/* FORM SCROLL */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-6">
            <CertificateForm
              form={form}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border bg-muted/20">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="font-semibold">Live Preview</h2>

            <p className="text-sm text-muted-foreground">
              Changes are reflected instantly.
            </p>
          </div>

          <Button onClick={form.handleSubmit(handleSubmit)} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Certificate
          </Button>
        </div>

        {/* PREVIEW */}
        <div className="min-h-0 min-w-0 flex-1">
          <CertificatePreview>
            <Certificate {...preview} />
          </CertificatePreview>
        </div>
      </section>
    </main>
  );
}
