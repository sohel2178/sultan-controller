import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/certificates/${id}`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();

  // console.log("GET /certificates/:id response:", data);

  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await req.json();

  console.log("PATCH /certificates/:id request body:", body);

  const res = await fetch(`${BASE_URL}/certificates/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/certificates/${id}`, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}
