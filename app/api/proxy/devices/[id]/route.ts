import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const res = await fetch(
    `${process.env.API_URL}/devices/${id}/current_device`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    },
  );

  return NextResponse.json(await res.json());
}
