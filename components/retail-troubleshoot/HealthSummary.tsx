"use client";

import { ShieldCheck, ShieldAlert, ShieldX, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Device } from "@/types/device";
import { cn } from "@/lib/utils";

interface HealthSummaryProps {
  device: Device;
  healthScore: number;
  healthy: number;
  warnings: number;
  critical: number;
}

export default function HealthSummary({
  device,
  healthScore,
  healthy,
  warnings,
  critical,
}: HealthSummaryProps) {
  const getStatus = () => {
    if (critical > 0) {
      return {
        label: "Critical",
        icon: ShieldX,
        color: "text-red-500",
        badge: "destructive" as const,
      };
    }

    if (warnings > 0) {
      return {
        label: "Attention Required",
        icon: ShieldAlert,
        color: "text-yellow-500",
        badge: "secondary" as const,
      };
    }

    return {
      label: "Healthy",
      icon: ShieldCheck,
      color: "text-green-500",
      badge: "default" as const,
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <StatusIcon className={cn("h-8 w-8", status.color)} />

              <div>
                <h2 className="text-2xl font-bold">Device Health</h2>

                <Badge variant={status.badge}>{status.label}</Badge>
              </div>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <strong>Model:</strong> {device.device_model}
              </p>

              <p>
                <strong>IMEI:</strong> {device.id}
              </p>

              <p>
                <strong>Vehicle:</strong> {device.registration_number || "-"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4 md:justify-end">
            <div className="rounded-xl border p-4 text-center min-w-27.5">
              <p className="text-3xl font-bold">{healthScore}%</p>
              <p className="text-xs text-muted-foreground">Health Score</p>
            </div>

            <div className="rounded-xl border p-4 text-center min-w-22.5">
              <p className="text-2xl font-bold text-green-600">{healthy}</p>
              <p className="text-xs text-muted-foreground">Healthy</p>
            </div>

            <div className="rounded-xl border p-4 text-center min-w-22.5">
              <p className="text-2xl font-bold text-yellow-600">{warnings}</p>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </div>

            <div className="rounded-xl border p-4 text-center min-w-22.5">
              <p className="text-2xl font-bold text-red-600">{critical}</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Live Monitoring</span>
          </div>

          <span className="text-xs text-muted-foreground">
            Auto refresh every 30 seconds
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
