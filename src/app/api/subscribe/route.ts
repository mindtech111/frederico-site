import { NextRequest, NextResponse } from "next/server";
import { getWriteClient } from "@/sanity/writeClient";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const client = getWriteClient();

    // Check for duplicate email
    const existing = await client.fetch(
      `count(*[_type == "subscriber" && email == $email])`,
      { email: trimmedEmail }
    );

    if (existing > 0) {
      return NextResponse.json(
        { error: "duplicate" },
        { status: 409 }
      );
    }

    // Create subscriber document
    await client.create({
      _type: "subscriber",
      name: trimmedName,
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error("Subscribe error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
