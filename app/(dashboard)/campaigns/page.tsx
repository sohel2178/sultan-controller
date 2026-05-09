"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { parseCSV } from "@/lib/csv";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CampaignApi } from "@/lib/api";

export default function CampaignPage() {
  const [report, setReport] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Poll every 10 sec
  useEffect(() => {
    const fetchData = async () => {
      const res = await CampaignApi.getCampaigns();
      setReport(res);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  // 📂 Parse CSV
  // const parseCSV = (file: File): Promise<any[]> => {
  //   return new Promise((resolve) => {
  //     Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: (results) => {
  //         const formatted = results.data.map((row: any) => ({
  //           mobile_number: row.mobile_number,
  //           number_of_vehicle: Number(row.number_of_vehicle),
  //           amount: Number(row.amount),
  //         }));
  //         resolve(formatted);
  //       },
  //     });
  //   });
  // };

  // 🚀 Start Campaign
  const handleStartCampaign = async () => {
    if (!file) return;

    setLoading(true);

    const parsed = await parseCSV(file);

    // console.log("Parsed CSV:", parsed);

    await CampaignApi.startCampaign(parsed);

    setLoading(false);
    setOpen(false);
  };

  // 🔍 Filter
  const filtered =
    report?.data?.filter((item: any) => item.number.includes(search)) || [];

  // 🔁 Reset
  const handleReset = async () => {
    await CampaignApi.resetCampaign();

    setReport(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          📞 Campaign Controller
        </h1>
        <p className="text-muted-foreground mt-1">
          Launch campaigns & monitor calls like a boss 😎
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
              🚀 Campaign Actions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setOpen(true)} className="rounded-xl">
                📂 Start Campaign
              </Button>

              <Button
                onClick={handleReset}
                variant="destructive"
                className="rounded-xl"
              >
                🔁 Reset
              </Button>
            </div>

            {/* DIALOG */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload CSV</DialogTitle>
                  <DialogDescription>
                    Upload campaign file with mobile_number, number_of_vehicle,
                    amount
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full border rounded-lg p-2"
                  />

                  <Button
                    onClick={handleStartCampaign}
                    className="w-full rounded-xl"
                    disabled={loading}
                  >
                    {loading ? "Starting..." : "🚀 Start Campaign"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>

      {/* REPORT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="flex flex-col gap-3">
              📊 Campaign Report
              {/* SEARCH */}
              <input
                placeholder="Search number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 text-sm"
              />
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* SUMMARY */}
            {report && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                <div>Total: {report.total}</div>
                <div className="text-green-600">
                  Answered: {report.answered}
                </div>
                <div className="text-yellow-600">Busy: {report.busy}</div>
                <div className="text-gray-600">
                  No Answer: {report.noanswer}
                </div>
                <div className="text-red-600">Failed: {report.failed}</div>
              </div>
            )}

            {/* TABLE */}
            {/* TABLE */}
            <div
              className="overflow-auto rounded-xl border"
              style={{ maxHeight: "500px" }}
            >
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="p-2 border">Number</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Attempt</th>
                    <th className="p-2 border">Duration</th>
                    <th className="p-2 border">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row: any, i: number) => (
                    <tr key={i}>
                      <td className="p-2 border">{row.number}</td>

                      <td
                        className={`p-2 border font-semibold ${
                          row.status === "ANSWERED"
                            ? "text-green-600"
                            : row.status === "FAILED"
                              ? "text-red-600"
                              : "text-yellow-600"
                        }`}
                      >
                        {row.status}
                      </td>

                      <td className="p-2 border">{row.attempt}</td>
                      <td className="p-2 border">{row.duration}</td>
                      <td className="p-2 border">
                        {new Date(row.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-4 text-muted-foreground"
                      >
                        No data yet... start a campaign 😏
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
