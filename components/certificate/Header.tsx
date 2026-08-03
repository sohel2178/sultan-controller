"use client";

import Image from "next/image";

interface HeaderProps {
  certificateNo: string;
}

export default function Header({ certificateNo }: HeaderProps) {
  return (
    <header className="border-b pb-6">
      <div className="grid grid-cols-3 items-center">
        {/* Sultan Logo */}
        <div className="flex justify-start">
          <Image
            src="/sultan-logo.png"
            alt="Sultan Tracker"
            width={170}
            height={60}
            priority
            className="h-auto w-auto"
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
            GPS Tracker
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-wide text-gray-900">
            COMPLIANCE CERTIFICATE
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Powered by{" "}
            <span className="font-semibold text-gray-900">Forbit Limited</span>
          </p>
        </div>

        {/* BRTA Logo */}
        <div className="flex justify-end">
          <Image
            src="/brta-logo.svg"
            alt="BRTA"
            width={72}
            height={72}
            priority
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />
        <div className="text-gray-500">★</div>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Certificate Number */}
      <div className="flex justify-center">
        <div className="rounded-xl border-2 border-gray-800 bg-gray-50 px-8 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            GPS Certificate No.
          </p>

          <p className="mt-1 text-lg font-bold tracking-wider text-gray-900">
            {certificateNo}
          </p>
        </div>
      </div>
    </header>
  );
}
