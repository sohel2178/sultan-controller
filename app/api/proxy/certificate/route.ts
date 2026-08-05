import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

/**
 * GET /api/proxy/certificate
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "-createdAt";

  const res = await fetch(
    `${BASE_URL}/certificates?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}&sort=${sort}`,
    {
      headers,
      cache: "no-store",
    },
  );

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}

/**
 * POST /api/proxy/certificate
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${BASE_URL}/certificates`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}
