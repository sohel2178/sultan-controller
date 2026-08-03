"use client";

import { BadgeDollarSign, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChargesCardProps {
  vatPercent: number;
  technicalCharge: number;

  onVatChange: (value: number) => void;
  onTechnicalChargeChange: (value: number) => void;
}

export default function ChargesCard({
  vatPercent,
  technicalCharge,
  onVatChange,
  onTechnicalChargeChange,
}: ChargesCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeDollarSign className="h-5 w-5 text-green-600" />
          Charges
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* VAT */}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BadgeDollarSign className="h-4 w-4" />
              VAT (%)
            </Label>

            <Input
              type="number"
              min={0}
              max={100}
              value={vatPercent}
              onChange={(e) => onVatChange(Number(e.target.value))}
              placeholder="15"
            />
          </div>

          {/* Technical Charge */}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Technical Charge
            </Label>

            <Input
              type="number"
              min={0}
              value={technicalCharge}
              onChange={(e) => onTechnicalChargeChange(Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
