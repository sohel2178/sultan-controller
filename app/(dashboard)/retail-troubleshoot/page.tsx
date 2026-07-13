"use client";

import { useEffect, useState } from "react";

import { Device } from "@/types/device";
import { DeviceAPI } from "@/lib/api";

import DeviceSearch from "@/components/retail-troubleshoot/DeviceSearch";
import HealthSummary from "@/components/retail-troubleshoot/HealthSummary";
import TroubleshootGrid from "@/components/retail-troubleshoot/TroubleshootGrid";
import TroubleshootSkeleton from "@/components/retail-troubleshoot/TroubleshootSkeleton";

export default function AdminTroubleshoots() {
  const [imei, setImei] = useState("");
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidIMEI = (imei: string) => /^\d{15}$/.test(imei);

  const fetchTroubleshoot = async () => {
    if (!isValidIMEI(imei)) return;

    try {
      setLoading(true);

      const data = await DeviceAPI.getCurrentDevice(imei);

      console.log("Troubleshoot Data:", data);

      setDevice(data);
    } catch (err) {
      console.error(err);
      setDevice(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isValidIMEI(imei)) {
      setDevice(null);
      return;
    }

    fetchTroubleshoot();

    const interval = setInterval(fetchTroubleshoot, 30000);

    return () => clearInterval(interval);
  }, [imei]);

  const getHealth = () => {
    if (!device) {
      return {
        healthy: 0,
        warnings: 0,
        critical: 0,
        score: 0,
      };
    }

    let healthy = 0;
    let warnings = 0;
    let critical = 0;

    // Assignment
    if (typeof device.uid === "object" && device.uid !== null) healthy++;
    else critical++;

    // Connectivity
    const deviceTime = device.geo?.devicetime ?? device.geo?.update_time;

    if (deviceTime) {
      const minutes = (Date.now() - new Date(deviceTime).getTime()) / 1000 / 60;

      if (minutes <= 5) healthy++;
      else if (minutes <= 15) warnings++;
      else critical++;
    } else {
      critical++;
    }

    // GPS
    const satellite = device.geo?.number_of_satellite ?? 0;

    if (satellite >= 5) healthy++;
    else if (satellite >= 3) warnings++;
    else critical++;

    // GSM
    const gsm = device.geo?.gsm_signal_strength ?? 0;

    if (gsm >= 30) healthy++;
    else if (gsm >= 15) warnings++;
    else critical++;

    // Power
    if (device.geo?.charging === "ON") healthy++;
    else warnings++;

    // Vehicle
    healthy++;

    // Configuration
    if (device.device_sim_number && device.center_number && device.speed_limit)
      healthy++;
    else warnings++;

    const total = healthy + warnings + critical;

    const score = Math.round(((healthy + warnings * 0.5) / total) * 100);

    return {
      healthy,
      warnings,
      critical,
      score,
    };
  };

  const health = getHealth();

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      <DeviceSearch imei={imei} setImei={setImei} loading={loading} />

      {loading && <TroubleshootSkeleton />}

      {!loading && device && (
        // <>
        //   <HealthSummary
        //     device={device}
        //     healthScore={health.score}
        //     healthy={health.healthy}
        //     warnings={health.warnings}
        //     critical={health.critical}
        //   />

        //   <div className="h-[calc(100vh-340px)] overflow-y-auto pr-2">
        //     <TroubleshootGrid device={device} />
        //   </div>
        // </>

        <div className="flex flex-col gap-6 h-[calc(100vh-170px)]">
          <HealthSummary
            device={device}
            healthScore={health.score}
            healthy={health.healthy}
            warnings={health.warnings}
            critical={health.critical}
          />

          <div className="flex-1 overflow-y-auto pr-2">
            <TroubleshootGrid device={device} />
          </div>
        </div>
      )}
    </div>
  );
}
