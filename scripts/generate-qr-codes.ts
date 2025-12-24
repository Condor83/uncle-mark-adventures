/**
 * QR Code Generator for Uncle Mark's Adventure Bucks
 *
 * Run with: npx ts-node scripts/generate-qr-codes.ts
 *
 * This generates QR codes for each family member's unique URL.
 * Print these and include them in your handwritten gift notes!
 */

import QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

// Your deployed URL (update after deploying to Vercel)
const BASE_URL = process.env.BASE_URL || "https://uncle-mark-adventures.vercel.app";

// Family members with their unique slugs
// The random codes make URLs unguessable
const familyMembers = [
  { name: "Riley", slug: "riley-x7k9m2", theme: "aviation" },
  { name: "Ella", slug: "ella-p3n8q1", theme: "theater" },
  { name: "Abby", slug: "abby-m5j2w8", theme: "adventure" },
  { name: "Colton", slug: "colton-h9t4r6", theme: "science" },
  { name: "Claire", slug: "claire-v2b7y3", theme: "music" },
  { name: "Jake", slug: "jake-f8s1k5", theme: "sports" },
  { name: "Ezra", slug: "ezra-d4c6n9", theme: "accessible" },
];

async function generateQRCodes() {
  const outputDir = path.join(process.cwd(), "qr-codes");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🎁 Generating QR Codes for Uncle Mark's Adventure Bucks\n");
  console.log("=" .repeat(50) + "\n");

  for (const member of familyMembers) {
    const url = `${BASE_URL}/adventure/${member.slug}`;
    const filename = `${member.name.toLowerCase()}-qr.png`;
    const filepath = path.join(outputDir, filename);

    try {
      // Generate QR code as PNG
      await QRCode.toFile(filepath, url, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      console.log(`✅ ${member.name}`);
      console.log(`   URL: ${url}`);
      console.log(`   QR:  ${filepath}\n`);
    } catch (err) {
      console.error(`❌ Error generating QR for ${member.name}:`, err);
    }
  }

  console.log("=" .repeat(50));
  console.log("\n📁 QR codes saved to: " + outputDir);
  console.log("\n📝 Google Sheet Data (copy to your People sheet):\n");
  console.log("id\tname\tbalance\ttheme\tslug");
  familyMembers.forEach((member, index) => {
    console.log(`${index + 1}\t${member.name}\t1000\t${member.theme}\t${member.slug}`);
  });

  console.log("\n🎄 Merry Christmas!");
}

generateQRCodes();
