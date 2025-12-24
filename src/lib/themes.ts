import { Theme } from "@/types";

export const themes: Record<string, Theme> = {
  aviation: {
    name: "Riley",
    themeId: "aviation",
    primary: "#38bdf8", // bright sky blue
    secondary: "#475569", // slate/metal gray
    accent: "#fb923c", // warm orange
    background: "#0a1628",
    backgroundGradient: "radial-gradient(ellipse at top, #1e3a5f 0%, #0a1628 50%, #030712 100%)",
    textColor: "#e0f2fe",
    cardBg: "rgba(15, 35, 60, 0.85)",
    welcomeMessage: "Ready for takeoff, Captain Riley?",
    icon: "✈️",
    fontFamily: "'Exo 2', sans-serif",
    displayFont: "'Orbitron', sans-serif",
    glowColor: "rgba(56, 189, 248, 0.4)",
    patternOpacity: 0.15,
  },
  theater: {
    name: "Ella",
    themeId: "theater",
    primary: "#fbbf24", // bright gold
    secondary: "#991b1b", // deep crimson
    accent: "#fef3c7", // cream
    background: "#1a0a0a",
    backgroundGradient: "radial-gradient(ellipse at center top, #3d1515 0%, #1a0a0a 60%, #0d0505 100%)",
    textColor: "#fef3c7",
    cardBg: "rgba(61, 21, 21, 0.8)",
    welcomeMessage: "The spotlight awaits, Ella!",
    icon: "🎭",
    fontFamily: "'Cormorant Garamond', serif",
    displayFont: "'Playfair Display', serif",
    glowColor: "rgba(251, 191, 36, 0.5)",
    patternOpacity: 0.12,
  },
  adventure: {
    name: "Abby",
    themeId: "adventure",
    primary: "#4ade80", // vibrant green
    secondary: "#a16207", // earth brown
    accent: "#fde047", // sunshine yellow
    background: "#0a1a10",
    backgroundGradient: "linear-gradient(180deg, #1a3d25 0%, #0a1a10 40%, #050d08 100%)",
    textColor: "#d9f99d",
    cardBg: "rgba(20, 50, 30, 0.85)",
    welcomeMessage: "The wild calls, Abby!",
    icon: "🏹",
    fontFamily: "'Nunito', sans-serif",
    displayFont: "'Bebas Neue', sans-serif",
    glowColor: "rgba(74, 222, 128, 0.3)",
    patternOpacity: 0.2,
  },
  science: {
    name: "Colton",
    themeId: "science",
    primary: "#818cf8", // electric indigo
    secondary: "#4f46e5", // deep indigo
    accent: "#22d3ee", // cyan
    background: "#0a0a1a",
    backgroundGradient: "radial-gradient(ellipse at bottom, #1e1b4b 0%, #0a0a1a 60%, #050510 100%)",
    textColor: "#c7d2fe",
    cardBg: "rgba(30, 27, 75, 0.8)",
    welcomeMessage: "Let's experiment, Colton!",
    icon: "🔬",
    fontFamily: "'Space Mono', monospace",
    displayFont: "'Audiowide', sans-serif",
    glowColor: "rgba(129, 140, 248, 0.4)",
    patternOpacity: 0.25,
  },
  music: {
    name: "Claire",
    themeId: "music",
    primary: "#c084fc", // vibrant purple
    secondary: "#7e22ce", // deep purple
    accent: "#f472b6", // hot pink
    background: "#120a1a",
    backgroundGradient: "linear-gradient(135deg, #2d1b4e 0%, #120a1a 50%, #0a0510 100%)",
    textColor: "#f5d0fe",
    cardBg: "rgba(45, 27, 78, 0.8)",
    welcomeMessage: "Let's rock, Claire!",
    icon: "🎸",
    fontFamily: "'Poppins', sans-serif",
    displayFont: "'Righteous', sans-serif",
    glowColor: "rgba(192, 132, 252, 0.4)",
    patternOpacity: 0.18,
  },
  sports: {
    name: "Jake",
    themeId: "sports",
    primary: "#fb923c", // vibrant orange
    secondary: "#1c1917", // almost black
    accent: "#facc15", // golden yellow
    background: "#0f0a05",
    backgroundGradient: "radial-gradient(ellipse at top right, #3d2610 0%, #0f0a05 60%, #050302 100%)",
    textColor: "#fff7ed",
    cardBg: "rgba(60, 35, 15, 0.85)",
    welcomeMessage: "Game on, Jake!",
    icon: "🏀",
    fontFamily: "'Barlow Condensed', sans-serif",
    displayFont: "'Black Ops One', sans-serif",
    glowColor: "rgba(251, 146, 60, 0.4)",
    patternOpacity: 0.2,
  },
  accessible: {
    name: "Ezra",
    themeId: "accessible",
    primary: "#fbbf24", // bright yellow
    secondary: "#000000",
    accent: "#ffffff",
    background: "#000000",
    backgroundGradient: "linear-gradient(180deg, #1a1a1a 0%, #000000 100%)",
    textColor: "#ffffff",
    cardBg: "rgba(30, 30, 30, 0.95)",
    welcomeMessage: "Hey Ezra! Your adventures are ready!",
    icon: "🎸",
    fontFamily: "system-ui, -apple-system, sans-serif",
    displayFont: "system-ui, -apple-system, sans-serif",
    isAccessible: true,
    glowColor: "rgba(251, 191, 36, 0.6)",
    patternOpacity: 0.1,
  },
};

export function getThemeBySlug(slug: string): Theme | null {
  const name = slug.split("-")[0].toLowerCase();

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
