export interface Person {
  id: string;
  name: string;
  balance: number;
  theme: string;
  slug: string;
}

export interface Activity {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
  exclude?: string[]; // Names of people who should NOT see this activity
}

export interface Redemption {
  id: string;
  personId: string;
  activityId: string;
  redeemedAt: string;
  notes?: string;
}

export interface Photo {
  id: string;
  person: string;
  url: string;
  caption?: string;
}

export interface AdventureRequest {
  id: string;
  personId: string;
  personName: string;
  request: string;
  submittedAt: string;
  status: "pending" | "approved" | "completed";
}

export interface Theme {
  name: string;
  personalMessage?: string; // A nice paragraph about them
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundGradient: string;
  textColor: string;
  cardBg: string;
  welcomeMessage: string;
  icon: string;
  fontFamily?: string;
  displayFont?: string;
  isAccessible?: boolean;
  themeId: string;
  glowColor: string;
  patternOpacity: number;
}
