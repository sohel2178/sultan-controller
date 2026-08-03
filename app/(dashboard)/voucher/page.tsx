// "use client";

// import { useState } from "react";
// import { InvoiceData } from "@/types/invoice";
// import DownloadPdf from "./DownloadPdf";

// export default function VoucherPage() {
//   const [invoice, setInvoice] = useState<InvoiceData>({
//     reference: "FL-INV-2026-0001",
//     date: new Date().toISOString().split("T")[0],
//     subject: "Device Bill",

//     items: [
//       {
//         registration: "Dhaka Metro-GA-11-1234",
//         unitCost: 4500,
//         quantity: 1,
//       },
//     ],

//     vatPercent: 15,
//     technicalCharge: 0,

//     signer: {
//       name: "Md. Sohel Ahmed",
//       designation: "Managing Director",
//     },
//   });

//   const updateItem = (
//     index: number,
//     key: "registration" | "unitCost" | "quantity",
//     value: string | number,
//   ) => {
//     const items = [...invoice.items];

//     items[index] = {
//       ...items[index],
//       [key]: value,
//     };

//     setInvoice({
//       ...invoice,
//       items,
//     });
//   };

//   const addRow = () => {
//     setInvoice({
//       ...invoice,
//       items: [
//         ...invoice.items,
//         {
//           registration: "",
//           unitCost: 0,
//           quantity: 1,
//         },
//       ],
//     });
//   };

//   const removeRow = (index: number) => {
//     setInvoice({
//       ...invoice,
//       items: invoice.items.filter((_, i) => i !== index),
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-10">
//       <h1 className="text-3xl font-bold mb-8">Invoice Generator</h1>

//       {/* Basic Information */}

//       <div className="grid grid-cols-3 gap-4 mb-8">
//         <input
//           className="border rounded-lg p-3"
//           placeholder="Reference"
//           value={invoice.reference}
//           onChange={(e) =>
//             setInvoice({
//               ...invoice,
//               reference: e.target.value,
//             })
//           }
//         />

//         <input
//           type="date"
//           className="border rounded-lg p-3"
//           value={invoice.date}
//           onChange={(e) =>
//             setInvoice({
//               ...invoice,
//               date: e.target.value,
//             })
//           }
//         />

//         <input
//           className="border rounded-lg p-3"
//           placeholder="Subject"
//           value={invoice.subject}
//           onChange={(e) =>
//             setInvoice({
//               ...invoice,
//               subject: e.target.value,
//             })
//           }
//         />
//       </div>

//       {/* Items */}

//       <div className="space-y-4">
//         {invoice.items.map((item, index) => (
//           <div key={index} className="grid grid-cols-12 gap-3">
//             <input
//               className="col-span-6 border rounded-lg p-3"
//               placeholder="Registration"
//               value={item.registration}
//               onChange={(e) =>
//                 updateItem(index, "registration", e.target.value)
//               }
//             />

//             <input
//               type="number"
//               className="col-span-2 border rounded-lg p-3"
//               placeholder="Unit Cost"
//               value={item.unitCost}
//               onChange={(e) =>
//                 updateItem(index, "unitCost", Number(e.target.value))
//               }
//             />

//             <input
//               type="number"
//               className="col-span-2 border rounded-lg p-3"
//               placeholder="Qty"
//               value={item.quantity}
//               onChange={(e) =>
//                 updateItem(index, "quantity", Number(e.target.value))
//               }
//             />

//             <button
//               onClick={() => removeRow(index)}
//               className="bg-red-600 text-white rounded-lg"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={addRow}
//         className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg"
//       >
//         + Add Vehicle
//       </button>

//       {/* Charges */}

//       <div className="grid grid-cols-2 gap-4 mt-8">
//         <input
//           type="number"
//           className="border rounded-lg p-3"
//           placeholder="VAT %"
//           value={invoice.vatPercent}
//           onChange={(e) =>
//             setInvoice({
//               ...invoice,
//               vatPercent: Number(e.target.value),
//             })
//           }
//         />

