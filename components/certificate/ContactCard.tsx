"use client";

import { Building2, MapPin, Phone, Globe, Mail } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="h-full border-r border-gray-200 pr-6">
      <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900">
        Contact Information
      </h3>

      <div className="mt-5 space-y-4 text-[13px]">
        <Row icon={<Building2 size={16} />} text="Forbit Limited" />

        <Row
          icon={<MapPin size={16} />}
          text="24/25 Dilkusha C/A (3rd Floor), Motijheel, Dhaka-1000"
        />

        <Row icon={<Phone size={16} />} text="01409962099" />

        <Row icon={<Globe size={16} />} text="www.sultantracker.com" />

        <Row icon={<Mail size={16} />} text="support@sultantracker.com" />
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-orange-600">{icon}</div>

      <p className="leading-6 text-slate-700">{text}</p>
    </div>
  );
}
