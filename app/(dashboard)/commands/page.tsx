"use client";

import { useEffect, useState } from "react";
import { CommandAPI } from "@/lib/api";
import { Command } from "@/types/command";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminCommands() {
  const [imei, setImei] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newCommand, setNewCommand] = useState({
    command: "",
  });

  const handleCreateCommand = async () => {
    if (!isValidIMEI(imei)) {
      alert("Invalid IMEI");
      return;
    }

    try {
      await CommandAPI.createCommand({
        device_id: imei,
        power: newCommand.command,
      });

      setOpen(false);
      setNewCommand({ command: "" });
      fetchCommands();
    } catch (err) {
      console.error("Create command failed", err);
    }
  };

  const isValidIMEI = (imei: string) => {
    return /^\d{15}$/.test(imei);
  };

  const fetchCommands = async () => {
    if (!isValidIMEI(imei)) return;

    try {
      const data = await CommandAPI.fetchCommandsByIMEI(imei);
      setCommands(data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateCommands = async () => {
    if (!isValidIMEI(imei)) {
      alert("Invalid IMEI");
      return;
    }

    try {
      setLoading(true);
      await CommandAPI.generateBasicCommands(imei);
      fetchCommands();
    } catch (err) {
      console.error("Failed to generate commands", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!imei) return;

    fetchCommands();

    const interval = setInterval(() => {
      fetchCommands();
    }, 5000);

    return () => clearInterval(interval);
  }, [imei]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Device Commands</CardTitle>
        </CardHeader>

        <CardContent>
          {/* IMEI Input */}
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Enter Device IMEI"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              className="max-w-xs"
            />

            <Button
              onClick={generateCommands}
              disabled={!isValidIMEI(imei) || loading}
            >
              {loading ? "Generating..." : "Generate Basic Commands"}
            </Button>

            {/* 🔥 Create Command Button */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">+ Create Command</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Command</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <Input
                    placeholder="Command (e.g. RELAY,123#)"
                    value={newCommand.command}
                    onChange={(e) =>
                      setNewCommand({ ...newCommand, command: e.target.value })
                    }
                  />

                  <Button onClick={handleCreateCommand} className="w-full">
                    Create Command 🚀
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Command</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Center Number</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {commands.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground py-6"
                    >
                      No commands found
                    </TableCell>
                  </TableRow>
                )}

                {commands.map((cmd) => (
                  <TableRow key={cmd._id}>
                    <TableCell className="font-mono">{cmd.device_id}</TableCell>

                    <TableCell className="font-mono">{cmd.power}</TableCell>

                    <TableCell>{cmd.command_type}</TableCell>

                    <TableCell>{cmd.center_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
