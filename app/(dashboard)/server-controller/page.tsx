// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function ServerController() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [running, setRunning] = useState(false);

//   const startStream = () => {
//     setLogs([]);
//     setRunning(true);

//     const eventSource = new EventSource("/api/ssh-stream");

//     eventSource.onmessage = (event) => {
//       setLogs((prev) => [...prev, event.data]);
//     };

//     eventSource.onerror = () => {
//       eventSource.close();
//       setRunning(false);
//     };
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">🖥️ Server Controller</h1>

//       <Button onClick={startStream} disabled={running}>
//         {running ? "Running..." : "Restart Service"}
//       </Button>

//       <div className="bg-black text-green-400 p-4 rounded-xl text-sm h-96 overflow-auto font-mono">
//         {logs.map((log, i) => (
//           <div key={i}>{log}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ServerController() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "superadmin") {
      router.push("/alerts"); // redirect if not allowed
    } else {
      setAuthorized(true);
    }
  }, []);

  const startRetailStream = () => {
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

          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={startRetailStream}
              disabled={running}
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
            <CardTitle>Live Logs</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-green-500/5 blur-2xl rounded-xl" />

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
                    transition={{ duration: 0.2 }}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
