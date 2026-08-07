// "use client";

// import { Building2, MapPin, Phone, Globe, Mail } from "lucide-react";

// export default function ContactCard() {
//   return (
//     <div className="h-full border-r border-gray-200 pr-6">
//       <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900">
//         Contact Information
//       </h3>

//       <div className="mt-5 space-y-4 text-[13px]">
//         <Row icon={<Building2 size={16} />} text="Forbit Limited" />

//         <Row
//           icon={<MapPin size={16} />}
//           text="24/25 Dilkusha C/A (3rd Floor), Motijheel, Dhaka-1000"
//         />

//         <Row icon={<Phone size={16} />} text="01409962099" />

//         <Row icon={<Globe size={16} />} text="www.sultantracker.com" />

//         <Row icon={<Mail size={16} />} text="support@sultantracker.com" />
//       </div>
//     </div>
//   );
// }

// function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-0.5 text-orange-600">{icon}</div>

//       <p className="leading-6 text-slate-700">{text}</p>
//     </div>
//   );
// }

"use client";

import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="h-full border-r border-dashed border-gray-300 pr-5">
      {/* Heading */}
      <h3 className="border-b-2 border-orange-500 pb-1 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-900 inline-block">
        Contact Information
      </h3>

      {/* Contact List */}
      <div className="mt-3 space-y-2.5">
        <Row icon={<Building2 size={14} />} text="Forbit Limited" />

        <Row
          icon={<MapPin size={14} />}
          text={
            <>
              24/25 Dilkusha C/A (3rd Floor)
              <br />
              Motijheel, Dhaka-1000
            </>
          }
        />

        <Row icon={<Phone size={14} />} text="01409962099" />

        <Row icon={<Globe size={14} />} text="www.sultantracker.com" />

        <Row icon={<Mail size={14} />} text="sultantracker.vts@gmail.com" />
      </div>
    </div>
  );
}

interface RowProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

function Row({ icon, text }: RowProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 shrink-0 text-orange-600">{icon}</div>

      <div className="min-w-0 text-[12px] font-medium leading-4 text-slate-700">
        {text}
      </div>
    </div>
  );
}
