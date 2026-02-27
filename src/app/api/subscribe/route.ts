import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

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

    // Check for duplicate email
    const existing = await writeClient.fetch(
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
    await writeClient.create({
      _type: "subscriber",
      name: trimmedName,
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
