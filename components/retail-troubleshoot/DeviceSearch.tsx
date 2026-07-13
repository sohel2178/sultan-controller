"use client";

import { Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
  imei: string;
  setImei: (imei: string) => void;
  loading?: boolean;
}

export default function DeviceSearch({ imei, setImei, loading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retail Troubleshoot</CardTitle>
        <CardDescription>
          Enter a 15-digit IMEI to analyze the current device status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={imei}
            disabled={loading}
            maxLength={15}
            placeholder="Enter Device IMEI"
            className="pl-9"
            onChange={(e) => setImei(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </CardContent>
    </Card>
  );
}
