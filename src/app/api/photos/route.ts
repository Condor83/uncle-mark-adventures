import { NextRequest, NextResponse } from "next/server";
import { getPhotosForPerson } from "@/lib/sheets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const personName = searchParams.get("person");

    if (!personName) {
      return NextResponse.json({ error: "Person name required" }, { status: 400 });
    }

    const photos = await getPhotosForPerson(personName);
    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
