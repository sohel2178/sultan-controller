export const runtime = "nodejs"; // 🔥 IMPORTANT

import { NextResponse } from "next/server";
import { Client } from "ssh2";

function execCommand(conn: Client, command: string) {
  return new Promise<string>((resolve, reject) => {
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

export async function POST(req: Request) {
  const { action } = await req.json();

  if (action !== "restart-service") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return new Promise((resolve) => {
    const conn = new Client();

    conn
      .on("ready", async () => {
        try {
          const steps: any[] = [];

          // 🔥 STEP 1
          steps.push({ step: "Changing directory..." });

          // use full path instead of cd
          const basePath = "/home/sohel/projects";

          // 🔥 STEP 2
          steps.push({ step: "Stopping Docker stack..." });
          const stopOutput = await execCommand(
            conn,
            `cd ${basePath} && docker stack rm retail-apps-stack`,
          );
          steps.push({ output: stopOutput });

          // 🔥 WAIT 30 sec
          steps.push({ step: "Waiting 30 seconds..." });
          await new Promise((r) => setTimeout(r, 30000));

          // 🔥 STEP 3
          steps.push({ step: "Deploying Docker stack..." });
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
          resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        }
      })
      .connect({
        host: process.env.SSH_HOST,
        username: process.env.SSH_USER,
        privateKey: process.env.SSH_KEY,
      });
  });
}
