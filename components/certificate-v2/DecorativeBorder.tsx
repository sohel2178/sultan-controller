// "use client";

// import { ReactNode } from "react";

// interface DecorativeBorderProps {
//   children: ReactNode;
// }

// export default function DecorativeBorder({ children }: DecorativeBorderProps) {
//   return (
//     <div className="relative h-full w-full bg-white">
//       {/* Outer Border */}
//       <div className="absolute inset-[5mm] border-[2.5px] border-orange-500" />

//       {/* Inner Border */}
//       <div className="absolute inset-[6.5mm] border border-orange-300" />

//       {/* Four corner SVGs */}
//       <CornerTL />
//       <CornerTR />
//       <CornerBR />
//       <CornerBL />

//       <div className="relative z-10 px-[9mm] py-[9mm]">{children}</div>
//     </div>
//   );
// }

// function Corner({ className }: { className: string }) {
//   return (
//     <div className={`absolute h-10 w-10 ${className}`}>
//       {/* Outer Arc */}
//       <div className="absolute left-0 top-0 h-10 w-10 rounded-tl-[18px] border-l-[3px] border-t-[3px] border-orange-500" />

//       {/* Inner Arc */}
//       <div className="absolute left-1.5 top-1.5 h-6 w-6 rounded-tl-[12px] border-l border-t border-orange-400" />
//     </div>
//   );
// }

"use client";

import { ReactNode } from "react";

interface DecorativeBorderProps {
  children: ReactNode;
}

export default function DecorativeBorder({ children }: DecorativeBorderProps) {
  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      {/* Outer Border */}
      <div className="absolute inset-[5mm] border-[2.5px] border-orange-500" />

      {/* Inner Border */}
      <div className="absolute inset-[6.5mm] border border-orange-300" />

      {/* Decorative Corners */}
      <CornerTL />
      <CornerTR />
      <CornerBR />
      <CornerBL />

      {/* Content */}
      <div className="relative z-10 px-[9mm] py-[9mm]">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Corners                                  */
/* -------------------------------------------------------------------------- */

function CornerTL() {
  return (
    <svg
      className="absolute left-[5mm] top-[5mm] h-10 w-10"
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* Outer */}
      <path
        d="M40 2 H18 C9 2 2 9 2 18 V40"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Inner */}
      <path
        d="M40 8 H20 C13 8 8 13 8 20 V40"
        stroke="#fdba74"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerTR() {
  return (
    <svg
      className="absolute right-[5mm] top-[5mm] h-10 w-10"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M0 2 H22 C31 2 38 9 38 18 V40"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M0 8 H20 C27 8 32 13 32 20 V40"
        stroke="#fdba74"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerBR() {
  return (
    <svg
      className="absolute bottom-[5mm] right-[5mm] h-10 w-10"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M0 38 H22 C31 38 38 31 38 22 V0"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M0 32 H20 C27 32 32 27 32 20 V0"
        stroke="#fdba74"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerBL() {
  return (
    <svg
      className="absolute bottom-[5mm] left-[5mm] h-10 w-10"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M40 38 H18 C9 38 2 31 2 22 V0"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M40 32 H20 C13 32 8 27 8 20 V0"
        stroke="#fdba74"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
