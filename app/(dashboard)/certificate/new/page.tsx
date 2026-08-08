"use client";

import dynamic from "next/dynamic";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import Certificate from "@/components/certificate-v2/Certificate";
import CertificateForm from "@/components/certificate/CertificateForm";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CertificateProps } from "@/components/certificate/Certificate";
const CertificatePreview = dynamic(
  () => import("@/components/certificate/CertificatePreview"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-200" />,
  },
);

import { CertificateAPI } from "@/lib/api";
import {
  certificateSchema,
  defaultCertificateValues,
  CertificateFormValues,
} from "@/lib/certificate-schema";
import { CreateCertificateDto } from "@/types/certificate-types";

export default function CreateCertificatePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<CreateCertificateDto>({
    resolver: zodResolver(certificateSchema),
    defaultValues: defaultCertificateValues,
  });

  const values = form.watch();

  const preview: CertificateProps = useMemo(
    () => ({
      certificateNo: "ST-YYYY-XXXXXX",
      verificationUrl: "https://verify.sultantracker.com",

      company: {
        companyName: "Forbit Limited",
        brandName: "Sultan Tracker",
        licenseNo: "BTRC-VTS-14.32.0000.702.49.074.22.60",
        hotline: "01409962099",
        website: "www.sultantracker.com",
        email: "sultantracker.vts@gmail.com",
      },
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
            (new Date(values.validUntil).getTime() -
              new Date(values.issueDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        ),
        gpsStatus: values.gpsStatus ?? "ACTIVE",
        deviceStatus: values.deviceStatus ?? "ONLINE",
        lastCommunication: "-",
      },
    }),
    [values],
  );

  async function handleSubmit(data: CertificateFormValues) {
    try {
      setLoading(true);

      const certificate = await CertificateAPI.create(data);

      router.push(`/certificate/${certificate._id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create certificate.");
    } finally {
      setLoading(false);
    }
  }

  // return (
  //   <main className="flex h-[calc(100vh-4rem)] gap-6 overflow-hidden p-6">
  //     {/* Left */}

  //     <div className="w-107.5 shrink-0 rounded-xl border bg-background">
  //       <div className="border-b px-6 py-4">
  //         <h1 className="text-xl font-bold">Create Certificate</h1>

  //         <p className="text-sm text-muted-foreground">
  //           Fill up the information below.
  //         </p>
  //       </div>

  //       <ScrollArea className="h-[calc(100%-73px)]">
  //         <div className="p-6">
  //           <CertificateForm
  //             form={form}
  //             loading={loading}
  //             onSubmit={handleSubmit}
  //           />
  //         </div>
  //       </ScrollArea>
  //     </div>

  //     {/* Right */}

  //     <div className="flex min-w-0 flex-1 flex-col rounded-xl border bg-muted/20">
  //       <div className="flex items-center justify-between border-b px-6 py-4">
  //         <div>
  //           <h2 className="font-semibold">Live Preview</h2>

  //           <p className="text-sm text-muted-foreground">
  //             Changes are reflected instantly.
  //           </p>
  //         </div>

  //         <Button onClick={form.handleSubmit(handleSubmit)} disabled={loading}>
  //           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  //           Create Certificate
  //         </Button>
  //       </div>

  //       <ScrollArea className="min-h-0 flex-1">
  //         <div className="flex justify-center bg-slate-200 p-8">
  //           <Certificate
  //             certificateNo={preview.certificateNo}
  //             verificationUrl={preview.verificationUrl}
  //             company={preview.company}
  //             vehicle={preview.vehicle}
  //             validity={preview.validity}
  //           />
  //         </div>
  //       </ScrollArea>

  //     </div>
  //   </main>
  // );

  // return (
  //   <main className="flex min-h-0 min-w-0 flex-1 gap-4">
  //     {/* LEFT */}
  //     <div className="flex min-h-0 w-107.5 shrink-0 flex-col rounded-xl border bg-background">
  //       {/* Form Header */}
  //       <div className="shrink-0 border-b px-6 py-4">
  //         <h1 className="text-xl font-bold">Create Certificate</h1>

  //         <p className="text-sm text-muted-foreground">
  //           Fill up the information below.
  //         </p>
  //       </div>

  //       {/* Form Scroll */}
  //       <ScrollArea className="min-h-0 flex-1">
  //         <div className="p-6">
  //           <CertificateForm
  //             form={form}
  //             loading={loading}
  //             onSubmit={handleSubmit}
  //           />
  //         </div>
  //       </ScrollArea>
  //     </div>

  //     {/* RIGHT */}
  //     <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border bg-muted/20">
  //       {/* Header */}
  //       <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
  //         <div>
  //           <h2 className="font-semibold">Live Preview</h2>

  //           <p className="text-sm text-muted-foreground">
  //             Changes are reflected instantly.
  //           </p>
  //         </div>

  //         <Button onClick={form.handleSubmit(handleSubmit)} disabled={loading}>
  //           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  //           Create Certificate
  //         </Button>
  //       </div>

  //       {/* Preview */}
  //       <div className="min-h-0 min-w-0 flex-1">
  //         <CertificatePreview>
  //           <Certificate
  //             certificateNo={preview.certificateNo}
  //             verificationUrl={preview.verificationUrl}
  //             company={preview.company}
  //             vehicle={preview.vehicle}
  //             validity={preview.validity}
  //           />
  //         </CertificatePreview>
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 gap-4 overflow-hidden p-2">
      {/* LEFT */}
      <section className="flex h-full w-107.5 min-h-0 shrink-0 flex-col overflow-hidden rounded-xl border bg-background">
        {/* Header */}
        <div className="shrink-0 border-b px-6 py-4">
          <h1 className="text-xl font-bold">Create Certificate</h1>

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
            Create Certificate
          </Button>
        </div>

        {/* PREVIEW */}
        <div className="min-h-0 min-w-0 flex-1">
          <CertificatePreview>
            <Certificate
              certificateNo={preview.certificateNo}
              verificationUrl={preview.verificationUrl}
              company={preview.company}
              vehicle={preview.vehicle}
              validity={preview.validity}
            />
          </CertificatePreview>
        </div>
      </section>
    </main>
  );
}
