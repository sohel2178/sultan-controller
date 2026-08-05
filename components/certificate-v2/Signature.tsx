"use client";

export default function Signature() {
  return (
    <div className="flex h-full flex-col items-center justify-end pl-5">
      {/* Signature */}
      <div className="mb-2">
        <p
          className="text-[32px] italic text-slate-800"
          style={{
            fontFamily: '"Brush Script MT", "Segoe Script", cursive',
          }}
        >
          Sultan Tracker
        </p>
      </div>

      {/* Signature Line */}
      <div className="w-52 border-t border-slate-400" />

      {/* Details */}
      <div className="mt-2 text-center">
        <p className="text-[11px] font-medium text-slate-600">
          Authorised Signatory
        </p>

        <p className="mt-0.5 text-[14px] font-bold text-slate-900">
          Sultan Tracker
        </p>
      </div>
    </div>
  );
}
