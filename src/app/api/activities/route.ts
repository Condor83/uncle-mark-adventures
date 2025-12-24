import { NextResponse } from "next/server";
import { getAllActivities } from "@/lib/sheets";

export async function GET() {
  try {
    const activities = await getAllActivities();
    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
