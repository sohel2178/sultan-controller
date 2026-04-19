"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ServerController() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [controllerOpen, setControllerOpen] = useState(false);
  const [controllerNumber, setControllerNumber] = useState("");

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const validateNumber = (num: string) => {
    return /^\+8801\d{9}$/.test(num);
  };

  const handleGenerate = async () => {
    if (!file || !amount) return;

    const text = await file.text();

    const numbers = text
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n);

    const formattedNumbers = numbers.map((num) => {
      // remove existing country code if exists
      let clean = num.replace(/^(\+?88)/, "");

      return "88" + clean;
    });

    const data = formattedNumbers.map((num) => ({
      mobile: num,
      amount: amount,
      type: "Prepaid",
    }));

    setTableData(data);
    setShowTable(true);

    setOpen(false); // 👈 CLOSE DIALOG HERE
  };

  const downloadCSV = () => {
    if (!tableData.length) return;

    const header = ["mobile", "amount", "type"];

    const rows = tableData.map((row) => [row.mobile, row.amount, row.type]);

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "mobile_data.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "superadmin") {
      router.push("/alerts"); // redirect if not allowed
    } else {
      setAuthorized(true);
    }
  }, []);

  const startStream = (type: string) => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource(`/api/ssh-stream?type=${type}`);

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRunning(false);
    };
  };

  const startRetailStream = () => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource("/api/ssh-retail-stream");

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRunning(false);
    };
  };

  const startRangsStream = () => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource("/api/ssh-rangs-stream");

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRunning(false);
    };
  };

  const startApiStream = () => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource("/api/ssh-api-stream");

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRunning(false);
    };
  };

  const startControllerStream = () => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource(
      "/api/set-controller-number?number=" +
        encodeURIComponent(controllerNumber),
    );

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setRunning(false);
    };
  };

  const handleSetControllerNumber = async () => {
    if (!controllerNumber) return;

    if (!validateNumber(controllerNumber)) {
      alert("Invalid number! Use format: 8801XXXXXXXXX");
      return;
    }

    setControllerOpen(false);
    setControllerNumber("");

    startControllerStream();
  };

  if (!authorized) return null;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          🖥️ Server Controller
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your production services like a boss 😎
        </p>
      </motion.div>

      {/* ACTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl shadow-sm border">
          <CardHeader>
            <CardTitle>Service Controls</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={startRetailStream}
                disabled={running}
                variant="secondary"
                className="rounded-xl"
              >
                🛒 Restart Retail Apps
              </Button>

              <Button
                onClick={startRangsStream}
                disabled={running}
                variant="secondary"
                className="rounded-xl"
              >
                🚚 Restart Rangs Apps
              </Button>

              <Button
                onClick={startApiStream}
                disabled={running}
                variant="outline"
                className="rounded-xl"
              >
                🔌 Restart API Services
              </Button>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => startStream("retail")}
                disabled={running}
                className="rounded-xl"
                variant="secondary"
              >
                🛒 Send Retail Files
              </Button>

              <Button
                onClick={() => startStream("rangs")}
                disabled={running}
                variant="secondary"
                className="rounded-xl"
              >
                🚚 Send Rangs Files
              </Button>

              <Button
                onClick={() => startStream("tiktiki")}
                disabled={running}
                variant="outline"
                className="rounded-xl"
              >
                🔌 Send Tiktiki Files
              </Button>

              <Button
                onClick={() => startStream("rangs_30_days")}
                disabled={running}
                variant="outline"
                className="rounded-xl"
              >
                🔌 Send Rangs 30 days Files
              </Button>

              <Button
                onClick={() => setControllerOpen(true)}
                className="rounded-xl"
                variant="outline"
              >
                Set Controller Number
              </Button>
              <Dialog open={controllerOpen} onOpenChange={setControllerOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Controller Number</DialogTitle>
                    <DialogDescription>
                      Enter the controller number to set with 880xxx format.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <input
                      type="text" // ❌ number will break + sign
                      placeholder="+8801XXXXXXXXX"
                      value={controllerNumber}
                      onChange={(e) => setControllerNumber(e.target.value)}
                      className="w-full border p-2 rounded"
                    />

                    <Button onClick={handleSetControllerNumber}>Submit</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setOpen(true)} className="rounded-xl">
                Generate Table from Text Files
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Table</DialogTitle>
                    <DialogDescription>
                      Upload a text file with mobile numbers and set amount.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full"
                    />

                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full border p-2 rounded"
                    />

                    <Button onClick={handleGenerate}>Generate</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* LOG CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle>
              {showTable ? (
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Generated Data</h2>

                  <Button onClick={downloadCSV} className="rounded-xl">
                    ⬇️ Download CSV
                  </Button>
                </div>
              ) : (
                "Live Logs"
              )}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-xl" />

              {showTable ? (
                <div className="overflow-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 border">Mobile</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Type</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tableData.map((row, i) => (
                        <tr key={i}>
                          <td className="p-2 border">{row.mobile}</td>
                          <td className="p-2 border">{row.amount}</td>
                          <td className="p-2 border">{row.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="relative bg-black text-green-400 p-4 rounded-xl h-100 overflow-auto font-mono text-sm space-y-1">
                  {logs.length === 0 && (
                    <p className="text-muted-foreground">
                      No logs yet... click restart 😏
                    </p>
                  )}

                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
