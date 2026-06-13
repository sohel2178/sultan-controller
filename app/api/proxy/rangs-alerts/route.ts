import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const imei = searchParams.get("imei");
  const limit = searchParams.get("limit");

  const res = await fetch(
    `${process.env.RANGS_API_URL}/alerts/admin?imei=${imei}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.RANGS_AUTH_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
