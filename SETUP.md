# Setup Guide: Uncle Mark's Adventure Bucks

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Uncle Mark's Adventure Bucks"
3. Create 3 tabs (sheets) at the bottom:

### Tab 1: "People"
Add these columns in Row 1, then paste the data below:

| id | name | balance | theme | slug |
|----|------|---------|-------|------|
| 1 | Riley | 1000 | aviation | riley-x7k9m2 |
| 2 | Ella | 1000 | theater | ella-p3n8q1 |
| 3 | Abby | 1000 | adventure | abby-m5j2w8 |
| 4 | Colton | 1000 | science | colton-h9t4r6 |
| 5 | Claire | 1000 | music | claire-v2b7y3 |
| 6 | Jake | 1000 | sports | jake-f8s1k5 |
| 7 | Ezra | 1000 | accessible | ezra-d4c6n9 |

### Tab 2: "Activities"
Add these columns in Row 1 (leave empty for now - add activities later):

| id | name | cost | description | icon | exclude |

The **exclude** column is optional. Use it to hide activities from specific people (comma-separated names).

Example activities you can add later:
| 1 | Movie Night | 100 | Pick any movie, Uncle Mark brings snacks | 🎬 | |
| 2 | Ice Cream Trip | 50 | Any flavor you want! | 🍦 | |
| 3 | Hiking Adventure | 200 | Pick a trail, we'll explore together | 🥾 | |
| 4 | Bowling | 150 | Strikes and spares at the lanes | 🎳 | |
| 5 | Arcade Day | 250 | Unlimited tokens! | 🕹️ | |
| 6 | Cooking Together | 150 | You choose what we make | 👨‍🍳 | |
| 7 | Mini Golf | 100 | 18 holes of fun | ⛳ | |
| 8 | Go Karts | 300 | Race day! | 🏎️ | Colton |
| 9 | Driving Lesson | 500 | Behind the wheel with Uncle Mark | 🚗 | Colton, Abby, Jake, Ezra |

### Tab 3: "Redemptions"
Add these columns in Row 1 (this will auto-populate when kids redeem):

| id | personId | activityId | redeemedAt | notes |

4. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/`**`SPREADSHEET_ID`**`/edit`

---

## Step 2: Set Up Google Cloud API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project called "Adventure Bucks"
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search "Google Sheets API"
   - Click Enable
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it "adventure-bucks-service"
   - Click "Create and Continue" (skip optional steps)
   - Click "Done"
5. Create a key for the service account:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON"
   - Download the file (keep it safe!)
6. Share your Google Sheet with the service account:
   - Copy the `client_email` from the JSON file
   - Open your Google Sheet
   - Click "Share"
   - Paste the email and give "Editor" access

---

## Step 3: Deploy to Vercel

1. Push this project to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   gh repo create uncle-mark-adventures --public --source=. --push
   ```

2. Go to [Vercel](https://vercel.com) and sign in with GitHub

3. Import the repository

4. Add Environment Variables in Vercel:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = the `client_email` from your JSON key
   - `GOOGLE_PRIVATE_KEY` = the `private_key` from your JSON key (include the full string with `-----BEGIN PRIVATE KEY-----` etc.)
   - `GOOGLE_SPREADSHEET_ID` = your spreadsheet ID from Step 1

5. Deploy!

---

## Step 4: Generate QR Codes

After deploying, update the BASE_URL in `scripts/generate-qr-codes.ts` with your Vercel URL, then run:

```bash
npx ts-node scripts/generate-qr-codes.ts
```

This creates PNG files in the `qr-codes/` folder - one for each family member.

---

## Step 5: Create Gift Notes

Print each QR code and include it in a handwritten note for each person. Example:

```
Dear Riley,

Merry Christmas! This QR code is your key to
Uncle Mark's Adventure Bucks!

Scan it to see your balance and the adventures
you can redeem. Each activity is a special
experience we'll do together!

Love,
Uncle Mark
```

---

## Testing Locally

1. Copy `.env.example` to `.env.local` and fill in your credentials
2. Run `npm run dev`
3. Visit `http://localhost:3000/adventure/riley-x7k9m2` to test

---

## Adding Activities Later

Just add rows to the "Activities" tab in Google Sheets. They'll automatically appear on everyone's page!

---

## URLs for Each Person

| Name | URL |
|------|-----|
| Riley | /adventure/riley-x7k9m2 |
| Ella | /adventure/ella-p3n8q1 |
| Abby | /adventure/abby-m5j2w8 |
| Colton | /adventure/colton-h9t4r6 |
| Claire | /adventure/claire-v2b7y3 |
| Jake | /adventure/jake-f8s1k5 |
| Ezra | /adventure/ezra-d4c6n9 |

---

## Special Note About Ezra's Page

Ezra's page has a special audio-first design:
- When he opens the page, he'll see a big "Enable Audio" button
- Once enabled, the page will read everything out loud
- All buttons have sound feedback
- High contrast colors and large text
- Full keyboard accessibility

🎄 Merry Christmas! 🎄
