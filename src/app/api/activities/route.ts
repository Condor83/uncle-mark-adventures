import { NextRequest, NextResponse } from "next/server";
import { getAllActivities, getActivitiesForPerson } from "@/lib/sheets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const personName = searchParams.get("person");

    // If a person name is provided, filter activities for them
    const activities = personName
      ? await getActivitiesForPerson(personName)
      : await getAllActivities();

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
