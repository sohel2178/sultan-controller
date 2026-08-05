"use client";

import Image from "next/image";

interface HeaderProps {
  certificateNo: string;
}

export default function Header({ certificateNo }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 pb-2">
      <div className="grid grid-cols-[170px_1fr_90px] items-center gap-4">
        {/* Left Logo */}
        <div className="flex items-center">
          <Image
            src="/sultan-logo.png"
            alt="Sultan Tracker"
            width={150}
            height={40}
            priority
            // className="h-auto w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-600">
            GPS Vehicle Tracking Service
          </p>

          <h1 className="mt-1 text-[36px] font-black uppercase leading-none tracking-wide text-slate-900">
            Compliance Certificate
          </h1>

          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-orange-500" />

            <span className="text-[12px] font-medium text-slate-600">
              Issued by{" "}
              <span className="font-bold text-slate-900">Sultan Tracker</span>
              <span className="mx-2 text-slate-400">•</span>
              Operated by{" "}
              <span className="font-bold text-slate-900">Forbit Limited</span>
            </span>

            <div className="h-px w-16 bg-orange-500" />
          </div>
        </div>

        {/* Right Logo */}
        <div className="flex justify-end">
          <div className="rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <Image
              src="/brta-logo.svg"
              alt="BRTA"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="rounded-xl border border-gray-200 bg-linear-to-r from-gray-50 to-white">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          <SummaryItem label="Certificate No." value={certificateNo} />

          <SummaryItem label="Document Type" value="GPS Installation" />

          <SummaryItem label="Certificate" value="Digital" />

          <SummaryItem
            label="Authority"
            value="BRTA Ready"
            valueClass="text-emerald-600"
          />
        </div>
      </div>
    </header>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
  valueClass?: string;
}

function SummaryItem({ label, value, valueClass }: SummaryItemProps) {
  return (
    <div className="px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {label}
      </p>

      <p
        className={`mt-1 text-[15px] font-bold tracking-wide text-slate-900 ${
          valueClass ?? ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
