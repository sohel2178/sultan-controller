import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ imei: string }> },
) {
  const { imei } = await context.params;

  const res = await fetch(`${process.env.API_URL}/commands/${imei}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  return NextResponse.json(await res.json());
}
