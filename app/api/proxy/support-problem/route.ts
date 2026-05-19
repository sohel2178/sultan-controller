import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // console.log("Received campaign data:", body); // Debug log

  const res = await fetch(`${process.env.SUPPORT_PROBLEM_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CAMPAINS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json());
}

export async function GET(req: Request) {
  // console.log("Fetching campaign report"); // Debug log
  const res = await fetch(`${process.env.SUPPORT_PROBLEM_URL}/report`, {
    headers: {
      Authorization: `Bearer ${process.env.CAMPAINS_TOKEN}`,
    },
  });

  return NextResponse.json(await res.json());
}
