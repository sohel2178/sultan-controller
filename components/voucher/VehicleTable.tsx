"use client";

import { CarFront } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { InvoiceItem } from "@/types/invoice";

import VehicleRow from "./VehicleRow";
import AddVehicleButton from "./AddVehicleButton";

interface VehicleTableProps {
  items: InvoiceItem[];

  onChange: (
    index: number,
    key: keyof InvoiceItem,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;

  onAdd: () => void;
}

export default function VehicleTable({
  items,
  onChange,
  onDelete,
  onAdd,
}: VehicleTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CarFront className="h-5 w-5 text-green-600" />
          Vehicle List
        </CardTitle>

        <AddVehicleButton onClick={onAdd} />
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">SL</TableHead>

              <TableHead>Registration Number</TableHead>

              <TableHead className="w-40">Unit Cost</TableHead>

              <TableHead className="w-28">Qty</TableHead>

              <TableHead className="w-40 text-right">Total</TableHead>

              <TableHead className="w-20 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <td
                  colSpan={6}
                  className="h-28 text-center text-muted-foreground"
                >
                  No vehicle added.
                </td>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <VehicleRow
                  key={index}
                  index={index}
                  item={item}
                  onChange={onChange}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
