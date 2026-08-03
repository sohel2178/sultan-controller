"use client";

import { useState } from "react";
import { Download, Printer } from "lucide-react";

import Certificate from "@/components/certificate/Certificate";
import { Button } from "@/components/ui/button";

export default function CertificatePage() {
  const [loading] = useState(false);

  // TODO: Replace with API response
  const certificate = {
    certificateNo: "ST-2026-000001",
    verificationUrl: "https://verify.sultantracker.com/ST-2026-000001",

    company: {
      companyName: "Forbit Limited",
      brandName: "Sultan Tracker",
      licenseNo: "BTRC-VTS-XXXXXXXX",
      hotline: "01409962099",
      website: "www.sultantracker.com",
      email: "support@sultantracker.com",
    },

    vehicle: {
      ownerName: "Sohel Ahmed",
      registrationNo: "Dhaka Metro-GA-12-3456",
      vehicleType: "Private Car",
      chassisNo: "MALXXXXXXXXXXXXXX",
      engineNo: "G4FGXXXXXXXX",
      imei: "862292057207029",
      iccid: "8991101200003204512",
      deviceModel: "VG03 4G",
      installationDate: "03 August 2026",
      installer: "Sultan Tracker Engineering Team",
    },

    validity: {
      issueDate: "03 August 2026",
      validUntil: "03 August 2027",
      remainingDays: 365,
      gpsStatus: "ACTIVE",
      deviceStatus: "ONLINE",
      lastCommunication: "03 Aug 2026 06:20 PM",
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Will implement jsPDF/html2canvas later
    console.log("Download PDF");
  };

  return (
    <main className="flex h-[calc(100vh-2rem)] flex-col bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold">GPS Compliance Certificate</h1>

          <p className="text-muted-foreground">
            Preview before printing or downloading.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>

          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Scrollable Preview */}
      <div className="flex-1 overflow-y-auto rounded-lg border bg-slate-200 p-6">
        <Certificate
          certificateNo={certificate.certificateNo}
          verificationUrl={certificate.verificationUrl}
          company={certificate.company}
          vehicle={certificate.vehicle}
          validity={certificate.validity}
        />
      </div>
    </main>
  );
}
