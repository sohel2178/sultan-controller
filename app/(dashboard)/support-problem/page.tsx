"use client";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { SupportProblemAPI } from "@/lib/api";

export default function SupportProblemPage() {
  const [report, setReport] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);

  const [details, setDetails] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    device_id: "",
    sim_number: "",
    registration_number: "",
    platform: "tiktiki",
    description: "",
  });

  // FETCH REPORT
  useEffect(() => {
    fetchReport();

    const interval = setInterval(() => {
      fetchReport();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchReport = async () => {
    try {
      const res = await SupportProblemAPI.getSupportProblems();

      setReport(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // CREATE ENTRY
  const handleCreate = async () => {
    try {
      setLoading(true);

      await SupportProblemAPI.createSupportProblem({
        device_id: form.device_id,
        sim_number: form.sim_number,
        registration_number: form.registration_number,
        platform: form.platform,
        description: form.description,
      });

      setForm({
        device_id: "",
        sim_number: "",
        registration_number: "",
        platform: "tiktiki",
        description: "",
      });

      setOpen(false);

      fetchReport();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // DETAILS
  const handleDetails = async (device_id: string) => {
    try {
      const res = await SupportProblemAPI.getSupportProblemById(device_id);

      //   console.log("Details for device", device_id, res);

      setDetails(res.data || []);

      setDetailOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // FILTER
  const filtered = report.filter((item) => {
    const text = search.toLowerCase();

    return (
      item._id?.toLowerCase().includes(text) ||
      item.registration_number?.toLowerCase().includes(text) ||
      item.sim_number?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          🚨 Support Problems
        </h1>

        <p className="text-muted-foreground mt-1">
          Monitor repeated customer GPS complaints like a detective 🕵️
        </p>
      </motion.div>

      {/* ACTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl border bg-white/60 backdrop-blur shadow-sm">
          <CardHeader>
            <CardTitle>📝 Add Complaint Entry</CardTitle>
          </CardHeader>

          <CardContent>
            <Button onClick={() => setOpen(true)} className="rounded-xl">
              ➕ New Complaint
            </Button>
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
              📊 Last 30 Days Complaint Report
              <input
                placeholder="Search device/sim/registration..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 text-sm"
              />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div
              className="overflow-auto rounded-xl border"
              style={{ maxHeight: "600px" }}
            >
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="p-2 border">Count</th>

                    <th className="p-2 border">Device ID</th>

                    <th className="p-2 border">SIM</th>

                    <th className="p-2 border">Registration</th>

                    <th className="p-2 border">Platform</th>

                    <th className="p-2 border">Last Problem</th>

                    <th className="p-2 border">Last Entry</th>

                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row: any, i: number) => (
                    <tr key={i}>
                      <td className="p-2 border text-center font-bold text-red-600">
                        {row.count}
                      </td>

                      <td className="p-2 border font-medium">{row._id}</td>

                      <td className="p-2 border">{row.sim_number}</td>

                      <td className="p-2 border">{row.registration_number}</td>

                      <td className="p-2 border">
                        <span className="capitalize">{row.platform}</span>
                      </td>

                      <td className="p-2 border max-w-xs truncate">
                        {row.last_problem}
                      </td>

                      <td className="p-2 border">
                        {new Date(row.last_created_date).toLocaleString()}
                      </td>

                      <td className="p-2 border">
                        <Button
                          size="sm"
                          className="rounded-lg"
                          onClick={() => handleDetails(row._id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center p-6 text-muted-foreground"
                      >
                        No complaint data found 👀
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CREATE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Support Complaint</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <input
              placeholder="Device ID"
              value={form.device_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  device_id: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            />

            <input
              placeholder="SIM Number"
              value={form.sim_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  sim_number: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            />

            <input
              placeholder="Registration Number"
              value={form.registration_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  registration_number: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            />

            <select
              value={form.platform}
              onChange={(e) =>
                setForm({
                  ...form,
                  platform: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="rangs">Rangs</option>

              <option value="retail">Retail</option>

              <option value="tiktiki">Tiktiki</option>
            </select>

            <textarea
              placeholder="Problem Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 min-h-30"
            />

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="w-full rounded-xl"
            >
              {loading ? "Saving..." : "🚀 Save Complaint"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DETAIL DIALOG */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="rounded-2xl max-w-4xl">
          <DialogHeader>
            <DialogTitle>Complaint History</DialogTitle>
          </DialogHeader>

          <div
            className="overflow-auto border rounded-xl"
            style={{ maxHeight: "500px" }}
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr>
                  <th className="p-2 border">Date</th>

                  <th className="p-2 border">Description</th>

                  <th className="p-2 border">Platform</th>
                </tr>
              </thead>

              <tbody>
                {details.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className="p-2 border">
                      {new Date(row.created_date).toLocaleString()}
                    </td>

                    <td className="p-2 border">{row.description}</td>

                    <td className="p-2 border capitalize">{row.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
