import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  // Save email to a temporary place in the request or session storage
  // Since the user hasn't logged in, you won't store this email in an authenticated session yet.

  // For now, just return success (this doesn't need session handling)
  return new NextResponse("Email received", { status: 200 });
}
