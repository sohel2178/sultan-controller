"use client";

import DecorativeBorder from "./DecorativeBorder";
import Watermark from "./Watermark";

import Header from "./Header";
// import SummaryBar from "./SummaryBar";
import DescriptionCard from "./DescriptionCard";

import CompanyCard from "./CompanyCard";
import QRCard from "./QRCard";
// import VerificationCard from "./VerificationCard";
import NoticeCard from "./NoticeCard";
import VehicleCard from "./VehicleCard";
import ValidityCard from "./ValidityCard";

// import VehicleCard from "./VehicleCard";
// import CertificateStatusCard from "./CertificateStatusCard";

import ContactCard from "./ContactCard";
import DigitalCertificate from "./DigitalCertificate";
import Footer from "./Footer";
// import DigitalCertificate from "./DigitalCertificate";
// import SignatureBox from "./SignatureBox";

// import Footer from "./Footer";

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
        h-[297mm]
        overflow-hidden
        bg-white
         shadow-2xl
         print:shadow-none
       "
    >
      <Watermark />
      <div className="absolute inset-3 rounded-xl border-[3px] border-orange-500" />
      <div className="absolute inset-4 rounded-xl border border-orange-500" />

      <div className="absolute inset-4 flex flex-col justify-between gap-2 p-4">
        <Header certificateNo={certificateNo} />
        <DescriptionCard />
        <section className="grid grid-cols-3 gap-3">
          <CompanyCard {...company} />
          <QRCard
            certificateNo={certificateNo}
            verificationUrl={verificationUrl}
          />

          <NoticeCard />
        </section>

        <section className=" grid grid-cols-[6fr_5fr] gap-4">
          <VehicleCard {...vehicle} />
          <ValidityCard {...validity} />
        </section>

        <section className="grid grid-cols-2 gap-2 border-t border-gray-200 pt-2">
          <ContactCard />
          <DigitalCertificate />
          {/* <Signature /> */}
        </section>

        <Footer />
      </div>
    </div>
  );
}