//         <input
//           type="number"
//           className="border rounded-lg p-3"
//           placeholder="Technical Charge"
//           value={invoice.technicalCharge}
//           onChange={(e) =>
//             setInvoice({
//               ...invoice,
//               technicalCharge: Number(e.target.value),
//             })
//           }
//         />
//       </div>

//       {/* Download */}

//       <div className="mt-10">
//         <DownloadPdf data={invoice} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";

import { InvoiceData } from "@/types/invoice";

import InvoiceInfoCard from "@/components/voucher/InvoiceInfoCard";
import VehicleTable from "@/components/voucher/VehicleTable";
import ChargesCard from "@/components/voucher/ChargesCard";
import SummaryCard from "@/components/voucher/SummaryCard";
import DownloadCard from "@/components/voucher/DownloadCard";

import DownloadPdf from "./DownloadPdf";

export default function VoucherPage() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    reference: "FL-INV-2026-0001",
    date: new Date().toISOString().split("T")[0],
    subject: "Device Bill",

    items: [
      {
        registration: "Dhaka Metro-GA-11-1234",
        unitCost: 4500,
        quantity: 1,
      },
    ],

    vatPercent: 15,
    technicalCharge: 0,

    signer: {
      name: "Md. Sohel Ahmed",
      designation: "Managing Director",
    },
  });

  // -----------------------------
  // Vehicle Update
  // -----------------------------

  const updateItem = (
    index: number,
    key: keyof InvoiceData["items"][0],
    value: string | number,
  ) => {
    setInvoice((prev) => {
      const items = [...prev.items];

      items[index] = {
        ...items[index],
        [key]: value,
      };

      return {
        ...prev,
        items,
      };
    });
  };

  // -----------------------------
  // Add Vehicle
  // -----------------------------

  const addVehicle = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          registration: "",
          unitCost: 0,
          quantity: 1,
        },
      ],
    }));
  };

  // -----------------------------
  // Delete Vehicle
  // -----------------------------

  const deleteVehicle = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // -----------------------------
  // Calculations
  // -----------------------------

  const subtotal = useMemo(() => {
    return invoice.items.reduce(
      (sum, item) => sum + item.unitCost * item.quantity,
      0,
    );
  }, [invoice.items]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Page Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Generator</h1>

          <p className="text-muted-foreground mt-1">
            Create and download professional invoices.
          </p>
        </div>
      </div>

      {/* Invoice Info */}

      <InvoiceInfoCard
        reference={invoice.reference}
        date={invoice.date}
        subject={invoice.subject}
        onReferenceChange={(reference) =>
          setInvoice((prev) => ({
            ...prev,
            reference,
          }))
        }
        onDateChange={(date) =>
          setInvoice((prev) => ({
            ...prev,
            date,
          }))
        }
        onSubjectChange={(subject) =>
          setInvoice((prev) => ({
            ...prev,
            subject,
          }))
        }
      />

      {/* Main Layout */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <VehicleTable
            items={invoice.items}
            onChange={updateItem}
            onDelete={deleteVehicle}
            onAdd={addVehicle}
          />

          <ChargesCard
            vatPercent={invoice.vatPercent}
            technicalCharge={invoice.technicalCharge}
            onVatChange={(vatPercent) =>
              setInvoice((prev) => ({
                ...prev,
                vatPercent,
              }))
            }
            onTechnicalChargeChange={(technicalCharge) =>
              setInvoice((prev) => ({
                ...prev,
                technicalCharge,
              }))
            }
          />
        </div>

        {/* Right */}

        <div className="space-y-6">
          <SummaryCard
            subtotal={subtotal}
            vatPercent={invoice.vatPercent}
            technicalCharge={invoice.technicalCharge}
          />

          <DownloadCard>
            <DownloadPdf data={invoice} />
          </DownloadCard>
        </div>
      </div>
    </div>
  );
}
