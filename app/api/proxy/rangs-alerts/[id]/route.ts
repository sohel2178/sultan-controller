import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }, // 👈 important
) {
  const { id } = await context.params; // ✅ FIX

  try {
    const res = await fetch(`${process.env.RANGS_API_URL}/alerts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.RANGS_AUTH_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
