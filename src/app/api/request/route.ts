import { NextRequest, NextResponse } from "next/server";
import { submitAdventureRequest } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personId, personName, requestText } = body;

    if (!personId || !personName || !requestText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (requestText.length > 500) {
      return NextResponse.json(
        { error: "Request too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const result = await submitAdventureRequest(personId, personName, requestText);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to submit request" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in request API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
