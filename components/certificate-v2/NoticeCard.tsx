"use client";

import {
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Cloud,
  FileCheck,
} from "lucide-react";

const notices = [
  "GPS Subscription Active",
  "QR Code Verification",
  "Digitally Generated Certificate",
];

export default function NoticeCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-2.5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Verification Status
        </h3>
      </div>

      {/* Body */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {notices.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />

              <span className="text-xs font-medium text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* Security Box */}
        <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-orange-700">
            <ShieldCheck size={16} />

            <span className="text-sm font-semibold">Security Features</span>
          </div>

          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <QrCode size={14} />
              <span>QR Verification</span>
            </div>

            <div className="flex items-center gap-2">
              <Cloud size={14} />
              <span>Cloud Connected</span>
            </div>

            <div className="flex items-center gap-2">
              <FileCheck size={14} />
              <span>Tamper Evident</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-4 border-t pt-3">
          <p className="text-center text-[11px] leading-5 text-gray-500">
            Verify this certificate by scanning the QR code or visiting the
            official verification portal.
          </p>
        </div> */}
      </div>
    </div>
  );
}
