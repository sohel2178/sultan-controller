"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-xl border bg-white p-10 text-center shadow-lg">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="mt-5 text-2xl font-bold">Unable to Load Certificate</h1>

        <p className="mt-3 text-gray-600">
          {error.message ||
            "Something went wrong while loading the certificate."}
        </p>

        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <RotateCw size={18} />
          Try Again
        </button>
      </div>
    </main>
  );
}
