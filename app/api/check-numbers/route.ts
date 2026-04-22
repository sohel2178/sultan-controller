export const runtime = "nodejs";

import { Client } from "ssh2";

export async function POST(req: Request) {
  const body = await req.json();

  // ✅ Validate
  if (!Array.isArray(body.data)) {
    return new Response("Invalid data format", { status: 400 });
  }

  if (body.data.length > 2000) {
    return new Response("Too many items", { status: 400 });
  }

  // ✅ Encode
  const json = JSON.stringify(body.data);
  const base64 = Buffer.from(json).toString("base64");

  const stream = new ReadableStream({
    start(controller) {
      const conn = new Client();

      // 🔥 SAME send pattern as GET
      const send = (msg: string) => {
        controller.enqueue(`data: ${msg}\n\n`);
      };

      conn
        .on("ready", () => {
          send("🔌 Connecting to server...");
          send("✅ SSH Connected");

          send("📦 Preparing data...");
          send(`📊 Total numbers: ${body.data.length}`);

          const command = `
            echo "🚀 Starting number check..." &&
            echo '${base64}' | base64 -d | /home/sohel/data-check-retail/workenv/bin/python -u /home/sohel/data-check-retail/number_checker.py
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
              send(`🏁 Process finished with code ${code}`);

              if (code === 0) {
                send("🎉 DONE: Number checking completed successfully");
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
      "Content-Type": "text/event-stream", // 🔥 SAME as GET
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
