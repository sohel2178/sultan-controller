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

  const json = JSON.stringify(body.data);
  const base64 = Buffer.from(json).toString("base64");

  const stream = new ReadableStream({
    start(controller) {
      const conn = new Client();

      let isClosed = false;
      let activeStream: any = null;

      const safeClose = () => {
        if (isClosed) return;
        isClosed = true;

        try {
          activeStream?.close?.();
        } catch {}

        try {
          conn.end();
        } catch {}

        try {
          controller.close();
        } catch {}
      };

      const send = (msg: string) => {
        if (isClosed) return;
        try {
          controller.enqueue(`data: ${msg}\n\n`);
        } catch {
          safeClose();
        }
      };

      // ⏱️ HARD TIMEOUT (e.g. 2 min)
      const timeout = setTimeout(() => {
        send("⏰ Timeout reached. Killing process...");
        safeClose();
      }, 120000);

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
              clearTimeout(timeout);
              return safeClose();
            }

            activeStream = stream;

            // 📡 STDOUT
            stream.on("data", (data: Buffer) => {
              send(data.toString());
            });

            // ⚠️ STDERR
            stream.stderr.on("data", (data: Buffer) => {
              send("⚠️ " + data.toString());
            });

            const finish = (code?: number) => {
              send(`🏁 Process finished with code ${code}`);

              if (code === 0) {
                send("🎉 DONE: Number checking completed successfully");
              } else {
                send("💀 Something went wrong, check logs above");
              }

              clearTimeout(timeout);
              safeClose();
            };

            stream.on("close", finish);
            stream.on("exit", finish);
          });
        })

        // ❌ SSH Error
        .on("error", (err) => {
          send(`❌ SSH Error: ${err.message}`);
          clearTimeout(timeout);
          safeClose();
        })

        // 💀 SSH disconnected unexpectedly
        .on("close", () => {
          send("💀 SSH connection closed unexpectedly");
          clearTimeout(timeout);
          safeClose();
        })

        .on("end", () => {
          send("⚠️ SSH connection ended");
          clearTimeout(timeout);
          safeClose();
        })

        .connect({
          host: process.env.SSH_OPENCHAT_HOST!,
          username: process.env.SSH_USER!,
          privateKey: process.env.SSH_KEY!,
        });
    },

    cancel() {
      // 🔥 Client disconnected (browser closed tab etc.)
      try {
        // nothing fancy, connection will be cleaned via safeClose
      } catch {}
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
