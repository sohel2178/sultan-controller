import { NextResponse } from "next/server";

const BASE_URL = process.env.RANGS_API_URL;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ certificateNo: string }> },
) {
  const { certificateNo } = await params;

  const res = await fetch(`${BASE_URL}/certificates/verify/${certificateNo}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}
