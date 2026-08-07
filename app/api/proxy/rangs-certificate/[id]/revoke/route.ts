import { NextResponse } from "next/server";

const BASE_URL = process.env.RANGS_API_URL;
const AUTH_TOKEN = process.env.RANGS_AUTH_TOKEN;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/certificates/${id}/revoke`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}
