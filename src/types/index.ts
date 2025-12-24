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
}

export interface Redemption {
  id: string;
  personId: string;
  activityId: string;
  redeemedAt: string;
  notes?: string;
}

export interface Theme {
  name: string;
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
