"use client";

import { BadgeDollarSign, ReceiptText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  subtotal: number;
  vatPercent: number;
  technicalCharge: number;
}

export default function SummaryCard({
  subtotal,
  vatPercent,
  technicalCharge,
}: SummaryCardProps) {
  const vat = (subtotal * vatPercent) / 100;

  const grandTotal = subtotal + vat + technicalCharge;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ReceiptText className="h-5 w-5 text-green-600" />
          Invoice Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <Row title="Subtotal" value={subtotal} />

        <Row title={`VAT (${vatPercent}%)`} value={vat} />

        <Row title="Technical Charge" value={technicalCharge} />

        <div className="border-t pt-4">
          <div className="flex items-center justify-between rounded-lg bg-green-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2 font-semibold">
              <BadgeDollarSign className="h-5 w-5" />
              Grand Total
            </div>

            <div className="text-lg font-bold">
              ৳ {grandTotal.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{title}</span>

      <span className="font-semibold">৳ {value.toLocaleString()}</span>
    </div>
  );
}
