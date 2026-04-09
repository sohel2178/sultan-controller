export const runtime = "nodejs"; // 🔥 IMPORTANT

import { Client } from "ssh2";

export async function GET() {
  const encoder = new TextEncoder();

  async function waitForStackRemoval(
    conn: Client,
    send: (msg: string) => void,
  ) {
    const maxRetries = 30; // ~60 sec total
    const delay = 3000; // 2 sec

    for (let i = 0; i < maxRetries; i++) {
      send(`⏳ Checking stack status... (${i + 1})`);

      const result: string = await new Promise((resolve) => {
        conn.exec("docker stack ps rangs-apps-stack", (err, stream) => {
          if (err) return resolve("done"); // stack probably gone

          let output = "";

          stream.on("data", (data: Buffer) => {
            output += data.toString();
          });

          stream.on("close", () => {
            resolve(output);
          });
        });
      });

      // 🔥 if no services → stack removed
      if (!result || result.trim() === "") {
        send("✅ Stack fully removed");
        return;
      }

      await new Promise((r) => setTimeout(r, delay));
    }

    send("⚠️ Timeout waiting for stack removal");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const send = (msg: string) => {
        controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
      };

      const conn = new Client();

      conn.on("ready", async () => {
        try {
          const basePath = "/home/sohel/projects";

          send("👉 Connected to server");

          // STEP 1
          send("👉 Stopping Docker stack...");
          conn.exec(
            `cd ${basePath} && docker stack rm rangs-apps-stack`,
            (err, stream) => {
              if (err) return send("❌ Error stopping stack");

              stream.on("data", (data: Buffer) => {
                send(`💻 ${data.toString()}`);
              });

              stream.on("close", async () => {
                await waitForStackRemoval(conn, send);

                // STEP 2
                send("👉 Deploying Docker stack...");
                conn.exec(
                  `cd ${basePath} && docker stack deploy -c docker-compose.yml rangs-apps-stack`,
                  (err2, stream2) => {
                    if (err2) return send("❌ Deploy error");

                    stream2.on("data", (data: Buffer) => {
                      send(`💻 ${data.toString()}`);
                    });

                    stream2.on("close", () => {
                      send("✅ Done");
                      conn.end();
                      controller.close();
                    });
                  },
                );
              });
            },
          );
        } catch (e) {
          send("❌ Unexpected error");
          controller.close();
        }
      });

      conn.connect({
        host: process.env.SSH_RANGS_HOST!,
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
