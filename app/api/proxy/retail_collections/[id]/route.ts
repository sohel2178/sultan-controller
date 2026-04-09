import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/retail_collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json());
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const res = await fetch(`${process.env.API_URL}/retail_collections/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  return NextResponse.json({ success: true });
}
