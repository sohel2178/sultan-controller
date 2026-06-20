import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.RANGS_API_URL}/devices/change-device-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RANGS_AUTH_TOKEN}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
