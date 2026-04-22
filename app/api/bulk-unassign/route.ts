export const runtime = "nodejs"; // 🔥 IMPORTANT

import { NextRequest } from "next/server";
import { Client } from "ssh2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // 🧠 Validate type
  if (!type || !["retail", "tiktiki"].includes(type)) {
    return new Response("Invalid type format", { status: 400 });
  }

  let command = "";

  if (type === "tiktiki") {
    command =
      "/home/sohel/data-check-retail/workenv/bin/python -u /home/sohel/BULK-UNASSIGN/tiktiki.py";
  } else if (type === "retail") {
    command =
      "/home/sohel/data-check-retail/workenv/bin/python -u /home/sohel/BULK-UNASSIGN/main.py";
  }

  const stream = new ReadableStream({
    start(controller) {
      const conn = new Client();

      const send = (data: string) => {
        controller.enqueue(`data: ${data}\n\n`);
      };

      conn
        .on("ready", () => {
          send("🔌 Connecting to server...");
          send("✅ SSH Connected");

          // 🧠 Step-by-step command
          const commandL = `
            echo "Start Executing Command ..." && ${command}
          `;

          conn.exec(commandL, (err, stream) => {
            if (err) {
              send(`❌ Exec Error: ${err.message}`);
              controller.close();
              conn.end();
              return;
            }

            // 📡 STDOUT
            stream.on("data", (data: Buffer) => {
              send(data.toString());
            });

            // ⚠️ STDERR
            stream.stderr.on("data", (data: Buffer) => {
              send("⚠️ " + data.toString());
            });

            stream.on("close", (code: number) => {
              send(`\n🏁 Process finished with code ${code}`);

              if (code === 0) {
                send("🎉 DONE: File executed Successfully");
              } else {
                send("💀 Something went wrong, check logs above");
              }

              controller.close();
              conn.end();
            });
          });
        })
        .on("error", (err) => {
          send(`❌ SSH Error: ${err.message}`);
          controller.close();
        })
        .connect({
          host: process.env.SSH_OPENCHAT_HOST!,
          username: process.env.SSH_USER!,
          privateKey: process.env.SSH_KEY!,
        });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
