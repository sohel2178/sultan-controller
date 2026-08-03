"use client";

import { CalendarDays, FileText, Hash } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  reference: string;
  date: string;
  subject: string;

  onReferenceChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}

export default function InvoiceInfoCard({
  reference,
  date,
  subject,
  onReferenceChange,
  onDateChange,
  onSubjectChange,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          Invoice Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Reference */}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Reference Number
            </Label>

            <Input
              value={reference}
              placeholder="FL-INV-2026-0001"
              onChange={(e) => onReferenceChange(e.target.value)}
            />
          </div>

          {/* Date */}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Invoice Date
            </Label>

            <Input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>

          {/* Subject */}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Subject
            </Label>

            <Input
              value={subject}
              placeholder="Device Bill"
              onChange={(e) => onSubjectChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
