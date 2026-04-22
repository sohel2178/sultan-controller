"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  const [numberCheckDialogOpen, setNumberCheckDialogOpen] = useState(false);
  const [controllerNumber, setControllerNumber] = useState("");

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

  const handleProcessTextFile = async () => {
    // console.log("First");
    if (!file) return;

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

    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);
    setNumberCheckDialogOpen(false); // 👈 CLOSE DIALOG HERE

    const res = await fetch("/api/check-numbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: formattedNumbers,
      }),
    });

    if (!res.body) {
      throw new Error("Streaming not supported or empty response");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // split into lines (not blocks)
      const lines = buffer.split("\n");

      // keep last incomplete line
      buffer = lines.pop() || "";

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // remove SSE prefix if exists
        if (line.startsWith("data:")) {
          line = line.replace(/^data:\s*/, "");
        }

        // 👇 now ALL lines pass (even without "data:")
        setLogs((prev) => [...prev, line]);
      }
    }

    // const data = formattedNumbers.map((num) => ({
    //   mobile: num,
    //   amount: amount,
    //   type: "Prepaid",
    // }));

    // setTableData(data);
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

  const startControllerStream = () => {
    setShowTable(false); // 👈 ADD THIS
    setLogs([]);
    setRunning(true);

    const eventSource = new EventSource(
      "/api/set-general-controller-number?number=" +
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

  //   if (!authorized) return null;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          🖥️ Utility Controller
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your production services like a boss 😎 with permissions
        </p>
      </motion.div>

      {/* ACTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl border bg-white/60 backdrop-blur shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              ⚙️ Service Controls
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setOpen(true)} className="rounded-xl px-4">
                📄 Generate Table
              </Button>

              <Button
                onClick={() => setNumberCheckDialogOpen(true)}
                className="rounded-xl px-4"
              >
                🔌 Check Numbers
              </Button>

              <Button
                onClick={() => setControllerOpen(true)}
                className="rounded-xl"
                variant="outline"
              >
                Set Controller Number
              </Button>
            </div>

            {/* DIALOG */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg">Generate Table</DialogTitle>
                  <DialogDescription>
                    Upload a text file and assign an amount.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  {/* FILE INPUT */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Text File</label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full border rounded-lg p-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-muted file:text-foreground"
                    />
                  </div>

                  {/* AMOUNT INPUT */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* ACTION */}
                  <Button
                    onClick={handleGenerate}
                    className="w-full rounded-xl"
                  >
                    🚀 Generate Table
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={numberCheckDialogOpen}
              onOpenChange={setNumberCheckDialogOpen}
            >
              <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg">
                    Mobile Number Status Check
                  </DialogTitle>
                  <DialogDescription>
                    Upload a text file to check the status of these number.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  {/* FILE INPUT */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Text File</label>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full border rounded-lg p-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-muted file:text-foreground"
                    />
                  </div>

                  {/* ACTION */}
                  <Button
                    onClick={handleProcessTextFile}
                    className="w-full rounded-xl"
                  >
                    🚀 Send to Check Numbers
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

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
