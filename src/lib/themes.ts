import { Theme } from "@/types";

export const themes: Record<string, Theme> = {
  aviation: {
    name: "Riley",
    primary: "#0ea5e9", // sky blue
    secondary: "#64748b", // slate/metal gray
    accent: "#f97316", // orange for highlights
    background: "#0c1929",
    backgroundGradient: "linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #0c1929 100%)",
    textColor: "#f8fafc",
    cardBg: "rgba(30, 58, 95, 0.8)",
    welcomeMessage: "Ready for takeoff, Riley?",
    icon: "✈️",
  },
  theater: {
    name: "Ella",
    primary: "#d97706", // warm gold
    secondary: "#7c2d12", // deep burgundy
    accent: "#fbbf24", // bright gold
    background: "#1c1412",
    backgroundGradient: "linear-gradient(135deg, #1c1412 0%, #44241c 50%, #1c1412 100%)",
    textColor: "#fef3c7",
    cardBg: "rgba(68, 36, 28, 0.8)",
    welcomeMessage: "The world awaits, Ella!",
    icon: "🎭",
  },
  adventure: {
    name: "Abby",
    primary: "#16a34a", // forest green
    secondary: "#854d0e", // earth brown
    accent: "#84cc16", // lime for energy
    background: "#14211a",
    backgroundGradient: "linear-gradient(135deg, #14211a 0%, #1f3d2b 50%, #14211a 100%)",
    textColor: "#ecfccb",
    cardBg: "rgba(31, 61, 43, 0.8)",
    welcomeMessage: "Adventure awaits, Abby!",
    icon: "🏹",
  },
  science: {
    name: "Colton",
    primary: "#3b82f6", // electric blue
    secondary: "#6366f1", // indigo
    accent: "#22d3ee", // cyan
    background: "#0f172a",
    backgroundGradient: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    textColor: "#e0f2fe",
    cardBg: "rgba(30, 27, 75, 0.8)",
    welcomeMessage: "Let's experiment, Colton!",
    icon: "🔬",
  },
  music: {
    name: "Claire",
    primary: "#a855f7", // purple
    secondary: "#6b21a8", // deep purple
    accent: "#f472b6", // pink
    background: "#1a0f24",
    backgroundGradient: "linear-gradient(135deg, #1a0f24 0%, #3b1d54 50%, #1a0f24 100%)",
    textColor: "#f5d0fe",
    cardBg: "rgba(59, 29, 84, 0.8)",
    welcomeMessage: "Let's ride, Claire!",
    icon: "🎸",
  },
  sports: {
    name: "Jake",
    primary: "#f97316", // orange
    secondary: "#1f2937", // dark gray
    accent: "#fbbf24", // gold
    background: "#18120c",
    backgroundGradient: "linear-gradient(135deg, #18120c 0%, #3d2610 50%, #18120c 100%)",
    textColor: "#fff7ed",
    cardBg: "rgba(61, 38, 16, 0.8)",
    welcomeMessage: "Game on, Jake!",
    icon: "🏀",
  },
  accessible: {
    name: "Ezra",
    primary: "#fbbf24", // bright yellow
    secondary: "#000000", // pure black
    accent: "#ffffff", // pure white
    background: "#000000",
    backgroundGradient: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
    textColor: "#ffffff",
    cardBg: "rgba(40, 40, 40, 0.95)",
    welcomeMessage: "Hey Ezra! Your adventures are ready!",
    icon: "🎸",
    fontFamily: "system-ui, -apple-system, sans-serif",
    isAccessible: true,
  },
};

export function getThemeBySlug(slug: string): Theme | null {
  // Extract the name from slug (e.g., "riley-x7k9m2" -> "riley")
  const name = slug.split("-")[0].toLowerCase();

  // Map names to themes
  const nameToTheme: Record<string, string> = {
    riley: "aviation",
    ella: "theater",
    abby: "adventure",
    colton: "science",
    claire: "music",
    jake: "sports",
    ezra: "accessible",
  };

  const themeKey = nameToTheme[name];
  return themeKey ? themes[themeKey] : null;
}
