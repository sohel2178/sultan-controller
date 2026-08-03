"use client";

interface WatermarkProps {
  text?: string;
}

export default function Watermark({ text = "SULTAN TRACKER" }: WatermarkProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          rotate-[-30deg]
          select-none
          whitespace-nowrap
          text-[90px]
          font-black
          uppercase
          tracking-[0.35em]
          text-orange-500/5
        "
      >
        {text}
      </div>
    </div>
  );
}
