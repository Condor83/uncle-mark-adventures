import { google } from "googleapis";
import { Person, Activity, Redemption, Photo, AdventureRequest } from "@/types";

// Initialize the Google Sheets API client
function getSheets() {
  // Handle private key - Vercel may store it with literal \n or actual newlines
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";

  // If the key contains literal \n (as a two-character sequence), replace with actual newlines
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  // Remove surrounding quotes if present (sometimes happens with env vars)
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  const sheets = getSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "People!A2:E",
  });

  const rows = response.data.values;
  if (!rows) return null;

  for (const row of rows) {
    if (row[4] === slug) {
      return {
        id: row[0],
        name: row[1],
        balance: parseInt(row[2], 10),
        theme: row[3],
        slug: row[4],
      };
    }
  }

  return null;
}

export async function getAllActivities(): Promise<Activity[]> {
  const sheets = getSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Activities!A2:F", // Now includes column F for exclude
  });

  const rows = response.data.values;
  if (!rows) return [];

  return rows.map((row) => ({
    id: row[0],
    name: row[1],
    cost: parseInt(row[2], 10),
    description: row[3],
    icon: row[4] || "🎯",
    exclude: row[5] ? row[5].split(",").map((name: string) => name.trim().toLowerCase()) : [],
  }));
}

export async function getActivitiesForPerson(personName: string): Promise<Activity[]> {
  const allActivities = await getAllActivities();
  const nameLower = personName.toLowerCase();

  // Filter out activities where this person is in the exclude list
  return allActivities.filter((activity) => {
    if (!activity.exclude || activity.exclude.length === 0) return true;
    return !activity.exclude.includes(nameLower);
  });
}

export async function getPhotosForPerson(personName: string): Promise<Photo[]> {
  const sheets = getSheets();

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Photos!A2:D",
    });

    const rows = response.data.values;
    if (!rows) return [];

    const nameLower = personName.toLowerCase();

    return rows
      .filter((row) => row[1]?.toLowerCase() === nameLower)
      .map((row) => ({
        id: row[0],
        person: row[1],
        url: row[2],
        caption: row[3] || "",
      }));
  } catch (error) {
    // Photos sheet might not exist yet, that's okay
    console.log("Photos sheet not found or empty");
    return [];
  }
}

export async function getRedemptionsByPerson(personId: string): Promise<Redemption[]> {
  const sheets = getSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Redemptions!A2:E",
  });

  const rows = response.data.values;
  if (!rows) return [];

  return rows
    .filter((row) => row[1] === personId)
    .map((row) => ({
      id: row[0],
      personId: row[1],
      activityId: row[2],
      redeemedAt: row[3],
      notes: row[4],
    }));
}

export async function redeemActivity(
  personId: string,
  activityId: string,
  currentBalance: number,
  activityCost: number
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  if (currentBalance < activityCost) {
    return { success: false, newBalance: currentBalance, error: "Insufficient balance" };
  }

  const sheets = getSheets();
  const newBalance = currentBalance - activityCost;

  // Find the person's row and update balance
  const peopleResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "People!A2:E",
  });

  const rows = peopleResponse.data.values;
  if (!rows) {
    return { success: false, newBalance: currentBalance, error: "Could not find people data" };
  }

  let rowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === personId) {
      rowIndex = i + 2; // +2 because we start at A2 and arrays are 0-indexed
      break;
    }
  }

  if (rowIndex === -1) {
    return { success: false, newBalance: currentBalance, error: "Person not found" };
  }

  // Update balance
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `People!C${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[newBalance]],
    },
  });

  // Add redemption record
  const redemptionId = `R${Date.now()}`;
  const redeemedAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Redemptions!A:E",
    valueInputOption: "RAW",
    requestBody: {
      values: [[redemptionId, personId, activityId, redeemedAt, ""]],
    },
  });

  return { success: true, newBalance };
}

export async function submitAdventureRequest(
  personId: string,
  personName: string,
  request: string
): Promise<{ success: boolean; error?: string }> {
  const sheets = getSheets();

  try {
    const requestId = `REQ${Date.now()}`;
    const submittedAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Requests!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [[requestId, personId, personName, request, submittedAt, "pending"]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting request:", error);
    return { success: false, error: "Failed to submit request" };
  }
}

export async function getRequestsByPerson(personId: string): Promise<AdventureRequest[]> {
  const sheets = getSheets();

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Requests!A2:F",
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows
      .filter((row) => row[1] === personId)
      .map((row) => ({
        id: row[0],
        personId: row[1],
        personName: row[2],
        request: row[3],
        submittedAt: row[4],
        status: row[5] as AdventureRequest["status"],
      }));
  } catch (error) {
    console.log("Requests sheet not found or empty");
    return [];
  }
}
