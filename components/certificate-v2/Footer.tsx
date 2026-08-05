"use client";

import { Building2, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-2 bg-gray-900 px-4 mb-1 rounded-b-md">
      <div className="flex items-center justify-between text-xs text-gray-100">
        <span>Keep this certificate for future verification.</span>

        <span>© 2026 Sultan Tracker • Powered by Forbit Limited</span>
      </div>
    </footer>
  );
}

// function Item({ icon, value }: { icon: React.ReactNode; value: string }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-0.5 text-orange-500">{icon}</div>

//       <span>{value}</span>
//     </div>
//   );
// }
