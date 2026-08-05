"use client";

import { ShieldCheck } from "lucide-react";

export default function DescriptionCard() {
  return (
    <section className="mt-5 rounded-xl border border-orange-200 bg-orange-50/60">
      <div className="flex items-center gap-5 px-6 py-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-white">
          <ShieldCheck className="h-7 w-7 text-orange-600" />
        </div>

        <p className="text-[13px] leading-7 text-slate-700">
          This is to certify that the vehicle described in this certificate has
          been equipped with a genuine GPS Tracking Device installed and
          activated by <strong>Sultan Tracker</strong>, operated by{" "}
          <strong>Forbit Limited</strong>. The installed tracking device
          complies with the applicable GPS tracking requirements and remains
          valid while the GPS subscription is active.
        </p>
      </div>
    </section>
  );
}
