export const runtime = "nodejs"; // 🔥 IMPORTANT

import { NextRequest } from "next/server";
import { Client } from "ssh2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let command = "";

  if (type === "tiktiki") {
    command =
      "/home/sohel/data-check-retail/workenv/bin/python -u sumon_tiktiki.py";
  } else if (type === "retail") {
    command =
      "/home/sohel/data-check-retail/workenv/bin/python -u sumon_retail.py";
  } else if (type === "rangs") {
    command =
      "/home/sohel/data-check-retail/workenv/bin/python -u sumon_rangs.py";
  }

  const stream = new ReadableStream({
    start(controller) {
      const conn = new Client();

      const send = (data: string) => {
        controller.enqueue(`data: ${data}\n\n`);
      };

      conn
        .on("ready", () => {
          send("✅ SSH Connected");

          conn.exec(
            `cd /home/sohel/data-check-retail && ${command}`,
            (err, stream) => {
              if (err) {
                send(`❌ Error: ${err.message}`);
                controller.close();
                conn.end();
                return;
              }

              stream
                .on("data", (data: Buffer) => {
                  send(data.toString());
                })
                .stderr.on("data", (data: Buffer) => {
                  send("⚠️ " + data.toString());
                });

              stream.on("close", (code: number) => {
                send(`\n🏁 Finished with code ${code}`);
                controller.close();
                conn.end();
              });
            },
          );
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
