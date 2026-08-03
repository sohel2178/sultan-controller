"use client";

import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  },
);

import InvoiceDocument from "./pdf/InvoiceDocument";
import { InvoiceData } from "@/types/invoice";

interface Props {
  data: InvoiceData;
}

export default function DownloadPdf({ data }: Props) {
  return (
    <PDFDownloadLink
      document={<InvoiceDocument data={data} />}
      fileName={`${data.reference}.pdf`}
    >
      {({ loading }: any) => (loading ? "Generating..." : "Download PDF")}
    </PDFDownloadLink>
  );
}
