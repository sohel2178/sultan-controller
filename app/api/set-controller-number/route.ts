export const runtime = "nodejs"; // 🔥 IMPORTANT

import { NextRequest } from "next/server";
import { Client } from "ssh2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get("number");

  // 🧠 Validate number
  if (!number || !/^\+8801\d{9}$/.test(number)) {
    return new Response("Invalid number format", { status: 400 });
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
          const command = `
            echo "📂 Moving to project directory..." &&
            cd /home/sohel/data-check-retail &&

            echo "📝 Updating controller number..." &&
            sed -i 's/^CONTROLLER_NUMBER=.*/CONTROLLER_NUMBER=${number}/' .env &&

            echo "🔍 Verifying update..." &&
            grep CONTROLLER_NUMBER .env
          `;

          conn.exec(command, (err, stream) => {
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
                send("🎉 DONE: Controller number updated");
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
