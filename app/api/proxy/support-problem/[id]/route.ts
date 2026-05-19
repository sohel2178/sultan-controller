import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const res = await fetch(`${process.env.SUPPORT_PROBLEM_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.CAMPAINS_TOKEN}`,
    },
  });

  return NextResponse.json(await res.json());
}
