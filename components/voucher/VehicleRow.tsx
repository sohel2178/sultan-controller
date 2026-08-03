"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { InvoiceItem } from "@/types/invoice";

interface VehicleRowProps {
  index: number;
  item: InvoiceItem;

  onChange: (
    index: number,
    key: keyof InvoiceItem,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;
}

export default function VehicleRow({
  index,
  item,
  onChange,
  onDelete,
}: VehicleRowProps) {
  const total = item.unitCost * item.quantity;

  return (
    <tr className="border-b last:border-0">
      {/* SL */}
      <td className="px-4 py-3 text-center font-medium">{index + 1}</td>

      {/* Registration */}
      <td className="px-4 py-3">
        <Input
          value={item.registration}
          placeholder="DM-BA-12-0762"
          onChange={(e) => onChange(index, "registration", e.target.value)}
        />
      </td>

      {/* Unit Cost */}
      <td className="px-4 py-3">
        <Input
          type="number"
          min={0}
          value={item.unitCost}
          onChange={(e) => onChange(index, "unitCost", Number(e.target.value))}
        />
      </td>

      {/* Quantity */}
      <td className="px-4 py-3">
        <Input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
        />
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
        ৳ {total.toLocaleString()}
      </td>

      {/* Delete */}
      <td className="px-4 py-3 text-center">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => onDelete(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
