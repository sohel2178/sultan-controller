import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;

  const superEmail = process.env.SUPERADMIN_EMAIL;
  const superPass = process.env.SUPERADMIN_PASSWORD;

  if (email === superEmail && password === superPass) {
    return NextResponse.json({
      success: true,
      role: "superadmin",
    });
  }

  if (email === adminEmail && password === adminPass) {
    return NextResponse.json({
      success: true,
      role: "admin",
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 },
  );
}
