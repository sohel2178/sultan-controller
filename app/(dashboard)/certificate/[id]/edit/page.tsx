"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Certificate from "@/components/certificate-v2/Certificate";
import CertificateForm from "@/components/certificate/CertificateForm";

import { CertificateAPI } from "@/lib/api";

import {
  certificateSchema,
  CertificateFormValues,
} from "@/lib/certificate-schema";

import { Certificate as CertificateType } from "@/types/certificate-types";

import { Button } from "@/components/ui/button";

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

      const res = await CertificateAPI.getById(id);

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

      await CertificateAPI.update(id, data);

      toast.success("Certificate updated successfully.");

      router.push(`/certificate/${id}`);
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
    <div className="grid h-[calc(100vh-90px)] grid-cols-[420px_1fr] gap-6 overflow-hidden">
      {/* Form */}

      <div className="overflow-y-auto rounded-xl border bg-card p-6">
        <CertificateForm
          form={form}
          loading={saving}
          onSubmit={handleSubmit}
          submitText="Update Certificate"
        />
      </div>

      {/* Preview */}

      <div className="overflow-y-auto rounded-xl border bg-muted p-6">
        <Certificate {...preview} />
      </div>
    </div>
  );
}
