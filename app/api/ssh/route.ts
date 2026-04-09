export const runtime = "nodejs"; // 🔥 required for ssh2

import { NextResponse } from "next/server";
import { Client } from "ssh2";

// 🔧 helper to run command
function execCommand(conn: Client, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);

      let output = "";

      stream
        .on("data", (data: Buffer) => {
          output += data.toString();
        })
        .on("close", () => {
          resolve(output);
        });
    });
  });
}

// 🚀 API handler
export async function POST(req: Request): Promise<Response> {
  const { action } = await req.json();

  if (action !== "restart-service") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return new Promise<Response>((resolve) => {
    const conn = new Client();

    conn
      .on("ready", async () => {
        try {
          const steps: any[] = [];

          const basePath = "/home/sohel/projects";

          // 🔥 STEP 1
          steps.push({ step: "🚀 Connected to server" });

          // 🔥 STEP 2
          steps.push({ step: "🛑 Stopping Docker stack..." });
          const stopOutput = await execCommand(
            conn,
            `cd ${basePath} && docker stack rm retail-apps-stack`,
          );
          steps.push({ output: stopOutput });

          // 🔥 STEP 3
          steps.push({ step: "⏳ Waiting 30 seconds..." });
          await new Promise((r) => setTimeout(r, 30000));

          // 🔥 STEP 4
          steps.push({ step: "🚀 Deploying Docker stack..." });
          const deployOutput = await execCommand(
            conn,
            `cd ${basePath} && docker stack deploy -c docker-compose.yml retail-apps-stack`,
          );
          steps.push({ output: deployOutput });

          conn.end();

          resolve(
            NextResponse.json({
              success: true,
              steps,
            }),
          );
        } catch (err: any) {
          conn.end();

          resolve(
            NextResponse.json(
              { error: err.message || "Unknown error" },
              { status: 500 },
            ),
          );
        }
      })
      .on("error", (err) => {
        resolve(
          NextResponse.json(
            { error: err.message || "SSH connection failed" },
            { status: 500 },
          ),
        );
      })
      .connect({
        host: process.env.SSH_HOST!, // 🔐 ensure set in Vercel
        username: process.env.SSH_USER!, // 🔐
        privateKey: process.env.SSH_KEY!, // 🔐
      });
  });
}
