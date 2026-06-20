"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RangsCommandAPI } from "@/lib/api";

export default function DevicePasswordPage() {
  const [imei, setImei] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidIMEI = (imei: string) => {
    return /^(\d{10}|\d{15})$/.test(imei);
  };

  const handleChangePassword = async () => {
    if (!isValidIMEI(imei)) {
      alert("Invalid IMEI");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await RangsCommandAPI.changeDevicePassword({
        imei,
        password,
      });

      alert("Password changed successfully");

      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to create password change command");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Device Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Device IMEI"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />

          <Input
            placeholder="New Device Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Creating Command..." : "Change Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
