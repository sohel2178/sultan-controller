"use client";

import Header from "./Header";
import Watermark from "./Watermark";
import CompanyCard from "./CompanyCard";
import QRCard from "./QRCard";
import NoticeCard from "./NoticeCard";
import VehicleCard from "./VehicleCard";
import ValidityCard from "./ValidityCard";
import Footer from "./Footer";

export interface CertificateProps {
  certificateNo: string;
  verificationUrl: string;

  company: {
    companyName: string;
    brandName: string;
    licenseNo: string;
    hotline: string;
    website: string;
    email: string;
  };

  vehicle: {
    ownerName: string;
    registrationNo: string;
    vehicleType: string;
    chassisNo: string;
    engineNo: string;
    imei: string;
    iccid: string;
    deviceModel: string;
    installationDate: string;
    installer: string;
  };

  validity: {
    issueDate: string;
    validUntil: string;
    remainingDays: number;
    gpsStatus: string;
    deviceStatus: string;
    lastCommunication: string;
  };
}

export default function Certificate({
  certificateNo,
  verificationUrl,
  company,
  vehicle,
  validity,
}: CertificateProps) {
  return (
    <div
      id="certificate"
      className="
        relative
        mx-auto
        w-[210mm]
        min-h-[297mm]
        overflow-hidden
        bg-white
        shadow-2xl
        print:shadow-none
      "
    >
      {/* Watermark */}
      <Watermark />

      {/* Border */}
      <div className="absolute inset-4 rounded-xl border-[3px] border-orange-500" />

      {/* Content */}
      <div className="relative z-10 p-10">
        {/* Header */}
        <Header certificateNo={certificateNo} />

        {/* Description */}
        <section className="mt-8 rounded-xl border bg-orange-50 p-6">
          <p className="text-center text-sm leading-7 text-gray-700">
            This is to certify that the vehicle described in this certificate
            has been equipped with a genuine GPS Tracking Device installed and
            activated by
            <span className="font-semibold text-gray-900"> Sultan Tracker</span>
            , operated by
            <span className="font-semibold text-gray-900"> Forbit Limited</span>
            . The installed tracking device complies with the applicable GPS
            tracking requirements and remains valid while the GPS subscription
            is active.
          </p>
        </section>

        {/* Top Cards */}
        <section className="mt-8 grid grid-cols-3 gap-6">
          <CompanyCard {...company} />

          <QRCard
            certificateNo={certificateNo}
            verificationUrl={verificationUrl}
          />

          <NoticeCard />
        </section>

        {/* Bottom Cards */}
        <section className="mt-6 grid grid-cols-2 gap-6">
          <VehicleCard {...vehicle} />

          <ValidityCard {...validity} />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
