"use client";

import QRCode from "react-qr-code";
import { ShieldCheck } from "lucide-react";

interface QRCardProps {
  certificateNo: string;
  verificationUrl: string;
}

export default function QRCard({
  certificateNo,
  verificationUrl,
}: QRCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Certificate Verification
        </h3>
      </div>

      <div className="flex flex-col items-center p-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <QRCode
            value={verificationUrl}
            size={170}
            bgColor="#ffffff"
            fgColor="#111827"
          />
        </div>

        <div className="mt-5 flex items-center gap-2 text-orange-600">
          <ShieldCheck size={18} />
          <span className="font-semibold">Scan to Verify</span>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Scan this QR Code to verify the authenticity of this certificate.
        </p>

        <div className="mt-5 w-full rounded-lg bg-gray-100 px-4 py-3 text-center">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Certificate No.
          </p>

          <p className="mt-1 font-bold tracking-wider text-gray-900">
            {certificateNo}
          </p>
        </div>
      </div>
    </div>
  );
}
