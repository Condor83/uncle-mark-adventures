import { NextRequest, NextResponse } from "next/server";
import { getPersonBySlug, getRedemptionsByPerson } from "@/lib/sheets";
import { getThemeBySlug } from "@/lib/themes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const person = await getPersonBySlug(slug);

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    const theme = getThemeBySlug(slug);
    const redemptions = await getRedemptionsByPerson(person.id);

    return NextResponse.json({
      person,
      theme,
      redemptions,
    });
  } catch (error) {
    console.error("Error fetching person:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
