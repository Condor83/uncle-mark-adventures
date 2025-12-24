import { NextRequest, NextResponse } from "next/server";
import { redeemActivity } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personId, activityId, currentBalance, activityCost } = body;

    if (!personId || !activityId || currentBalance === undefined || activityCost === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await redeemActivity(personId, activityId, currentBalance, activityCost);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, newBalance: result.newBalance });
  } catch (error) {
    console.error("Error redeeming activity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
