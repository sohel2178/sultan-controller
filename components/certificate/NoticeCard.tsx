"use client";

import { CheckCircle2, Shield, Clock3, Smartphone } from "lucide-react";

export default function NoticeCard() {
  const notices = [
    "Certificate is valid while GPS subscription remains active.",
    "GPS device is monitored by Sultan Tracker Cloud.",
    "QR Code can be used to verify this certificate.",
    "Any alteration makes this certificate invalid.",
    "This certificate is digitally generated.",
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Important Notice
        </h3>
      </div>

      <div className="space-y-4 p-5">
        {notices.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <p className="text-sm leading-6 text-gray-700">{item}</p>
          </div>
        ))}

        <div className="mt-5 rounded-lg border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-center gap-2 text-orange-700">
            <Shield size={18} />

            <span className="font-semibold">Security Features</span>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <Clock3 size={16} className="mt-1" />
              Digitally Generated
            </li>

            <li className="flex gap-2">
              <Smartphone size={16} className="mt-1" />
              QR Verification Ready
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
