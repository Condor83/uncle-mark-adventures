# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Uncle Mark's Adventure Bucks is a personalized digital gift experience where family members scan QR codes to access custom pages, view activities, and redeem "adventure bucks" for experiences with Uncle Mark.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
npx ts-node scripts/generate-qr-codes.ts  # Generate QR codes for each person
```

## Architecture

**Stack:** Next.js 14 (App Router), Tailwind CSS, Google Sheets API as backend, deployed on Vercel.

### Data Flow
- Google Sheets stores all data (People, Activities, Redemptions tabs)
- API routes in `/src/app/api/` fetch from and write to Google Sheets
- Each person has a unique URL slug (e.g., `/adventure/riley-x7k9m2`)

### Key Files
- `src/lib/sheets.ts` - Google Sheets API client for all CRUD operations
- `src/lib/themes.ts` - Theme configurations for each family member (colors, icons, messages)
- `src/app/adventure/[slug]/page.tsx` - Main personalized adventure page
- `src/components/accessible/AudioFeedback.tsx` - Text-to-speech and audio feedback system

### Theming System
Each person has a unique theme defined in `themes.ts`. The theme key is stored in Google Sheets and mapped to visual styles. The `accessible` theme (for Ezra) triggers audio-first UI with TTS, sound effects, and high-contrast styling.

### API Routes
- `GET /api/person/[slug]` - Fetch person data, theme, and redemption history
- `GET /api/activities` - Fetch all available activities
- `POST /api/redeem` - Redeem an activity (updates balance, logs redemption)

## Environment Variables

Required in `.env.local` (local) or Vercel dashboard (production):
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email from Google Cloud
- `GOOGLE_PRIVATE_KEY` - Private key (handles both `\n` literals and actual newlines)
- `GOOGLE_SPREADSHEET_ID` - ID from Google Sheets URL

## Google Sheets Structure

Three tabs with specific column orders:
- **People:** id, name, balance, theme, slug
- **Activities:** id, name, cost, description, icon
- **Redemptions:** id, personId, activityId, redeemedAt, notes